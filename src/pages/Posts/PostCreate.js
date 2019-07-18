import React from 'react';
import { Create, ReferenceInput, SimpleForm, SelectInput, TextInput, LongTextInput } from 'react-admin';

const PostCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="title" />
            <LongTextInput source="body" />
            <ReferenceInput label="Author" source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export default PostCreate;