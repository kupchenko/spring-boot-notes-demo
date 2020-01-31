import React from 'react';
import NoteContentTitle from "./note-content-title";
import NoteContentSaveBtn from "./note-content-save-btn";

class NoteContentHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {id, title} = this.props;
        return (
            <div className="page-header lead note-header-container">
                <div className="linediv">
                    <NoteContentTitle
                        title={title}
                    />
                </div>
                <div className="linediv">
                    <NoteContentSaveBtn
                        id={id}
                    />
                </div>
            </div>
        );

    }
}

export default NoteContentHeader;