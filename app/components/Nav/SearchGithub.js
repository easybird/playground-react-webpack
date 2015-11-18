import React from 'react';

class SearchGithub extends React.Component{
    handleSubmit() {
        var router = this.context.router;
        var username = this.refs.username.getDOMNode().value;
        this.refs.username.getDOMNode().value = '';
        router.transitionTo('profile', {username: username});
    }
    render() {
        console.log("Render SearchGithub");
        return (
            <div className="col-sm-12">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" ref="username" />
                    </div>
                    <div className="form-group col-sm-12">
                        <button type="submit" className="btn btn-block btn-primary">Search Github </button>
                    </div>
                </form>
            </div>
            )
    }
};

SearchGithub.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default SearchGithub;