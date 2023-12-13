import { UserResponse } from "service/auth";

import styles from "./List.module.css";

type Props = {
  members: UserResponse[];
};

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

export default function List({ members }: Props) {
  // const displayMembers = () => {
  //   return (
  //     <ul className={styles.members}>
  //       {members.map((member) =>
  //         COLUMNS.map((col) => <li key={col.header}>{member[col.field]}</li>)
  //       )}
  //     </ul>
  //   );
  // };
  return (
    <div className={styles.wrapper}>
      <ul className={styles.columns}>
        {COLUMNS.map(({ field, header }) => (
          <li key={field}>{header}</li>
        ))}
      </ul>
      {/* <div className={styles.none_data}>데이터가 없습니다.</div> */}
      <ul className={styles.members}>
        {members.map((member) =>
          COLUMNS.map((col) => (
            <li key={col.header}>{(member as any)[col.field]}</li>
          ))
        )}
      </ul>
    </div>
  );
}
