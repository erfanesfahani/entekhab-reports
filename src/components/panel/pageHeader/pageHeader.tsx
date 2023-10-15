import { Space } from "antd";
import "./styles.scss";

interface Props {
  title: string;
  subTitle?: string;
}

export default function PageHeader({ title, subTitle }: Props) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      <h2>{subTitle}</h2>
    </div>
  );
}
