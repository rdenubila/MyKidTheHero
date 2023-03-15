import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import InteractiveHistory from './page/InteractiveHistory';
import StaticHistory from './page/StaticHistory';

const router = createBrowserRouter([
  {
    path: "/",
    element: <StaticHistory />,
  },
  {
    path: "/interactive",
    element: <InteractiveHistory />,
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
