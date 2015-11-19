import React from 'react';

class UsersStatus extends React.Component {
    componentWillReceiveProps() {
        console.log('componentWillReceiveProps UserStatus');
    }

    render() {
        console.log("Render UsersStatus");

        var receivedUsers = this.props.receivedUsers;
        var selectedUsers = this.props.selectedUsers;
        return (
        <div className="row">
            <div className="col-sm-3">
                <p>Received users: {receivedUsers.length}</p>
            </div>
            <div className="col-sm-3">
                <p>Selected users: {selectedUsers.length}</p>
            </div>
        </div>
        )
    }
}
;

UsersStatus.propTypes = {
    receivedUsers: React.PropTypes.array.isRequired,
    selectedUsers: React.PropTypes.array.isRequired
};

export default UsersStatus;