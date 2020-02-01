import React, {PureComponent} from 'react';
import {Layout, Menu} from "antd";
import {actionShowNoteCreateModal} from "../../actions/note-create";
import {connect} from "react-redux";

class NoteHeader extends PureComponent {

    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
    }

    showModal() {
        this.props.actionShowNoteCreateModal();
    };

    render() {
        const {Header} = Layout;
        return (
            <Header className="header" style={{
                overflow: 'auto',
                position: 'fixed',
                width: '100%'
            }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{
                        lineHeight: '64px',
                    }}
                >
                    <Menu.Item key="1" onClick={this.showModal}>Create note</Menu.Item>
                </Menu>
            </Header>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionShowNoteCreateModal: () => dispatch(actionShowNoteCreateModal())
    };
};

export default connect(null, mapDispatchToProps)(NoteHeader);