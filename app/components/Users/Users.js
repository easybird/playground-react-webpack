import React from 'react';


class Users extends React.Component {

    mapUsers(users) {
        return users.map((user, index) => {
            return <User user={user} key={index} toggleUser={this.props.toggleUser.bind(this)}/>
        });
    }

    render() {
        return (
            <div className="row">
                    {this.mapUsers(this.props.users);}
            </div>)

    }
}

Users.contextTypes = {
    users: React.PropTypes.array.isRequired,
    toggleUser: React.PropTypes.func.isRequired
};
export default Users;