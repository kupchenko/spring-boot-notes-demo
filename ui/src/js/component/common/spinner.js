import React, {PureComponent} from 'react';
import {Spin} from "antd";

class Spinner extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="spinner">
                <Spin size="large"/>
            </div>
        )
    }
}

export default Spinner;