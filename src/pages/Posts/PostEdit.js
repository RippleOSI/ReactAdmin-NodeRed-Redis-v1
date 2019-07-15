import React from 'react';
import { Edit, ReferenceInput, SimpleForm, SelectInput, TextInput } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

const PostEdit = (props) => (
    <Edit undoable={false} {...props}>
        <SimpleForm redirect="list">
            <TextInput source="title" />
            <RichTextInput source="body" />
            <ReferenceInput label="Author" source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export default PostEdit;