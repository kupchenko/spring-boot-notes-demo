import React from 'react';
import {connect} from 'react-redux';
import {Button, Input, Spin} from "antd";
import {actionDoNoteUpdate} from "../../actions/note-update";

class NoteContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            editableTitle: false
        };
        this.updateNote = this.updateNote.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({content: e.target.value});
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value});
        // this.props.changeNoteFetch(e.target.value);
    }

    updateNote(id) {
        let newContent = (this.state.content) ? this.state.content : this.props.noteFetch.note.content;
        let newTitle = (this.state.title) ? this.state.title : this.props.noteFetch.note.title;
        this.props.actionDoNoteUpdate(id, newTitle, newContent);
        this.setState({editableTitle: false});
    };

    editTitle() {
        this.setState({editableTitle: true});
    };

    renderSpinner() {
        return (
            <div className="col-lg-10">
                <div className="spinner">
                    <Spin size="large"/>
                </div>
            </div>
        );
    }

    getButtonSave(id) {
        const {isUpdateInProgress} = this.props.noteFetch;
        const onButtonSaveHandler = () => this.updateNote(id);
        return (
            <Button
                type="primary"
                loading={isUpdateInProgress}
                onClick={onButtonSaveHandler}
            >
                Save
            </Button>
        );
    }

    render() {
        const {TextArea} = Input;
        let {note, isLoading, hasErrors} = this.props.noteFetch;

        if (isLoading) {
            return this.renderSpinner();
        }

        if (!note || hasErrors) {
            return (<div className="col-lg-10"/>)
        }

        let title = (<h1 onClick={() => this.editTitle()}>{note.title}</h1>);
        if (this.state.editableTitle) {
            title = (<Input size="large" defaultValue={note.title} onChange={this.handleTitleChange}/>);
        }


        return (
            <div className="col-lg-10 jumbotron note-content-top-padding">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header lead note-header-container">
                            <div className="linediv">
                                {title}
                            </div>
                            <div className="linediv">
                                {this.getButtonSave(note.id)}
                            </div>
                        </div>
                        <hr className="my-4"/>
                        <div className="textarea">
                            <TextArea rows={31} defaultValue={note.content} onChange={this.handleInputChange}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoNoteUpdate: (id, newTitle, newContent) => dispatch(actionDoNoteUpdate(id, newTitle, newContent))
    };
};

const mapStateToProps = (state) => ({
    noteFetch: state.noteFetch
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteContent);