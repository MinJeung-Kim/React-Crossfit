import { Members } from "service/member";

import Avatar from "components/common/Avatar/Avatar";
import EmailFillIcon from "components/common/icons/EmailFillIcon";
import PhoneFillIcon from "components/common/icons/PhoneFillIcon";

import styles from "./Detail.module.css";
import { formatPhone } from "util/formatter";

type Props = {
  member: Members;
};

export default function Detail({ member }: Props) {
  console.log(member);

  const {
    username,
    name,
    email,
    phone,
    paymentTerm,
    extendedPeriod,
    totalPeriod,
    locker,
    desc,
  } = member;
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>add user</div>
      <div className={styles.profile}>
        <Avatar src={""} alt={""} className={styles.user_img} />
        <span>{username}</span>
        <span>{name}</span>
      </div>
      <div className={styles.user_info}>
        <div className={styles.info}>
          <EmailFillIcon />
          <span className={styles.text}>{email}</span>
        </div>
        <div className={styles.info}>
          <PhoneFillIcon />
          <span className={styles.text}>{phone && formatPhone(phone)}</span>
        </div>
      </div>
    </section>
  );
}
