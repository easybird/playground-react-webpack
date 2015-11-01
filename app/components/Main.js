import React from 'react';
import { RouteHandler } from 'react-router';
import SearchGithub from './Nav/SearchGithub';
import GithubUsers from './Nav/GithubUsers';

class Main extends React.Component {
  render() {
    return (
      <div className="main-container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="col-sm-5 col-sm-offset-1" style={{marginTop: 15}}>
            <SearchGithub />
          </div>
            <div className="col-sm-6" style={{marginTop: 15}}>
            <GithubUsers />
            </div>
        </nav>
        <div className="container">
          <RouteHandler {...this.props}/>
        </div>
      </div>
    )
  }
}
;

export default Main;