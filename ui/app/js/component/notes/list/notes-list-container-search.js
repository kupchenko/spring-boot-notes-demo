import React, {PureComponent} from 'react';
import {actionDoNotesSearch, actionUpdateSearchQuery} from "../../../actions/notes-search";
import {connect} from 'react-redux';
import {Input} from "antd";

class NotesListContainerSearch extends PureComponent {

    constructor(props) {
        super(props);
    }

    searchNotes = (text) => {
        this.props.actionDoNotesSearch(text);
    };

    updateQuery = (e) => {
        this.props.actionUpdateSearchQuery(e.target.value);
    };

    render() {
        const {isLoading} = this.props;
        const {Search} = Input;
        const query = this.props.notesSearch.query;
        return (
            <Search
                className="search-input"
                placeholder="Input search text"
                enterButton
                size="large"
                loading={isLoading}
                value={query}
                onChange={this.updateQuery}
                onSearch={this.searchNotes}
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoNotesSearch: (e) => dispatch(actionDoNotesSearch(e)),
        actionUpdateSearchQuery: (e) => dispatch(actionUpdateSearchQuery(e))
    };
};
const mapStateToProps = (state) => ({
    notesSearch: state.notesSearch
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesListContainerSearch);