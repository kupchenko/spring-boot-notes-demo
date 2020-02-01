import React from 'react';
import {connect} from 'react-redux';
import NoteContainerHeader from "./note-container-header";
import Spinner from "../common/spinner";
import NoteContainerContent from "./note-container-content";

class NoteContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {note, isLoading, hasErrors} = this.props.noteFetch;

        if (isLoading) {
            return (<Spinner/>);
        }

        if (!note || hasErrors) {
            return '';
        }

        return (
            <div>
                <NoteContainerHeader/>
                <hr/>
                <NoteContainerContent/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    noteFetch: state.noteFetch
});

export default connect(mapStateToProps)(NoteContainer);