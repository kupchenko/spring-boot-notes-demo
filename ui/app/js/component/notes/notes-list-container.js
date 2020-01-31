import React, {PureComponent} from 'react';
import NotesListPagination from "./notes-pagination";
import NotesListItem from "./notes-list-item";
import {actionDoNotesSearch} from "../../actions/notes-search";
import {connect} from 'react-redux';
import Spinner from "../common/spinner";

class NotesListContainer extends PureComponent {

    constructor(props) {
        super(props);
        this.searchNotes = this.searchNotes.bind(this);
    }

    searchNotes(e) {
        this.props.actionDoNotesSearch(e.target.value);
    }

    buildListContent(response) {
        let content;
        if (response.notes.length) {
            content = response.notes.map(row => {
                return (
                    <NotesListItem
                        key={row.id}
                        note={row}
                    />
                )
            });
        } else {
            content = (
                <p>Nothing found!</p>
            )
        }
        return content;
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
                <input className="form-control mr-sm-2 search-input"
                       type="text"
                       placeholder="Search"
                       onChange={this.searchNotes}
                />
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