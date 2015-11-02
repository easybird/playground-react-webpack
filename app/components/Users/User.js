import React from 'react';

class User extends React.Component {
    handleSubmit(){
        var router = this.props.router;
        router.transitionTo('profile', {username: this.props.user.login});
    }
    toggleUser(){
        this.props.toggleUser(this.props.user);
    }
    render() {
        var url = this.props.user.avatar_url;
        var login = this.props.user.login;
        return (
            <div className="col-sm-2">
                <div className="row">
                    <h4 className="text-center"><a onClick={this.handleSubmit.bind(this)}> {login} </a></h4>
                </div>
                <button type="button" className="row img-circle" style={{marginBottom: 30}} onClick={this.toggleUser.bind(this)}>
                {url && <img src={url} className="img-circle img-responsive"/>}
                </button>
            </div>
        )
    }
}
;

User.propTypes = {
    user: React.PropTypes.object.isRequired,
    toggleUser: React.PropTypes.func.isRequired
};

export default User;