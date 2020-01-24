import React from 'react';
import NoteContentTitle from "./note-content-title";
import NoteContentSaveBtn from "./note-content-save-btn";

class NoteContentHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {id, title, isUpdateInProgress} = this.props;
        return (
            <div className="page-header lead note-header-container">
                <div className="linediv">
                    <NoteContentTitle
                        title={title}
                        isUpdateInProgress={isUpdateInProgress}
                    />
                </div>
                <div className="linediv">
                    <NoteContentSaveBtn
                        id={id}
                        isUpdateInProgress={isUpdateInProgress}
                    />
                </div>
            </div>
        );

    }
}

export default NoteContentHeader;