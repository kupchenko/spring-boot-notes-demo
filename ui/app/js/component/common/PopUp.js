import React, {PureComponent} from 'react';
import NoteCreatePopUp from "./notification/NoteCreatePopUp";
import NoteUpdatePopUp from "./notification/NoteUpdatePopUp";

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