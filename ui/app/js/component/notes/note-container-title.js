import React from 'react';
import {connect} from 'react-redux';
import {Input} from "antd";
import {actionDoUpdateNoteTitle, actionEnableTitleEditing} from "../../actions/note-editing";

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
        console.log("Title rerender");
        let {title} = this.props.noteFetch.note;
        let {titleEditable} = this.props.noteEditing;
        let titleContent = (
            <h1 onClick={this.editTitle}>{title}</h1>
        );
        if (titleEditable) {
            titleContent = (
                <Input
                    size="large"
                    defaultValue={title}
                    onChange={this.handleTitleChange}
                />
            );
        }
        return titleContent;

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoUpdateNoteTitle: (newTitle) => dispatch(actionDoUpdateNoteTitle(newTitle)),
        actionEnableTitleEditing: () => dispatch(actionEnableTitleEditing())
    };
};

const mapStateToProps = (state) => ({
    noteEditing: state.noteEditing,
    noteFetch: state.noteFetch
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainerTitle);