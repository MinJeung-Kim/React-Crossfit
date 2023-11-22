import Flag from "react-world-flags";
import { MdLanguage } from "react-icons/md";
import { SplitButton } from "primereact/splitbutton";

import { useLanguage } from "context/LanguageContext";

import styles from "./UserMenu.module.css";

export default function Language() {
  const { setLanguage } = useLanguage();

  const items = [
    {
      label: "English",
      template: itemsTemplate("US", "United States"),
    },
    {
      label: "Korea",
      template: itemsTemplate("KR", "South Korea"),
    },
  ];

  function itemsTemplate(code: string, title: string) {
    return (
      <div
        className={styles.country}
        onClick={() => {
          setLanguage(code);
        }}
      >
        <Flag code={code} title={title} />
        <p className={styles.country_title}>{code}</p>
      </div>
    );
  }
  return (
    <div className={styles.searchToggle}>
      <SplitButton icon={<MdLanguage />} model={items} />
    </div>
  );
}
