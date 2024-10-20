import HomePage from "./routes/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import { Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "list", element: <ListPage />, loader: listPageLoader },
      { path: ":id", element: <SinglePage />, loader: singlePageLoader },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }
    ],
  },
  {
    path: "/profile",
    element: <RequireAuth />,
    children: [
      { path: "", element: <ProfilePage />, loader: profilePageLoader }, // Empty path for "/profile"
      { path: "update", element: <ProfileUpdatePage /> }, // Relative path "update"
      { path: "add", element: <NewPostPage /> } // Relative path "add"
    ],
  },
]);


// const router = createBrowserRouter([
//   { path: "/", element: <Layout /> },
//   { path: "/home", element: <HomePage /> },
//   { path: "/list", element: <ListPage />, loader: listPageLoader },
//   { path: "/:id", element: <SinglePage />, loader: singlePageLoader },
//   { path: "/login", element: <Login /> },
//   { path: "/register", element: <Register /> },
//   { path: "/profile", element: <ProfilePage />, loader: profilePageLoader },
//   { path: "/profile/update", element: <ProfileUpdatePage /> },
//   { path: "/profile/add", element: <NewPostPage /> },
// ]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
