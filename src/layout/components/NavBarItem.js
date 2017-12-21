import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBarItem(props) {
  return (
    <Link to={props.url ? `${props.url}` : '#'}>
      <div
        style={{
          borderRight: '1px solid #e2e2e2',
          padding: '16px 20px 13px'
        }}
        onClick={props.moreModalClicked ? () => props.moreModalClicked() : null}
      >
        <span
          style={{ textDecoration: 'none', fontWeight: '500', color: '#555' }}
        >
          {props.name}
        </span>
      </div>
    </Link>
  );
}
