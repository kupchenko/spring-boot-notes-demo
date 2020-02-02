import React from 'react';
import NoteContentTitle from "./note-container-title";
import NoteContentSaveBtn from "./note-container-save-btn";

class NoteContainerHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="note-header-container">
                <NoteContentTitle/>
                <NoteContentSaveBtn/>
            </div>
        );

    }
}

export default NoteContainerHeader;