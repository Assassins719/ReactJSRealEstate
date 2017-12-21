import React from 'react';
import PropTypes from 'prop-types';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import PropertyInformation from '../Tabs/components/PropertyInformation';
import MapView from '../Tabs/components/MapView';
import LandlordInformation from '../Tabs/components/LandlordInformation';

class PropertyFooterTabs extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
      this.forceUpdate();
    }
  }

  render() {
    const {
      features,
      others,
      landlordInformation,
      long,
      lat,
      pubsBarsRestaurants,
      schools,
      transportLinks
    } = this.props;

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              Map View
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              Property Information
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => {
                this.toggle('3');
              }}
            >
              Landlord Information
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <MapView long={long} lat={lat} />
          </TabPane>
          <TabPane tabId="2">
            <PropertyInformation
              features={features}
              others={others}
              pubsBarsRestaurants={pubsBarsRestaurants}
              schools={schools}
              transportLinks={transportLinks}
            />
          </TabPane>
          <TabPane tabId="3">
            <LandlordInformation landlordInformation={landlordInformation} />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

PropertyFooterTabs.propTypes = {
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
  landlordInformation: PropTypes.string,
  long: PropTypes.string,
  lat: PropTypes.string,
  pubsBarsRestaurants: PropTypes.string,
  schools: PropTypes.string,
  transportLinks: PropTypes.string
};

export default PropertyFooterTabs;
