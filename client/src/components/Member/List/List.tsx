import { Member } from "pages/Member/Member";

import styles from "./List.module.css";

type Props = {
  members: Member[];
};

const COLUMNS = [
  { field: "username", header: "ID" },
  { field: "name", header: "이름" },
  { field: "phone", header: "연락처" },
  { field: "email", header: "이메일" },
  { field: "paymentTerm", header: "기간" },
  { field: "extendedPeriod", header: "연장" },
  { field: "createdAt", header: "등록일" },
];

export default function List({ members }: Props) {
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
          COLUMNS.map((col) => <li key={col.header}>{member[col.field]}</li>)
        )}
      </ul>
    </div>
  );
}
