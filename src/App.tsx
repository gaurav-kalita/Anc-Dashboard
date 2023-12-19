/* eslint-disable import/namespace */
import { Provider } from 'react-redux';
import { store } from './store';
import { Layout } from './Components/Layout';
import { Home } from './Modules/Home/Index';
import React from 'react';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Home></Home>
      </Layout>
    </Provider>
  );
};

export default App;
