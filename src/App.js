import './App.css';
import Home from './pages/home/Home.jsx'
import About from './pages/About'
import Profile from './pages/Profile'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { useContext } from 'react';
import ThemeContext from './context/Theme';
import EditeTask from './pages/edit-task/Edite-Task';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/about",
    element: <About/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/signin",
    element: <Signin/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/edittask/:userId",
    element: <EditeTask/>,
  },
]);

function App() {
  const { theme } = useContext(ThemeContext);
  return (
      <div className={`${theme}`}>
        <RouterProvider router={router} />
      </div>
  );
}

export default App;
