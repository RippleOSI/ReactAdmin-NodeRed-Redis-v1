import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';

const PostList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="body" />
            <EditButton />
        </Datagrid>
    </List>
);

export default PostList;