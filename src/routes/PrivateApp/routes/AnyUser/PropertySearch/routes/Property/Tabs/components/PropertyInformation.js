import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, CardTitle, Row, Col } from 'reactstrap';

export default function PropertyInformation({
  features,
  others,
  pubsBarsRestaurants,
  schools,
  transportLinks
}) {
  if (
    !(features || others || pubsBarsRestaurants || schools || transportLinks)
  ) {
    return <div>No information supplied</div>;
  }
  return (
    <Row>
      <Col sm="6">
        <Card block>
          <ul>
            {features && [
              <CardTitle key={'features'}>Features</CardTitle>,
              features.map(feature =>
                <li key={feature.name}>{feature.name}</li>
              )
            ]}
          </ul>
        </Card>
        <Card block>
          <div>
            <ul>
              {others && [
                <CardTitle key={'otherthings'}>Other Things</CardTitle>,
                others.map(other =>
                  <li key={other.name}>{other.name}</li>
                )
              ]}
            </ul>
          </div>
        </Card>
      </Col>
      <Col sm="6">
        <Card block>
          {transportLinks || schools || pubsBarsRestaurants
            ? <CardTitle>Your Nearest</CardTitle>
            : null}
          <div>
            {transportLinks
              ? <div>
                  <h5>
                    Transport Links
                  </h5>
                  <p>
                    {transportLinks}
                  </p>
                </div>
              : null}

            {schools
              ? <div>
                  <h5>
                    Education
                  </h5>
                  <p>{schools}</p>
                </div>
              : null}

            {pubsBarsRestaurants
              ? <div>
                  <h5>
                    Pubs, bars and restaurants
                  </h5>
                  <p>{pubsBarsRestaurants}</p>
                </div>
              : null}
          </div>
        </Card>
      </Col>
    </Row>
  );
}

PropertyInformation.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string
    })
  ),
  others: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string
    })
  ),
  pubsBarsRestaurants: PropTypes.string,
  schools: PropTypes.string,
  transportLinks: PropTypes.string
};
