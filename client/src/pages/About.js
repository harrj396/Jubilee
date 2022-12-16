import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './About.css';

function BasicExample() {
  return (
    <>
      <h1>About Us</h1>
      <p className='hi'>We are a hardworking team of Full Stack Developers determined to build applications that bring value to the user and the entire world. We all made the decision to join a coding bootcamp to strengthen our skills and build wonderful applications together.
      <br></br>
      <br></br>
      <p>Below is a link to our Github profiles where you can check out some more of the things that we have been working on!</p>
      
      </p>

      <Container id='git' className='mb-5'>
    <Row>
    <Col>
        <a href='https://github.com/nftgoat'>
      <h2>Justin Ross <img src='/git.png' width={50}></img></h2>
      </a>
    </Col>
    <Col>
    <a href='https://github.com/oliverLo78'>
      <h2>Oliver Lopez <img src='/git.png' width={50}></img></h2>
      </a>
    </Col>
    <Col>
    <a href='https://github.com/harrj396'>
      <h2>Jacob Harris <img src='/git.png' width={50}></img></h2>
      </a>
    </Col>
    <Col>
    <a href='https://github.com/ProNevros'>
      <h2>Jose Leyva <img src='/git.png' width={50}></img></h2>
      </a>
      </Col>
      </Row>
      </Container>
      {[
        'danger',
      ].map((variant) => (
        <Alert className='alert mb-5' key={variant} variant={variant}>
          Thank you for your interest and support of our applicaton!
        </Alert>
      ))}
    </>
  );
}

export default BasicExample;