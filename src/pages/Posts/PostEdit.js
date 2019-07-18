import React from 'react';
import { Edit, ReferenceInput, SimpleForm, SelectInput, TextInput, LongTextInput } from 'react-admin';

const PostEdit = (props) => (
    <Edit undoable={false} {...props}>
        <SimpleForm redirect="list">
            <TextInput source="title" />
            <LongTextInput source="body" />
            <ReferenceInput label="Author" source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export default PostEdit;