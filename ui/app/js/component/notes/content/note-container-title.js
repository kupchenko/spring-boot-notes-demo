import React from 'react';
import {connect} from 'react-redux';
import {Input} from "antd";
import {
    actionDisableTitleEditing,
    actionDoUpdateNoteTitle,
    actionEnableTitleEditing
} from "../../../actions/note-editing";

class NoteContainerTitle extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    handleTitleChange = (e) => {
        this.props.actionDoUpdateNoteTitle(e.target.value);
    };

    editTitle = () => {
        this.props.actionEnableTitleEditing()
    };

    disableTitleEditing = () => {
        this.props.actionDisableTitleEditing()
    };

    render() {
        const {titleEditable} = this.props;
        const title = (this.props.title) ? this.props.title : this.props.note.title;
        if (!titleEditable) {
            return (
                <h1 onClick={this.editTitle}>
                    {title}
                </h1>
            );
        }
        return (
            <Input
                size="large"
                value={title}
                onChange={this.handleTitleChange}
                onBlur={this.disableTitleEditing}
                autoFocus={true}
                style={{
                    maxWidth: '300px'
                }}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoUpdateNoteTitle: (newTitle) => dispatch(actionDoUpdateNoteTitle(newTitle)),
        actionEnableTitleEditing: () => dispatch(actionEnableTitleEditing()),
        actionDisableTitleEditing: () => dispatch(actionDisableTitleEditing())
    };
};

const mapStateToProps = (state) => ({
    titleEditable: state.noteEditing.titleEditable,
    title: state.noteEditing.title,
    note: state.noteFetch.note
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainerTitle);