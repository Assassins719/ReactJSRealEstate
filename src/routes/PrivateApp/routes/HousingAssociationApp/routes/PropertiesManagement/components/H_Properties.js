import React from 'react';
import { Button, Container, Row, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AddPropertyButton from './AddPropertyButton';
import DeletePropertyButton from './DeletePropertyButton';

export default function H_Properties({ haUserProperties }) {
  if (haUserProperties === null || haUserProperties === undefined) {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <div style={{ marginTop: '40px' }}>
                <h3>No Properties</h3>
                <AddPropertyButton />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  const renderProperty = (propertyData, number, propertyKey) => {
    console.log(propertyData);
    return (
      <tr key={propertyKey}>
        <th scope="row">{number}</th>
        <td>
          {propertyData.landlordName
            ? propertyData.landlordName
            : 'Not Defined'}
        </td>
        <td>{propertyKey}</td>
        <td>{propertyData.liveOnApp ? 'Live On App' : 'Draft'}</td>
        <td>
          <Link to={`/app/properties/${propertyKey}`}>
            <Button>Edit</Button>
          </Link>
          {' '}<DeletePropertyButton propertyKey={propertyKey} />
        </td>
      </tr>
    );
  };

  const renderProperties = () => {
    return Object.keys(haUserProperties).map((propertyKey, index) =>
      renderProperty(haUserProperties[propertyKey], index + 1, propertyKey)
    );
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div style={{ height: '40px' }} />
            <h3>All Properties</h3>
            <p>
              <AddPropertyButton />
            </p>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {renderProperties()}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
