import {Input, Modal} from 'antd';
import React from "react";
import {actionDoNoteCreate, actionShowNoteCreateHide, actionShowNoteCreateModal} from "../../actions/note-create";
import {connect} from "react-redux";
import NoteCreateModalBody from "./note-create-modal-body";

class NoteCreateModal extends React.Component {

    constructor(props) {
        super(props);
        this.handleOk = this.handleOk.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    handleOk() {
        const {title, content} = this.state;
        this.props.actionDoNoteCreate(title, content)
    };

    hideModal() {
        this.props.actionShowNoteCreateHide();
    };

    render() {
        const {isLoading, modalVisible} = this.props.noteCreate;

        return (
            <Modal
                title="Creating new note"
                visible={modalVisible}
                onOk={this.handleOk}
                confirmLoading={isLoading}
                onCancel={this.hideModal}
            >
                <NoteCreateModalBody/>
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoNoteCreate: (newTitle, newContent) => dispatch(actionDoNoteCreate(newTitle, newContent)),
        actionShowNoteCreateModal: () => dispatch(actionShowNoteCreateModal()),
        actionShowNoteCreateHide: () => dispatch(actionShowNoteCreateHide())
    };
};

const mapStateToProps = (state) => ({
    noteCreate: state.noteCreate
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteCreateModal);