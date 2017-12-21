import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import AddEditPropertyForm from './AddEditPropertyForm';
import H_PropertyPhotosUploaderContainer from '../containers/H_PropertyPhotosUploaderContainer';

const H_Property = ({ handleSubmit, initialValues, propertyKey }) => {
  return (
    <div className="app flex-row align-items-center">
      <Container fluid>
        <Row className="justify-content-center">
          <Col style={{ minWidth: '30vw' }}>
            <div style={{ marginTop: '32px' }} />
            <h1>Housing Provider Property Form</h1>

            <H_PropertyPhotosUploaderContainer propertyKey={propertyKey} />
            <div style={{ marginTop: '48px', marginBottom: '32px' }}>
              <AddEditPropertyForm
                onSubmit={handleSubmit}
                initialValues={initialValues}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

H_Property.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object
};

export default H_Property;
