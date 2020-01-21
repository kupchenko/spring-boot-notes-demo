import {Button, Input, message, Modal} from 'antd';
import React from "react";
import {actionDoNoteCreate, actionShowNoteCreateHide, actionShowNoteCreateModal} from "../../actions/noteCreate";
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {isSuccess, isLoading, hasErrors} = this.props.noteCreate;
        this.showResponsePopup(isLoading, isSuccess, hasErrors);
    }

    showModal() {
        this.setState({
            title: '',
            content: ''
        });
        this.props.actionShowNoteCreateModal();
    };

    handleOk() {
        let {title, content} = this.state;
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
        this.setState({...this.state, content: e.target.value});
    }

    handleTitleChange(e) {
        this.setState({...this.state, title: e.target.value});
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
                           allowClear={true}
                           placeholder="Title"/>
                    <br/>
                    <br/>
                    <TextArea rows={4}
                              onChange={this.handleInputChange}
                              value={this.state.content}
                              allowClear={true}
                              placeholder="Note content"/>
                </Modal>
            </div>
        );
    }

    showResponsePopup(isLoading, isSuccess, hasErrors) {
        const key = 'notecreate';
        if (isLoading) {
            message.loading({content: 'Loading...', key});
        }
        if (isSuccess) {
            message.success({content: 'Loaded!', key, duration: 2});
        }
        if (hasErrors) {
            message.error({content: 'Failure!', key, duration: 2});
        }
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