import React from 'react';
import {connect} from 'react-redux';
import {Input} from "antd";
import NoteContainerHeader from "./note-container-header";
import Spinner from "../common/spinner";
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
            <div className="textarea">
                <TextArea
                    rows={31}
                    defaultValue={content}
                    onChange={this.handleInputChange}
                />
            </div>
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