import React from 'react';
import helpers from'../../utils/helpers';
import User from './User';
import _ from 'lodash';
import utils from '../../utils/utils'

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: false,
            selectedUsers: []
        };
    }

    init() {
        helpers.getBelgiumUsers(this.router.getCurrentParams().totalUsers)
            .then((dataObj) => {
                this.setState({
                    link: utils.getLink(dataObj.link),
                    users: _.shuffle(dataObj.users)
                });
            });
    }

    getNextItems() {
        helpers.getNext(this.state.link)
            .then((dataObj) => {
                this.state.users.push.apply(this.state.users, dataObj.users);

                this.setState({
                    link: utils.getLink(dataObj.link),
                    users: this.state.users,
                    loading: false
                });
            })
            .catch(() => {
                this.setState({
                    loading: false
                })
            });
    }

    componentWillMount() {
        console.log('componentWillMount');
        this.router = this.context.router;
    }

    // will be called right after the component has mount the view
    componentDidMount() {
        console.log('componentDidMount');
        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.init();
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps');
        this.init();
    }

    componentWillUnMount() {
        console.log('componentWillUnMount');
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll(event) {
        let scrollPosition = this.calculateScrollPosition(event);

        if (scrollPosition > 70 && !this.state.loading) {
            this.getNextItems();
            this.setState({
                loading: true
            });
        }
    }

    toggleUser(user) {
        addOrRemoveUserFromSelectedUsers.call(this);
        this.setState({
            selectedUsers: this.state.selectedUsers
        });

        function addOrRemoveUserFromSelectedUsers() {
            var index = this.state.selectedUsers.indexOf(user);
            if (index === -1) {
                this.state.selectedUsers.push(user);
            } else {
                this.state.selectedUsers.splice(index, 1);
            }
        }
    }

    calculateScrollPosition(event) {
        var scrollTopMax = event.srcElement.body.scrollHeight - window.innerHeight;
        var bottomPercentage = event.srcElement.body.scrollTop / scrollTopMax * 100;
        return bottomPercentage;
    }

    mapUsers(users) {
        return users.map((user, index) => {
            return <User user={user} key={index} router={this.router} toggleUser={this.toggleUser.bind(this)}/>
        });
    }

    mapSelectedUsers(selectedUsers) {
        if (!_.isEmpty(selectedUsers)) {
            return <div className="row" style={{backgroundColor: "azure", textAlign: "center"}}>
                    <h2>Selected users for cropping</h2>

                <div className="col-sm-8">
                    {this.mapUsers(selectedUsers)}
                    </div>
                <div className="col-sm-4">
                    <button type="button" className="btn btn-block btn-primary" style={{marginTop: "150px"}}>Crop user pics</button>
                </div>
            </div>
        }
    }

    render() {
        console.log('render');
        var totalUsers = this.router.getCurrentParams().totalUsers;
        var users = this.mapUsers(this.state.users);
        var selectedUsers = this.mapSelectedUsers(this.state.selectedUsers);

        return (
            <div className="row">
                <div className="row">
                    <div className="col-sm-3">
                        <p>Requested users: {totalUsers}</p>
                    </div>
                    <div className="col-sm-3">
                        <p>Received users: {this.state.users.length}</p>
                    </div>
                    <div className="col-sm-3">
                        <p>Selected users: {this.state.selectedUsers.length}</p>
                    </div>
                </div>
                    {selectedUsers}
                <div className="row">
                    {users}
                </div>
            </div>
        )
    }
}
;

Users.contextTypes = {
    router: React.PropTypes.func.isRequired
};
export default Users;