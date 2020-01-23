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
        this.props.actionDoNotesSearch(notesSearchQuery, page)
    }

    render() {
        let response = this.props.notesSearch.response;
        let {numFound, page, rows} = response.pagination;
        const onButtonChangePageHandler = (page) => this.handlePageChange(page);
        return (
            <Pagination
                defaultCurrent={page}
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