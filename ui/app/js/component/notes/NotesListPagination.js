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

    render() {
        let response = this.props.notesSearch.response;
        let {numFound, rows} = response.pagination;
        let pages = (numFound) ? numFound / rows : 0;
        let paginationContent = [];
        if (response) {
            for (let i = 1; i <= pages + 1; i++) {
                paginationContent.push(
                    <li className="page-item active">
                        <a className="page-link" onClick={() => this.submitRequest((i - 1) * rows)}>{i}</a>
                    </li>
                );
            }
        }
        return (
            <div className="pagination-body">
                <ul className="pagination pagination-sm">
                    <li className="page-item disabled">
                        <a className="page-link" href="#">&laquo;</a>
                    </li>
                    {paginationContent}
                    <li className="page-item">
                        <a className="page-link" href="#">&raquo;</a>
                    </li>
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