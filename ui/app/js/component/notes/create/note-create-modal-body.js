import {Input} from 'antd';
import React from "react";
import {connect} from "react-redux";
import {actionDoUpdateNoteContent, actionDoUpdateNoteTitle} from "../../../actions/note-creating";

class NoteCreateModalBody extends React.Component {

    constructor(props) {
        super(props);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleContentChange(e) {
        this.props.actionDoUpdateNoteContent(e.target.value);
    }

    handleTitleChange(e) {
        this.props.actionDoUpdateNoteTitle(e.target.value);
    }

    render() {
        const {TextArea} = Input;
        const {title, content} = this.props.noteCreating;

        return (
            <div>
                <Input onChange={this.handleTitleChange}
                       value={title}
                       allowClear
                       placeholder="Title"/>
                <TextArea rows={7}
                          value={content}
                          onChange={this.handleContentChange}
                          allowClear
                          placeholder="Note content"/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoUpdateNoteTitle: (newTitle) => dispatch(actionDoUpdateNoteTitle(newTitle)),
        actionDoUpdateNoteContent: (newContent) => dispatch(actionDoUpdateNoteContent(newContent)),
    };
};

const mapStateToProps = (state) => ({
    noteCreating: state.noteCreating
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteCreateModalBody);