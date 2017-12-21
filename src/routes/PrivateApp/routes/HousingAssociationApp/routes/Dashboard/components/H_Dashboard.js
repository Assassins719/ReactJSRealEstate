import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropertyEnquiriesContainer from '../containers/PropertyEnquiriesContainer';


const H_Dashboard = () =>
  <div className="app flex-row align-items-center">
    <Container fluid>
      <Row className="justify-content-center">
        <Col style={{ minWidth: '30vw' }}>
          <div style={{ marginTop: '32px' }} />
          <h1>Housing Provider Dashboard</h1>

          <PropertyEnquiriesContainer />
        </Col>
      </Row>
    </Container>
  </div>;

export default H_Dashboard;
