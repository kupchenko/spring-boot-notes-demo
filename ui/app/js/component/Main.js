import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import NavBar from './common/NavBar'
import NotesPage from "./notes/NotesPage";

const Aux = props => props.children;

class Main extends PureComponent {

    render() {
        return (
            <Aux>
                <NavBar/>
                <NotesPage/>
            </Aux>
        )
    }
}

export default connect()(Main);