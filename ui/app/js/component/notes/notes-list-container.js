import React, {PureComponent} from 'react';
import {actionDoNotesSearch} from "../../actions/notes-search";
import {connect} from 'react-redux';
import NotesListContainerSearch from "./notes-list-container-search";
import {List} from "antd";
import NotesListItem from "./notes-list-item";
import NotesPagination from "./notes-pagination";

class NotesListContainer extends PureComponent {

    constructor(props) {
        super(props);
        this.searchNotes = this.searchNotes.bind(this);
    }

    searchNotes(text) {
        this.props.actionDoNotesSearch(text);
    }

    render() {
        let {notes, pagination, isLoading} = this.props.notesSearch;
        return (
            <div>
                <NotesListContainerSearch/>
                <List
                    itemLayout="horizontal"
                    loading={isLoading}
                    dataSource={notes}
                    style={{padding: '5px 0px 0px'}}
                    renderItem={item => (
                        <NotesListItem note={item}/>
                    )}
                />
                <NotesPagination pagination={pagination}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoNotesSearch: (e) => dispatch(actionDoNotesSearch(e))
    };
};

const mapStateToProps = (state) => ({
    notesSearch: state.notesSearch
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesListContainer);