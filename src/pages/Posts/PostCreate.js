import React from 'react';
import { Create, ReferenceInput, SimpleForm, SelectInput, TextInput } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

const PostCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="title" />
            <RichTextInput source="body" />
            <ReferenceInput label="Author" source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export default PostCreate;