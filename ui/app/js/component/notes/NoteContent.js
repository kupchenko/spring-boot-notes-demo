import React, {PureComponent} from 'react';

class NoteContent extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-lg-10 jumbotron">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header lead">
                            <h1 id="forms">Forms</h1>
                        </div>
                        <hr className="my-4"/>
                        <div>
                            Some quick example text <b>AND</b> some other text...<br/>
                            Testing content output.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NoteContent;