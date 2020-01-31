import React from 'react';
import {connect} from 'react-redux';
import {Input} from "antd";
import NoteContainerHeader from "./note-container-header";
import Spinner from "../common/spinner";
import {actionDoUpdateNoteContent} from "../../actions/note-editing";
import NoteContainerContent from "./note-container-content";

class NoteContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
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

        return (
            <div className="col-lg-10 jumbotron note-content-top-padding">
                <div className="row">
                    <div className="col-lg-12">
                        <NoteContainerHeader/>
                        <hr className="my-4"/>
                        <NoteContainerContent/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    noteFetch: state.noteFetch
});

export default connect(mapStateToProps)(NoteContainer);