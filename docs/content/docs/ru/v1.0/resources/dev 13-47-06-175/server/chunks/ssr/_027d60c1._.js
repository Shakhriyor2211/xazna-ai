module.exports = [
"[project]/src/actions/base.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setCookie",
    ()=>setCookie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
async function setCookie(name, value) {
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).set(name, value);
}
}),
"[project]/src/shared/site.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTH_ROUTES",
    ()=>AUTH_ROUTES,
    "COLORS",
    ()=>COLORS,
    "ENDPOINTS",
    ()=>ENDPOINTS,
    "META",
    ()=>META,
    "PUBLIC_ROUTES",
    ()=>PUBLIC_ROUTES,
    "ROUTES",
    ()=>ROUTES,
    "STT_CONFIGS",
    ()=>STT_CONFIGS,
    "TTS_CONFIGS",
    ()=>TTS_CONFIGS,
    "WS_SERVER_URL",
    ()=>WS_SERVER_URL
]);
const META = {
    name: "Xazna ai",
    description: "Xazna ai platform"
};
const ROUTES = {
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
    keys: "/keys"
};
const PUBLIC_ROUTES = [];
const AUTH_ROUTES = [
    "/auth/sign-in"
];
const ENDPOINTS = {
    http_server_base: `${("TURBOPACK compile-time value", "http://localhost:8000")}/api/v1`,
    http_client_base: "/api/v1",
    ws_server_base: `${("TURBOPACK compile-time value", "ws://localhost:8000")}/ws/v1`,
    ws_client_base: "/ws",
    refresh_token: "/auth/token/refresh",
    verify_token: "/auth/token/verify",
    sign_in: "/auth/sign-in",
    sign_up: "/auth/sign-up",
    sign_out: "/auth/sign-out",
    google_oauth: "/auth/google/oauth",
    password_reset: "/auth/password/reset",
    profile: "/user/profile/",
    resend_email_code: "/auth/resend/email/code",
    verify_email_code: "/auth/verify/email/code",
    password_reset_confirm: "/auth/password/reset/confirm",
    change_account_info: "/user/profile/info",
    change_account_image: "/user/profile/image",
    password_change: "/auth/password/change",
    tts_generate: "/tts/user/generate",
    tts_list: "/tts/user/list",
    stt_generate: "/stt/user/generate",
    stt_list: "/stt/user/list",
    stt_item: "/stt/user/item",
    tts_item: "/tts/user/item",
    audio_stream: "/protected/media/audio/stream",
    audio_download: "/protected/media/audio/download",
    tts_search: "/tts/search",
    stt_search: "/stt/search",
    tts_settings: "/tts/settings",
    plan: "/plan/list",
    plan_info: "/plan/info",
    sub_manage: "/sub/manage",
    sub_change: "/sub/change",
    sub_restart: "/sub/restart",
    finance_info: "/finance/info",
    balance_manage: "/finance/balance/manage",
    transaction_list: "/finance/transaction/list",
    user_monitorting_list: "/finance/user/expense/list",
    key_monitorting_list: "/finance/user/token/expense/list",
    key_list: "/service/token/list",
    chat_session_generate: "/llm/user/session/generate",
    llm_session_list: "/llm/user/session/list",
    llm_session_item: "/llm/user/session/item",
    llm_message: "/llm/user/message",
    llm_message_list: "/llm/user/session/message",
    token_generate: "/service/token/generate",
    token_item: "/service/token/item",
    token_key: "/service/token/key",
    token_manage: "/service/token/manage",
    user_list: "/user/list"
};
const WS_SERVER_URL = ("TURBOPACK compile-time value", "ws://localhost:8000");
const COLORS = {
    primary: "#62C069"
};
const TTS_CONFIGS = {
    max_length: 5000,
    pagination: {
        default_rows: 4,
        load_rows: 4
    }
};
const STT_CONFIGS = {
    pagination: {
        rows_per_page: 4
    }
};
}),
"[project]/src/actions/profile.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"009b0390c952713b635cf4efb24e41e46c58693cef":"profileAction"},"",""] */ __turbopack_context__.s([
    "profileAction",
    ()=>profileAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$base$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/base.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/site.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function profileAction() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$base$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseAction"])({
        url: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ENDPOINTS"].http_server_base}${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ENDPOINTS"].user_list}`,
        method: "GET",
        cache: "no-store"
    });
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    profileAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(profileAction, "009b0390c952713b635cf4efb24e41e46c58693cef", null);
}),
"[project]/.next-internal/server/app/account/user/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/profile.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$profile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/profile.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/account/user/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/profile.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "009b0390c952713b635cf4efb24e41e46c58693cef",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$profile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["profileAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$account$2f$user$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$profile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/account/user/page/actions.js { ACTIONS_MODULE0 => "[project]/src/actions/profile.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$profile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/profile.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_027d60c1._.js.map