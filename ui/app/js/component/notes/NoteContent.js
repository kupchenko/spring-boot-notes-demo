import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

class NoteContent extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        let noteToDisplay = this.props.noteFetch.note;
        if (!noteToDisplay) {
            return (
                <div className="col-lg-10 jumbotron">
                    <div className="row">
                        No content here yet!
                    </div>
                </div>
            );
        }

        return (
            <div className="col-lg-10 jumbotron">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header lead">
                            <h1 id="forms">{noteToDisplay.title}</h1>
                        </div>
                        <hr className="my-4"/>
                        <div>
                            {noteToDisplay.content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    noteFetch: state.noteFetch
});

export default connect(mapStateToProps)(NoteContent);