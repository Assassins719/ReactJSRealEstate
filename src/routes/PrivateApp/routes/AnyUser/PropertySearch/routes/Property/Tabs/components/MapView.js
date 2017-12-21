import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import MyMapComponent from './MyMapComponent';

export default function MapView({ long, lat }) {
  if (!long || !lat) {
    return (
      <Container>
        <Row>
          <Col md={'12'}>
            <p>Housing Provider did not provide Map data</p>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container>
      <Row>
        <Col md={'12'}>
          <div
            style={{
              width: '80vw',
              height: '400px',
              marginTop: '40px',
              marginBottom: '40px'
            }}
          >

            {/* Issue loading when not the first tab to load */}

            <MyMapComponent
              long={parseFloat(long)}
              lat={parseFloat(lat)}
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAc6q5Fo1rpDGYqYCeLo-hQ6W1v02IQSsQ&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

MapView.propTypes = {
  long: PropTypes.string,
  lat: PropTypes.string
};
