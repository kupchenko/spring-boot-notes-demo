import React, {PureComponent} from 'react';
import {actionDoNoteFetchWithSelect} from "../../actions/selectNote";
import {connect} from "react-redux";

class NotesListItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            note: {},
        }
    }

    submitRequest(id) {
        this.props.actionDoNoteFetchWithSelect(id)
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
        const selected = note.selected;
        return this.renderListItem(note, selected);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoNoteFetchWithSelect: (id) => dispatch(actionDoNoteFetchWithSelect(id)),
    };
};

export default connect(null, mapDispatchToProps)(NotesListItem);