import { useState } from "react";
import { CreateReport, UpdateReport } from "@/services/report";
import * as yup from "yup";
import yupValidator from "@/hooks/yupValidator";
import { useRouter } from "next/navigation";
import { Button, Form, Input, TimePicker } from "antd";
import Report from "@/models/report";
import { useToasts } from "react-toast-notifications";
import DatePicker, { DateObject, Value } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_fa from "react-date-object/locales/gregorian_fa";

import "./styles.scss";
import { dateToJalali } from "@/hooks/getDate";
import dayjs from "dayjs";

interface ReportFormProps {
  method: "edit" | "add";
  singleReport?: Report;
}

const ReportFormValidationSchema = yup.object().shape({
  title: yup.string().required("وارد کردن نام الزامی است"),
  description: yup.string().required("یک توضیح مختصر ذکر کنید"),
  time: yup.string(),
  date: yup.string(),
});
const yupSync = yupValidator(ReportFormValidationSchema);

export default function ReportForm({ method, singleReport }: ReportFormProps) {
  const [form] = Form.useForm();
  const [datePickerValue, setDatePickerValue] = useState<Value | string>(
    method === "edit" ? dateToJalali(singleReport?.date) : ""
  );
  const [Mdate, setMDate] = useState(
    method === "edit" ? singleReport?.date : ""
  );
  const [Etime, setETime] = useState(
    `${dayjs(new Date()).toDate().getHours()}:${dayjs(new Date())
      .toDate()
      .getMinutes()}`
  );
  const router = useRouter();
  const { addToast } = useToasts();
  const initialValues: Report = {
    title: singleReport?.title || "",
    description: singleReport?.description || "",
    time: dayjs(new Date()),
    date: singleReport?.date || "",
  };
  const datePickerHandler = (value: any) => {
    setDatePickerValue(datePickerValue);
    setMDate(new DateObject(value).convert(gregorian, gregorian_fa).format());
  };
  const timePickerHandler = (value: any) => {
    const hour = value?.toDate().getHours().toString();
    const minute = value?.toDate().getMinutes().toString();
    setETime(`${hour}:${minute}`);
  };
  const { TextArea } = Input;
  const submitHandler = async (values: Report) => {
    if (method === "add") {
      try {
        const res = await CreateReport({
          ...values,
          date: Mdate,
          time: Etime,
        });
        if (res.status === 201) {
          addToast("گزارش با موفقیت ایجاد شد", {
            appearance: "success",
          });
          router.push("/panel/reports");
        }
      } catch (error) {
        addToast("خطایی در ایجاد گزارش وجود دارد", {
          appearance: "error",
        });
      }
    } else if (method === "edit" && singleReport?.id) {
      try {
        const res = await UpdateReport(singleReport.id, {
          ...values,
          date: Mdate,
          time: Etime,
        });

        if (res.status === 200) {
          addToast("گزارش با موفقیت اصلاح شد", {
            appearance: "success",
          });
          router.push("/panel/reports");
        }
      } catch (error) {
        addToast("خطایی در ایجاد گزارش وجود دارد", {
          appearance: "error",
        });
      }
    }
  };
  return (
    <Form
      name="report"
      className="report-form mt-4"
      form={form}
      initialValues={initialValues}
      onFinish={submitHandler}
    >
      <Form.Item
        label="نام"
        name="title"
        rules={[yupValidator(ReportFormValidationSchema)]}
        wrapperCol={{ span: 9 }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="توضیحات"
        name="description"
        rules={[yupSync]}
        wrapperCol={{ span: 8 }}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item label="زمان" name="time" rules={[yupSync]}>
        <TimePicker
          name="time"
          format={"HH:mm"}
          placeholder="دقیقه:ساعت"
          onChange={timePickerHandler}
        />
      </Form.Item>

      <Form.Item name="date" label="تاریخ" className="date-picker-item">
        <DatePicker
          format="YYYY/MM/DD"
          calendar={persian}
          locale={persian_fa}
          value={datePickerValue}
          onChange={datePickerHandler}
          inputClass="ant-input"
          placeholder="انتخاب کنید"
        />
        <Input hidden />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        ایجاد
      </Button>
    </Form>
  );
}
