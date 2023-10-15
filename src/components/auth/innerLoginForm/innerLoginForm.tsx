"use client";

import * as yup from "yup";
import { Button, Form, Input } from "antd";
import User from "@/models/user";
import "./styles.scss";
import callApi from "@/helpers/callApi";

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

  const submitHandler = async (values: User) => {
    alert(JSON.stringify(values));
    // form.setFieldValue("user", "test");
    // if (values.user === "esfahani") {
    //   form.setFields([{ name: "user", errors: ["invalid mmmm"] }]);
    // }
    console.log(values);
    const res = await callApi().post("/auth/login", values);
    if (res?.data?.status === 401) {
      console.log("errorrrrrrrrr");
    } else {
      console.log(res?.data?.data);
      form.resetFields();
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
      autoComplete="off"
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
