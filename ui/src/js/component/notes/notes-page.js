import React, {PureComponent} from 'react';
import NotesListContainer from "./list/notes-list-container";
import NoteContent from "./content/note-container";
import {Layout} from "antd";

class NotesPage extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const {Content, Sider} = Layout;
        return (
            <Layout style={{marginTop: 5}}>
                <Sider width={300} style={{
                    background: '#fff',
                    height: '100vh',
                    padding: 5,
                }}>
                    <NotesListContainer/>
                </Sider>
                <Layout style={{
                    padding: '0px 5px 0px',
                    height: '100vh'
                }}>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
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