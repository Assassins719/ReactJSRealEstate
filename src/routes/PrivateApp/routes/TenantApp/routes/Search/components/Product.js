import React from 'react';
import { Row, Col } from 'reactstrap';

function Product(props) {
  return (
    <div style={{ border: '1px solid #eee', padding: '20px' }}>
      <Row>
        <Col sm={3}>
          <img width={120} height={120} src={props.hit.image} alt="" />
        </Col>
        <Col>
          <h5>{props.hit.name}</h5>
          <pre>
            {JSON.stringify(props, null, 2)}
          </pre>
        </Col>
      </Row>
    </div>
  );
}

export default Product;
