import React, {PureComponent} from 'react';

class NavBar extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                <div className="navbar-size">
                    <a href="../" className="navbar-brand">Notes</a>
                </div>
            </div>
        )
    }
}

export default NavBar;