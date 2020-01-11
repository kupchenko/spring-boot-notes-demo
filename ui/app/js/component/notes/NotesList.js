import React, {PureComponent} from 'react';
import NotesListPagination from "./NotesListPagination";
import NotesListItem from "./NotesListItem";
import {actionDoNotesSearch} from "../../actions/notesSearch";
import {connect} from 'react-redux';

class NotesList extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    submitRequest(text) {
        this.props.actionDoRequest(text)
    }

    render() {
        let response = this.props.notesSearch.response;

        let notesList;
        let pagination;
        if (response) {
            notesList = response.notes.map(row => {
                return <NotesListItem key={row.id} note={row}/>
            });

            pagination = <NotesListPagination count={response.count}/>
        } else {
            notesList = <p>No content!</p>
        }

        return (
            <div className="col-lg-4 list-item">
                <input className="form-control mr-sm-2 search-input" type="text"
                       placeholder="Search" onChange={(e) => this.submitRequest(e.target.value)}/>

                {notesList}
                {pagination}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoRequest: (e) => dispatch(actionDoNotesSearch(e)),
    };
};

const mapStateToProps = (state) => ({
    notesSearch: state.notesSearch
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);