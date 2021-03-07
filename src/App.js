import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainLayout from '../src/components/layout/MainLayout/MainLayout';
import Login from '../src/components/views/Login/Login';
import Kitchen from '../src/components/views/Kitchen/Kitchen';
import Tables from '../src/components/views/Tables/Tables';
import Waiter from '../src/components/views/Waiter/Waiter';
import Homepage from '../src/components/views/Homepage/Homepage';

function App() {
  return (
    <BrowserRouter basename={'/panel'}>
      <MainLayout>
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/`} 
            component={Homepage}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/login'}
            component={Login}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/tables'}
            component={Tables}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/waiter'}
            component={Waiter}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/kitchen'}
            component={Kitchen}
          />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;