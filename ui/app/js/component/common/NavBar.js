import React, {PureComponent} from 'react';
import NoteCreateDialog from '../notes/NoteCreateDialog'

class NavBar extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark note-header-container-max-width">
                    <div className="navbar-size linediv">
                        <a href="../" className="navbar-brand">Notes</a>
                    </div>
                    <div className="navbar-size linediv">
                        <NoteCreateDialog/>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar;