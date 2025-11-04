export const META = {
  name: "Xazna ai",
  description: "Xazna ai platform",
};

export const ROUTES = {
  main: "/",
  sign_in: "/auth/sign-in",
  sign_up: "/auth/sign-up",
  verify_email: "/verify/email",
  password_reset: "/auth/reset-password",
  password_reset_confirm: "/auth/reset-password/confirm",
  user_profile: "/user/profile",
  monitoring: "/monitoring",
  docs: "/docs",
  tts: "/tts",
  stt: "/stt",
  chat: "/chat",
  subscription: "/subscription",
  transactions: "/transactions",
};

export const ENDPOINTS = {
  server_base: `${process.env.NEXT_PUBLIC_HTTP_SERVER_URL}/api`,
  client_base: "/api",
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
  tts_generate: "tts/generate",
  tts_list: "tts/list",
  stt_generate: "stt/generate",
  stt_list: "stt/list",
  stt_delete: "stt/delete",
  tts_delete: "tts/delete",
  stt_change: "stt/change",
  audio_stream: "protected/media/audio/stream",
  audio_download: "protected/media/audio/download",
  tts_search: "tts/search",
  stt_search: "stt/search",
  tts_settings: "tts/settings",
  plans: "plan/list",
  subsciritpion_manage: "subscription/manage",
  subsciritpion_change: "subscription/change",
  subsciritpion_restart: "subscription/restart",
  balance_manage: "finance/balance/manage",
  transaction_list: "finance/transaction/list",
  monitorting_list: "finance/expense/list",
  chat_session_generate: "chat/session/generate",
  chat_session_list: "chat/session/list",
  chat_session: "chat/session",
  chat_message: "chat/message",
  chat_message_list: "chat/session/message",
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
