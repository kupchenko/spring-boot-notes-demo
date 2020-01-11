import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

class NoteContent extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        let response = this.props.request.response;
        if (!response || !response.notes) {
            return (
                <div className="col-lg-10 jumbotron">
                    <div className="row">
                        No content here yet!
                    </div>
                </div>
            );
        }

        let first = response.notes[0];
        console.log("Notes " + response.notes.length);
        return (
            <div className="col-lg-10 jumbotron">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header lead">
                            <h1 id="forms">{first.title}</h1>
                        </div>
                        <hr className="my-4"/>
                        <div>
                            {first.content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    request: state.request
});

export default connect(mapStateToProps)(NoteContent);