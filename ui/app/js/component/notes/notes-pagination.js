import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {actionDoNotesSearch} from "../../actions/notes-search";
import {Pagination} from "antd";

class NotesPagination extends PureComponent {

    constructor(props) {
        super(props);
    }

    handlePageChange(page) {
        let notesSearchQuery = this.props.notesSearchQuery.query;
        let pageIndex = page - 1;
        this.props.actionDoNotesSearch(notesSearchQuery, pageIndex)
    }

    render() {
        let {numFound, page, rows} = this.props.notesSearch.response.pagination;
        const onButtonChangePageHandler = (page) => this.handlePageChange(page);
        let pageIndex = page + 1;
        return (
            <Pagination
                defaultCurrent={pageIndex}
                total={numFound}
                pageSize={rows}
                onChange={onButtonChangePageHandler}
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
    notesSearch: state.notesSearch,
    notesSearchQuery: state.notesSearchQuery
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesPagination);