import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Main from './pages/Main';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Activate from './pages/Auth/Activate';
import Profile from './pages/Profile';
import Terms from './pages/Terms';
import Board from './pages/Board';
import AddList from './pages/AddList';
import EditList from './pages/EditList';
import List from './pages/List';
import AddItem from './pages/AddItem';
import Item from './pages/Item';
import PageNotFound from './components/PageNotFound';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/activate" exact component={Activate} />
      <Route path="/terms" exact component={Terms} />

      <PrivateRoute path="/lists" exact component={Board} />
      <PrivateRoute path="/lists/add" exact component={AddList} />
      <PrivateRoute path="/lists/:listId" exact component={List} />
      <PrivateRoute path="/lists/:listId/edit" exact component={EditList} />
      <PrivateRoute path="/lists/:listId/add" exact component={AddItem} />
      <PrivateRoute path="/lists/:listId/:itemId" exact component={Item} />
      <PrivateRoute path="/profile" exact component={Profile} />

      <Route component={PageNotFound} />
    </Switch>
  );
}
