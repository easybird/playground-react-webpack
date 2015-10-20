import React from 'react';

class LoginForm extends React.Component {
  //var loginPath = 'http://articleeditor.test.persgroep.net/dinero/rest/_login';

  handleSubmit() {
    var router = this.context.router;
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    this.refs.username.getDOMNode().value = '';
    this.refs.password.getDOMNode().value = '';
    router.transitionTo('profile', {username: username});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="col-sm-8">

          <div className="row">
            <div className="col-sm-4">
              <h4>Username</h4>
            </div>
            <div className="col-sm-8">
              <input type="text" className="form-control" ref="username"/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <h4>Password</h4>
            </div>
            <div className="col-sm-8">
              <input type="password" className="form-control" ref="password"/>
            </div>
          </div>
        </div>

        <div className="form-group col-sm-4">
          <button type="submit" className="btn btn-block btn-primary">Login</button>
        </div>
      </form>
    )
  }
}
;

LoginForm.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default LoginForm;