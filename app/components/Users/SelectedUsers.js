import React from 'react';
import User from './User';

class SelectedUsers extends React.Component {

    mapUsers(users) {
        return users.map((user, index) => {
            return <User user={user} key={index} toggleUser={this.props.toggleUser.bind(this)} router={this.props.router}/>
        });
    }


    componentDidMount() {
        console.log("ComponentDidMount SelectedUsers");
    }

    componentWillMount() {
        console.log("ComponentWillMount SelectedUsers");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount SelectedUsers");
    }

    componentWillReceiveProps() {
        console.log("ComponentWillReceiveProps SelectedUsers");
    }

    render() {
        var selectedUsers = this.props.selectedUsers;

        if (!_.isEmpty(selectedUsers)) {
            return <div className="row" style={{backgroundColor: "azure", textAlign: "center"}}>
                <h2>Selected users for cropping</h2>

                <div className="col-sm-8">
                    {this.mapUsers(selectedUsers)}
                </div>
                <div className="col-sm-4">
                    <button type="button" className="btn btn-block btn-primary" style={{marginTop: "150px"}}
                        onClick={this.props.toggleCropper.bind(this)}>Enable cropper</button>
                </div>
            </div>
        } else {
            return <div className="row"/>
        }
    }
}
;

SelectedUsers.propTypes = {
    router: React.PropTypes.func.isRequired,
    selectedUsers: React.PropTypes.array.isRequired,
    toggleUser: React.PropTypes.func.isRequired,
    toggleCropper: React.PropTypes.func.isRequired
};

export default SelectedUsers;