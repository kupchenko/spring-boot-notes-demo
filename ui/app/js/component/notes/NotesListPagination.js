import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {actionDoNotesSearch} from "../../actions/notesSearch";

class NotesListPagination extends PureComponent {

    constructor(props) {
        super(props);
    }

    loadPage(page) {
        let notesSearchQuery = this.props.notesSearchQuery.query;
        this.props.actionDoNotesSearch(notesSearchQuery, page)
    }

    getPaginationContent(response, numFound, rows, page) {
        let pages = (numFound) ? numFound / rows : 0;
        let paginationContent = [];
        if (response) {
            let isDisabled = page <= 0;
            paginationContent.push(this.renderPaginationItem(isDisabled, false, page - 1, "<"));
            for (let i = 1; i < pages + 1; i++) {
                let isCurrentPage = page === i - 1;
                paginationContent.push(this.renderPaginationItem(false, isCurrentPage, i - 1, i));
            }
            isDisabled = page >= pages - 1;
            paginationContent.push(this.renderPaginationItem(isDisabled, false, page + 1, ">"));
        }
        return paginationContent;
    }

    renderPaginationItem(shouldBeDisabled, isActive, page, symbol) {
        let styles = "page-item";
        if (shouldBeDisabled) {
            styles += " disabled";
        } else if (isActive) {
            styles += " active";
        }
        return (
            <li className={styles} key={symbol}>
                <a className="page-link" onClick={() => this.loadPage(page)}>{symbol}</a>
            </li>
        );
    }

    render() {
        let response = this.props.notesSearch.response;
        let {numFound, page, rows} = response.pagination;
        return (
            <div className="pagination-body">
                <ul className="pagination pagination-sm">
                    {this.getPaginationContent(response, numFound, rows, page)}
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoNotesSearch: (content, page) => dispatch(actionDoNotesSearch(content, page)),
    };
};

const mapStateToProps = (state) => ({
    notesSearch: state.notesSearch,
    notesSearchQuery: state.notesSearchQuery
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesListPagination);