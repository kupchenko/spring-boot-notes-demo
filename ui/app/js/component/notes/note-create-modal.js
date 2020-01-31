import {Input, Modal} from 'antd';
import React from "react";
import {actionDoNoteCreate, actionShowNoteCreateHide, actionShowNoteCreateModal} from "../../actions/note-create";
import {connect} from "react-redux";

class NoteCreateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            title: ''
        };
        this.handleOk = this.handleOk.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleOk() {
        const {title, content} = this.state;
        this.props.actionDoNoteCreate(title, content)
    };

    hideModal() {
        this.setState({
            content: '',
            title: ''
        });
        this.props.actionShowNoteCreateHide();
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
            <Modal
                title="Creating new note"
                visible={modalVisible}
                onOk={this.handleOk}
                confirmLoading={isLoading}
                onCancel={this.hideModal}
                destroyOnClose
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
    noteCreate: state.noteCreate,
    showModal: state.showModal || false
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteCreateModal);