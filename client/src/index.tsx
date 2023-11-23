import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import NotFound from "./pages/NotFound";
import Users from "./pages/Users/Users";
import Login from "./pages/Singnin/Login";
import Scheduler from "pages/Schedule/Scheduler";
import Dashboard from "./pages/Dashboard/Dashboard";

import { AuthProvider, AuthErrorEventBus } from "./context/AuthContext";
import { ModeProvider } from "./context/ModeContext";

import "./index.css";
import "./styles/App.global.css";
import TokenStorage from "db/token";
import HttpClient from "network/http";
import AuthService from "service/auth";
import Socket from "network/socket";
import ScheduleService from "service/schedule";

const baseURL = process.env.REACT_APP_BASE_URL ?? "";
const tokenStorage = new TokenStorage();
// AuthErrorEventBus : 토큰이 만료되었을 경우 login페이지로 이동하는 class
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL, authErrorEventBus);
const authService = new AuthService(httpClient, tokenStorage);
const scheduleService = new ScheduleService(httpClient, tokenStorage);
// const socketClient = new Socket(baseURL, () => tokenStorage.getToken());
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
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
    <AuthProvider
      authService={authService}
      authErrorEventBus={authErrorEventBus}
    >
      <ModeProvider>
        <RouterProvider router={router} />
      </ModeProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
