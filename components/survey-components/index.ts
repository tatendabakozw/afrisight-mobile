import DatePicker from "./DatePicker";
import FilePicker from "./FilePicker";
import ShortAnswer from "./ShortAnswer";
import Paragraph from "./Paragraph";
import Option from "./Option";

const SurveyComponents = {
  DatePicker,
  FilePicker,
  ShortAnswer,
  Paragraph,
  Option,
};

export type SectionKey =
  | "short-answer"
  | "date"
  | "multiple-choice"
  | "file-upload"
  | "text-area"
  | "paragraph";

export type SurveyComponentProps = {
  question: string;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  optional?: boolean;
  options?: { _id: string; name: string }[];
};

export const getSurveyComponent = (type: string) => {
  switch (type) {
    case "short-answer":
      return SurveyComponents.ShortAnswer;
    case "date":
      return SurveyComponents.DatePicker;
    case "multiple-choice":
      return SurveyComponents.Option;
    case "file-upload":
      return SurveyComponents.FilePicker;
    case "paragraph":
      return SurveyComponents.Paragraph;
    default:
      return SurveyComponents.ShortAnswer;
  }
};
