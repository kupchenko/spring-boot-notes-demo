import React from 'react';
import queryString from 'query-string'
import {Spin} from "antd";
import {connect} from "react-redux";
import {retrieveToken} from "../../../actions/login";

class AuthSuccess extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {code} = queryString.parse(this.props.location.search);
        console.log("The code is " + code);
        this.props.retrieveToken(code)
    }

    render() {
        console.log("Rendering login");
        return (
            <div className="login-warp" style={{paddingTop: 500}}>
                <Spin size="large"/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveToken: (code) => dispatch(retrieveToken(code))
    };
};

export default connect(null, mapDispatchToProps)(AuthSuccess);