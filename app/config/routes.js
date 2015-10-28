import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import Profile from '../components/Profile';
import Users from '../components/Users/Users';

import { Router, DefaultRoute, Route } from 'react-router';

export default (
    <Route name="app" path="/" handler={Main}>
        <Route name="profile" path="profile/:username" handler={Profile} />
        <Route name="users" path="users/:totalUsers" handler={Users} />
        <DefaultRoute handler={Home} />
    </Route>
    );
