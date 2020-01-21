import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {message} from "antd";

class NoteCreatePopUp extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.showNoteCreateResponsePopup(this.props.noteUpdate);
    }

    showNoteCreateResponsePopup(noteCreate) {
        if (!noteCreate) return;
        const {isSuccess, isLoading, hasErrors} = noteCreate;
        const key = 'note/create';
        if (isLoading) {
            message.loading({content: 'Creating...', key});
        }
        if (isSuccess) {
            message.success({content: 'Created!', key, duration: 2});
        }
        if (hasErrors) {
            message.error({content: 'Failed to create!', key, duration: 2});
        }
    }

    render() {
        return '';
    }
}

const mapStateToProps = (state) => ({
    noteUpdate: state.noteUpdate
});

export default connect(mapStateToProps)(NoteCreatePopUp);