import React, {PureComponent} from 'react';
import NotesListPagination from "./notes-pagination";
import NotesListItem from "./notes-list-item";
import {actionDoNotesSearch} from "../../actions/notes-search";
import {connect} from 'react-redux';
import {actionDoSaveNotesSearchQuery} from "../../actions/notes-save-search-query";
import {Spin} from 'antd';

class NotesListContainer extends PureComponent {

    constructor(props) {
        super(props);
    }

    submitRequest(text) {
        this.props.actionDoNotesSearch(text);
        this.props.actionDoSaveNotesSearchQuery(text);
    }

    buildListContent(response) {
        let content;
        if (response.notes.length) {
            let items = response.notes.map(row => {
                return <NotesListItem key={row.id} note={row}/>
            });
            content = (
                <div>
                    {items}
                    <NotesListPagination />
                </div>
            )
        } else {
            content = (
                <p>Nothing found!</p>
            )
        }
        return content;
    }

    renderSpinner() {
        return (
            <div className="spinner">
                <Spin size="large"/>
            </div>
        );
    }

    render() {
        let {response, isLoading, hasErrors} = this.props.notesSearch;
        let content = 'Error fetching records...';
        if (!hasErrors) {
            content = (isLoading) ? this.renderSpinner() : this.buildListContent(response);
        }
        return (
            <div className="col-lg-4 list-item">
                <input className="form-control mr-sm-2 search-input" type="text"
                       placeholder="Search" onChange={(e) => this.submitRequest(e.target.value)}/>

                {content}
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

export default connect(mapStateToProps, mapDispatchToProps)(NotesListContainer);