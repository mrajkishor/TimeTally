import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SideCard, MainCard } from './Components';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col >
            <div className="appheader">
              TimeTally (using this table library : https://react-table-library.com/?path=/docs/getting-started-installation--page )
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <SideCard />
          </Col>
          <Col sm={8}>
            <MainCard />
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;
