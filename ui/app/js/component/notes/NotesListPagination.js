import React, {PureComponent} from 'react';

class NotesListPagination extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pagination-body">
                <ul className="pagination pagination-sm">
                    <li className="page-item disabled">
                        <a className="page-link" href="#">&laquo;</a>
                    </li>
                    <li className="page-item active">
                        <a className="page-link" href="#">1</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">2</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">3</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">4</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">5</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">&raquo;</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NotesListPagination;