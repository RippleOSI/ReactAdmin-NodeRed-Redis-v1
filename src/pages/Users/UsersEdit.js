import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

const UserCreate = (props) => (
    <Edit undoable={false} {...props}>
        <SimpleForm redirect="list">
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="phone" />
            <TextInput source="address.city" />
            <TextInput source="address.street" />
            <TextInput source="website" />
        </SimpleForm>
    </Edit>
);

export default UserCreate;