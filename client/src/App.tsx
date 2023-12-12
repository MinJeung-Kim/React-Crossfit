import { useState } from "react";
import { Outlet } from "react-router-dom";

import Chat from "components/Chat/Chat";

import Login from "./pages/Login/Login";

import { useAuth } from "./context/AuthContext";
import LanguageProvider from "context/LanguageContext";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import styles from "./App.module.css";
import ScheduleProvider from "context/ScheduleContext";
import SideBar from "components/SideBar/SideBar";
import Header from "components/Header/Header";

const App: React.FC = () => {
  const { authInfo } = useAuth(); 

  return (
    <main className={styles.root}>
      {authInfo == null ? (
        <Login />
      ) : (
        <LanguageProvider>
          <SideBar /> 
          <section className={styles.container}>
            <Header /> 
            <ScheduleProvider>
              <Outlet />
            </ScheduleProvider>
            {/* <Chat /> */}
          </section>
        </LanguageProvider>
      )}
    </main>
  );
};

export default App;
