import React, {PureComponent} from 'react';

class NotesListItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            note: {},
        }
    }

    render() {
        const note = this.state.note;
        if (note.selected) {

        }
        return (
            <div className="card border-secondary mb-3 list-item">
                <div className="card-body">
                    <h4 className="card-title">{note.title}</h4>
                    <p className="card-text">{note.body}</p>
                </div>
            </div>
        )
    }
}

export default NotesListItem;