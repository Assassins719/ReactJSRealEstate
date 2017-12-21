import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { APP_BRAND_NAME } from '../../../constants/index';
import { Block, Page } from '../../../components/styled/Divs';

export default function Home() {
  return (
    <Page>
      <Container fluid>
        <Row>
          <div
            style={{
              backgroundImage:
                'url(https://images.pexels.com/photos/622041/pexels-photo-622041.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              height: '80vh',
              width: '100%'
            }}
          >
            <div
              style={{
                height: '80vh',
                backgroundColor: 'rgba(0,0,0,0.3)',
                paddingTop: '10vh'
              }}
            >
              <h1 style={{ textAlign: 'center', color: '#fff' }}>
                {APP_BRAND_NAME}
              </h1>
              <h4 style={{ textAlign: 'center', color: '#fff' }}>
                Search &amp; Find Suitable Housing Options in Scotland.
              </h4>
            </div>

          </div>
        </Row>
        <Row>
          <Col />
        </Row>
        <Row>
          <Col xs={12} lg={4}>
            <Block>
              <h3>
                Looking for Housing?
              </h3>
              <p>
                Use HomePointr to search and find temporary housing
                opportunities
                (including supported housing, temporary hostels, PSL, Private
                tenancies, Care Homes, Rehabilitation Centres, DETOX centres,
                Sheltered Housing, Youth Hostels and others) for clients
                experiencing or at risk of homelessness.
              </p>
              <p>
                From the comfort of
                your
                office and through any PCs or device, we improve access for
                suitable housing for the people using your services.
              </p>
            </Block>
          </Col>
          <Col xs={12} lg={4}>
            <Block>
              <h3>Housing Providers</h3>
              <p>
                HomePointr allows you to quickly update your housing listings.
                Housing Finders can easily search and find your housing
                vacancies
                and requirements online, reducing calls to your office and
                streamlining access to your accommodation.
              </p>
              <p>
                Our system allows you
                to
                improve your allocation process by becoming more transparent and
                offer your tenants more choice and control over their rehousing
                decisions
              </p>
            </Block>
          </Col>
          <Col xs={12} lg={4}>
            <Block>
              <h3>Get Connected</h3>
              HomePointr CIC is a social enterprise which is set up to
              streamline
              the complex renting process and make renting refreshingly easy for
              both applicants and housing providers, saving time and money by
              connecting genuine applicants with the perfect landlords and also
              reduce tenancy failure and encourage tenancy sustainment.
            </Block>
          </Col>
        </Row>
      </Container>
    </Page>
  );
}
