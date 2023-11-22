import { useContext, useState } from "react"; 
import { Outlet } from "react-router-dom";

import Chat from "components/Chat/Chat";
import SearchHeader from "./components/SearchHeader/SearchHeader";
import SideNavigationBar from "./components/SideNavigationBar/SideNavigationBar";

import Singnin from "./pages/Singnin/Singnin";

import UserProvider from "context/UserContext";
import { AuthContext } from "./context/AuthContext";
import LanguageProvider from "context/LanguageContext";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import styles from "./App.module.css";

const App: React.FC = () => {
  const { userInfo } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(false);
  return (
    <main className={styles.root}>
      {userInfo.email === "" ? (
        <UserProvider>
          <Singnin />
        </UserProvider>
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
