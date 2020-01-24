import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {actionDoNotesSearch} from "../../actions/notes-search";
import {Pagination} from "antd";

class NotesPagination extends PureComponent {

    constructor(props) {
        super(props);
    }

    handlePageChange(page) {
        let {query} = this.props;
        let pageIndex = page - 1;
        this.props.actionDoNotesSearch(query, pageIndex)
    }

    render() {
        if (!this.props.pagination) {
            return '';
        }
        let {numFound, page, rows} = this.props.pagination;
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

export default connect(null, mapDispatchToProps)(NotesPagination);