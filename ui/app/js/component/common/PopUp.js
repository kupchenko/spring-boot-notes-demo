import React, {PureComponent} from 'react';
import NoteCreatePopUp from "./notofication/NoteCreatePopUp";
import NoteUpdatePopUp from "./notofication/NoteUpdatePopUp";

class PopUp extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NoteCreatePopUp/>
                <NoteUpdatePopUp/>
            </div>
        )
    }
}

export default PopUp;