import {message, Modal, Button, Input} from 'antd';
import React from "react";

class NoteCreateDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
        };
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    showModal() {
        this.setState({
            visible: true,
        });
    };

    handleOk() {
        const key = 'updatable';
        this.setState({
            confirmLoading: true
        });
        message.loading({ content: 'Loading...', key });
        setTimeout(() => {
            this.handleSuccessResponse(key);
        }, 2000);
    };

    handleSuccessResponse(key) {
        message.success({content: 'Loaded!', key, duration: 2});
        this.setState({
            visible: false,
            confirmLoading: false,
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    };

    render() {
        const {TextArea} = Input;
        const {visible, confirmLoading} = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create note
                </Button>
                <Modal
                    title="Title"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <TextArea rows={4}/>
                </Modal>
            </div>
        );
    }
}

export default NoteCreateDialog;