import React, {PureComponent} from 'react';
import NotesListContainer from "./NotesListContainer";
import NoteContent from "./NoteContent";

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