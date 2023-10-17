import React from "react";
import { Modal } from "antd";

interface Props {
  open: boolean;
  handleOk:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  confirmLoading: boolean | undefined;
  handleCancel:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

const DeleteConfirmationModal: React.FC<Props> = ({
  open,
  handleOk,
  confirmLoading,
  handleCancel,
}: Props) => {
  return (
    <>
      <Modal
        title="حذف"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={"بله"}
        cancelText={"انصراف"}
      >
        <p>آیا از حذف این آیتم مطمئن هستید؟</p>
      </Modal>
    </>
  );
};

export default DeleteConfirmationModal;
