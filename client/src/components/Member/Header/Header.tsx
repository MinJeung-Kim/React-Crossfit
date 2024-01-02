import { useState } from "react";

import CreateModal from "../CreateModal";
import PlusIcon from "components/common/icons/PlusIcon";
import ClearIcon from "components/common/icons/ClearIcon";
import SearchIcon from "components/common/icons/SearchIcon";
import NormalButton from "components/common/Buttons/NormalButton";

import styles from "./Header.module.css";

type Props = {
  viewMode: "CARD" | "LIST";
  setViewMode: React.Dispatch<React.SetStateAction<"CARD" | "LIST">>;
};

export default function Header({ viewMode, setViewMode }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <>
      <div className={styles.header}>
        <div className={styles.search_wrapper}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search Name, Email, ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search !== "" && <ClearIcon onClick={() => setSearch("")} />}
        </div>
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
      <CreateModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
