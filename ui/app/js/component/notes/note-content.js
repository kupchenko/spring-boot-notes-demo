import React from 'react';
import {connect} from 'react-redux';
import {Input, Spin} from "antd";
import {actionDoNoteUpdate} from "../../actions/note-update";
import NoteContentHeader from "./note-content-header";
import Spinner from "../common/spinner";
import {actionDoUpdateNoteContent} from "../../actions/note-new-values";

class NoteContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            editableTitle: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.props.actionDoUpdateNoteContent(e.target.value)
    }

    render() {
        const {TextArea} = Input;
        let {note, isLoading, hasErrors} = this.props.noteFetch;

        if (isLoading) {
            return (
                <div className="col-lg-10">
                    <Spinner/>
                </div>
            );
        }

        if (!note || hasErrors) {
            return (<div className="col-lg-10"/>)
        }

        let {id, title, content} = this.props.noteFetch.note;

        return (
            <div className="col-lg-10 jumbotron note-content-top-padding">
                <div className="row">
                    <div className="col-lg-12">
                        <NoteContentHeader id={id} title={title}/>
                        <hr className="my-4"/>
                        <div className="textarea">
                            <TextArea
                                rows={31}
                                defaultValue={content}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoUpdateNoteContent: (content) => dispatch(actionDoUpdateNoteContent(content)),
        actionDoNoteUpdate: (id, newTitle, newContent) => dispatch(actionDoNoteUpdate(id, newTitle, newContent))
    };
};

const mapStateToProps = (state) => ({
    noteFetch: state.noteFetch
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteContent);