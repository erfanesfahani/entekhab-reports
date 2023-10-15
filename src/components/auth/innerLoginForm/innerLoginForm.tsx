"use client";

import * as yup from "yup";
import { Button, Form, Input } from "antd";
import User from "@/models/user";
import "./styles.scss";
import callApi from "@/helpers/callApi";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { storeLoginToken } from "@/helpers/auth";

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
  const router = useRouter();
  const [form] = Form.useForm();

  const submitHandler = async (values: User) => {
    try {
      const res = await callApi().post("/auth/login", values);
      if (res?.data?.status === 401) {
        console.log("نام کاربری یا گذر واژه صحیح نمی باشد");
      }
      console.log(res.data?.data?.token);
      if (res.data.data.id) {
        await storeLoginToken(res.data?.data?.token);
        router.push("/panel/reports");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("خطا در برقراری ارتباط");
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
