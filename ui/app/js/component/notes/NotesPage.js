import React, {PureComponent} from 'react';
import NotesList from "./NotesList";
import NoteContent from "./NoteContent";

class NotesPage extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <NotesList/>
                <NoteContent/>
            </div>
        )
    }
}

export default NotesPage;