import React from 'react';
import User from './User';

class Users extends React.Component {

    mapUsers(users) {
        return users.map((user, index) => {
            return <User user={user} key={index} toggleUser={this.props.toggleUser.bind(this)} router={this.props.router}/>
        });
    }

    render() {
        return (
            <div className="row">
                    {this.mapUsers(this.props.users)}
            </div>)

    }
}

Users.contextTypes = {
    router: React.PropTypes.func.isRequired,
    users: React.PropTypes.array.isRequired,
    toggleUser: React.PropTypes.func.isRequired
};
export default Users;