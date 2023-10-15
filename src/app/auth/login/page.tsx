import { Card } from "antd";
import InnerLoginForm from "@/components/auth/innerLoginForm/innerLoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Card title="ورود" bordered={false} className="login-page--box">
        <InnerLoginForm />
      </Card>
      <div className="login-page--footer">
        <Link href="/">بازگشت به صفحه اصلی</Link>
      </div>
    </>
  );
}
