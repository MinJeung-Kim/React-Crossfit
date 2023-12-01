 import { Link } from "react-router-dom";

import Menu from "./Menu";
import Profile from "./Profile/Profile";

import MenuIcon from "components/common/icons/MenuIcon";
import QuestionFillIcon from "components/common/icons/QuestionFillIcon";
import ArrowRightLongIcon from "components/common/icons/ArrowRightLongIcon";

import styles from "./SideBar.module.css";

export default function SideBar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <MenuIcon
          onClick={() => {
            console.log("MenuIcon");
          }}
        />
        <span className={styles.title}>Crossfit Baekho</span>
      </div>
      <div className={styles.content}>
        <Profile />
        <Menu />
        <div className={styles.footer}>
          <Link to="https://crossfit.gitbook.io/react-crossfit-docs/">
            <div className={styles.text_box}>
              <QuestionFillIcon />
              <span className={styles.text}>Knowledge Base</span>
            </div>
            <ArrowRightLongIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
