import {Button, Modal} from 'antd';
import React from "react";
import {actionHideNoteCreateModal} from "../../../actions/note-create";
import {connect} from "react-redux";
import NoteCreateModalBody from "./note-create-modal-body";
import NoteCreateModalSubmit from "./note-create-modal-submit";

class NoteCreateModal extends React.Component {

    constructor(props) {
        super(props);
    }

    hideModal = () => {
        this.props.actionHideNoteCreateModal();
    };

    render() {
        const {isLoading, modalVisible} = this.props.noteCreate;

        return (
            <Modal
                title="Creating a new note"
                visible={modalVisible}
                confirmLoading={isLoading}
                onCancel={this.hideModal}
                footer={[
                    <Button key="back" onClick={this.hideModal}>
                        Cancel
                    </Button>,
                    <NoteCreateModalSubmit key="submit" isLoading={isLoading}/>
                ]}
            >
                <NoteCreateModalBody/>
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionHideNoteCreateModal: () => dispatch(actionHideNoteCreateModal())
    };
};

const mapStateToProps = (state) => ({
    noteCreate: state.noteCreate
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteCreateModal);