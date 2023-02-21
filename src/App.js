import './App.css';
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { useContext } from 'react';
import ThemeContext from './context/Theme';
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
