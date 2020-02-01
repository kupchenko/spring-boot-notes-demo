import React from 'react';
import {connect} from 'react-redux';
import {Button, Input} from "antd";
import {actionDoUpdateNoteContent} from "../../actions/note-editing";

class NoteContainerContent extends React.Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.props.actionDoUpdateNoteContent(e.target.value)
    }

    render() {
        const {TextArea} = Input;
        let {content} = this.props.noteFetch.note;
        return (
            <TextArea
                rows={60}
                defaultValue={content}
                onChange={this.handleInputChange}
                style={{
                    overflow: 'hidden',
                    position: 'static'
                }}
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
    noteFetch: state.noteFetch
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainerContent);