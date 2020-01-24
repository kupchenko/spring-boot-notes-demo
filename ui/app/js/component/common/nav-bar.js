import React, {PureComponent} from 'react';
import {Button} from "antd";
import {actionShowNoteCreateModal} from "../../actions/note-create";
import {connect} from "react-redux";

class NavBar extends PureComponent {

    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
    }

    showModal() {
        this.props.actionShowNoteCreateModal();
    };

    render() {
        return (
            <div>
                <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark note-header-container-max-width">
                    <div className="navbar-size linediv">
                        <a href="../" className="navbar-brand">Notes</a>
                    </div>
                    <div className="navbar-size linediv">
                        <Button type="primary" onClick={this.showModal}>
                            Create note
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionShowNoteCreateModal: () => dispatch(actionShowNoteCreateModal())
    };
};

export default connect(null, mapDispatchToProps)(NavBar);