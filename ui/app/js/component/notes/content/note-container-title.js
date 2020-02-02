import React from 'react';
import {connect} from 'react-redux';
import {Input} from "antd";
import {actionDoUpdateNoteTitle, actionEnableTitleEditing} from "../../../actions/note-editing";

class NoteContainerTitle extends React.PureComponent {

    constructor(props) {
        super(props);
        this.editTitle = this.editTitle.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleTitleChange(e) {
        this.props.actionDoUpdateNoteTitle(e.target.value);
    }

    editTitle() {
        this.props.actionEnableTitleEditing()
    };

    render() {
        let {title} = this.props.note;
        let {titleEditable} = this.props;
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
                defaultValue={title}
                onChange={this.handleTitleChange}
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
        actionEnableTitleEditing: () => dispatch(actionEnableTitleEditing())
    };
};

const mapStateToProps = (state) => ({
    titleEditable: state.noteEditing.titleEditable,
    note: state.noteFetch.note
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainerTitle);