import {Input, Modal} from 'antd';
import React from "react";
import {actionDoNoteCreate, actionShowNoteCreateHide, actionShowNoteCreateModal} from "../../actions/note-create";
import {connect} from "react-redux";

class NoteCreateModalBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            title: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({content: e.target.value});
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value});
    }

    render() {
        const {TextArea} = Input;

        return (
            <div>
                <Input onChange={this.handleTitleChange}
                       value={this.state.title}
                       allowClear
                       placeholder="Title"/>
                <TextArea rows={4}
                          onChange={this.handleInputChange}
                          value={this.state.content}
                          allowClear
                          placeholder="Note content"/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoNoteCreate: (newTitle, newContent) => dispatch(actionDoNoteCreate(newTitle, newContent)),
        actionShowNoteCreateModal: () => dispatch(actionShowNoteCreateModal()),
        actionShowNoteCreateHide: () => dispatch(actionShowNoteCreateHide())
    };
};

const mapStateToProps = (state) => ({
    noteCreating: state.noteCreating
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteCreateModalBody);