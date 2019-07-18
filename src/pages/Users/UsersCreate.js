import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="phone" />
            <TextInput source="address.city" label="City" />
            <TextInput source="address.street" label="Street" />
            <TextInput source="website" />
            <TextInput source="company.name" label="Company" />
        </SimpleForm>
    </Create>
);

export default UserCreate;