import React from "react";
import { Show, ReferenceField, RichTextField, SimpleShowLayout, TextField } from 'react-admin';

const PostShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <RichTextField source="body" />
        </SimpleShowLayout>
    </Show>
);

export default PostShow;