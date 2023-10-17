import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./style.scss";

interface TableProps {
  className?: string;
  columns: ColumnsType<object>;
  data: object[];
}

const CustomTable: React.FC<TableProps> = ({
  className,
  columns,
  data,
}: TableProps) => (
  <Table
    columns={columns}
    dataSource={data}
    className={className}
    locale={{ emptyText: "داده ای یافت نشد" }}
  />
);

export default CustomTable;
