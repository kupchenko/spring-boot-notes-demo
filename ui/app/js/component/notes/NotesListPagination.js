import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {actionDoNotesSearch} from "../../actions/notesSearch";

class NotesListPagination extends PureComponent {

    constructor(props) {
        super(props);
    }

    submitRequest(start) {
        let notesSearchQuery = this.props.notesSearchQuery.query;
        this.props.actionDoRequest(notesSearchQuery, start)
    }

    getPaginationContent(response, numFound, rows, start) {
        let pages = (numFound) ? numFound / rows : 0;
        let currentPage = (start) ? start / rows : 0;
        let paginationContent = [];
        if (response) {
            let isDisabled = currentPage <= 0;
            paginationContent.push(this.renderPaginationItem(isDisabled, false, (currentPage - 1) * rows, "<"));
            for (let i = 1; i <= pages + 1; i++) {
                let isCurrentPage = currentPage === i - 1;
                paginationContent.push(this.renderPaginationItem(false, isCurrentPage, (i - 1) * rows, i));
            }

            isDisabled = currentPage >= pages - 1;
            paginationContent.push(this.renderPaginationItem(isDisabled, false, (currentPage + 1) * rows, ">"));
        }
        return paginationContent;
    }

    renderPaginationItem(shouldBeDisabled, isActive, start, symbol) {
        let styles = "page-item";
        if (shouldBeDisabled) {
            styles += " disabled";
        } else if (isActive) {
            styles += " active";
        }
        return (
            <li className={styles} key={symbol}>
                <a className="page-link" onClick={() => this.submitRequest(start)}>{symbol}</a>
            </li>
        );
    }

    render() {
        let response = this.props.notesSearch.response;
        let {numFound, rows, start} = response.pagination;
        return (
            <div className="pagination-body">
                <ul className="pagination pagination-sm">
                    {this.getPaginationContent(response, numFound, rows, start)}
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoRequest: (content, start) => dispatch(actionDoNotesSearch(content, start)),
    };
};

const mapStateToProps = (state) => ({
    notesSearch: state.notesSearch,
    notesSearchQuery: state.notesSearchQuery
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesListPagination);