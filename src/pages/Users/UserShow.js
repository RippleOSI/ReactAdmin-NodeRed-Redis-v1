import React from "react";
import { Show, SimpleShowLayout, TextField, UrlField } from 'react-admin';

const UserShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="email" />
            <TextField source="phone" />
            <TextField source="address.city" />
            <TextField source="address.street" />
            <UrlField source="website" />
        </SimpleShowLayout>
    </Show>
);

export default UserShow;