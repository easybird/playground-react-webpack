import React from 'react';
import helpers from'../../utils/helpers';
import Users from './Users';
import UsersStatus from './UsersStatus';
import SelectedUsers from './SelectedUsers';
import _ from 'lodash';
import utils from '../../utils/utils'

class UsersPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: false,
            selectedUsers: [],
            readyToCrop: false
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
        console.log('componentWillMount UserPanel');
        this.router = this.context.router;
    }

    // will be called right after the component has mount the view
    componentDidMount() {
        console.log('componentDidMount UserPanel');
        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.init();
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps UserPanel');
        this.init();
    }

    componentWillUnMount() {
        console.log('componentWillUnMount UserPanel');
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

    toggleCropper() {
        this.setState({
            readyToCrop: !this.state.readyToCrop
        })
    }

    createCropper(selectedUsers, readyToCrop){
        if (readyToCrop){
            <Cropper users={selectedUsers}/>
        }
    }

    render() {
        console.log('render UserPanel');
        var crop = this.createCropper(this.state.selectedUsers, this.state.readyToCrop);

        return (
            <div className="row">
                <UsersStatus requestedUsers={this.router.getCurrentParams().totalUsers} receivedUsers={this.state.users} selectedUsers={this.state.selectedUsers}/>
                <SelectedUsers selectedUsers={this.state.selectedUsers} toggleUser={this.toggleUser.bind(this)} toggleCropper={this.toggleCropper.bind(this)} router={this.router}/>
                    {crop}
                <Users users={this.state.users} toggleUser={this.toggleUser.bind(this)} router={this.router}/>
            </div>
        )
    }
}
;

UsersPanel.contextTypes = {
    router: React.PropTypes.func.isRequired
};
export default UsersPanel;