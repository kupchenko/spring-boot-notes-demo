import React from 'react';
import {connect} from 'react-redux';
import {Input} from "antd";
import {actionDoUpdateNoteTitle} from "../../actions/note-editing";
import {isEqual} from "lodash";

class NoteContainerTitle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editableTitle: false
        };
        this.editTitle = this.editTitle.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleTitleChange(e) {
        this.props.actionDoUpdateNoteTitle(e.target.value);
    }

    editTitle() {
        this.setState({
            editableTitle: true
        });
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return isEqual(nextProps.noteEditing, this.props.noteEditing);
    }

    render() {
        console.log("Title rerender");
        let {title} = this.props.noteFetch.note;
        let {editableTitle} = this.state;
        let titleContent = (
            <h1 onClick={this.editTitle}>{title}</h1>
        );
        if (editableTitle) {
            titleContent = (
                <Input
                    size="large"
                    defaultValue={title}
                    onChange={this.handleTitleChange}
                />
            );
        }
        return titleContent;

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoUpdateNoteTitle: (newTitle) => dispatch(actionDoUpdateNoteTitle(newTitle))
    };
};

const mapStateToProps = (state) => ({
    noteEditing: state.noteEditing,
    noteFetch: state.noteFetch
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainerTitle);