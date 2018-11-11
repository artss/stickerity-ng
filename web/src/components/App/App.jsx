import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../Header';
import PrivateRoute from '../PrivateRoute';
import Login from '../../pages/Auth/Login';
import Register from '../../pages/Auth/Register';
import Activate from '../../pages/Auth/Activate';
import Terms from '../../pages/Terms';
import Board from '../../pages/Board';
import AddList from '../../pages/AddList';
import EditList from '../../pages/EditList';
import List from '../../pages/List';
import AddItem from '../../pages/AddItem';
import Item from '../../pages/Item';
import PageNotFound from '../PageNotFound';

import styles from './App.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Header />

      <main>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/activate" exact component={Activate} />
          <Route path="/terms" exact component={Terms} />

          <PrivateRoute path="/" exact component={Board} />
          <PrivateRoute path="/lists/add" exact component={AddList} />
          <PrivateRoute path="/lists/:listId" exact component={List} />
          <PrivateRoute path="/lists/:listId/edit" exact component={EditList} />
          <PrivateRoute path="/lists/:listId/add" exact component={AddItem} />
          <PrivateRoute path="/lists/:listId/:itemId" exact component={Item} />

          <Route component={PageNotFound} />
        </Switch>
      </main>
    </div>
  );
}
