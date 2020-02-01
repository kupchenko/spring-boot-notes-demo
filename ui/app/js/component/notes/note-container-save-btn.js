import React from 'react';
import {connect} from 'react-redux';
import {Button} from "antd";
import {actionDoNoteUpdate} from "../../actions/note-update";
import {isEqual} from 'lodash';

class NoteContainerSaveBtn extends React.Component {

    constructor(props) {
        super(props);
        this.updateNote = this.updateNote.bind(this);
    }

    updateNote() {
        const {id} = this.props.noteFetch.note;
        const {title, content} = this.calculateNewNoteValues(this.props.noteFetch.note, this.props.noteEditing);
        this.props.actionDoNoteUpdate(id, title, content);
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return isEqual(nextProps.noteEditing, this.props.noteEditing);
    }

    calculateNewNoteValues(fetchedNote, editedValues) {
        return {
            title: (editedValues.title) ? editedValues.title : fetchedNote.title,
            content: (editedValues.content) ? editedValues.content : fetchedNote.content
        }
    };

    render() {
        console.log("Btn rerender");
        const {isUpdateInProgress} = this.props.noteUpdate;
        return (
            <Button
                type="primary"
                loading={isUpdateInProgress}
                onClick={this.updateNote}
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
    noteEditing: state.noteEditing,
    noteFetch: state.noteFetch,
    noteUpdate: state.noteUpdate
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainerSaveBtn);