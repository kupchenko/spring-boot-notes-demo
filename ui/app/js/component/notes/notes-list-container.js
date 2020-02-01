import React, {PureComponent} from 'react';
import NotesListPagination from "./notes-pagination";
import NotesListItem from "./notes-list-item";
import {actionDoNotesSearch} from "../../actions/notes-search";
import {connect} from 'react-redux';
import Spinner from "../common/spinner";
import NotesListContainerSearch from "./notes-list-container-search";

class NotesListContainer extends PureComponent {

    constructor(props) {
        super(props);
        this.searchNotes = this.searchNotes.bind(this);
    }

    searchNotes(text) {
        this.props.actionDoNotesSearch(text);
    }

    buildListContent(response) {
        if (!response.notes.length) {
            return (<p>Nothing found!</p>);
        }
        return response.notes.map(row => (<NotesListItem key={row.id} note={row}/>));
    }

    render() {
        let {response, isLoading, hasErrors} = this.props.notesSearch;
        let content = 'Error fetching records...';
        if (!hasErrors) {
            content = (isLoading) ? <Spinner/> : this.buildListContent(response);
        }
        const pagination = (response) ? <NotesListPagination pagination={response.pagination}/> : '';
        return (
            <div className="col-lg-4 list-item">
                <NotesListContainerSearch/>
                {content}
                {pagination}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoNotesSearch: (e) => dispatch(actionDoNotesSearch(e))
    };
};

const mapStateToProps = (state) => ({
    notesSearch: state.notesSearch
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesListContainer);