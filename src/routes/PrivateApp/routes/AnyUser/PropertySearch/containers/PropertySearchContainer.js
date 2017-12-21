import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {
  InstantSearch,
  Hits,
  Pagination,
  SearchBox,
  Stats,
  HierarchicalMenu
} from 'react-instantsearch/dom';
import 'react-instantsearch-theme-algolia/style.css';
import PropTypes from 'prop-types';
import ConnectedSearchBox from '../components/ASearchBox';
import PropertyCard from '../components/PropertyCard';

class PropertiesSearchContainer extends React.Component {
  render() {
    return (
      <div style={{ marginTop: '32px' }}>
        <Container>
          <Row>
            <Col md={'9'}>
              <h3 style={{ marginBottom: '16px' }}>Property Search</h3>
              <InstantSearch
                appId="RBBFAKDKKD"
                apiKey="1eb89b1a447b81857c10e48f95f4f85d"
                indexName="homepointr"
              >
                <Row>
                  <Col md={'4'}>
                    <div>
                      <Stats />
                    </div>
                    {/* https://community.algolia.com/react-instantsearch/widgets/HierarchicalMenu.html */}
                    <HierarchicalMenu
                      id="data.lettingType"
                      key="data.lettingType"
                      attributes={['data.lettingType']}
                    />
                  </Col>
                  <Col md={'8'}>
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 10
                        }}
                      >
                        {/*<ConnectedSearchBox />*/}
                        <SearchBox />
                      </div>
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1
                          }}
                        >
                          <Hits hitComponent={PropertyCard} />
                          <div style={{ alignSelf: 'center', padding: '16px' }}>
                            <Pagination showLast={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

              </InstantSearch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

PropertiesSearchContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  location: PropTypes.object.isRequired
};

export default PropertiesSearchContainer;
