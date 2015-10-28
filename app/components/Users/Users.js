import React from 'react';
import helpers from'../../utils/helpers';
import User from './User';
import _ from 'lodash';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    init() {
        helpers.getBelgiumUsers(this.router.getCurrentParams().totalUsers)
            .then((dataObj) => {
                console.log(dataObj);
                this.setState({
                    users: _.shuffle(dataObj.users)
                });
            });
    }

    componentWillMount() {
        console.log('componentWillMount');
        this.router = this.context.router;
    }

    // will be called right after the component has mount the view
    componentDidMount() {
        console.log('componentDidMount');
        this.init();
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps');
        this.init();
    }

    render() {
        console.log('render');
        var totalUsers = this.router.getCurrentParams().totalUsers;
        console.log(this.state.users.length);
        var users = this.state.users.map((user, index) => {
            return <User user={user} key={index} router={this.router}/>
        });

        return (
            <div className="row">
                <p>Requested users: {totalUsers}</p>
                <p>Received users: {this.state.users.length}</p>
        {users}
            </div>
        )
    }
}
;

Users.contextTypes = {
    router: React.PropTypes.func.isRequired
};
export default Users;