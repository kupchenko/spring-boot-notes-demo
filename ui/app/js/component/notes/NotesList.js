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
        this.props.actionDoRequest(text)
    }

    render() {
        let response = this.props.request.response;
        const isLoading = this.props.request.isLoading;

        let notesList;
        let pagination;
        if (response) {
            let i = 0;
            notesList = response.notes.map(row => {
                return <NotesListItem key={row.id} note={row} selected={(i++ === 0)}/>
            });

            pagination = <NotesListPagination count={response.count}/>
        } else {
            notesList = <p>No content!</p>
        }

        return (
            <div className="col-lg-4 list-item">
                <input className="form-control mr-sm-2 search-input" type="text"
                       placeholder="Search" onChange={(e) => this.submitRequest(e.target.value)}/>

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