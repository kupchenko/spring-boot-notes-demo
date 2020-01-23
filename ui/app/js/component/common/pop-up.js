import React, {PureComponent} from 'react';
import NoteCreatePopUp from "./notification/pop-up-note-create";
import NoteUpdatePopUp from "./notification/pop-up-note-update";

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