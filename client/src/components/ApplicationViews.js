import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfileList from "./userprofiles/UserProfilesList";
import UserProfileDetails from "./userprofiles/UserProfileDetails";
import CategoryList from "./categories/CategoryList.js";
import { PostsAll } from "./posts/PostsAll.js";
import { ViewAllTags } from "./tags/ViewAllTags";
import { CreateNewTag } from "./tags/CreateNewTag";
import { PostDetails } from "./posts/PostDetails.js";
import MyPosts from "./posts/MyPosts";
import NewCategoryForm from "./categories/NewCategoryForm.js";
import { CreateNewPost } from "./posts/CreateNewPost.js";


export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <p>Welcome to Tabloid!</p>
            </AuthorizedRoute>
          }
        />
        <Route path="/userprofiles">
          <Route
            index
            element={
              <AuthorizedRoute
                loggedInUser={loggedInUser}
                roles={['Admin']}
              >
                <UserProfileList />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute
                loggedInUser={loggedInUser}
                roles={['Admin']}
              >
                <UserProfileDetails />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route path="/posts">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <PostsAll />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <PostDetails />
              </AuthorizedRoute>
            }
          />
          <Route path=":id" element={<PostDetails loggedInUser={loggedInUser}/>}></Route>
          
        </Route>
        <Route path="/my-posts">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <MyPosts loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
          <Route
            path="new"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <CreateNewPost loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="tags"
          element={<ViewAllTags />}
        />
        <Route
        path="tags/create"
        element={<CreateNewTag/>}
        />
      </Route>
      <Route path="/categories">
        <Route
          index
          element={
            <AuthorizedRoute
              loggedInUser={loggedInUser}
              roles={['Admin']}
            >
              <CategoryList />
            </AuthorizedRoute>
          }
        />
        <Route
          path="/categories/create"
          element={
            <AuthorizedRoute
              loggedInUser={loggedInUser}
              roles={['Admin']}
            >
              <NewCategoryForm />
            </AuthorizedRoute>
          }
        />
      </Route>
      <Route
        path="*"
        element={<p>Whoops, nothing here...</p>}
      />
    </Routes>
  );
}
