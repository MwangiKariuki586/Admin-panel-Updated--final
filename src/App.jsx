import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";
import Toner_requests from "./pages/Toner requests/Toner_requests";
import Navbar from "./components/navbar/Navbar";
import Loading from "./components/loading/Loading";
import Menu from "./components/menu/Menu";
import "./styles/global.scss";
import Toners from "./pages/toners/Toners";
import Printers from "./pages/printers/Printers";
import Locations from "./pages/locations/Locations";
import Departments from "./pages/departments/Departments";
import NotFound from "./components/not found/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Areyousure from "./components/are you sure/Areyousure";
import Add from "./components/add/Add";
import Single from "./components/single/Single";
import Login from "./pages/login/Login";
import UserContext from "./context/UserContext";
import { useContext } from "react";
import ProtectedRoutes from "./protected route/ProtectedRoutes";

function App() {
  const queryClient = new QueryClient();
  const { loading } = useContext(UserContext);
  const Layout = () => {
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <div className="main">
            <Navbar />
            <div className="container">
              <div className="menuContainer">
                <Menu />
              </div>
              <div className="contentContainer">
                <QueryClientProvider client={queryClient}>
                  <Outlet />
                </QueryClientProvider>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes>
          <Layout />
        </ProtectedRoutes>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/toners",
          element: <Toners />,
        },

        {
          path: "/printers",
          element: <Printers />,
        },
        {
          path: "/toner_requests",
          element: <Toner_requests />,
        },
        {
          path: "/departments",
          element: <Departments />,
        },
        {
          path: "/locations",
          element: <Locations />,
        },
        {
          path: "/delete/:id",
          element: <Areyousure />,
        },
        {
          path: "/users/:id",
          element: <Single />,
        },
        {
          path: "/toner/:id",
          element: <Single />,
        },
        {
          path: "/department/:id",
          element: <Single />,
        },
        {
          path: "/toner_request/:id",
          element: <Single />,
        },
        {
          path: "/printer/:id",
          element: <Single />,
        },
        {
          path: "/location/:id",
          element: <Single />,
        },
        {
          path: "add",
          element: <Add />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
