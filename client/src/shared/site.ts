export const META = {
  name: "Xazna ai",
  description: "Xazna ai platform",
};

export const ROUTES = {
  main: "/",
  sign_in: "/auth/sign-in",
  sign_up: "/auth/sign-up",
  verify_email: "/auth/verify/email",
  password_reset: "/auth/reset-password",
  password_reset_confirm: "/auth/reset-password/confirm",
  user_profile: "/user/profile",
  monitoring: "/monitoring",
  key_monitoring: "/monitoring",
  docs: "/docs",
  tts: "/tts",
  stt: "/stt",
  chatbot: "/chatbot",
  sub: "/sub",
  transactions: "/transactions",
  keys: "/keys",
};

export const ENDPOINTS = {
  http_server_base: `${process.env.NEXT_PUBLIC_HTTP_SERVER_URL}/api`,
  http_client_base: "/api",
  ws_server_base: `${process.env.NEXT_PUBLIC_WS_SERVER_URL}/ws`,
  ws_client_base: "/ws",
  refresh_token: "/auth/token/refresh",
  verify_token: "/auth/token/verify",
  sign_in: "/auth/sign-in",
  sign_up: "/auth/sign-up",
  sign_out: "/auth/sign-out",
  google_oauth: "/auth/google/oauth",
  password_reset: "/auth/password/reset",
  profile: "/user/profile",
  resend_email_code: "/auth/resend/email/code",
  verify_email_code: "/auth/verify/email/code",
  password_reset_confirm: "/auth/password/reset/confirm",
  change_account_info: "/user/profile/info",
  change_account_image: "/user/profile/image",
  password_change: "/auth/password/change",
  tts_generate: "tts/user/generate",
  tts_list: "tts/user/list",
  stt_generate: "stt/user/generate",
  stt_list: "stt/user/list",
  stt_item: "stt/user/item",
  tts_item: "tts/user/item",
  audio_stream: "protected/media/audio/stream",
  audio_download: "protected/media/audio/download",
  tts_search: "tts/search",
  stt_search: "stt/search",
  tts_settings: "tts/settings",
  plans: "plan/list",
  sub_manage: "sub/manage",
  sub_change: "sub/change",
  sub_restart: "sub/restart",
  finance_info: "finance/info",
  balance_manage: "finance/balance/manage",
  transaction_list: "finance/transaction/list",
  user_monitorting_list: "finance/user/expense/list",
  key_monitorting_list: "finance/user/token/expense/list",
  key_list: "service/token/list",
  chat_session_generate: "llm/user/session/generate",
  llm_session_list: "llm/user/session/list",
  llm_session_item: "llm/user/session/item",
  llm_message: "llm/user/message",
  llm_message_list: "llm/user/session/message",
  token_generate: "service/token/generate",
  token_item: "service/token/item",
  token_key: "service/token/key",
  token_manage: "service/token/manage",
};

export const WS_SERVER_URL = process.env.NEXT_PUBLIC_WS_SERVER_URL;

export const COLORS = {
  primary: "#62C069",
};

export const TTS_CONFIGS = {
  max_length: 5000,
  pagination: {
    default_rows: 4,
    load_rows: 4,
  },
};

export const STT_CONFIGS = {
  pagination: {
    rows_per_page: 4,
  },
};
