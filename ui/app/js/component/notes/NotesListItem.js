import React, {PureComponent} from 'react';
import {actionDoNoteFetch} from "../../actions/noteFetch";
import {connect} from "react-redux";

class NotesListItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            note: {},
        }
    }

    submitRequest(text) {
        this.props.actionDoNoteFetch(text)
    }

    render() {
        const note = this.props.note;
        const selected = note.selected;

        const listItemContent =
            (<div className="card-body" onClick={() => this.submitRequest(note.id)}>
                <h4 className="card-title">{note.title}</h4>
                <p className="card-text">{note.content}</p>
            </div>);

        let content = <div className="card border-secondary mb-3 list-item">{listItemContent}</div>;
        if (selected) {
            content = <div className="card text-white bg-primary mb-3">{listItemContent}</div>
        }
        return (content)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoNoteFetch: (e) => dispatch(actionDoNoteFetch(e)),
    };
};

export default connect(null, mapDispatchToProps)(NotesListItem);