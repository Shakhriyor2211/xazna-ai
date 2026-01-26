module.exports = [
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/shared/site.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
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
    plans: "/plan/list",
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
    token_manage: "/service/token/manage"
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
"[project]/.intlayer/config/configuration.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"internationalization":{"locales":["uz","en","ru"],"requiredLocales":["uz","en","ru"],"strictMode":"inclusive","defaultLocale":"uz"},"routing":{"mode":"prefix-no-default","storage":{"type":"cookie","name":"locale"},"basePath":""},"content":{"fileExtensions":[".content.ts",".content.js",".content.cjs",".content.cjx",".content.mjs",".content.mjx",".content.json",".content.tsx",".content.jsx"],"baseDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client","excludedPath":["**/node_modules/**","**/dist/**","**/build/**","**/.intlayer/**","**/.next/**","**/.nuxt/**","**/.expo/**","**/.vercel/**","**/.turbo/**","**/.tanstack/**"],"watch":true,"contentDir":["/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client"],"moduleAugmentationDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/types","unmergedDictionariesDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/unmerged_dictionary","remoteDictionariesDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/remote_dictionary","dictionariesDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/dictionary","dynamicDictionariesDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/dynamic_dictionary","fetchDictionariesDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/fetch_dictionary","typesDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/types","mainDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/main","configDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/config","cacheDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/cache","watchedFilesPattern":["/**/*.content.ts","/**/*.content.js","/**/*.content.cjs","/**/*.content.cjx","/**/*.content.mjs","/**/*.content.mjx","/**/*.content.json","/**/*.content.tsx","/**/*.content.jsx"],"watchedFilesPatternWithPath":["/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.ts","/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.js","/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.cjs","/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.cjx","/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.mjs","/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.mjx","/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.json","/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.tsx","/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.jsx"],"outputFilesPatternWithPath":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/dictionary/**/*.json"},"editor":{"applicationURL":"","editorURL":"http://localhost:8000","cmsURL":"https://intlayer.org","backendURL":"https://back.intlayer.org","port":8000,"enabled":true,"dictionaryPriorityStrategy":"local_first","liveSync":true,"liveSyncPort":4000,"liveSyncURL":"http://localhost:4000"},"log":{"mode":"default","prefix":"\u001b[38;5;239m[intlayer] \u001b[0m"},"ai":{},"build":{"optimize":true,"importMode":"live","traversePattern":["**/*.{tsx,ts,js,mjs,cjs,jsx,mjx,cjx,vue,svelte,svte}","!**/node_modules/**"],"outputFormat":["cjs","esm"],"cache":true},"compiler":{"enabled":true,"transformPattern":["**/*.{ts,tsx,jsx,js,cjs,mjs,mjx,cjx,svelte,vue}"],"excludePattern":["**/node_modules/**","**/dist/**","**/.next/**","**/.nuxt/**","**/.expo/**","**/.vercel/**","**/.turbo/**","**/.tanstack/**","**/*.stories.ts","**/*.test.ts"],"outputDir":"./compiler"},"dictionary":{"fill":true},"metadata":{"name":"Intlayer","version":"7.4.0","doc":"https://intlayer.org/docs"}});}),
"[project]/src/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "proxy",
    ()=>proxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/site.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intlayer$2f$dist$2f$esm$2f$proxy$2f$intlayerProxy$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intlayer/dist/esm/proxy/intlayerProxy.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intlayer$2f$dist$2f$esm$2f$proxy$2f$multipleProxies$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intlayer/dist/esm/proxy/multipleProxies.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$core$2f$dist$2f$esm$2f$localization$2f$getLocaleFromPath$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@intlayer/core/dist/esm/localization/getLocaleFromPath.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$core$2f$dist$2f$esm$2f$localization$2f$getPathWithoutLocale$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@intlayer/core/dist/esm/localization/getPathWithoutLocale.mjs [middleware] (ecmascript)");
;
;
;
;
function appProxy(request) {
    const token = request.cookies.get("access_token")?.value;
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$core$2f$dist$2f$esm$2f$localization$2f$getLocaleFromPath$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["getLocaleFromPath"])(request.nextUrl.pathname);
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$core$2f$dist$2f$esm$2f$localization$2f$getPathWithoutLocale$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["getPathWithoutLocale"])(request.nextUrl.pathname);
    const is_auth_route = path.startsWith("/auth");
    if (token && is_auth_route) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(`/${locale}${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].main}`, request.url));
    }
    if (!token && !is_auth_route) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(`/${locale}${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].sign_in}?next=/${path !== "/" ? `${locale}${path}` : locale}`, request.url));
    }
    console.log(path);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/((?!api|protected|media|docs|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)"
    ]
};
const proxy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intlayer$2f$dist$2f$esm$2f$proxy$2f$multipleProxies$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["multipleProxies"])([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intlayer$2f$dist$2f$esm$2f$proxy$2f$intlayerProxy$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["intlayerProxy"],
    appProxy
]);
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5f492d5f._.js.map