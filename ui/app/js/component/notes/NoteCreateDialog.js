import {Button, Input, Modal} from 'antd';
import React from "react";
import {actionDoNoteCreate, actionShowNoteCreateHide, actionShowNoteCreateModal} from "../../actions/note-create";
import {connect} from "react-redux";

class NoteCreateDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            title: ''
        };
        this.handleOk = this.handleOk.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    showModal() {
        this.setState({
            title: '',
            content: ''
        });
        this.props.actionShowNoteCreateModal();
    };

    handleOk() {
        const {title, content} = this.state;
        this.props.actionDoNoteCreate(title, content)
    };

    hideModal() {
        this.props.actionShowNoteCreateHide();
        this.setState({
            title: '',
            content: ''
        });
    };

    handleInputChange(e) {
        this.setState({content: e.target.value});
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value});
    }

    render() {
        const {TextArea} = Input;
        const {isLoading, modalVisible} = this.props.noteCreate;

        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create note
                </Button>
                <Modal
                    title="Creating new note"
                    visible={modalVisible}
                    onOk={this.handleOk}
                    confirmLoading={isLoading}
                    onCancel={this.hideModal}
                >
                    <Input onChange={this.handleTitleChange}
                           value={this.state.title}
                           allowClear
                           placeholder="Title"/>
                    <br/>
                    <br/>
                    <TextArea rows={4}
                              onChange={this.handleInputChange}
                              value={this.state.content}
                              allowClear
                              placeholder="Note content"/>
                </Modal>
            </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(NoteCreateDialog);