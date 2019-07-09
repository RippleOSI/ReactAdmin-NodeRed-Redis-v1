import React from "react";
import { Admin, Resource } from "react-admin";

import customDataProvider from "./dataProvider";

import UserList from "./pages/Users/UsersList";
import UserShow from "./pages/Users/UserShow";

import PostsList from "./pages/Posts/PostsList";
import PostShow from "./pages/Posts/PostShow";
import PostCreate from "./pages/Posts/PostCreate";
import PostEdit from "./pages/Posts/PostEdit";

import Homepage from "./pages/Homepage";

const App = () => (
    <Admin
        dataProvider={customDataProvider}
        dashboard={Homepage}
    >
        <Resource name="users" options={{ label: "Users" }} list={UserList} show={UserShow} />
        <Resource name="posts" options={{ label: "Posts" }} list={PostsList} show={PostShow} create={PostCreate} edit={PostEdit} />
    </Admin>
);

export default App;
