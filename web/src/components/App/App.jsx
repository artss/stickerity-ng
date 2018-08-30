import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header';

import Lists from '../../pages/Lists';
import List from '../../pages/List';

import styles from './App.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Header />

      <main>
        <Switch>
          <Route path="/" exact component={Lists} />
          <Route path="/lists/:id" exact component={List} />
        </Switch>
      </main>
    </div>
  );
}
