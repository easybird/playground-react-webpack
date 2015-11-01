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
            loading: false
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
                    users: this.state.users,
                    loading: false
                });
            })
        .catch(() => {
                this.setState({
                    loading:false
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

    calculateScrollPosition(event) {
        var scrollTopMax = event.srcElement.body.scrollHeight - window.innerHeight;
        var bottomPercentage = event.srcElement.body.scrollTop / scrollTopMax * 100;
        return bottomPercentage;
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