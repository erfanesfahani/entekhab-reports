import * as yup from "yup";
import { Button, Form, Input } from "antd";
import Report from "@/models/report";
import yupValidator from "@/hooks/yupValidator";
import { CreateReport } from "@/services/report";

import "./styles.scss";

const ReportFormValidationSchema = yup.object().shape({
  title: yup.string().required("وارد کردن نام الزامی است"),
  description: yup.string().required("یک توضیح مختصر ذکر کنید"),
  time: yup.string(),
  date: yup.string(),
});
const yupSync = yupValidator(ReportFormValidationSchema);
const initialFormValues: Report = {
  title: "",
  description: "",
  time: "",
  date: "",
};

export default function ReportForm() {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const submitHandler = async (values: Report) => {
    try {
      console.log("values", values);
      const res = await CreateReport(values);
      console.log("Data", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      name="report"
      className="report-form mt-4"
      form={form}
      initialValues={initialFormValues}
      onFinish={submitHandler}
    >
      <Form.Item
        label="نام"
        name="title"
        rules={[yupValidator(ReportFormValidationSchema)]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="توضیحات" name="description" rules={[yupSync]}>
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item label="زمان" name="time" rules={[yupSync]}>
        <Input />
      </Form.Item>

      <Form.Item label="تاریخ" name="date" rules={[yupSync]}>
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        ایجاد
      </Button>
    </Form>
  );
}
