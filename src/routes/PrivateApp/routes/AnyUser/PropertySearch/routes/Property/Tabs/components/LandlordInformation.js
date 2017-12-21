import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

export default function LandlordInformation({ landlordInformation }) {
  return landlordInformation
    ? <Container>
        <Row>
          <Col>
            <h3>
              Landlord Information
            </h3>
            <p>
              {landlordInformation}
            </p>
          </Col>
        </Row>
      </Container>
    : <div>No Landlord Information</div>;
}

LandlordInformation.propTypes = {
  landlordInformation: PropTypes.string
};
