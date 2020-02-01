import React, {PureComponent} from 'react';
import NotesListContainer from "./notes-list-container";
import NoteContent from "./note-container";
import {Layout} from "antd";

class NotesPage extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const {Content, Sider} = Layout;
        return (
            <Layout style={{marginTop: 70}}>
                <Sider width={300} style={{
                    background: '#fff',
                    height: '100%',
                    padding: 5,
                    overflow: 'auto',
                    position: 'fixed',
                }}>
                    <NotesListContainer/>
                </Sider>
                <Layout style={{
                    padding: '0px 5px 0px',
                    overflow: 'initial',
                    marginLeft: 300
                }}>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <NoteContent/>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default NotesPage;