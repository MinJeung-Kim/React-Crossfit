import { useState } from "react";

import ArrowDownIcon from "components/common/icons/ArrowDownIcon";
import LocationFillIcon from "components/common/icons/LocationFillIcon";

import styles from "./Language.module.css";

const COUNTRYS = [
  { name: "Korea", code: "KR" },
  { name: "English", code: "US" },
];

export default function Language() {
  const [select, setSelect] = useState(COUNTRYS[0].name);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (name: string) => {
    setSelect(name);
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.language_wrap}>
      <LocationFillIcon />
      <div className={styles.select_wrap}>
        <div className={styles.button_wrap} onClick={() => setIsOpen(!isOpen)}>
          <button className={styles.select}>{select}</button>
          <ArrowDownIcon />
        </div>

        <ul className={`${styles.countrys} ${isOpen && styles.action}`}>
          {COUNTRYS.map(({ name, code }) => (
            <li value={name} key={code} onClick={() => handleClick(name)}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
