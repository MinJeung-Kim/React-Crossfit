import { useEffect, useState } from "react";

import { memberService } from "index";
import { UserResponse } from "service/auth";
import Header from "components/Member/Header";
import List from "components/Member/List/List";
import Card from "components/Member/Card/Card";
import Detail from "components/Member/Detail/Detail";

import styles from "./Member.module.css";

export type Member = UserResponse & {
  extension: number;
  createdAt: string;
  startDate: string;
  endDate: string;
};

export default function Member() {
  const [members, setMembers] = useState<Member[]>([]);
  const [member, setMember] = useState<Member>(members[0] || {});
  const [viewMode, setViewMode] = useState<"CARD" | "LIST">("CARD");
  const [error, setError] = useState("");

  const onError = (error: any) => {
    setError(error.toString());
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  useEffect(() => {
    memberService
      .getMembers()
      .then((member) => setMembers([...member]))
      .catch(onError);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.user_list}>
        <Header viewMode={viewMode} setViewMode={setViewMode} />
        {viewMode === "LIST" && <List members={members} />}
        {viewMode === "CARD" && (
          <Card members={members} setMember={setMember} />
        )}
      </div>
      <Detail member={member} />
    </div>
  );
}
