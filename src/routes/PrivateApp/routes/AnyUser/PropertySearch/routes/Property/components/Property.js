import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, ButtonGroup } from 'reactstrap';
import PropertyFooterTabs from './PropertyTabs';
import PropertyCarousel from './PropertyCarousel';
import TenantInterestedButtonContainer from '../containers/TenantInterestedButtonContainer';

function Property({ property, propertyId }) {
  if (!property) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <div style={{ height: '32px' }} />
      <Row>
        <Col>
          <h3>
            {property.addressLine1}{' '}{property.cityOrTown}{' '}{property.postCode}
          </h3>
          <br />
          <span><strong>Ref: </strong>{propertyId}</span>{' '}
          <span><strong>Letting type: </strong>{property.lettingType}</span>
          {' '}
          <span><strong>Landlord: </strong>{property.landlordName}</span>
        </Col>
      </Row>
      <Row>
        <Col md={'6'}>
          <PropertyCarousel uploadedFiles={property.uploadedFiles} />
          <h5>
            Options: {' '}
            <ButtonGroup>
              {/* <Button>Apply</Button> */}
              {/* <Button>Save</Button> */}
              <TenantInterestedButtonContainer propertyId={propertyId} />
              {/* <Button>Print</Button> */}
              {/* <Button>PDF</Button> */}
            </ButtonGroup>
          </h5>
        </Col>
        <Col>

          <div>
            <ul>
              {property.keyFacts && [
                <h5 key={'keyFacts'}>Key facts</h5>,
                property.keyFacts.map((keyFact, i) =>
                  <li key={keyFact.name}>{keyFact.name}</li>
                )
              ]}
              {/*<li>1st Floor (lift not available)</li>*/}
              {/*<li>Flat</li>*/}
              {/*<li>1 bedroom</li>*/}
              {/*<li>Closure data: 30th March 2018 at 12:30</li>*/}
            </ul>
          </div>

          <div>
            <ul>
              {property.charges && [
                <h5 key={'charges'}>Charges</h5>,
                property.charges.map(charge =>
                  <li key={charge.name}>{charge.name}</li>
                )
              ]}
              {/*<h5>Fake Charges</h5>*/}
              {/*<li>*/}
                {/*Rent: £297.33 Monthly*/}
              {/*</li>*/}
              {/*<li>*/}
                {/*Energy/Heating: £27.39 Monthly*/}
              {/*</li>*/}
              {/*<li>*/}
                {/*Tenancy and Service: £42.76 Monthly*/}
              {/*</li>*/}
              {/*<li>*/}
                {/*Total: £467.68 Monthly (not including any future charges)*/}
              {/*</li>*/}
            </ul>
          </div>

          {/*<h5>Share this page</h5>*/}
          {/*<ul>*/}
            {/*<li>Twitter</li>*/}
            {/*<li>Facebook</li>*/}
            {/*<li>Pinterest</li>*/}
          {/*</ul>*/}
        </Col>
      </Row>

      {/* Tabs of Property Information, Map View and Landlord Information */}
      <PropertyFooterTabs
        features={property.features}
        others={property.others}
        landlordInformation={property.landlordInformation}
        long={property.long}
        lat={property.lat}
        pubsBarsRestaurants={property.pubsBarsRestaurants}
        schools={property.schools}
        transportLinks={property.transportLinks}
      />
    </Container>
  );
}

Property.propTypes = {
  propertyId: PropTypes.string,
  property: PropTypes.shape({
    addressLine1: PropTypes.string,
    charges: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string
      })
    ),
    cityOrTown: PropTypes.string,
    features: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string
      })
    ),
    keyFacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string
      })
    ),
    landlordInformation: PropTypes.string,
    landlordName: PropTypes.string,
    lat: PropTypes.string,
    lettingType: PropTypes.string,
    liveOnApp: PropTypes.bool,
    long: PropTypes.string,
    others: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string
      })
    ),
    postCode: PropTypes.string,
    pubsBarsRestaurants: PropTypes.string,
    schools: PropTypes.string,
    transportLinks: PropTypes.string,
    uploadedFiles: PropTypes.object // objects of downloadURL, fullPath, name
  }),

};

export default Property;
