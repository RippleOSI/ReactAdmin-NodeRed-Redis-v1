import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="phone" />
            <TextInput source="address.city" />
            <TextInput source="address.street" />
            <TextInput source="website" />
        </SimpleForm>
    </Create>
);

export default UserCreate;