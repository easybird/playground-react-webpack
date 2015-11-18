import React from 'react';

class GithubUsers extends React.Component{

    constructor(){
        super();
        this.defaultTotalUsers = 50;
    }

    handleSubmit() {
        var router = this.context.router;
        var totalUsers = this.refs.totalUsers.getDOMNode().value;
        this.refs.totalUsers.getDOMNode().value = '';
        router.transitionTo('users', {totalUsers: totalUsers});
    }

    componentDidMount() {
        console.log("ComponentDidMount SelectedUsers");

        this.refs.totalUsers.getDOMNode().value = this.defaultTotalUsers;
    }

    render() {
        console.log("Render GithubUsers");
        return (
            <div className="col-sm-12">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" ref="totalUsers" />
                    </div>
                    <div className="form-group col-sm-12">
                        <button type="submit" className="btn btn-block btn-primary">Find random Github users pics</button>
                    </div>
                </form>
            </div>
            )
    }
};

GithubUsers.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default GithubUsers;