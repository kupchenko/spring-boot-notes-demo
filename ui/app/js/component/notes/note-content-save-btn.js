import React from 'react';
import {connect} from 'react-redux';
import {Button} from "antd";
import {actionDoNoteUpdate} from "../../actions/note-update";

class NoteContentSaveBtn extends React.Component {

    constructor(props) {
        super(props);
        this.updateNote = this.updateNote.bind(this);
    }

    updateNote(id, newTitle, newContent) {
        this.props.actionDoNoteUpdate(id, newTitle, newContent);
    };

    render() {
        const {id, isUpdateInProgress} = this.props;
        const {title, content} = this.props.newNoteValues;
        const onButtonSaveHandler = () => this.updateNote(id, title, content);
        return (
            <Button
                type="primary"
                loading={isUpdateInProgress}
                onClick={onButtonSaveHandler}
            >
                Save
            </Button>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoNoteUpdate: (id, newTitle, newContent) => dispatch(actionDoNoteUpdate(id, newTitle, newContent))
    };
};

const mapStateToProps = (state) => ({
    newNoteValues: state.newNoteValues
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteContentSaveBtn);