import { Dispatch, SetStateAction, SVGProps } from "react";
import { AxiosError } from "axios";
import { SortDescriptor } from "@heroui/react";

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
  title: string;
  description: string;
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  variant: "solid" | "flat" | "faded" | "bordered";
}

interface SubscritionProps {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  credit: string;
  credit_expense: string;
  discount: string;
  auto_renew: boolean;
  rate: number;
  rate_time: number;
  rate_usage: string;
  rate_reset: null;
  price: string;
  status: "active" | "expired" | "canceled";
  period: "monthly" | "annual";
  start_date: string;
  end_date: string;
}

interface BalanceProps {
  id: number;
  subscription: SubscritionProps;
  created_at: string;
  updated_at: string;
  cash: number;
  chargeable: boolean;
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
  balance: BalanceProps;
  is_blocked: boolean;
  is_active: boolean;
  regular_auth: boolean;
}

export interface TTSConfigProps {
  format: string;
  model: string;
  emotion: string;
}
export interface TTSConfigListProps {
  formats: string[];
  models: string[];
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

export type AxiosErrorProps = AxiosError<{ message?: string }>;

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

export interface TransactionHistoryProps {
  data: TransactionResultsProps[];
  page_size: string;
  page: number;
  total: number;
  order: undefined | SortDescriptor;
  loading: boolean;
}

export interface TransactionToolbarProps {
  history: TransactionHistoryProps;
  getHistory: (page: number, page_size: string) => void;
}

interface ExpenseResultsProps {
  id: number;
  operation: "stt" | "tts";
  credit: string;
  cash: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseProps {
  data: ExpenseResultsProps[];
  page_size: string;
  page: number;
  total: number;
  order: undefined | SortDescriptor;
  loading: boolean;
}

export interface ExpenseToolbarProps {
  history: ExpenseProps;
  getHistory: (page: number, page_size: string) => void;
}

export interface PlansProps {
  id: number;
  title: string;
  description: string;
  rate: {
    stt: {
      credit: {
        limit: string;
        time: number;
      };
    };
    tts: {
      credit: {
        limit: string;
        time: number;
      };
    };
    chat: {
      max_sessions: number;
      credit: {
        limit: string;
        time: number;
      };
      session: {
        limit: string;
      };
    };
  };
  monthly: {
    credit: string;
    price: string;
    discount: string;
  };
  annual: {
    credit: string;
    price: string;
    discount: string;
  };
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
