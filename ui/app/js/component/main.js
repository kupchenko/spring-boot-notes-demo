import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import NavBar from './common/nav-bar'
import NotesPage from "./notes/NotesPage";
import {actionDoNotesSearch} from "../actions/notes-search";
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