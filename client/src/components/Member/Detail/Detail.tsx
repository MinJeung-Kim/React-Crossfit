import { Member } from "pages/Member/Member";
import { formatPhone } from "util/formatter";
import { dateFormatTonlyDate } from "util/dateUtils";

import Avatar from "components/common/Avatar/Avatar";
import ClearIcon from "components/common/icons/ClearIcon";
import LockersIcon from "components/common/icons/LockersIcon";
import CalendarIcon from "components/common/icons/CalendarIcon";
import EmailFillIcon from "components/common/icons/EmailFillIcon";
import PhoneFillIcon from "components/common/icons/PhoneFillIcon";
import MembershipIcon from "components/common/icons/MembershipIcon";
import BirthdayFillIcon from "components/common/icons/BirthdayFillIcon";
import DumbbellFillIcon from "components/common/icons/DumbbellFillIcon";
import CalendarPlusIcon from "components/common/icons/CalendarPlusIcon";

import styles from "./Detail.module.css";

type Props = {
  member: Member;
  setMember: React.Dispatch<React.SetStateAction<Member | null>>;
};

export default function Detail({ member, setMember }: Props) {
  const {
    username,
    name,
    email,
    phone,
    birthDay,
    gender,
    membership,
    extension,
    lockerYn,
    locker,
    createdAt,
    startDate,
    endDate,
  } = member;
  return (
    <section className={styles.wrapper}>
      <div className={styles.profile}>
        <ClearIcon onClick={() => setMember(null)} />
        <Avatar src={""} alt={""} className={styles.user_img} />
        <p className={styles.username}>{username}</p>
        <span className={styles.name}>{`${name} / ${
          gender === "M" ? "여" : "남"
        }`}</span>
      </div>
      <div className={styles.user_info}>
        <div className={styles.info}>
          <BirthdayFillIcon />
          <div className={styles.title_wrap}>
            <span className={styles.title}>생일</span>
            <span className={styles.text}>{birthDay}</span>
          </div>
        </div>
        <div className={styles.info}>
          <EmailFillIcon />
          <div className={styles.title_wrap}>
            <span className={styles.title}>이메일</span>
            <span className={styles.text}>{email}</span>
          </div>
        </div>
        <div className={styles.info}>
          <PhoneFillIcon />
          <div className={styles.title_wrap}>
            <span className={styles.title}>연락처</span>
            <span className={styles.text}>{phone && formatPhone(phone)}</span>
          </div>
        </div>
        <div className={styles.info}>
          <MembershipIcon />
          <div className={styles.title_wrap}>
            <span className={styles.title}>회원권</span>
            <span className={styles.text}>{`${membership} 개월`}</span>
          </div>
        </div>
        <div className={styles.info}>
          <LockersIcon />
          <div className={styles.title_wrap}>
            <span className={styles.title}>사물함</span>
            <span className={styles.text}>
              {lockerYn === "N" ? "사용안함" : `${locker} 개월`}
            </span>
          </div>
        </div>
        <div className={styles.info}>
          <CalendarIcon />
          <div className={styles.title_wrap}>
            <span className={styles.title}>등록일</span>
            <span className={styles.text}>
              {dateFormatTonlyDate(createdAt)}
            </span>
          </div>
        </div>
        <div className={styles.info}>
          <CalendarPlusIcon />
          <div className={styles.title_wrap}>
            <span className={styles.title}>회원권 연장일</span>
            <span className={styles.text}>{`${extension}일`}</span>
          </div>
        </div>
        <div className={styles.info}>
          <DumbbellFillIcon />
          <div className={styles.title_wrap}>
            <span className={styles.title}>기간</span>
            <span className={styles.text}>{`${startDate} ~ ${endDate}`}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
