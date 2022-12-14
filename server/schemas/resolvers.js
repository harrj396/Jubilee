const { AuthenticationError } = require('apollo-server-express');
const { User, Album } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('albums');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('albums');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Album.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { albumId }) => {
      return Album.findOne({ _id: albumId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('albums');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addThought: async (parent, { albumText }, context) => {
      if (context.user) {
        const thought = await Album.create({
          albumText,
          albumAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { albums: album._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { albumId, songText }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: albumId },
          {
            $addToSet: {
              songs: { songText, songArtist: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeAlbum: async (parent, { albumId }, context) => {
      if (context.user) {
        const album = await Album.findOneAndDelete({
          _id: albumId,
          albumAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { albums: album._id } }
        );

        return album;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { albumId, songId }, context) => {
      if (context.user) {
        return Album.findOneAndUpdate(
          { _id: albumId },
          {
            $pull: {
              songs: {
                _id: songId,
                songAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;