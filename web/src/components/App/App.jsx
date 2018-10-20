import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header';

import Board from '../../pages/Board';
import AddList from '../../pages/AddList';
import List from '../../pages/List';
import Item from '../../pages/Item';

import styles from './App.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Header />

      <main>
        <Switch>
          <Route path="/" exact component={Board} />
          <Route path="/lists/add" exact component={AddList} />
          <Route path="/lists/:listId" exact component={List} />
          <Route path="/lists/:listId/:itemId" exact component={Item} />
        </Switch>
      </main>
    </div>
  );
}
