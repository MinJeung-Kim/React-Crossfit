import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { authMsg } from "context/AuthContext";

type Props = {
  messageStatus: authMsg;
};

export default function ConfirmToast({ messageStatus }: Props) {
  const toast = useRef<Toast>(null);
  const { status, message } = messageStatus;

  useEffect(() => {
    accept();
  }, [message]);

  const accept = () => {
    toast.current?.show({
      severity: `${status}`,
      summary: "Confirmed",
      detail: `${message}`,
      life: 3000,
    });
  };
  return <Toast ref={toast} position="bottom-right" />;
}
