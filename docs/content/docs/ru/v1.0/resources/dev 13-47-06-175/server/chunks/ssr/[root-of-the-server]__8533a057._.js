module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/app/fontgantari_245156e2.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "fontgantari_245156e2-module__RZtZzq__className",
  "variable": "fontgantari_245156e2-module__RZtZzq__variable",
});
}),
"[project]/src/app/fontgantari_245156e2.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$fontgantari_245156e2$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/fontgantari_245156e2.module.css [app-ssr] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$fontgantari_245156e2$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'fontGantari', 'fontGantari Fallback'"
    }
};
if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$fontgantari_245156e2$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$fontgantari_245156e2$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/src/shared/site.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    profile: "/user/profile",
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
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/utils/axios.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteRequest",
    ()=>deleteRequest,
    "getError",
    ()=>getError,
    "getRequest",
    ()=>getRequest,
    "patchRequest",
    ()=>patchRequest,
    "postRequest",
    ()=>postRequest,
    "putRequest",
    ()=>putRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/site.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
;
;
let refreshAndRetryQueue = [];
let isRefreshing = false;
const axiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create();
axiosInstance.interceptors.response.use((response)=>response, async (error)=>{
    const originalRequest = error.config;
    const code = error.response.data.code;
    if (code === "expired_token" && error.response.status === 401) {
        if (!isRefreshing) {
            isRefreshing = true;
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].http_client_base}${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].refresh_token}`);
                refreshAndRetryQueue.forEach(({ config, resolve, reject })=>{
                    axiosInstance.request(config).then((response)=>resolve(response)).catch((err)=>reject(err));
                });
                refreshAndRetryQueue = [];
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                if (window.location.pathname !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].sign_in) window.location.href = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].sign_in}?next=${window.location.pathname}`;
                throw refreshError;
            } finally{
                isRefreshing = false;
            }
        }
        return new Promise((resolve, reject)=>{
            refreshAndRetryQueue.push({
                config: originalRequest,
                resolve,
                reject
            });
        });
    }
    return Promise.reject(error);
});
const customRequest = async ({ method = "get", url, headers = {}, data = {}, withCredentials = true, baseURL = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].http_client_base })=>{
    return await axiosInstance({
        method,
        url: url.endsWith("/") ? url.slice(0, -1) : url,
        data,
        headers,
        withCredentials,
        baseURL
    });
};
const getRequest = async (params)=>await customRequest(params);
const postRequest = async (params)=>await customRequest({
        ...params,
        method: "post"
    });
const putRequest = async (params)=>await customRequest({
        ...params,
        method: "put"
    });
const patchRequest = async (params)=>await customRequest({
        ...params,
        method: "patch"
    });
const deleteRequest = async (params)=>await customRequest({
        ...params,
        method: "delete"
    });
const getError = (error)=>{
    return {
        data: error.response?.data,
        status: error.response?.status
    };
};
}),
"[project]/src/providers/alert.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAlertStore",
    ()=>useAlertStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
;
const useAlertStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set)=>({
        alert: {
            isVisible: false,
            title: "",
            description: "Alert description",
            color: "success",
            variant: "flat"
        },
        setAlert: (payload)=>set((state)=>({
                    alert: typeof payload === "function" ? payload(state.alert) : payload
                }))
    }));
}),
"[project]/src/providers/user.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserContext",
    ()=>UserContext,
    "UserProvider",
    ()=>UserProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/site.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/axios.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$alert$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/providers/alert.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const UserContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function UserProvider({ children }) {
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const { setAlert } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$alert$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAlertStore"])();
    const getUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const { data } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRequest"])({
                url: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].profile
            });
            setUser(data);
        } catch (err) {
            const { data, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getError"])(err);
            if (status && status >= 500) {
                setAlert((prev)=>({
                        ...prev,
                        isVisible: true,
                        color: "danger",
                        description: "Internal server error."
                    }));
            } else {
                setAlert((prev)=>({
                        ...prev,
                        isVisible: true,
                        color: "danger",
                        description: data?.message
                    }));
            }
        } finally{
            setIsLoading(true);
        }
    }, [
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        getUser();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UserContext.Provider, {
        value: {
            user,
            isLoading,
            setUser
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/providers/user.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$fontgantari_245156e2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/fontgantari_245156e2.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$system$2f$dist$2f$chunk$2d$3KFOFPK7$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@heroui/system/dist/chunk-3KFOFPK7.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$user$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/providers/user.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        suppressHydrationWarning: true,
        lang: "en",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$fontgantari_245156e2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].className,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$system$2f$dist$2f$chunk$2d$3KFOFPK7$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeroUIProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$user$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserProvider"], {
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/app/layout.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/layout.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/layout.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8533a057._.js.map