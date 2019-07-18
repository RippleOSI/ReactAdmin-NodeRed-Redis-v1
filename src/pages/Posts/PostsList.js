import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';

const PostList = props => (
    <List sort={{ field: 'id', order: 'ASC' }} {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="body" />
            <EditButton />
        </Datagrid>
    </List>
);

export default PostList;