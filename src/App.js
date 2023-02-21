import './App.css';
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
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
