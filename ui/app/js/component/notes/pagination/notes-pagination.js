import React from 'react';
import {connect} from "react-redux";
import {actionDoNotesSearch} from "../../../actions/notes-search";
import {Pagination} from "antd";

class NotesPagination extends React.Component {

    constructor(props) {
        super(props);
    }

    handlePageChange = (page) => {
        const {query} = this.props;
        const pageIndex = page - 1;
        this.props.actionDoNotesSearch(query, pageIndex)
    };

    render() {
        if (!this.props.pagination) {
            return '';
        }
        const {numFound, page, rows} = this.props.pagination;
        const pageIndex = page + 1;
        return (
            <Pagination
                defaultCurrent={pageIndex}
                total={numFound}
                pageSize={rows}
                onChange={this.handlePageChange}
                className="pagination"
                style={{
                    paddingTop: 10,
                    textAlign: 'center'
                }}
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoNotesSearch: (content, page) => dispatch(actionDoNotesSearch(content, page)),
    };
};

const mapStateToProps = (state) => ({
    query: state.notesSearch.query,
    pagination: state.notesSearch.pagination
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesPagination);