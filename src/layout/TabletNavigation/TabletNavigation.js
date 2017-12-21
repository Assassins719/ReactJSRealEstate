import React from 'react';
import TabBarItem from '../components/TabBarItem';
import Breadcrumb from '../components/Breadcrumb';

export default function TabletNavigation(props) {
  const tabletTabs = () => {
    // Setup More Tab
    if (props.navItems.length > 7) {
      return [
        <TabBarItem tabName={props.navItems[0].name} />,
        <TabBarItem tabName={props.navItems[1].name} />,
        <TabBarItem tabName={props.navItems[2].name} />,
        <TabBarItem tabName={props.navItems[3].name} />,
        <TabBarItem tabName={props.navItems[4].name} />,
        <TabBarItem tabName={props.navItems[5].name} />,
        <TabBarItem
          moreModalClicked={props.moreModalClicked}
          tabName={'More'}
        />
      ];
    }
    return props.navItems.map(item => <TabBarItem tabName={item.name} />);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          position: 'fixed',
          top: 0,
          width: '100%',
          height: '55px',
          backgroundColor: '#fff',
          borderTop: '1px solid #e2e2e2',
          borderBottom: '1px solid #e2e2e2',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: '100'
        }}
      >
        <Breadcrumb />
      </div>
      {/* marginTop offsets the height of the Nav bar */}
      <div style={{ marginTop: '55px' }}>
        {props.children}
      </div>
      <div
        style={{
          display: 'flex',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          height: '55px',
          backgroundColor: '#fff',
          borderTop: '1px solid #e2e2e2',
          justifyContent: 'space-around',
          zIndex: '100',
          overflowX: 'hidden'
        }}
      >
        {tabletTabs()}
      </div>
    </div>
  );
}
