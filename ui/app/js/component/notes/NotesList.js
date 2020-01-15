import React, {PureComponent} from 'react';
import NotesListPagination from "./NotesListPagination";
import NotesListItem from "./NotesListItem";
import {actionDoNotesSearch} from "../../actions/notesSearch";
import {connect} from 'react-redux';
import {actionDoSaveNotesSearchQuery} from "../../actions/notesSearchQuery";
import {Spin} from 'antd';

class NotesList extends PureComponent {

    constructor(props) {
        super(props);
    }

    submitRequest(text) {
        this.props.actionDoNotesSearch(text);
        this.props.actionDoSaveNotesSearchQuery(text);
    }

    render() {
        console.log('Rendering list of notes...');
        let {response, isLoading} = this.props.notesSearch;
        if (isLoading) {
            return (
                <div className="col-lg-4 list-item">
                    <input className="form-control mr-sm-2 search-input" type="text"
                           placeholder="Search" onChange={(e) => this.submitRequest(e.target.value)}/>
                    <div className="spinner">
                        <Spin size="large"/>
                    </div>
                </div>
            );
        }
        let notesList;
        let pagination;
        if (response.notes.length) {
            if (response) {
                notesList = response.notes.map(row => {
                    return <NotesListItem key={row.id} note={row}/>
                });

                pagination = <NotesListPagination count={response.count}/>
            } else {
                notesList = <p>No content!</p>
            }
        } else {
            notesList = (
                <p>Nothing found!</p>
            )
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
        actionDoNotesSearch: (e) => dispatch(actionDoNotesSearch(e)),
        actionDoSaveNotesSearchQuery: (e) => dispatch(actionDoSaveNotesSearchQuery(e))
    };
};

const mapStateToProps = (state) => ({
    notesSearch: state.notesSearch
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);