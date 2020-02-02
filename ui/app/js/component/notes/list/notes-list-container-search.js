import React, {PureComponent} from 'react';
import {actionDoNotesSearch} from "../../../actions/notes-search";
import {connect} from 'react-redux';
import {Input} from "antd";

class NotesListContainerSearch extends PureComponent {

    constructor(props) {
        super(props);
        this.searchNotes = this.searchNotes.bind(this);
    }

    searchNotes(text) {
        this.props.actionDoNotesSearch(text);
    }

    render() {
        let {isLoading} = this.props;
        const {Search} = Input;
        return (
            <Search
                className="search-input"
                placeholder="Input search text"
                enterButton
                size="large"
                loading={isLoading}
                onSearch={this.searchNotes}
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoNotesSearch: (e) => dispatch(actionDoNotesSearch(e))
    };
};


export default connect(null, mapDispatchToProps)(NotesListContainerSearch);