import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function TabBarItem(props) {
  return (
    <Link to={props.url ? `${props.url}` : '#'}>
      <Button
        color="link"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
        onClick={props.moreModalClicked ? () => props.moreModalClicked() : null}
      >
        {props.tabName}
      </Button>
    </Link>
  );
}
