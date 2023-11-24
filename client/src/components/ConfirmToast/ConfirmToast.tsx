import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";

type Props = {
  message: string;
};

export default function ConfirmToast({ message }: Props) {
  const toast = useRef<Toast>(null);

  useEffect(() => {
    accept();
  }, [message]);

  const accept = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Confirmed",
      detail: `${message}`,
      life: 3000,
    });
  };
  return <Toast ref={toast} position="bottom-right"/>;
}
