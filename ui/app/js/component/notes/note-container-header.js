import React from 'react';
import NoteContentTitle from "./note-container-title";
import NoteContentSaveBtn from "./note-container-save-btn";

class NoteContainerHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-header lead note-header-container">
                <div className="linediv">
                    <NoteContentTitle/>
                </div>
                <div className="linediv">
                    <NoteContentSaveBtn/>
                </div>
            </div>
        );

    }
}

export default NoteContainerHeader;