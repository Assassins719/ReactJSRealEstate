import React from 'react';
import './MobileNavigation.css';
import TabBarItem from '../components/TabBarItem';
import PageTitle from '../components/PageTitle';

export default function MobileNavigation(props) {
  const mobileTabs = () => {
    // Setup More Tab
    if (props.navItems.length > 4) {
      return [
        <TabBarItem key={'tab1'} tabName={props.navItems[0].name} url={props.navItems[0].url} />,
        <TabBarItem key={'tab2'} tabName={props.navItems[1].name} url={props.navItems[1].url} />,
        <TabBarItem key={'tab3'} tabName={props.navItems[2].name} url={props.navItems[2].url} />,
        <TabBarItem
          key={'tab4'}
          moreModalClicked={props.moreModalClicked}
          tabName={'More'}
        />
      ];
    }
    return props.navItems.map(item => <TabBarItem tabName={item.name} url={item.url} />);
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
        <PageTitle />
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
          overflowX: 'hidden'
        }}
      >
        {mobileTabs()}
      </div>
    </div>
  );
}
