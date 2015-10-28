import React from 'react';
import helpers from'../../utils/helpers';
import User from './User';
import _ from 'lodash';
import utils from '../../utils/utils'

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
                this.setState({
                    link: utils.getLink(dataObj.link),
                    users: _.shuffle(dataObj.users)
                });
                this.getNextItems();
            });
    }

    getNextItems() {
        helpers.getNext(this.state.link)
            .then((dataObj) => {
                this.state.users.push.apply(this.state.users, dataObj.users);

                this.setState({
                    link: utils.getLink(dataObj.link),
                    users: this.state.users
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
        let scrollTop = event.srcElement.body.scrollTop,
            itemTranslate = Math.min(0, scrollTop / 3 - 60);

        console.log(itemTranslate);
        if (itemTranslate === 0) {
            scrollTop = event.srcElement.body.scrollTop;
            this.getNextItems();
        }
        this.setState({
            transform: itemTranslate
        });
    }

    render() {
        console.log('render');
        var totalUsers = this.router.getCurrentParams().totalUsers;
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