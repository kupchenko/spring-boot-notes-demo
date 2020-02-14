import React from 'react';
import {connect} from 'react-redux';
import {Input} from "antd";
import {actionDoUpdateNoteContent} from "../../../actions/note-editing";

class NoteContainerContent extends React.Component {

    constructor(props) {
        super(props);
    }

    handleInputChange = (e) => {
        this.props.actionDoUpdateNoteContent(e.target.value)
    };

    render() {
        const {TextArea} = Input;
        let {content} = this.props;
        return (
            <TextArea
                defaultValue={content}
                onChange={this.handleInputChange}
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoUpdateNoteContent: (content) => dispatch(actionDoUpdateNoteContent(content))
    };
};

const mapStateToProps = (state) => ({
    content: state.noteFetch.note.content
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainerContent);