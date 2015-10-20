import React from 'react';
import LoginForm from './Login/LoginForm'

class Header extends React.Component {
  render() {
    return (
      <div className="row">

        <div className="col-sm-1">
          <img className="img-rounded" src="http://articleeditor.dev.persgroep.net/images/dpp-logo-48.png"/>
        </div>

        <div className="col-sm-4">
          <h3>DIGITAL NEWSROOM</h3>
        </div>
        <div className="col-sm-7">
          <LoginForm />
        </div>

      </div>

    )
  }
}
;

Header.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Header;