import React from 'react';

import Header from '../Header';
import Routes from '../../routes';

import styles from './App.css';

export default function App() {
  return (
    <div className={styles.root}>
      <Header />

      <main>
        <Routes />
      </main>
    </div>
  );
}
