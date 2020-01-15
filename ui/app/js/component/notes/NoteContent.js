import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Spin} from "antd";

class NoteContent extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        let {note, isLoading} = this.props.noteFetch;

        if (isLoading) {
            return (
                <div className="col-lg-10">
                    <div className="spinner">
                        <Spin size="large"/>
                    </div>
                </div>
            );
        }

        if (!note) {
            return (<div className="col-lg-10"></div>)
        }

        return (
            <div className="col-lg-10 jumbotron">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header lead">
                            <h1 id="forms">{note.title}</h1>
                        </div>
                        <hr className="my-4"/>
                        <div>
                            {note.content}
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