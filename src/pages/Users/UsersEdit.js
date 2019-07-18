import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

const UserCreate = (props) => (
    <Edit undoable={false} {...props}>
        <SimpleForm redirect="list">
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="phone" />
            <TextInput source="address.city" label="City" />
            <TextInput source="address.street" label="Street" />
            <TextInput source="website" />
            <TextInput source="company.name" label="Company" />
        </SimpleForm>
    </Edit>
);

export default UserCreate;