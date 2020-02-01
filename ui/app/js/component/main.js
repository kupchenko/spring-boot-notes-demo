import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {actionDoNotesSearch} from "../actions/notes-search";
import {Layout} from "antd";
import NoteHeader from "./common/header";
import NoteCreateModal from "./notes/note-create-modal";
import NotesPage from "./notes/notes-page";
import PopUp from "./common/pop-up";

const Aux = props => props.children;

class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.props.actionDoRequest();
    }

    render() {
        return (
            <Aux>
                <PopUp/>
                <NoteCreateModal/>
                <Layout>
                    <NoteHeader/>
                    <NotesPage/>
                </Layout>
            </Aux>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoRequest: (e) => dispatch(actionDoNotesSearch(e)),
    };
};

export default connect(null, mapDispatchToProps)(Main);