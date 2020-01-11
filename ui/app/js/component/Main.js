import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import NavBar from './common/NavBar'
import NotesPage from "./notes/NotesPage";
import {actionDoNotesSearch} from "../actions/notesSearch";

const Aux = props => props.children;

class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.props.actionDoRequest();
    }

    render() {
        return (
            <Aux>
                <NavBar/>
                <NotesPage/>
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