import { useState } from "react";
import { RiCloseFill, RiWechat2Line } from "react-icons/ri";

import ChatForm from "./ChatForm";
import styles from "./Chat.module.css";  

export default function Chat() {
  const [isOpenChat, setIsOpenChat] = useState(false);
  return (
    <div className={styles.chat}>
      {isOpenChat && <ChatForm />}
      <div
        className={styles.chat_button}
        onClick={() => setIsOpenChat(!isOpenChat)}
      >
        {isOpenChat ? <RiCloseFill /> : <RiWechat2Line />}
      </div>
    </div>
  );
}  
