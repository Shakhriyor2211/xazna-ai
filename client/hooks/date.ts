import dateFormat from "dateformat";

export default function useDate() {
  const formatDate = (value: string, format: string) => {
    return dateFormat(value, format);
  };

  const shortDate = (value: string) => formatDate(value, "shortDate");
  const paddedShortDate = (value: string) =>
    formatDate(value, "paddedShortDate");
  const mediumDate = (value: string) => formatDate(value, "mediumDate");
  const longDate = (value: string) => formatDate(value, "longDate");
  const fullDate = (value: string) => formatDate(value, "fullDate");

  return { shortDate, paddedShortDate, mediumDate, longDate, fullDate };
}
