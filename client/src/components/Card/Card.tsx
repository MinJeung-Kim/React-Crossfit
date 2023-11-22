import { MdAddShoppingCart } from "react-icons/md";
import { BsCartX, BsCartCheck } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";

import styles from "./Card.module.css";

const Categorys = [
  {
    title: "Order List",
    price: "40,876",
    status: "up",
    icon: <AiOutlineShoppingCart />,
  },
  {
    className: "two",
    title: "Total Sales",
    price: "38,876",
    status: "up",
    icon: <MdAddShoppingCart />,
  },
  {
    className: "three",
    title: "Total Profit",
    price: "12,876",
    status: "down",
    icon: <BsCartX />,
  },
  {
    className: "four",
    title: "Total User",
    price: "40,876",
    status: "up",
    icon: <BsCartCheck />,
  },
];

export default function Card() {
  return (
    <section className={styles.home_content}>
      <div className={styles.overview_boxes}>
        {Categorys.map(({ title, price, status, icon, className }) => (
          <div className={styles.box} key={title}>
            <div className={styles.left_side}>
              <div className={styles.box_topic}>{title}</div>
              <div className={styles.number}>{price}</div>
              <div className={styles.indicator}>
                <i className={status === "up" ? "" : styles.down}>
                  {status === "up" ? (
                    <BsArrowUpCircle />
                  ) : (
                    <BsArrowDownCircle />
                  )}
                </i>
                <span
                  className={styles.text}
                >{`${status} from yesterday`}</span>
              </div>
            </div>
            <i className={`${styles.cart} ${className && styles[className]}`}>
              {icon}
            </i>
          </div>
        ))}
      </div>
    </section>
  );
}
