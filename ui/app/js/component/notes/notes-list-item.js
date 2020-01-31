import React, {Component} from 'react';
import {actionDoNoteFetchWithSelect} from "../../actions/note-select";
import {connect} from "react-redux";

class NotesListItem extends Component {

    constructor(props) {
        super(props);
    }

    submitRequest(id) {
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


    renderListItem(note, selected) {
        const listItemContent = (
            <div className="card-body" onClick={() => this.submitRequest(note.id)}>
                <h4 className="card-title">{note.title}</h4>
                <p className="card-text">{note.content}</p>
            </div>
        );

        let content = <div className="card border-secondary mb-3 list-item">{listItemContent}</div>;
        if (selected) {
            content = <div className="card text-white bg-primary mb-3">{listItemContent}</div>
        }
        return content;
    }

    render() {
        const note = this.props.note;
        console.log("RERENDER " + note.id);
        const selected = this.props.note.id === this.props.selectedNote.id;
        return this.renderListItem(note, selected);
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