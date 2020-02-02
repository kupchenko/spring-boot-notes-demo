import React, {Component} from 'react';
import {actionDoNoteFetchWithSelect} from "../../../actions/note-select";
import {connect} from "react-redux";
import {List} from "antd";

class NotesListItem extends Component {

    constructor(props) {
        super(props);
    }

    openNote(id) {
        this.props.actionDoNoteFetchWithSelect(id)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.note.id === this.props.selectedNote.id
            && this.props.note.id !== nextProps.selectedNote.id) { // If this was selected before (deselect item)
            return true;
        }

        if (this.props.note.id !== this.props.selectedNote.id
            && this.props.note.id === nextProps.selectedNote.id) { // If this wasn't selected before (selecting item)
            return true;
        }

        return false;
    }

    getSelectedStyles(selected) {
        const defaultStyles = {paddingLeft: '5px'};
        return (selected) ? {...defaultStyles, background: '#cdcdcd'} : defaultStyles
    }

    render() {
        const note = this.props.note;
        const selected = note.id === this.props.selectedNote.id;
        return (
            <List.Item onClick={() => this.openNote(note.id)} className="list-item"
                       style={this.getSelectedStyles(selected)}>
                <List.Item.Meta title={note.title} description={note.content}/>
            </List.Item>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoNoteFetchWithSelect: (id) => dispatch(actionDoNoteFetchWithSelect(id)),
    };
};

const mapStateToProps = (state) => ({
    selectedNote: state.selectedNote
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesListItem);