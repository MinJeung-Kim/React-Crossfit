import { Dialog } from "primereact/dialog";

import TitleHeader from "./TitleHeader/TitleHeader";
import DialogFooter from "./Buttons/DialogFooter"; 

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: () => void;
  title: string;
};

export default function Modal({
  children,
  onSave,
  title,
  isOpen,
  setIsOpen,
}: Props) {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      header={<TitleHeader title={title} />}
      visible={isOpen}
      style={{ width: "60vw" }}
      onHide={handleClose}
      footer={<DialogFooter onClose={handleClose} onSave={onSave} />}
    >
      {children}
    </Dialog>
  );
}
