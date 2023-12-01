import { useEffect, useState } from "react";
import { memberService } from "index";

import styles from "./Member.module.css";
import { Members } from "service/member";

export default function Member() {
  const [members, setMembers] = useState<Members[]>([]);
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
      <div className={styles.member_wrap}>
        {members.map((member) => {
          console.log(member);
          
          return <></>;
        })}
      </div>
    </div>
  );
}
