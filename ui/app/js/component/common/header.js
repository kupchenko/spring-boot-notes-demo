import React, {PureComponent} from 'react';
import {Layout, Menu} from "antd";
import {actionShowNoteCreateModal} from "../../actions/note-create";
import {connect} from "react-redux";

class NoteHeader extends PureComponent {

    constructor(props) {
        super(props);
    }

    showModal = () => {
        this.props.actionShowNoteCreateModal();
    };

    render() {
        const {Header} = Layout;
        return (
            <Header className="header">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{
                        lineHeight: '64px',
                    }}
                    selectable={false}

                >
                    <Menu.Item onClick={this.showModal}>Create note</Menu.Item>
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