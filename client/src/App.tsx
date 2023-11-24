import { useState } from "react";
import { Outlet } from "react-router-dom";

import Chat from "components/Chat/Chat";
import SearchHeader from "./components/SearchHeader/SearchHeader";
import SideNavigationBar from "./components/SideNavigationBar/SideNavigationBar";

import Login from "./pages/Login/Login";

import { useAuth } from "./context/AuthContext";
import LanguageProvider from "context/LanguageContext";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import styles from "./App.module.css";

const App: React.FC = () => {
  const { userInfo } = useAuth();
  const [isActive, setIsActive] = useState(false);

  return (
    <main className={styles.root}>
      {userInfo == null ? (
        <Login />
      ) : (
        <LanguageProvider>
          <SideNavigationBar isActive={isActive} />
          <section className={styles.container}>
            <SearchHeader isActive={isActive} setIsActive={setIsActive} />
            <Outlet />
            <Chat />
          </section>
        </LanguageProvider>
      )}
    </main>
  );
};

export default App;
