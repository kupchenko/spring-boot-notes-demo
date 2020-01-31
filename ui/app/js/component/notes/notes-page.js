import React, {PureComponent} from 'react';
import NotesListContainer from "./notes-list-container";
import NoteContent from "./note-container";

class NotesPage extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <NotesListContainer/>
                <NoteContent/>
            </div>
        )
    }
}

export default NotesPage;