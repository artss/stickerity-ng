import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header';

import Board from '../../pages/Board';
import AddList from '../../pages/AddList';
import EditList from '../../pages/EditList';
import List from '../../pages/List';
import AddItem from '../../pages/AddItem';
import Item from '../../pages/Item';
import MasterPasswordForm from '../../pages/MasterPasswordForm';

import styles from './App.css';

class App extends PureComponent {
  static propTypes = {
    masterPasswordAdded: PropTypes.bool,
  };

  static defaultProps = {
    masterPasswordAdded: false,
  };

  render() {
    const { masterPasswordAdded } = this.props;

    return (
      <div className={styles.app}>
        <Header />

        <main>
          {masterPasswordAdded
            ? (
              <Switch>
                <Route path="/" exact component={Board} />
                <Route path="/lists/add" exact component={AddList} />
                <Route path="/lists/:listId" exact component={List} />
                <Route path="/lists/:listId/edit" exact component={EditList} />
                <Route path="/lists/:listId/add" exact component={AddItem} />
                <Route path="/lists/:listId/:itemId" exact component={Item} />
              </Switch>
            )
            : <MasterPasswordForm />
          }
        </main>
      </div>
    );
  }
}

function mapStateToProps({ user: { masterPasswordAdded } }) {
  return { masterPasswordAdded };
}

export default connect(mapStateToProps)(App);
