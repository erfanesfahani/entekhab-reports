import useSWR from "swr";
import CustomTable from "@/components/shared/customTable/customTable";
import callApi from "@/helpers/callApi";
import setConfigHeader from "@/hooks/setConfigHeader";
import { DeleteReport } from "@/services/report";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Space } from "antd";
import DeleteConfirmationModal from "@/components/shared/deleteConfirmationModal/deleteConfirmationModal";

interface Props {}

export default function ReportTable({}: Props) {
  const GetReportsData = () =>
    callApi()
      .get("/reports", setConfigHeader())
      .then((res) => res.data);
  const { data, error, mutate } = useSWR("/reports", GetReportsData);

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
    },
    {
      title: "تاریخ",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "",
      key: "action",
      render: (text, _, record) => (
        <Space size="middle">
          <a onClick={() => showModal(text.id)}>حذف</a>
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
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  console.log("swr data", data);

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
