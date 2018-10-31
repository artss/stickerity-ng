import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../Header';
import MasterPasswordForm from '../MasterPasswordForm';

import PrivateRoute from '../PrivateRoute';
import Login from '../../pages/Login';
import Board from '../../pages/Board';
import AddList from '../../pages/AddList';
import EditList from '../../pages/EditList';
import List from '../../pages/List';
import AddItem from '../../pages/AddItem';
import Item from '../../pages/Item';

import styles from './App.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Header />

      <Router>
        <main>
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/lists" exact component={Board} />
          <PrivateRoute path="/lists/add" exact component={AddList} />
          <PrivateRoute path="/lists/:listId" exact component={List} />
          <PrivateRoute path="/lists/:listId/edit" exact component={EditList} />
          <PrivateRoute path="/lists/:listId/add" exact component={AddItem} />
          <PrivateRoute path="/lists/:listId/:itemId" exact component={Item} />
        </main>
      </Router>

      <MasterPasswordForm />
    </div>
  );
}
