import React from 'react';
import {connect} from 'react-redux';
import {Button, Input, Spin} from "antd";
import {actionDoNoteUpdate} from "../../actions/noteUpdate";

class NoteContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        };
        this.updateNote = this.updateNote.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({...this.state, content: e.target.value});
    }

    updateNote(id) {
        let newContent = (this.state.content) ? this.state.content : this.props.noteFetch.note.content;
        this.props.actionDoNoteUpdate(id, this.props.noteFetch.note.title, newContent);
    };

    render() {
        const {TextArea} = Input;
        let {note, isLoading, isUpdateInProgress} = this.props.noteFetch;

        if (isLoading) {
            return (
                <div className="col-lg-10">
                    <div className="spinner">
                        <Spin size="large"/>
                    </div>
                </div>
            );
        }

        if (!note) {
            return (<div className="col-lg-10"></div>)
        }

        return (
            <div className="col-lg-10 jumbotron">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header lead note-header-container">
                            <div className="linediv">
                                <h1>{note.title}</h1>
                            </div>
                            <div className="linediv">
                                <Button type="primary" loading={isUpdateInProgress}
                                        onClick={() => this.updateNote(note.id)}>
                                    Save
                                </Button>
                            </div>
                        </div>
                        <hr className="my-4"/>
                        <div className="textarea">
                            <TextArea rows={33} defaultValue={note.content} onChange={this.handleInputChange}/>
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