import Root from "./pages/Root";
import HomePage from "./pages/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Signin from "pages/Signin";
import Signup from "pages/Signup";
import ErrorPage from "pages/Errorpage";
import Profile from "pages/Profile";
import Articles from "pages/Articles";
import Groups from "pages/Groups";
import Marketplace from "pages/Marketplace";
import Friends from "pages/Friends";
import Settings from "./pages/Settings";
import ListProvider from "./Context/TodoList";
import { ProfileImageProvider } from "./Context/ProfileImage";
import CommentsProvider from "./Context/comments";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="profile" element={<Profile />} />
      <Route path="articles" element={<Articles />} />
      <Route path="groups" element={<Groups />} />
      <Route path="friends" element={<Friends />} />
      <Route path="Marketplace" element={<Marketplace />} />
      <Route path="settings" element={<Settings />} />

      <Route path="*" element={<ErrorPage />} />
      {/* ... etc. */}
    </Route>
  )
);

function App() {
  return (
    <ProfileImageProvider>
      <CommentsProvider>
        <ListProvider>
          <div className="App">
            <RouterProvider router={router} />
          </div>
        </ListProvider>
      </CommentsProvider>
    </ProfileImageProvider>
  );
}

export default App;
