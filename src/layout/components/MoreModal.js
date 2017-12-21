import React from 'react';
import Rodal from 'rodal';
import { Link } from 'react-router-dom';

// Hack the CSS later
import 'rodal/lib/rodal.css';

export default function MoreModal(props) {
  if (!props.navItems) {
    return (
      <Rodal
        visible={props.moreModalOpen}
        onClose={props.hideMoreModal}
        width={100}
        height={100}
        measure={'%'}
        closeOnEsc={true}
        animation={'slideUp'}
        duration={200}
        customStyles={{
          padding: 0,
          margin: 0
        }}
      >
        <div style={{ width: '100%', height: '100%', backgroundColor: '#eee' }}>
          Loading...
        </div>
      </Rodal>
    );
  }
  return (
    <Rodal
      visible={props.moreModalOpen}
      onClose={props.hideMoreModal}
      width={100}
      height={100}
      measure={'%'}
      closeOnEsc={true}
      animation={'slideUp'}
      duration={200}
      customStyles={{
        padding: 0,
        margin: 0
      }}
    >
      <div style={{ width: '100%', height: '100%', backgroundColor: '#eee' }}>
        <h1>Menu</h1>
        <ul>
          {props.navItems.map(item =>
            <li key={item.url} onClick={props.hideMoreModal}>
              <Link to={item.url ? `${item.url}` : ''}>
                <h2>{item.name}</h2>
              </Link>
            </li>
          )}
        </ul>

      </div>
    </Rodal>
  );
}
