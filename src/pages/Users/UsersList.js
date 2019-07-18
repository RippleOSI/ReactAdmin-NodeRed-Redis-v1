import React from "react";

import { List, Datagrid, TextField, EmailField, UrlField, EditButton } from 'react-admin';

const UserList = props => (
    <List sort={{ field: 'id', order: 'ASC' }} {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <UrlField source="website" />
            <TextField source="company.name" label="Company" />
            <EditButton />
        </Datagrid>
    </List>
);

export default UserList;
