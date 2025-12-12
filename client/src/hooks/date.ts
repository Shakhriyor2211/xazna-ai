import dateFormat, { i18n } from "dateformat";
import { useLocale } from "next-intlayer";

const monthNames = {
  en: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ],
  ru: [
    "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек",
    "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
  ],
  uz: [
    "Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek",
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
  ],
};

const dayNames = {
  en: [
    "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ],
  ru: [
    "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс",
    "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"
  ],
  uz: [
    "Du", "Se", "Cho", "Pa", "Ju", "Sha", "Ya",
    "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"
  ],
};

export default function useDate() {
  const { locale } = useLocale()

  const formatDate = (value: string, format: string) => {
    i18n.monthNames = monthNames[locale as "uz" | "ru" | "en"];
    i18n.dayNames = dayNames[locale as "uz" | "ru" | "en"];
    const date = new Date(value);
    return dateFormat(date, format);
  };

  const shortDate = (value: string) => formatDate(value, "shortDate");
  const paddedShortDate = (value: string) =>
    formatDate(value, "paddedShortDate");
  const mediumDate = (value: string) => formatDate(value, "mediumDate");
  const longDate = (value: string) => formatDate(value, "longDate");
  const fullDate = (value: string) => formatDate(value, "fullDate");

  return { shortDate, paddedShortDate, mediumDate, longDate, fullDate };
}
