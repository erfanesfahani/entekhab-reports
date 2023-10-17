import useSWR from "swr";
import CustomTable from "@/components/shared/customTable/customTable";
import callApi from "@/helpers/callApi";
import setConfigHeader from "@/hooks/setConfigHeader";
import { DeleteReport } from "@/services/report";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Space } from "antd";
import DeleteConfirmationModal from "@/components/shared/deleteConfirmationModal/deleteConfirmationModal";
import { dateToJalali } from "@/hooks/getDate";
import Link from "next/link";
import { useToasts } from "react-toast-notifications";

interface Props {}

export default function ReportTable({}: Props) {
  const GetReportsData = () =>
    callApi()
      .get("/reports", setConfigHeader())
      .then((res) => res.data);
  const { data, error, mutate } = useSWR("/reports", GetReportsData);
  const { addToast } = useToasts();

  const columns: ColumnsType<object> = [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "زمان",
      dataIndex: "time",
      key: "time",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "تاریخ",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{dateToJalali(text)}</span>,
    },
    {
      title: "",
      key: "action",
      render: (text, _, record) => (
        <Space size="middle">
          <Link
            className="text-decoration-none"
            href={`/panel/reports/${text.id}/edit`}
          >
            ویرایش
          </Link>
          <a
            className="text-danger text-decoration-none"
            onClick={() => showModal(text.id)}
          >
            حذف
          </a>
        </Space>
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const [DeletableItem, setDeletableItem] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = (id: string) => {
    setOpen(true);
    setDeletableItem(id);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(async () => {
      await DeleteReport(DeletableItem);
      await mutate();
      setOpen(false);
      addToast("آیتم مورد نظر با موفقیت حذف شد", {
        appearance: "success",
      });
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="report-table my-4">
      <DeleteConfirmationModal
        open={open}
        confirmLoading={confirmLoading}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
      <CustomTable columns={columns} data={data?.data} />
    </div>
  );
}
