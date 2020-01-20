import {Button, Input, message, Modal} from 'antd';
import React from "react";
import {actionDoNoteCreate} from "../../actions/noteCreate";
import {connect} from "react-redux";

class NoteCreateDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            content: '',
            title: ''
        };
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    showModal() {
        this.setState({
            visible: true,
        });
    };

    handleOk() {
        let {title, content} = this.state;
        console.log('Title ' + title);
        console.log('content ' + content);
        this.props.actionDoNoteCreate(title, content)
    };

    handleCancel() {
        this.setState({
            visible: false
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
        let visible = this.state.visible;
        const key = 'updatable';
        const {isSuccess, isLoading, hasErrors} = this.props.noteCreate;
        if (isLoading) {
            message.loading({content: 'Loading...', key});
        }
        if (isSuccess) {
            visible = false;
            message.success({content: 'Loaded!', key, duration: 2});
        }
        if (hasErrors) {
            message.error({content: 'Failure!', key, duration: 2});
        }

        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create note
                </Button>
                <Modal
                    title="Creating new note"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={isLoading}
                    onCancel={this.handleCancel}
                >
                    <Input onChange={this.handleTitleChange} placeholder="Title"/>
                    <br/>
                    <br/>
                    <TextArea rows={4} onChange={this.handleInputChange} placeholder="Note content"/>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoNoteCreate: (newTitle, newContent) => dispatch(actionDoNoteCreate(newTitle, newContent))
    };
};

const mapStateToProps = (state) => ({
    noteCreate: state.noteCreate
});


export default connect(mapStateToProps, mapDispatchToProps)(NoteCreateDialog);