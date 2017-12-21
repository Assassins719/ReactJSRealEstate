import React from 'react';
import { Container, Row, Col } from 'reactstrap';


// Tenant Dashboard
const T_Dashboard = () =>
  <div className="app flex-row align-items-center">
    <Container fluid>
      <Row className="justify-content-center">
        <Col style={{ minWidth: '30vw' }}>
          <h1>Housing Finder Dashboard</h1>

        </Col>
      </Row>
    </Container>
  </div>;

export default T_Dashboard;
