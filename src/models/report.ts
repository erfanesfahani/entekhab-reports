import { Dayjs } from "dayjs";
import { DateObject } from "react-multi-date-picker";

export default interface Report {
  id?: string;
  title: string;
  description: string;
  time?: string | Dayjs;
  date?: string | DateObject;
}
