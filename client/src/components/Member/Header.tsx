import { useState } from "react";

import PlusIcon from "components/common/icons/PlusIcon";
import NormalButton from "components/common/Buttons/NormalButton";

import styles from "./Header.module.css";

type Props = {
  viewMode: "CARD" | "LIST";
  setViewMode: React.Dispatch<React.SetStateAction<"CARD" | "LIST">>;
};

export default function Header({ viewMode, setViewMode }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.header}>
      <div className={styles.buttons}>
        <PlusIcon
          onClick={() => {
            setIsOpen(true);
          }}
        />
        <div className={styles.unit}>
          <NormalButton
            text="Card"
            onClick={() => setViewMode("CARD")}
            disabled={viewMode === "CARD"}
          />
          <NormalButton
            text="List"
            onClick={() => setViewMode("LIST")}
            disabled={viewMode === "LIST"}
          />
        </div>
      </div>
    </div>
  );
}
