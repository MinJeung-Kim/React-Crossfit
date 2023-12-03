import { useEffect, useState } from "react";

import { memberService } from "index";
import { Members } from "service/member";

import styles from "./Member.module.css";

const COLUMNS = [
  { field: "name", header: "ID" },
  { field: "username", header: "이름" },
  { field: "phone", header: "연락처" },
  { field: "email", header: "이메일" },
  { field: "paymentTerm", header: "기간" },
  { field: "extendedPeriod", header: "연장" },
  { field: "totalPeriod", header: "총 기간" },
  { field: "locker", header: "사물함" },
  { field: "createdAt", header: "가입일" },
];

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
      <div className={styles.content}>
        <div className={styles.header}>header</div>
        <ul className={styles.columns}>
          {COLUMNS.map(({ field, header }) => (
            <li key={field}>{header}</li>
          ))}
        </ul>
        <div className={styles.none_data}>
          데이터가 없습니다.
        </div>
        {/* <div className={styles.member_wrap}>
        {members.map((member) => {
          console.log(member);
          
          return <></>;
        })}
      </div> */}
      </div>
    </div>
  );
}
