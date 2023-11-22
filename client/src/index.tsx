import React from "react";
import ReactDOM from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import NotFound from "./pages/NotFound";
import Users from "./pages/Users/Users";
import Singnin from "./pages/Singnin/Singnin";
import Scheduler from "pages/Schedule/Scheduler";
import Dashboard from "./pages/Dashboard/Dashboard";

import { AuthContextProvider } from "./context/AuthContext";
import { ModeProvider } from "./context/ModeContext";

import "./index.css";
import "./styles/App.global.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Singnin />,
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      { path: "/users", element: <Users /> },
      { path: "/schedule", element: <Scheduler /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthContextProvider>
        <ModeProvider>
          <RouterProvider router={router} />
        </ModeProvider>
      </AuthContextProvider>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
