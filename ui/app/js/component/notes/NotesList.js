import React, {PureComponent} from 'react';
import NotesListPagination from "./NotesListPagination";
import NotesListItem from "./NotesListItem";
import {actionDoRequest} from "../../actions/request";
import {connect} from 'react-redux';

class NotesList extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    submitRequest(text) {
        const request = Object.assign({}, text);
        this.props.actionDoRequest(request)
    }

    render() {
        let response = this.props.request.response;
        const isLoading = this.props.request.isLoading;

        let notesList;
        let pagination;
        if (response && response.status === 'OK') {
            let i = 0;
            notesList = response.data.notes.map(row => {
                return <NotesListItem note={row} selected={(i++ === 0)}/>
            });

            pagination = <NotesListPagination count={response.data.count}/>
        } else {
            notesList = <p>No content!</p>
        }

        return (
            <div className="col-lg-4 list-item">
                <input className="form-control mr-sm-2 search-input" type="text"
                       placeholder="Search" onChange={(e) => this.submitRequest(e)}/>

                {notesList}
                {pagination}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDoRequest: (e) => dispatch(actionDoRequest(e)),
    };
};

const mapStateToProps = (state) => ({
    request: state.request
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);