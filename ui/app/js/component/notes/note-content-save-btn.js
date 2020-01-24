import React from 'react';
import {connect} from 'react-redux';
import {Button, Input, Spin} from "antd";
import {actionDoNoteUpdate} from "../../actions/note-update";

class NoteContentSaveBtn extends React.Component {

    constructor(props) {
        super(props);
        this.updateNote = this.updateNote.bind(this);
    }

    updateNote(id, newTitle, newContent) {
        this.props.actionDoNoteUpdate(id, newTitle, newContent);
        this.setState({editableTitle: false});
    };

    render() {
        const {id, newTitle, newContent, isUpdateInProgress} = this.props;
        const onButtonSaveHandler = () => this.updateNote(id, newTitle, newContent);
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