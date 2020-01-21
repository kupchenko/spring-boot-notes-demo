import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {message} from "antd";

class NoteUpdatePopUp extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.showNoteUpdateResponsePopup(this.props.noteCreate);
    }

    showNoteUpdateResponsePopup(noteUpdate) {
        if (!noteUpdate) return;
        const {isSuccess, isLoading, hasErrors} = noteUpdate;
        const key = 'note/update';
        if (isLoading) {
            message.loading({content: 'Updating...', key});
        }
        if (isSuccess) {
            message.success({content: 'Updated!', key, duration: 2});
        }
        if (hasErrors) {
            message.error({content: 'Failed to update!', key, duration: 2});
        }
    }

    render() {
        return '';
    }
}

const mapStateToProps = (state) => ({
    noteCreate: state.noteCreate
});

export default connect(mapStateToProps)(NoteUpdatePopUp);