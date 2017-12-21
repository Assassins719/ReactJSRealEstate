import React from 'react';
import { Route } from 'react-router-dom';
import routes from '../../routes/routes';
import { APP_BRAND_NAME } from '../../constants/index';

const findRouteName = url => routes[url];

const Title = props => {
  const routeName = findRouteName(props.match.url);
  return (
    <div>
      {routeName}
    </div>
  );
};

const TitleRoot = props => {
  return (
    <span>
      {APP_BRAND_NAME}
    </span>
  );
};

export default props =>
  <div>
    <Route exact path="/" component={TitleRoot} {...props} />
    <Route path="/:path" component={Title} {...props} />
  </div>;
