import React, {PureComponent} from 'react';

class NotesListItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            note: {},
        }
    }

    render() {
        const note = this.props.note;
        const selected = this.props.selected;

        const listItemContent =
            <div className="card-body">
                <h4 className="card-title">{note.title}</h4>
                <p className="card-text">{note.content}</p>
            </div>;

        let content = <div className="card border-secondary mb-3 list-item">{listItemContent}</div>;
        if (selected) {
            content = <div className="card text-white bg-primary mb-3">{listItemContent}</div>
        }
        return (content)
    }
}

export default NotesListItem;