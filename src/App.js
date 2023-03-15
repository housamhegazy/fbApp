import React, { useMemo, useState } from "react";
import Root from './pages/Root'
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<ErrorPage />} />
      {/* ... etc. */}
    </Route>
  )
);
function App() {
  return (
    <div className="App">
          <RouterProvider router={router} />
    </div>
  );
}

export default App;
