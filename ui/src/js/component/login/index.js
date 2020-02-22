import React from 'react';
import Login from 'ant-design-pro/lib/Login';

const {UserName, Password, Submit} = Login;

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (err, values) => {
        console.log(values.username);
        console.log(values.password);
    };

    render() {
        console.log("Rendering login");
        return (
            <div className="login-warp" style={{paddingTop: 300}}>
                <h1>Login</h1>
                <Login onSubmit={this.onSubmit}>
                    <UserName name="username" placeholder="Username" type="text" form={UserName}
                              updateActive={UserName}/>
                    <Password name="password" placeholder="Password" type="password" form={Password}
                              updateActive={Password}/>

                    <Submit>Login</Submit>
                </Login>
            </div>
        )
    }
}

export default LoginPage;