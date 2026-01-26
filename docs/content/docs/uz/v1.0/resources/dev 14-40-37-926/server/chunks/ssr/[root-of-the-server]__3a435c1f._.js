module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:module [external] (node:module, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:module", () => require("node:module"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/node:vm [external] (node:vm, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:vm", () => require("node:vm"));

module.exports = mod;
}),
"[externals]/esbuild [external] (esbuild, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("esbuild", () => require("esbuild"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
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
"[project]/src/utils/alert.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AlertSnackbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$alert$2f$dist$2f$chunk$2d$OLUJUNJU$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__alert_default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroui/alert/dist/chunk-OLUJUNJU.mjs [app-ssr] (ecmascript) <export alert_default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$alert$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/providers/alert.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function AlertSnackbar() {
    const { alert, setAlert } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$alert$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAlertStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!alert.isVisible) return;
        const timer = setTimeout(()=>{
            setAlert((prev)=>({
                    ...prev,
                    isVisible: false
                }));
        }, 4000);
        return ()=>clearTimeout(timer);
    }, [
        alert
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-4 right-4 z-[200] max-w-96 sm:w-96 sm:max-w-none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$alert$2f$dist$2f$chunk$2d$OLUJUNJU$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__alert_default__as__Alert$3e$__["Alert"], {
            ...alert,
            onClose: ()=>setAlert((prev)=>({
                        ...prev,
                        isVisible: false
                    }))
        }, void 0, false, {
            fileName: "[project]/src/utils/alert.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/utils/alert.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/shared/site.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COLORS",
    ()=>COLORS,
    "ENDPOINTS",
    ()=>ENDPOINTS,
    "META",
    ()=>META,
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
    token_manage: "service/token/manage"
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
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/utils/axios-instance.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
                const _ = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].http_client_base}${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].refresh_token}`);
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
"[project]/src/providers/user.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserContext",
    ()=>UserContext,
    "UserProvider",
    ()=>UserProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axios$2d$instance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/axios-instance.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/site.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const UserContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function UserProvider({ children }) {
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const getUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axios$2d$instance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRequest"])({
                url: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].profile
            });
            setUser(res.data);
        } catch  {} finally{
            setIsLoaded(true);
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
            isLoaded,
            setUser
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/providers/user.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3a435c1f._.js.map