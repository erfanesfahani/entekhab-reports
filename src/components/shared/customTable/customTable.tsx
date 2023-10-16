import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

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
  <Table columns={columns} dataSource={data} className={className} />
);

export default CustomTable;
