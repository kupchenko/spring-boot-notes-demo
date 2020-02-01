import {Button} from 'antd';
import React from "react";
import {actionDoNoteCreate} from "../../actions/note-create";
import {connect} from "react-redux";

class NoteCreateModalSubmit extends React.Component {

    constructor(props) {
        super(props);
        this.handleOk = this.handleOk.bind(this);
    }

    handleOk() {
        const {title, content} = this.props.noteCreating;
        this.props.actionDoNoteCreate(title, content)
    };

    render() {
        const {isLoading} = this.props;
        return (
            <Button key="submit" type="primary" loading={isLoading} onClick={this.handleOk}>
                Create
            </Button>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoNoteCreate: (newTitle, newContent) => dispatch(actionDoNoteCreate(newTitle, newContent))
    };
};

const mapStateToProps = (state) => ({
    noteCreating: state.noteCreating
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteCreateModalSubmit);