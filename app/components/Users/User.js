import React from 'react';

class User extends React.Component {
    handleSubmit(){
        var router = this.props.router;
        router.transitionTo('profile', {username: this.props.user.login});
    }

    render() {
        var url = this.props.user.avatar_url;
        var login = this.props.user.login;
        return (
            <div className="col-sm-2">
                <div className="row">
                    <h2> {login} </h2>
                </div>
                <button type="button" className="row img-circle" onClick={this.handleSubmit.bind(this)}>
                {url && <img src={url} className="img-circle img-responsive"/>}
                </button>
            </div>
        )
    }
}
;

User.propTypes = {
    user: React.PropTypes.object.isRequired,
    router: React.PropTypes.func.isRequired
};

export default User;