"use client";

import callApi from "@/helpers/callApi";
import { AxiosError } from "axios";
import { storeLoginToken } from "@/helpers/auth";
import { useRouter } from "next/navigation";
import User from "@/models/user";
import * as yup from "yup";
import { Button, Form, Input } from "antd";
import { useToasts } from "react-toast-notifications";
import "./styles.scss";

const LoginFormValidationSchema = yup.object().shape({
  username: yup.string().required("وارد کردن نام کاربری الزامی است"),
  password: yup.string().required("وارد کردن گذر واژه الزامی است"),
});
const yupSync = {
  async validator({ field }: any, value: any) {
    await LoginFormValidationSchema.validateSyncAt(field, { [field]: value });
  },
};
const initialFormValues: User = { username: "", password: "" };

export default function InnerLoginForm() {
  const [form] = Form.useForm();
  const { addToast } = useToasts();
  const router = useRouter();

  const submitHandler = async (values: User) => {
    try {
      const res = await callApi().post("/auth/login", values);
      if (res?.data?.status === 401) {
        addToast("نام کاربری یا گذر واژه صحیح نمی باشد", {
          appearance: "error",
        });
      }
      if (res.data.data.id) {
        await storeLoginToken(res.data?.data?.token);
        router.push("/panel/reports");
        await addToast("ورود با موفقیت انجام شد", {
          appearance: "success",
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        await addToast("خطا در برقراری ارتباط با سرور", {
          appearance: "error",
        });
      }
    }
  };

  return (
    <Form
      name="login"
      className="login-form"
      form={form}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialFormValues}
      onFinish={submitHandler}
    >
      <Form.Item label="نام کاربری" name="username" rules={[yupSync]}>
        <Input />
      </Form.Item>

      <Form.Item label="گذر واژه" name="password" rules={[yupSync]}>
        <Input.Password />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        ورود
      </Button>
    </Form>
  );
}
