import React, {PureComponent} from 'react';
import NotesListContainerSearch from "./notes-list-container-search";
import NotesPagination from "../pagination/notes-pagination";
import NotesListContainerContent from "./notes-list-container-body";

class NotesListContainer extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NotesListContainerSearch/>
                <NotesListContainerContent/>
                <NotesPagination/>
            </div>
        )
    }
}

export default NotesListContainer;