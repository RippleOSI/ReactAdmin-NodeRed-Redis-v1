import React from "react";
import { Show, SimpleShowLayout, TextField, UrlField } from 'react-admin';

const UsersShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="email" />
            <TextField source="phone" />
            <TextField source="address.city" label="City" />
            <TextField source="address.street" label="Street" />
            <UrlField source="website" />
            <TextField source="company.name" label="Company" />
        </SimpleShowLayout>
    </Show>
);

export default UsersShow;