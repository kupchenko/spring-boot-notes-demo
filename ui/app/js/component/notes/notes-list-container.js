import React, {PureComponent} from 'react';
import NotesListPagination from "./notes-pagination";
import NotesListItem from "./notes-list-item";
import {actionDoNotesSearch} from "../../actions/notes-search";
import {connect} from 'react-redux';
import Spinner from "../common/spinner";

class NotesListContainer extends PureComponent {

    constructor(props) {
        super(props);
    }

    searchNotes(e) {
        const text = e.target.value;
        this.props.actionDoNotesSearch(text);
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
        return (
            <div className="col-lg-4 list-item">
                <input className="form-control mr-sm-2 search-input"
                       type="text"
                       placeholder="Search"
                       onChange={this.searchNotes}
                />
                {content}
                {(response) ? <NotesListPagination pagination={response.pagination}/> : ''}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoNotesSearch: (e) => dispatch(actionDoNotesSearch(e)) // put search query here
    };
};

const mapStateToProps = (state) => ({
    notesSearch: state.notesSearch
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesListContainer);