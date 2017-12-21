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
import Product from '../components/Product';

// Probably shouldn't be pure since underlying component
// has lots of changes?
class SearchContainer extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={'9'}>
            <InstantSearch
              appId="latency"
              apiKey="6be0576ff61c053d5f9a3225e2a90f76"
              indexName="ikea"
            >
              <Row>
                <Col md={'4'}>
                  <div style={{ padding: '0px 20px' }}>
                    <Stats />
                  </div>
                  {/* https://community.algolia.com/react-instantsearch/widgets/HierarchicalMenu.html */}
                  <HierarchicalMenu
                    id="categories"
                    key="categories"
                    attributes={[
                      'category',
                      'sub_category',
                      'sub_sub_category'
                    ]}
                  />
                </Col>
                <Col md={'8'}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 10
                    }}
                  >
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
                      <div>
                        <Hits hitComponent={Product} />
                      </div>
                      <div style={{ alignSelf: 'center' }}>
                        <Pagination showLast={true} />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </InstantSearch>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SearchContainer;
