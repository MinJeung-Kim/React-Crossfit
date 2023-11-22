import { Button } from "primereact/button";

type Props = {
  onClose: () => void;
  onSave: () => void;
};

export default function DialogFooter({ onClose, onSave }: Props) {
  return (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={onClose}
        className="p-button-text"
      />
      <Button label="Yes" icon="pi pi-check" onClick={onSave} autoFocus />
    </div>
  );
}
