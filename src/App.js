import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Main from './components/Main';
import {
  DesktopBreakpoint,
  TabletBreakpoint,
  MobileBreakpoint
} from './responsive-helpers/breakpoints';
import AppNavigation from './layout/AppNavigation';

const App = () =>
  <div>
    <DesktopBreakpoint>
      <AppNavigation type={'desktop'}>
        <Main />
      </AppNavigation>
    </DesktopBreakpoint>
    <TabletBreakpoint>
      <AppNavigation type="tablet">
        <Main />
      </AppNavigation>
    </TabletBreakpoint>
    <MobileBreakpoint>
      <AppNavigation type="mobile">
        <Main />
      </AppNavigation>
    </MobileBreakpoint>
  </div>;

export default App;
