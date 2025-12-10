import { Dispatch, SetStateAction, SVGProps } from "react";
import { AxiosError } from "axios";
import { SortDescriptor } from "@heroui/react";
import { Key } from "@react-types/shared";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface FileProps {
  id: string | null;
  name: string;
  size: number;
}

export interface AlertProps {
  isVisible: boolean;
  title?: string;
  description: string;
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  variant: "solid" | "flat" | "faded" | "bordered";
}

interface SubProps {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  credit: string;
  credit_expense: string;
  discount: string;
  auto_renew: boolean;
  price: string;
  status: "active" | "expired" | "canceled";
  period: "monthly" | "annual";
  start_date: string;
  end_date: string;
}

export interface BalanceProps {
  id: number;
  created_at: string;
  updated_at: string;
  cash: number;
  chargeable: boolean;
}


export interface FinanceProps {
  balance: BalanceProps;
  sub: SubProps;
}

export interface UserProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  picture: { portrait: string | null };
  role: "admin" | "superadmin" | "user";
  created_at: string;
  last_password_update: string | null;
  is_blocked: boolean;
  is_active: boolean;
  regular_auth: boolean;
}

export interface TTSConfigProps {
  format: string;
  mdl: string;
  emotion: string;
}
export interface TTSConfigListProps {
  formats: string[];
  mdls: string[];
  emotions: string[];
}

export interface FormProps {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  new_password?: string;
  old_password?: string;
}

export interface FetchErrorProps {
  response?: {
    data?: {
      message?: string;
      [key: string]: any;
    };
    status?: number;
    [key: string]: any;
  };
}

export interface UserStoreProps {
  user: UserProps | null;
  setUser: Dispatch<SetStateAction<UserProps | null>>;
}

export type AxiosErrorProps = AxiosError<{ message?: string, code?: string }>;

interface ContentResultsProps {
  id: string;
  text: string;
  audio: {
    id: string;
    name: string;
  };
  created_at: string;
}

export interface ContentDataProps {
  id: string;
  text: string | null;
  audioUrl: string;
  downloadUrl: string;
}

export interface ContentHistoryProps {
  results: ContentResultsProps[];
  total: number;
  range: number;
  isLoading: boolean;
  showInput: boolean;
  showControls: boolean;
  scrollBottom?: boolean;
}

export type PaymentProviderProps = "xazna" | "click" | "payme";

interface TransactionResultsProps {
  id: number;
  amount: string;
  currency: "uzs" | "usd";
  provider: PaymentProviderProps;
  method: "uzcard" | "humo" | "visa" | "mastercard" | "unionpay";
  status: "pending" | "completed" | "failed" | "canceled";
  created_at: string;
  updated_at: string;
}


export interface TableProps {
  page_size: string;
  page: number;
  total: number;
  order: SortDescriptor;
  loading: boolean;
}

interface ExpenseResultsProps {
  id: number;
  operation: "stt" | "tts" | "llm";
  credit: string;
  cash: string;
  created_at: string;
  updated_at: string;
}

export interface KeyResultsProps {
  id: number;
  name: string;
  last_symbols: string;
  is_active: boolean;
  permission: {
    llm: "disable" | "enable",
    tts: "disable" | "enable",
    stt: "disable" | "enable",
    history: "disable" | "write" | "read" | "all",
    monitoring: "disable" | "write" | "read" | "all"
  },
  created_at: string;
}


export interface ExpenseProps extends TableProps {
  data: ExpenseResultsProps[];
}


export interface KeyProps extends TableProps {
  data: KeyResultsProps[];
}


export interface TransactionProps extends TableProps {
  data: TransactionResultsProps[];
}

export interface ExpenseTableProps {
  history: ExpenseProps;
  getHistory: (page: number,
    page_size: string,
    column: Key,
    direction: "ascending" | "descending") => void;
}

export interface KeyTableProps {
  history: KeyProps;
  getHistory: (page: number,
    page_size: string,
    column: Key,
    direction: "ascending" | "descending") => void;
}

export interface TransactionTableProps {
  history: TransactionProps;
  getHistory: (page: number,
    page_size: string,
    column: Key,
    direction: "ascending" | "descending") => void;
}

export interface PlansProps {
  id: number;
  title: string;
  description: string;
  llm_rate: {
    credit_limit: string;
    credit_time: number;
  };
  tts_rate: {
    credit_limit: string;
    credit_time: number;
  };
  stt_rate: {
    credit_limit: string;
    credit_time: number;
  };
  monthly_credit: string;
  monthly_price: string;
  monthly_discount: string;
  annual_credit: string;
  annual_price: string;
  annual_discount: string;
}

export interface ChatMessageProps {
  id?: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
  updated_at?: string;
}

export interface ChatSessionProps {
  id?: string;
  title: string;
  created_at?: string;
  updated_at?: string;
  first_content: string | null;
}
