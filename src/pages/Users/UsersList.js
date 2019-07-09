import React from "react";

import { List, Datagrid, TextField, EmailField, UrlField } from 'react-admin';

const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <UrlField source="website" />
            <TextField source="company.name" />
        </Datagrid>
    </List>
);

export default UserList;
