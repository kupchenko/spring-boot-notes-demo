import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {List} from "antd";
import NotesListItem from "./notes-list-item";

class NotesListContainerContent extends PureComponent {

    constructor(props) {
        super(props);
        this.searchNotes = this.searchNotes.bind(this);
    }

    searchNotes(text) {
        this.props.actionDoNotesSearch(text);
    }

    render() {
        let {notes, isLoading} = this.props;
        return (
            <List
                itemLayout="horizontal"
                loading={isLoading}
                dataSource={notes}
                style={{padding: '5px 0px 0px'}}
                renderItem={item => (
                    <NotesListItem note={item}/>
                )}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    notes: state.notesSearch.notes,
    isLoading: state.notesSearch.isLoading
});

export default connect(mapStateToProps)(NotesListContainerContent);