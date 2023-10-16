import { Space } from "antd";
import "./styles.scss";
import { ReactNode } from "react";

interface Props {
  title: string;
  subTitle?: string;
  children?: ReactNode;
}

export default function PageHeader({ title, subTitle, children }: Props) {
  return (
    <div className="page-header">
      <div className="page-header--right">
        <h1>{title}</h1>
        <h2>{subTitle}</h2>
      </div>
      {children && <div className="page-header--left">{children}</div>}
    </div>
  );
}
