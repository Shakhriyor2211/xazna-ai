module.exports = [
"[project]/.intlayer/config/configuration.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"internationalization":{"locales":["uz","en","ru"],"requiredLocales":["uz","en","ru"],"strictMode":"inclusive","defaultLocale":"uz"},"routing":{"mode":"prefix-no-default","storage":{"type":"cookie","name":"locale"},"basePath":""},"content":{"fileExtensions":[".content.ts",".content.js",".content.cjs",".content.cjx",".content.mjs",".content.mjx",".content.json",".content.tsx",".content.jsx"],"baseDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client","excludedPath":["**/node_modules/**","**/dist/**","**/build/**","**/.intlayer/**","**/.next/**","**/.nuxt/**","**/.expo/**","**/.vercel/**","**/.turbo/**","**/.tanstack/**"],"watch":true,"contentDir":["/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client"],"moduleAugmentationDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/types","unmergedDictionariesDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/unmerged_dictionary","remoteDictionariesDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/remote_dictionary","dictionariesDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/dictionary","dynamicDictionariesDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/dynamic_dictionary","fetchDictionariesDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/fetch_dictionary","typesDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/types","mainDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/main","configDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/config","cacheDir":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/cache","watchedFilesPattern":["/**/*.content.ts","/**/*.content.js","/**/*.content.cjs","/**/*.content.cjx","/**/*.content.mjs","/**/*.content.mjx","/**/*.content.json","/**/*.content.tsx","/**/*.content.jsx"],"watchedFilesPatternWithPath":["/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.ts","/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.js","/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.cjs","/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.cjx","/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.mjs","/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.mjx","/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.json","/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.tsx","/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/**/*.content.jsx"],"outputFilesPatternWithPath":"/Users/shakhriyormamadaliev/Folders/projects/xazna-ai/client/.intlayer/dictionary/**/*.json"},"editor":{"applicationURL":"","editorURL":"http://localhost:8000","cmsURL":"https://intlayer.org","backendURL":"https://back.intlayer.org","port":8000,"enabled":true,"dictionaryPriorityStrategy":"local_first","liveSync":true,"liveSyncPort":4000,"liveSyncURL":"http://localhost:4000"},"log":{"mode":"default","prefix":"\u001b[38;5;239m[intlayer] \u001b[0m"},"ai":{},"build":{"optimize":true,"importMode":"live","traversePattern":["**/*.{tsx,ts,js,mjs,cjs,jsx,mjx,cjx,vue,svelte,svte}","!**/node_modules/**"],"outputFormat":["cjs","esm"],"cache":true},"compiler":{"enabled":true,"transformPattern":["**/*.{ts,tsx,jsx,js,cjs,mjs,mjx,cjx,svelte,vue}"],"excludePattern":["**/node_modules/**","**/dist/**","**/.next/**","**/.nuxt/**","**/.expo/**","**/.vercel/**","**/.turbo/**","**/.tanstack/**","**/*.stories.ts","**/*.test.ts"],"outputDir":"./compiler"},"dictionary":{"fill":true},"metadata":{"name":"Intlayer","version":"7.4.0","doc":"https://intlayer.org/docs"}});}),
"[project]/src/providers/intlayer.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntlayerProvider",
    ()=>IntlayerProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intlayer$2f$dist$2f$esm$2f$client$2f$IntlayerClientProvider$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intlayer/dist/esm/client/IntlayerClientProvider.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intlayer$2f$dist$2f$esm$2f$server$2f$IntlayerServerProvider$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-intlayer/dist/esm/server/IntlayerServerProvider.mjs [app-rsc] (ecmascript)");
;
;
;
const IntlayerProvider = ({ children, locale })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intlayer$2f$dist$2f$esm$2f$server$2f$IntlayerServerProvider$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IntlayerServerProvider"], {
        locale: locale,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intlayer$2f$dist$2f$esm$2f$client$2f$IntlayerClientProvider$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IntlayerClientProvider"], {
            locale: locale,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/providers/intlayer.tsx",
            lineNumber: 13,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/providers/intlayer.tsx",
        lineNumber: 12,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/src/shared/site.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/utils/alert.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/utils/alert.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/utils/alert.tsx <module evaluation>", "default");
}),
"[project]/src/utils/alert.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/utils/alert.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/utils/alert.tsx", "default");
}),
"[project]/src/utils/alert.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$alert$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/utils/alert.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$alert$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/utils/alert.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$alert$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/providers/user.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "UserContext",
    ()=>UserContext,
    "UserProvider",
    ()=>UserProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const UserContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call UserContext() from the server but UserContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/providers/user.tsx <module evaluation>", "UserContext");
const UserProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call UserProvider() from the server but UserProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/providers/user.tsx <module evaluation>", "UserProvider");
}),
"[project]/src/providers/user.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "UserContext",
    ()=>UserContext,
    "UserProvider",
    ()=>UserProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const UserContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call UserContext() from the server but UserContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/providers/user.tsx", "UserContext");
const UserProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call UserProvider() from the server but UserProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/providers/user.tsx", "UserProvider");
}),
"[project]/src/providers/user.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$user$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/providers/user.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$user$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/providers/user.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$user$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/[locale]/layout.tsx [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "dynamic",
    ()=>dynamic,
    "metadata",
    ()=>metadata,
    "viewport",
    ()=>viewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$intlayer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/providers/intlayer.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/site.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$system$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@heroui/system/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$alert$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/alert.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$user$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/providers/user.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$oauth$2f$google$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-oauth/google/dist/index.esm.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$core$2f$dist$2f$esm$2f$localization$2f$getHTMLTextDir$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@intlayer/core/dist/esm/localization/getHTMLTextDir.mjs [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const metadata = {
    title: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["META"].name,
    description: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["META"].description,
    icons: {
        icon: "/assets/favicon.ico"
    }
};
const viewport = {
    themeColor: [
        {
            media: "(prefers-color-scheme: light)",
            color: "white"
        },
        {
            media: "(prefers-color-scheme: dark)",
            color: "black"
        }
    ]
};
const client_id = ("TURBOPACK compile-time value", "993947976526-7dqit6g945tfpkrc1isdo9c1p9olgc5o.apps.googleusercontent.com") ?? "";
;
const dynamic = "force-static";
const LocaleLayout = async ({ children, params })=>{
    const { locale } = await params;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        suppressHydrationWarning: true,
        lang: locale,
        dir: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$core$2f$dist$2f$esm$2f$localization$2f$getHTMLTextDir$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHTMLTextDir"])(locale),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            className: "min-h-screen text-foreground bg-background font-sans antialiased",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$system$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HeroUIProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ThemeProvider"], {
                    attribute: "class",
                    defaultTheme: "light",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$alert$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/app/[locale]/layout.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$user$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserProvider"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$oauth$2f$google$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GoogleOAuthProvider"], {
                                clientId: client_id,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$intlayer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IntlayerProvider"], {
                                    locale: locale,
                                    children: children
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[locale]/layout.tsx",
                                    lineNumber: 45,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/layout.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/[locale]/layout.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/[locale]/layout.tsx",
                    lineNumber: 41,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/layout.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/app/[locale]/layout.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/[locale]/layout.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = LocaleLayout;
}),
"[project]/src/app/[locale]/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"],
    "dynamic",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["dynamic"],
    "generateStaticParams",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intlayer$2f$dist$2f$esm$2f$generateStaticParams$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateStaticParams"],
    "metadata",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["metadata"],
    "viewport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["viewport"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/layout.tsx [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intlayer$2f$dist$2f$esm$2f$generateStaticParams$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intlayer/dist/esm/generateStaticParams.mjs [app-rsc] (ecmascript)");
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next-themes/dist/index.mjs [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ThemeProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ThemeProvider() from the server but ThemeProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/next-themes/dist/index.mjs <module evaluation>", "ThemeProvider");
const useTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useTheme() from the server but useTheme is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/next-themes/dist/index.mjs <module evaluation>", "useTheme");
}),
"[project]/node_modules/next-themes/dist/index.mjs [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ThemeProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ThemeProvider() from the server but ThemeProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/next-themes/dist/index.mjs", "ThemeProvider");
const useTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useTheme() from the server but useTheme is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/next-themes/dist/index.mjs", "useTheme");
}),
"[project]/node_modules/next-themes/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/node_modules/next-intlayer/dist/esm/client/IntlayerClientProvider.mjs [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "IntlayerClientProvider",
    ()=>IntlayerClientProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const IntlayerClientProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call IntlayerClientProvider() from the server but IntlayerClientProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/next-intlayer/dist/esm/client/IntlayerClientProvider.mjs <module evaluation>", "IntlayerClientProvider");
}),
"[project]/node_modules/next-intlayer/dist/esm/client/IntlayerClientProvider.mjs [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "IntlayerClientProvider",
    ()=>IntlayerClientProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const IntlayerClientProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call IntlayerClientProvider() from the server but IntlayerClientProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/next-intlayer/dist/esm/client/IntlayerClientProvider.mjs", "IntlayerClientProvider");
}),
"[project]/node_modules/next-intlayer/dist/esm/client/IntlayerClientProvider.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intlayer$2f$dist$2f$esm$2f$client$2f$IntlayerClientProvider$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intlayer/dist/esm/client/IntlayerClientProvider.mjs [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intlayer$2f$dist$2f$esm$2f$client$2f$IntlayerClientProvider$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/node_modules/next-intlayer/dist/esm/client/IntlayerClientProvider.mjs [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intlayer$2f$dist$2f$esm$2f$client$2f$IntlayerClientProvider$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/node_modules/react-intlayer/dist/esm/server/serverContext.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createServerContext",
    ()=>createServerContext,
    "getServerContext",
    ()=>getServerContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
//#region src/server/serverContext.tsx
/**
* Creates a new datastore for a given server context.
* Attempts to closely mimic the `createContext` API.
*
* @example
* const IntlayerServer = createServerContext<string | null>(null);
*
* <IntlayerServer value={locale}>
*      {children}
* </IntlayerServer>
*/ const cacheFallback = ()=>()=>({
            value: void 0
        });
const createServerContext = (defaultValue)=>{
    throwInClient();
    const getCache = (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].cache ?? cacheFallback)(()=>({
            value: void 0
        }));
    const Provider = ({ children, value })=>{
        getCache().value = value;
        return children;
    };
    const ServerContext = Provider;
    ServerContext.Provider = Provider;
    ServerContext.Consumer = (props)=>{
        const store = getCache();
        return props.children(store ? store.value : defaultValue);
    };
    ServerContext._storage = getCache;
    ServerContext._defaultValue = defaultValue;
    return ServerContext;
};
/**
* Fetches a value present in a given server context.
* Attempts to closely mimic the `useContext` API.
*
* @example
* getServerContext(IntlayerServer);
*/ const getServerContext = ({ _storage, _defaultValue })=>{
    const store = _storage();
    if (!store) return _defaultValue;
    return store.value;
};
/**
* Throws if called within a client component environment.
* Useful to help prevent mistakes.
*/ const throwInClient = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
};
;
 //# sourceMappingURL=serverContext.mjs.map
}),
"[project]/node_modules/react-intlayer/dist/esm/server/IntlayerServerProvider.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntlayerServerContext",
    ()=>IntlayerServerContext,
    "IntlayerServerProvider",
    ()=>IntlayerServerProvider,
    "locale",
    ()=>locale,
    "useIntlayer",
    ()=>useIntlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intlayer$2f$dist$2f$esm$2f$server$2f$serverContext$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-intlayer/dist/esm/server/serverContext.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$intlayer$2f$config$2f$configuration$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/.intlayer/config/configuration.json (json)");
;
;
;
//#region src/server/IntlayerServerProvider.tsx
const { defaultLocale } = __TURBOPACK__imported__module__$5b$project$5d2f2e$intlayer$2f$config$2f$configuration$2e$json__$28$json$29$__["default"]?.internationalization ?? {};
/**
* Context that store the current locale on the server side
*/ const IntlayerServerContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intlayer$2f$dist$2f$esm$2f$server$2f$serverContext$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerContext"])(defaultLocale);
/**
* Hook that provides the current locale
*/ const useIntlayer = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intlayer$2f$dist$2f$esm$2f$server$2f$serverContext$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerContext"])(IntlayerServerContext);
/**
* Get the current locale
*/ const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intlayer$2f$dist$2f$esm$2f$server$2f$serverContext$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerContext"])(IntlayerServerContext);
/**
* Provider that store the current locale on the server side
*/ const IntlayerServerProvider = ({ children, locale: locale$1 = defaultLocale })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(IntlayerServerContext.Provider, {
        value: locale$1,
        children
    });
;
 //# sourceMappingURL=IntlayerServerProvider.mjs.map
}),
"[project]/node_modules/@heroui/system/dist/index.mjs [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "HeroUIProvider",
    ()=>HeroUIProvider,
    "ProviderContext",
    ()=>ProviderContext,
    "extendVariants",
    ()=>extendVariants,
    "forwardRef",
    ()=>forwardRef,
    "isHeroUIEl",
    ()=>isHeroUIEl,
    "mapPropsVariants",
    ()=>mapPropsVariants,
    "mapPropsVariantsWithCommon",
    ()=>mapPropsVariantsWithCommon,
    "toIterator",
    ()=>toIterator,
    "useInputLabelPlacement",
    ()=>useInputLabelPlacement,
    "useLabelPlacement",
    ()=>useLabelPlacement,
    "useProviderContext",
    ()=>useProviderContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const HeroUIProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call HeroUIProvider() from the server but HeroUIProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs <module evaluation>", "HeroUIProvider");
const ProviderContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ProviderContext() from the server but ProviderContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs <module evaluation>", "ProviderContext");
const extendVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call extendVariants() from the server but extendVariants is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs <module evaluation>", "extendVariants");
const forwardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call forwardRef() from the server but forwardRef is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs <module evaluation>", "forwardRef");
const isHeroUIEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call isHeroUIEl() from the server but isHeroUIEl is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs <module evaluation>", "isHeroUIEl");
const mapPropsVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call mapPropsVariants() from the server but mapPropsVariants is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs <module evaluation>", "mapPropsVariants");
const mapPropsVariantsWithCommon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call mapPropsVariantsWithCommon() from the server but mapPropsVariantsWithCommon is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs <module evaluation>", "mapPropsVariantsWithCommon");
const toIterator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call toIterator() from the server but toIterator is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs <module evaluation>", "toIterator");
const useInputLabelPlacement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useInputLabelPlacement() from the server but useInputLabelPlacement is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs <module evaluation>", "useInputLabelPlacement");
const useLabelPlacement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useLabelPlacement() from the server but useLabelPlacement is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs <module evaluation>", "useLabelPlacement");
const useProviderContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useProviderContext() from the server but useProviderContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs <module evaluation>", "useProviderContext");
}),
"[project]/node_modules/@heroui/system/dist/index.mjs [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "HeroUIProvider",
    ()=>HeroUIProvider,
    "ProviderContext",
    ()=>ProviderContext,
    "extendVariants",
    ()=>extendVariants,
    "forwardRef",
    ()=>forwardRef,
    "isHeroUIEl",
    ()=>isHeroUIEl,
    "mapPropsVariants",
    ()=>mapPropsVariants,
    "mapPropsVariantsWithCommon",
    ()=>mapPropsVariantsWithCommon,
    "toIterator",
    ()=>toIterator,
    "useInputLabelPlacement",
    ()=>useInputLabelPlacement,
    "useLabelPlacement",
    ()=>useLabelPlacement,
    "useProviderContext",
    ()=>useProviderContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const HeroUIProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call HeroUIProvider() from the server but HeroUIProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs", "HeroUIProvider");
const ProviderContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ProviderContext() from the server but ProviderContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs", "ProviderContext");
const extendVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call extendVariants() from the server but extendVariants is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs", "extendVariants");
const forwardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call forwardRef() from the server but forwardRef is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs", "forwardRef");
const isHeroUIEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call isHeroUIEl() from the server but isHeroUIEl is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs", "isHeroUIEl");
const mapPropsVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call mapPropsVariants() from the server but mapPropsVariants is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs", "mapPropsVariants");
const mapPropsVariantsWithCommon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call mapPropsVariantsWithCommon() from the server but mapPropsVariantsWithCommon is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs", "mapPropsVariantsWithCommon");
const toIterator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call toIterator() from the server but toIterator is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs", "toIterator");
const useInputLabelPlacement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useInputLabelPlacement() from the server but useInputLabelPlacement is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs", "useInputLabelPlacement");
const useLabelPlacement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useLabelPlacement() from the server but useLabelPlacement is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs", "useLabelPlacement");
const useProviderContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useProviderContext() from the server but useProviderContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@heroui/system/dist/index.mjs", "useProviderContext");
}),
"[project]/node_modules/@heroui/system/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$system$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroui/system/dist/index.mjs [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$system$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/node_modules/@heroui/system/dist/index.mjs [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$system$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/node_modules/@react-oauth/google/dist/index.esm.js [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "GoogleLogin",
    ()=>GoogleLogin,
    "GoogleOAuthProvider",
    ()=>GoogleOAuthProvider,
    "googleLogout",
    ()=>googleLogout,
    "hasGrantedAllScopesGoogle",
    ()=>hasGrantedAllScopesGoogle,
    "hasGrantedAnyScopeGoogle",
    ()=>hasGrantedAnyScopeGoogle,
    "useGoogleLogin",
    ()=>useGoogleLogin,
    "useGoogleOAuth",
    ()=>useGoogleOAuth,
    "useGoogleOneTapLogin",
    ()=>useGoogleOneTapLogin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const GoogleLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call GoogleLogin() from the server but GoogleLogin is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@react-oauth/google/dist/index.esm.js <module evaluation>", "GoogleLogin");
const GoogleOAuthProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call GoogleOAuthProvider() from the server but GoogleOAuthProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@react-oauth/google/dist/index.esm.js <module evaluation>", "GoogleOAuthProvider");
const googleLogout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call googleLogout() from the server but googleLogout is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@react-oauth/google/dist/index.esm.js <module evaluation>", "googleLogout");
const hasGrantedAllScopesGoogle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call hasGrantedAllScopesGoogle() from the server but hasGrantedAllScopesGoogle is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@react-oauth/google/dist/index.esm.js <module evaluation>", "hasGrantedAllScopesGoogle");
const hasGrantedAnyScopeGoogle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call hasGrantedAnyScopeGoogle() from the server but hasGrantedAnyScopeGoogle is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@react-oauth/google/dist/index.esm.js <module evaluation>", "hasGrantedAnyScopeGoogle");
const useGoogleLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useGoogleLogin() from the server but useGoogleLogin is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@react-oauth/google/dist/index.esm.js <module evaluation>", "useGoogleLogin");
const useGoogleOAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useGoogleOAuth() from the server but useGoogleOAuth is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@react-oauth/google/dist/index.esm.js <module evaluation>", "useGoogleOAuth");
const useGoogleOneTapLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useGoogleOneTapLogin() from the server but useGoogleOneTapLogin is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@react-oauth/google/dist/index.esm.js <module evaluation>", "useGoogleOneTapLogin");
}),
"[project]/node_modules/@react-oauth/google/dist/index.esm.js [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "GoogleLogin",
    ()=>GoogleLogin,
    "GoogleOAuthProvider",
    ()=>GoogleOAuthProvider,
    "googleLogout",
    ()=>googleLogout,
    "hasGrantedAllScopesGoogle",
    ()=>hasGrantedAllScopesGoogle,
    "hasGrantedAnyScopeGoogle",
    ()=>hasGrantedAnyScopeGoogle,
    "useGoogleLogin",
    ()=>useGoogleLogin,
    "useGoogleOAuth",
    ()=>useGoogleOAuth,
    "useGoogleOneTapLogin",
    ()=>useGoogleOneTapLogin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const GoogleLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call GoogleLogin() from the server but GoogleLogin is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@react-oauth/google/dist/index.esm.js", "GoogleLogin");
const GoogleOAuthProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call GoogleOAuthProvider() from the server but GoogleOAuthProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@react-oauth/google/dist/index.esm.js", "GoogleOAuthProvider");
const googleLogout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call googleLogout() from the server but googleLogout is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@react-oauth/google/dist/index.esm.js", "googleLogout");
const hasGrantedAllScopesGoogle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call hasGrantedAllScopesGoogle() from the server but hasGrantedAllScopesGoogle is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@react-oauth/google/dist/index.esm.js", "hasGrantedAllScopesGoogle");
const hasGrantedAnyScopeGoogle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call hasGrantedAnyScopeGoogle() from the server but hasGrantedAnyScopeGoogle is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@react-oauth/google/dist/index.esm.js", "hasGrantedAnyScopeGoogle");
const useGoogleLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useGoogleLogin() from the server but useGoogleLogin is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@react-oauth/google/dist/index.esm.js", "useGoogleLogin");
const useGoogleOAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useGoogleOAuth() from the server but useGoogleOAuth is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@react-oauth/google/dist/index.esm.js", "useGoogleOAuth");
const useGoogleOneTapLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useGoogleOneTapLogin() from the server but useGoogleOneTapLogin is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@react-oauth/google/dist/index.esm.js", "useGoogleOneTapLogin");
}),
"[project]/node_modules/@react-oauth/google/dist/index.esm.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$oauth$2f$google$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-oauth/google/dist/index.esm.js [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$oauth$2f$google$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/node_modules/@react-oauth/google/dist/index.esm.js [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$oauth$2f$google$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/node_modules/@intlayer/types/dist/esm/_virtual/rolldown_runtime.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

//#region rolldown:runtime
__turbopack_context__.s([
    "__export",
    ()=>__export
]);
var __defProp = Object.defineProperty;
var __export = (all, symbols)=>{
    let target = {};
    for(var name in all){
        __defProp(target, name, {
            get: all[name],
            enumerable: true
        });
    }
    if (symbols) {
        __defProp(target, Symbol.toStringTag, {
            value: "Module"
        });
    }
    return target;
};
;
}),
"[project]/node_modules/@intlayer/types/dist/esm/locales.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AFRIKAANS",
    ()=>AFRIKAANS,
    "AFRIKAANS_SOUTH_AFRICA",
    ()=>AFRIKAANS_SOUTH_AFRICA,
    "ALBANIAN",
    ()=>ALBANIAN,
    "ALBANIAN_ALBANIA",
    ()=>ALBANIAN_ALBANIA,
    "ALL_LOCALES",
    ()=>ALL_LOCALES,
    "AMHARIC",
    ()=>AMHARIC,
    "AMHARIC_ETHIOPIA",
    ()=>AMHARIC_ETHIOPIA,
    "ARABIC",
    ()=>ARABIC,
    "ARABIC_ALGERIA",
    ()=>ARABIC_ALGERIA,
    "ARABIC_BAHRAIN",
    ()=>ARABIC_BAHRAIN,
    "ARABIC_CHAD",
    ()=>ARABIC_CHAD,
    "ARABIC_COMOROS",
    ()=>ARABIC_COMOROS,
    "ARABIC_DJIBOUTI",
    ()=>ARABIC_DJIBOUTI,
    "ARABIC_EGYPT",
    ()=>ARABIC_EGYPT,
    "ARABIC_IRAQ",
    ()=>ARABIC_IRAQ,
    "ARABIC_JORDAN",
    ()=>ARABIC_JORDAN,
    "ARABIC_KUWAIT",
    ()=>ARABIC_KUWAIT,
    "ARABIC_LEBANON",
    ()=>ARABIC_LEBANON,
    "ARABIC_LIBYA",
    ()=>ARABIC_LIBYA,
    "ARABIC_MAURITANIA",
    ()=>ARABIC_MAURITANIA,
    "ARABIC_MOROCCO",
    ()=>ARABIC_MOROCCO,
    "ARABIC_OMAN",
    ()=>ARABIC_OMAN,
    "ARABIC_PALESTINE",
    ()=>ARABIC_PALESTINE,
    "ARABIC_QATAR",
    ()=>ARABIC_QATAR,
    "ARABIC_SAUDI_ARABIA",
    ()=>ARABIC_SAUDI_ARABIA,
    "ARABIC_SOMALIA",
    ()=>ARABIC_SOMALIA,
    "ARABIC_SUDAN",
    ()=>ARABIC_SUDAN,
    "ARABIC_SYRIA",
    ()=>ARABIC_SYRIA,
    "ARABIC_TUNISIA",
    ()=>ARABIC_TUNISIA,
    "ARABIC_UNITED_ARAB_EMIRATES",
    ()=>ARABIC_UNITED_ARAB_EMIRATES,
    "ARABIC_YEMEN",
    ()=>ARABIC_YEMEN,
    "ARMENIAN",
    ()=>ARMENIAN,
    "ARMENIAN_ARMENIA",
    ()=>ARMENIAN_ARMENIA,
    "AZERI_LATIN",
    ()=>AZERI_LATIN,
    "AZERI_LATIN_AZERBAIJAN",
    ()=>AZERI_LATIN_AZERBAIJAN,
    "BASQUE",
    ()=>BASQUE,
    "BASQUE_SPAIN",
    ()=>BASQUE_SPAIN,
    "BELARUSIAN",
    ()=>BELARUSIAN,
    "BELARUSIAN_BELARUS",
    ()=>BELARUSIAN_BELARUS,
    "BENGALI",
    ()=>BENGALI,
    "BENGALI_BANGLADESH",
    ()=>BENGALI_BANGLADESH,
    "BENGALI_INDIA",
    ()=>BENGALI_INDIA,
    "BENGALI_MYANMAR",
    ()=>BENGALI_MYANMAR,
    "BOSNIAN",
    ()=>BOSNIAN,
    "BOSNIAN_BOSNIA_AND_HERZEGOVINA",
    ()=>BOSNIAN_BOSNIA_AND_HERZEGOVINA,
    "BULGARIAN",
    ()=>BULGARIAN,
    "BULGARIAN_BULGARIA",
    ()=>BULGARIAN_BULGARIA,
    "BURMESE",
    ()=>BURMESE,
    "BURMESE_MYANMAR",
    ()=>BURMESE_MYANMAR,
    "CATALAN",
    ()=>CATALAN,
    "CATALAN_SPAIN",
    ()=>CATALAN_SPAIN,
    "CHINESE",
    ()=>CHINESE,
    "CHINESE_HONG_KONG",
    ()=>CHINESE_HONG_KONG,
    "CHINESE_MACAU",
    ()=>CHINESE_MACAU,
    "CHINESE_SIMPLIFIED",
    ()=>CHINESE_SIMPLIFIED,
    "CHINESE_SIMPLIFIED_CHINA",
    ()=>CHINESE_SIMPLIFIED_CHINA,
    "CHINESE_SINGAPORE",
    ()=>CHINESE_SINGAPORE,
    "CHINESE_TAIWAN",
    ()=>CHINESE_TAIWAN,
    "CHINESE_TRADITIONAL",
    ()=>CHINESE_TRADITIONAL,
    "CROATIAN",
    ()=>CROATIAN,
    "CROATIAN_BOSNIA_AND_HERZEGOVINA",
    ()=>CROATIAN_BOSNIA_AND_HERZEGOVINA,
    "CROATIAN_CROATIA",
    ()=>CROATIAN_CROATIA,
    "CZECH",
    ()=>CZECH,
    "CZECH_CZECH_REPUBLIC",
    ()=>CZECH_CZECH_REPUBLIC,
    "DANISH",
    ()=>DANISH,
    "DANISH_DENMARK",
    ()=>DANISH_DENMARK,
    "DIVEHI",
    ()=>DIVEHI,
    "DIVEHI_MALDIVES",
    ()=>DIVEHI_MALDIVES,
    "DUTCH",
    ()=>DUTCH,
    "DUTCH_BELGIUM",
    ()=>DUTCH_BELGIUM,
    "DUTCH_NETHERLANDS",
    ()=>DUTCH_NETHERLANDS,
    "ENGLISH",
    ()=>ENGLISH,
    "ENGLISH_AUSTRALIA",
    ()=>ENGLISH_AUSTRALIA,
    "ENGLISH_BELIZE",
    ()=>ENGLISH_BELIZE,
    "ENGLISH_BOTSWANA",
    ()=>ENGLISH_BOTSWANA,
    "ENGLISH_CANADA",
    ()=>ENGLISH_CANADA,
    "ENGLISH_CARIBBEAN",
    ()=>ENGLISH_CARIBBEAN,
    "ENGLISH_GHANA",
    ()=>ENGLISH_GHANA,
    "ENGLISH_HONG_KONG",
    ()=>ENGLISH_HONG_KONG,
    "ENGLISH_INDIA",
    ()=>ENGLISH_INDIA,
    "ENGLISH_IRELAND",
    ()=>ENGLISH_IRELAND,
    "ENGLISH_JAMAICA",
    ()=>ENGLISH_JAMAICA,
    "ENGLISH_KENYA",
    ()=>ENGLISH_KENYA,
    "ENGLISH_MALAYSIA",
    ()=>ENGLISH_MALAYSIA,
    "ENGLISH_NEW_ZEALAND",
    ()=>ENGLISH_NEW_ZEALAND,
    "ENGLISH_NIGERIA",
    ()=>ENGLISH_NIGERIA,
    "ENGLISH_PAKISTAN",
    ()=>ENGLISH_PAKISTAN,
    "ENGLISH_PHILIPPINES",
    ()=>ENGLISH_PHILIPPINES,
    "ENGLISH_SINGAPORE",
    ()=>ENGLISH_SINGAPORE,
    "ENGLISH_SOUTH_AFRICA",
    ()=>ENGLISH_SOUTH_AFRICA,
    "ENGLISH_TANZANIA",
    ()=>ENGLISH_TANZANIA,
    "ENGLISH_TRINIDAD_AND_TOBAGO",
    ()=>ENGLISH_TRINIDAD_AND_TOBAGO,
    "ENGLISH_UGANDA",
    ()=>ENGLISH_UGANDA,
    "ENGLISH_UNITED_KINGDOM",
    ()=>ENGLISH_UNITED_KINGDOM,
    "ENGLISH_UNITED_STATES",
    ()=>ENGLISH_UNITED_STATES,
    "ENGLISH_ZIMBABWE",
    ()=>ENGLISH_ZIMBABWE,
    "ESPERANTO",
    ()=>ESPERANTO,
    "ESTONIAN",
    ()=>ESTONIAN,
    "ESTONIAN_ESTONIA",
    ()=>ESTONIAN_ESTONIA,
    "FAROESE",
    ()=>FAROESE,
    "FAROESE_FAROE_ISLANDS",
    ()=>FAROESE_FAROE_ISLANDS,
    "FARSI",
    ()=>FARSI,
    "FARSI_IRAN",
    ()=>FARSI_IRAN,
    "FINNISH",
    ()=>FINNISH,
    "FINNISH_FINLAND",
    ()=>FINNISH_FINLAND,
    "FRENCH",
    ()=>FRENCH,
    "FRENCH_BELGIUM",
    ()=>FRENCH_BELGIUM,
    "FRENCH_CANADA",
    ()=>FRENCH_CANADA,
    "FRENCH_FRANCE",
    ()=>FRENCH_FRANCE,
    "FRENCH_LUXEMBOURG",
    ()=>FRENCH_LUXEMBOURG,
    "FRENCH_PRINCIPALITY_OF_MONACO",
    ()=>FRENCH_PRINCIPALITY_OF_MONACO,
    "FRENCH_SWITZERLAND",
    ()=>FRENCH_SWITZERLAND,
    "FYRO_MACEDONIAN",
    ()=>FYRO_MACEDONIAN,
    "FYRO_MACEDONIAN_MACEDONIA",
    ()=>FYRO_MACEDONIAN_MACEDONIA,
    "GALICIAN",
    ()=>GALICIAN,
    "GALICIAN_SPAIN",
    ()=>GALICIAN_SPAIN,
    "GEORGIAN",
    ()=>GEORGIAN,
    "GEORGIAN_GEORGIA",
    ()=>GEORGIAN_GEORGIA,
    "GERMAN",
    ()=>GERMAN,
    "GERMAN_AUSTRIA",
    ()=>GERMAN_AUSTRIA,
    "GERMAN_GERMANY",
    ()=>GERMAN_GERMANY,
    "GERMAN_LIECHTENSTEIN",
    ()=>GERMAN_LIECHTENSTEIN,
    "GERMAN_LUXEMBOURG",
    ()=>GERMAN_LUXEMBOURG,
    "GERMAN_SWITZERLAND",
    ()=>GERMAN_SWITZERLAND,
    "GREEK",
    ()=>GREEK,
    "GREEK_GREECE",
    ()=>GREEK_GREECE,
    "GUJARATI",
    ()=>GUJARATI,
    "GUJARATI_INDIA",
    ()=>GUJARATI_INDIA,
    "HEBREW",
    ()=>HEBREW,
    "HEBREW_ISRAEL",
    ()=>HEBREW_ISRAEL,
    "HINDI",
    ()=>HINDI,
    "HINDI_INDIA",
    ()=>HINDI_INDIA,
    "HUNGARIAN",
    ()=>HUNGARIAN,
    "HUNGARIAN_HUNGARY",
    ()=>HUNGARIAN_HUNGARY,
    "ICELANDIC",
    ()=>ICELANDIC,
    "ICELANDIC_ICELAND",
    ()=>ICELANDIC_ICELAND,
    "INDONESIAN",
    ()=>INDONESIAN,
    "INDONESIAN_INDONESIA",
    ()=>INDONESIAN_INDONESIA,
    "ITALIAN",
    ()=>ITALIAN,
    "ITALIAN_ITALY",
    ()=>ITALIAN_ITALY,
    "ITALIAN_SWITZERLAND",
    ()=>ITALIAN_SWITZERLAND,
    "JAPANESE",
    ()=>JAPANESE,
    "JAPANESE_JAPAN",
    ()=>JAPANESE_JAPAN,
    "KANNADA",
    ()=>KANNADA,
    "KANNADA_INDIA",
    ()=>KANNADA_INDIA,
    "KAZAKH",
    ()=>KAZAKH,
    "KAZAKH_KAZAKHSTAN",
    ()=>KAZAKH_KAZAKHSTAN,
    "KHMER",
    ()=>KHMER,
    "KHMER_CAMBODIA",
    ()=>KHMER_CAMBODIA,
    "KONKANI",
    ()=>KONKANI,
    "KONKANI_INDIA",
    ()=>KONKANI_INDIA,
    "KOREAN",
    ()=>KOREAN,
    "KOREAN_KOREA",
    ()=>KOREAN_KOREA,
    "KYRGYZ",
    ()=>KYRGYZ,
    "KYRGYZ_KYRGYZSTAN",
    ()=>KYRGYZ_KYRGYZSTAN,
    "LAO",
    ()=>LAO,
    "LAO_LAOS",
    ()=>LAO_LAOS,
    "LATVIAN",
    ()=>LATVIAN,
    "LATVIAN_LATVIA",
    ()=>LATVIAN_LATVIA,
    "LITHUANIAN",
    ()=>LITHUANIAN,
    "LITHUANIAN_LITHUANIA",
    ()=>LITHUANIAN_LITHUANIA,
    "MALAY",
    ()=>MALAY,
    "MALAY_BRUNEI_DARUSSALAM",
    ()=>MALAY_BRUNEI_DARUSSALAM,
    "MALAY_MALAYSIA",
    ()=>MALAY_MALAYSIA,
    "MALTESE",
    ()=>MALTESE,
    "MALTESE_MALTA",
    ()=>MALTESE_MALTA,
    "MAORI",
    ()=>MAORI,
    "MAORI_NEW_ZEALAND",
    ()=>MAORI_NEW_ZEALAND,
    "MARATHI",
    ()=>MARATHI,
    "MARATHI_INDIA",
    ()=>MARATHI_INDIA,
    "MONGOLIAN",
    ()=>MONGOLIAN,
    "MONGOLIAN_MONGOLIA",
    ()=>MONGOLIAN_MONGOLIA,
    "NEPALI",
    ()=>NEPALI,
    "NEPALI_NEPAL",
    ()=>NEPALI_NEPAL,
    "NORTHERN_SOTHO",
    ()=>NORTHERN_SOTHO,
    "NORTHERN_SOTHO_SOUTH_AFRICA",
    ()=>NORTHERN_SOTHO_SOUTH_AFRICA,
    "NORWEGIAN_BOKMAL",
    ()=>NORWEGIAN_BOKMAL,
    "NORWEGIAN_BOKMAL_NORWAY",
    ()=>NORWEGIAN_BOKMAL_NORWAY,
    "NORWEGIAN_NYNORSK_NORWAY",
    ()=>NORWEGIAN_NYNORSK_NORWAY,
    "PASHTO",
    ()=>PASHTO,
    "PASHTO_AFGHANISTAN",
    ()=>PASHTO_AFGHANISTAN,
    "POLISH",
    ()=>POLISH,
    "POLISH_POLAND",
    ()=>POLISH_POLAND,
    "PORTUGUESE",
    ()=>PORTUGUESE,
    "PORTUGUESE_BRAZIL",
    ()=>PORTUGUESE_BRAZIL,
    "PORTUGUESE_CAPE_VERDE",
    ()=>PORTUGUESE_CAPE_VERDE,
    "PORTUGUESE_GUINEA_BISSAU",
    ()=>PORTUGUESE_GUINEA_BISSAU,
    "PORTUGUESE_MACAU",
    ()=>PORTUGUESE_MACAU,
    "PORTUGUESE_MOZAMBIQUE",
    ()=>PORTUGUESE_MOZAMBIQUE,
    "PORTUGUESE_PORTUGAL",
    ()=>PORTUGUESE_PORTUGAL,
    "PORTUGUESE_SAO_TOME_AND_PRINCIPE",
    ()=>PORTUGUESE_SAO_TOME_AND_PRINCIPE,
    "PORTUGUESE_TIMOR_LESTE",
    ()=>PORTUGUESE_TIMOR_LESTE,
    "PUNJABI",
    ()=>PUNJABI,
    "PUNJABI_INDIA",
    ()=>PUNJABI_INDIA,
    "QUECHUA",
    ()=>QUECHUA,
    "QUECHUA_BOLIVIA",
    ()=>QUECHUA_BOLIVIA,
    "QUECHUA_ECUADOR",
    ()=>QUECHUA_ECUADOR,
    "QUECHUA_PERU",
    ()=>QUECHUA_PERU,
    "ROMANIAN",
    ()=>ROMANIAN,
    "ROMANIAN_ROMANIA",
    ()=>ROMANIAN_ROMANIA,
    "RUSSIAN",
    ()=>RUSSIAN,
    "RUSSIAN_RUSSIA",
    ()=>RUSSIAN_RUSSIA,
    "SAMI_NORTHERN",
    ()=>SAMI_NORTHERN,
    "SAMI_NORTHERN_FINLAND",
    ()=>SAMI_NORTHERN_FINLAND,
    "SAMI_NORTHERN_NORWAY",
    ()=>SAMI_NORTHERN_NORWAY,
    "SAMI_NORTHERN_SWEDEN",
    ()=>SAMI_NORTHERN_SWEDEN,
    "SANSKRIT",
    ()=>SANSKRIT,
    "SANSKRIT_INDIA",
    ()=>SANSKRIT_INDIA,
    "SERBIAN_CYRILLIC",
    ()=>SERBIAN_CYRILLIC,
    "SERBIAN_CYRILLIC_BOSNIA_AND_HERZEGOVINA",
    ()=>SERBIAN_CYRILLIC_BOSNIA_AND_HERZEGOVINA,
    "SERBIAN_CYRILLIC_SERBIA",
    ()=>SERBIAN_CYRILLIC_SERBIA,
    "SERBIAN_LATIN",
    ()=>SERBIAN_LATIN,
    "SERBIAN_LATIN_BOSNIA_AND_HERZEGOVINA",
    ()=>SERBIAN_LATIN_BOSNIA_AND_HERZEGOVINA,
    "SERBIAN_LATIN_SERBIA_AND_MONTENEGRO",
    ()=>SERBIAN_LATIN_SERBIA_AND_MONTENEGRO,
    "SINHALA",
    ()=>SINHALA,
    "SINHALA_SRI_LANKA",
    ()=>SINHALA_SRI_LANKA,
    "SLOVAK",
    ()=>SLOVAK,
    "SLOVAK_SLOVAKIA",
    ()=>SLOVAK_SLOVAKIA,
    "SLOVENIAN",
    ()=>SLOVENIAN,
    "SLOVENIAN_SLOVENIA",
    ()=>SLOVENIAN_SLOVENIA,
    "SPANISH",
    ()=>SPANISH,
    "SPANISH_ARGENTINA",
    ()=>SPANISH_ARGENTINA,
    "SPANISH_BOLIVIA",
    ()=>SPANISH_BOLIVIA,
    "SPANISH_CHILE",
    ()=>SPANISH_CHILE,
    "SPANISH_COLOMBIA",
    ()=>SPANISH_COLOMBIA,
    "SPANISH_COSTA_RICA",
    ()=>SPANISH_COSTA_RICA,
    "SPANISH_CUBA",
    ()=>SPANISH_CUBA,
    "SPANISH_DOMINICAN_REPUBLIC",
    ()=>SPANISH_DOMINICAN_REPUBLIC,
    "SPANISH_ECUADOR",
    ()=>SPANISH_ECUADOR,
    "SPANISH_EL_SALVADOR",
    ()=>SPANISH_EL_SALVADOR,
    "SPANISH_GUATEMALA",
    ()=>SPANISH_GUATEMALA,
    "SPANISH_HONDURAS",
    ()=>SPANISH_HONDURAS,
    "SPANISH_MEXICO",
    ()=>SPANISH_MEXICO,
    "SPANISH_NICARAGUA",
    ()=>SPANISH_NICARAGUA,
    "SPANISH_PANAMA",
    ()=>SPANISH_PANAMA,
    "SPANISH_PARAGUAY",
    ()=>SPANISH_PARAGUAY,
    "SPANISH_PERU",
    ()=>SPANISH_PERU,
    "SPANISH_PUERTO_RICO",
    ()=>SPANISH_PUERTO_RICO,
    "SPANISH_SPAIN",
    ()=>SPANISH_SPAIN,
    "SPANISH_UNITED_STATES",
    ()=>SPANISH_UNITED_STATES,
    "SPANISH_URUGUAY",
    ()=>SPANISH_URUGUAY,
    "SPANISH_VENEZUELA",
    ()=>SPANISH_VENEZUELA,
    "SWAHILI",
    ()=>SWAHILI,
    "SWAHILI_KENYA",
    ()=>SWAHILI_KENYA,
    "SWEDISH",
    ()=>SWEDISH,
    "SWEDISH_FINLAND",
    ()=>SWEDISH_FINLAND,
    "SWEDISH_SWEDEN",
    ()=>SWEDISH_SWEDEN,
    "SYRIAC",
    ()=>SYRIAC,
    "SYRIAC_SYRIA",
    ()=>SYRIAC_SYRIA,
    "TAGALOG",
    ()=>TAGALOG,
    "TAGALOG_PHILIPPINES",
    ()=>TAGALOG_PHILIPPINES,
    "TAMIL",
    ()=>TAMIL,
    "TAMIL_INDIA",
    ()=>TAMIL_INDIA,
    "TATAR",
    ()=>TATAR,
    "TATAR_RUSSIA",
    ()=>TATAR_RUSSIA,
    "TELUGU",
    ()=>TELUGU,
    "TELUGU_INDIA",
    ()=>TELUGU_INDIA,
    "THAI",
    ()=>THAI,
    "THAI_THAILAND",
    ()=>THAI_THAILAND,
    "TSOGA",
    ()=>TSOGA,
    "TSWANA",
    ()=>TSWANA,
    "TSWANA_SOUTH_AFRICA",
    ()=>TSWANA_SOUTH_AFRICA,
    "TURKISH",
    ()=>TURKISH,
    "TURKISH_TURKEY",
    ()=>TURKISH_TURKEY,
    "UKRAINIAN",
    ()=>UKRAINIAN,
    "UKRAINIAN_UKRAINE",
    ()=>UKRAINIAN_UKRAINE,
    "URDU",
    ()=>URDU,
    "URDU_ISLAMIC_REPUBLIC_OF_PAKISTAN",
    ()=>URDU_ISLAMIC_REPUBLIC_OF_PAKISTAN,
    "UZBEK_LATIN",
    ()=>UZBEK_LATIN,
    "UZBEK_LATIN_UZBEKISTAN",
    ()=>UZBEK_LATIN_UZBEKISTAN,
    "VIETNAMESE",
    ()=>VIETNAMESE,
    "VIETNAMESE_VIET_NAM",
    ()=>VIETNAMESE_VIET_NAM,
    "WELSH",
    ()=>WELSH,
    "WELSH_UNITED_KINGDOM",
    ()=>WELSH_UNITED_KINGDOM,
    "XHOSA",
    ()=>XHOSA,
    "XHOSA_SOUTH_AFRICA",
    ()=>XHOSA_SOUTH_AFRICA,
    "YORUBA",
    ()=>YORUBA,
    "YORUBA_NIGERIA",
    ()=>YORUBA_NIGERIA,
    "ZULU",
    ()=>ZULU,
    "ZULU_SOUTH_AFRICA",
    ()=>ZULU_SOUTH_AFRICA,
    "locales_exports",
    ()=>locales_exports
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$_virtual$2f$rolldown_runtime$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@intlayer/types/dist/esm/_virtual/rolldown_runtime.mjs [app-rsc] (ecmascript)");
;
//#region src/locales.ts
var locales_exports = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$_virtual$2f$rolldown_runtime$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__export"])({
    AFRIKAANS: ()=>AFRIKAANS,
    AFRIKAANS_SOUTH_AFRICA: ()=>AFRIKAANS_SOUTH_AFRICA,
    ALBANIAN: ()=>ALBANIAN,
    ALBANIAN_ALBANIA: ()=>ALBANIAN_ALBANIA,
    ALL_LOCALES: ()=>ALL_LOCALES,
    AMHARIC: ()=>AMHARIC,
    AMHARIC_ETHIOPIA: ()=>AMHARIC_ETHIOPIA,
    ARABIC: ()=>ARABIC,
    ARABIC_ALGERIA: ()=>ARABIC_ALGERIA,
    ARABIC_BAHRAIN: ()=>ARABIC_BAHRAIN,
    ARABIC_CHAD: ()=>ARABIC_CHAD,
    ARABIC_COMOROS: ()=>ARABIC_COMOROS,
    ARABIC_DJIBOUTI: ()=>ARABIC_DJIBOUTI,
    ARABIC_EGYPT: ()=>ARABIC_EGYPT,
    ARABIC_IRAQ: ()=>ARABIC_IRAQ,
    ARABIC_JORDAN: ()=>ARABIC_JORDAN,
    ARABIC_KUWAIT: ()=>ARABIC_KUWAIT,
    ARABIC_LEBANON: ()=>ARABIC_LEBANON,
    ARABIC_LIBYA: ()=>ARABIC_LIBYA,
    ARABIC_MAURITANIA: ()=>ARABIC_MAURITANIA,
    ARABIC_MOROCCO: ()=>ARABIC_MOROCCO,
    ARABIC_OMAN: ()=>ARABIC_OMAN,
    ARABIC_PALESTINE: ()=>ARABIC_PALESTINE,
    ARABIC_QATAR: ()=>ARABIC_QATAR,
    ARABIC_SAUDI_ARABIA: ()=>ARABIC_SAUDI_ARABIA,
    ARABIC_SOMALIA: ()=>ARABIC_SOMALIA,
    ARABIC_SUDAN: ()=>ARABIC_SUDAN,
    ARABIC_SYRIA: ()=>ARABIC_SYRIA,
    ARABIC_TUNISIA: ()=>ARABIC_TUNISIA,
    ARABIC_UNITED_ARAB_EMIRATES: ()=>ARABIC_UNITED_ARAB_EMIRATES,
    ARABIC_YEMEN: ()=>ARABIC_YEMEN,
    ARMENIAN: ()=>ARMENIAN,
    ARMENIAN_ARMENIA: ()=>ARMENIAN_ARMENIA,
    AZERI_LATIN: ()=>AZERI_LATIN,
    AZERI_LATIN_AZERBAIJAN: ()=>AZERI_LATIN_AZERBAIJAN,
    BASQUE: ()=>BASQUE,
    BASQUE_SPAIN: ()=>BASQUE_SPAIN,
    BELARUSIAN: ()=>BELARUSIAN,
    BELARUSIAN_BELARUS: ()=>BELARUSIAN_BELARUS,
    BENGALI: ()=>BENGALI,
    BENGALI_BANGLADESH: ()=>BENGALI_BANGLADESH,
    BENGALI_INDIA: ()=>BENGALI_INDIA,
    BENGALI_MYANMAR: ()=>BENGALI_MYANMAR,
    BOSNIAN: ()=>BOSNIAN,
    BOSNIAN_BOSNIA_AND_HERZEGOVINA: ()=>BOSNIAN_BOSNIA_AND_HERZEGOVINA,
    BULGARIAN: ()=>BULGARIAN,
    BULGARIAN_BULGARIA: ()=>BULGARIAN_BULGARIA,
    BURMESE: ()=>BURMESE,
    BURMESE_MYANMAR: ()=>BURMESE_MYANMAR,
    CATALAN: ()=>CATALAN,
    CATALAN_SPAIN: ()=>CATALAN_SPAIN,
    CHINESE: ()=>CHINESE,
    CHINESE_HONG_KONG: ()=>CHINESE_HONG_KONG,
    CHINESE_MACAU: ()=>CHINESE_MACAU,
    CHINESE_SIMPLIFIED: ()=>CHINESE_SIMPLIFIED,
    CHINESE_SIMPLIFIED_CHINA: ()=>CHINESE_SIMPLIFIED_CHINA,
    CHINESE_SINGAPORE: ()=>CHINESE_SINGAPORE,
    CHINESE_TAIWAN: ()=>CHINESE_TAIWAN,
    CHINESE_TRADITIONAL: ()=>CHINESE_TRADITIONAL,
    CROATIAN: ()=>CROATIAN,
    CROATIAN_BOSNIA_AND_HERZEGOVINA: ()=>CROATIAN_BOSNIA_AND_HERZEGOVINA,
    CROATIAN_CROATIA: ()=>CROATIAN_CROATIA,
    CZECH: ()=>CZECH,
    CZECH_CZECH_REPUBLIC: ()=>CZECH_CZECH_REPUBLIC,
    DANISH: ()=>DANISH,
    DANISH_DENMARK: ()=>DANISH_DENMARK,
    DIVEHI: ()=>DIVEHI,
    DIVEHI_MALDIVES: ()=>DIVEHI_MALDIVES,
    DUTCH: ()=>DUTCH,
    DUTCH_BELGIUM: ()=>DUTCH_BELGIUM,
    DUTCH_NETHERLANDS: ()=>DUTCH_NETHERLANDS,
    ENGLISH: ()=>ENGLISH,
    ENGLISH_AUSTRALIA: ()=>ENGLISH_AUSTRALIA,
    ENGLISH_BELIZE: ()=>ENGLISH_BELIZE,
    ENGLISH_BOTSWANA: ()=>ENGLISH_BOTSWANA,
    ENGLISH_CANADA: ()=>ENGLISH_CANADA,
    ENGLISH_CARIBBEAN: ()=>ENGLISH_CARIBBEAN,
    ENGLISH_GHANA: ()=>ENGLISH_GHANA,
    ENGLISH_HONG_KONG: ()=>ENGLISH_HONG_KONG,
    ENGLISH_INDIA: ()=>ENGLISH_INDIA,
    ENGLISH_IRELAND: ()=>ENGLISH_IRELAND,
    ENGLISH_JAMAICA: ()=>ENGLISH_JAMAICA,
    ENGLISH_KENYA: ()=>ENGLISH_KENYA,
    ENGLISH_MALAYSIA: ()=>ENGLISH_MALAYSIA,
    ENGLISH_NEW_ZEALAND: ()=>ENGLISH_NEW_ZEALAND,
    ENGLISH_NIGERIA: ()=>ENGLISH_NIGERIA,
    ENGLISH_PAKISTAN: ()=>ENGLISH_PAKISTAN,
    ENGLISH_PHILIPPINES: ()=>ENGLISH_PHILIPPINES,
    ENGLISH_SINGAPORE: ()=>ENGLISH_SINGAPORE,
    ENGLISH_SOUTH_AFRICA: ()=>ENGLISH_SOUTH_AFRICA,
    ENGLISH_TANZANIA: ()=>ENGLISH_TANZANIA,
    ENGLISH_TRINIDAD_AND_TOBAGO: ()=>ENGLISH_TRINIDAD_AND_TOBAGO,
    ENGLISH_UGANDA: ()=>ENGLISH_UGANDA,
    ENGLISH_UNITED_KINGDOM: ()=>ENGLISH_UNITED_KINGDOM,
    ENGLISH_UNITED_STATES: ()=>ENGLISH_UNITED_STATES,
    ENGLISH_ZIMBABWE: ()=>ENGLISH_ZIMBABWE,
    ESPERANTO: ()=>ESPERANTO,
    ESTONIAN: ()=>ESTONIAN,
    ESTONIAN_ESTONIA: ()=>ESTONIAN_ESTONIA,
    FAROESE: ()=>FAROESE,
    FAROESE_FAROE_ISLANDS: ()=>FAROESE_FAROE_ISLANDS,
    FARSI: ()=>FARSI,
    FARSI_IRAN: ()=>FARSI_IRAN,
    FINNISH: ()=>FINNISH,
    FINNISH_FINLAND: ()=>FINNISH_FINLAND,
    FRENCH: ()=>FRENCH,
    FRENCH_BELGIUM: ()=>FRENCH_BELGIUM,
    FRENCH_CANADA: ()=>FRENCH_CANADA,
    FRENCH_FRANCE: ()=>FRENCH_FRANCE,
    FRENCH_LUXEMBOURG: ()=>FRENCH_LUXEMBOURG,
    FRENCH_PRINCIPALITY_OF_MONACO: ()=>FRENCH_PRINCIPALITY_OF_MONACO,
    FRENCH_SWITZERLAND: ()=>FRENCH_SWITZERLAND,
    FYRO_MACEDONIAN: ()=>FYRO_MACEDONIAN,
    FYRO_MACEDONIAN_MACEDONIA: ()=>FYRO_MACEDONIAN_MACEDONIA,
    GALICIAN: ()=>GALICIAN,
    GALICIAN_SPAIN: ()=>GALICIAN_SPAIN,
    GEORGIAN: ()=>GEORGIAN,
    GEORGIAN_GEORGIA: ()=>GEORGIAN_GEORGIA,
    GERMAN: ()=>GERMAN,
    GERMAN_AUSTRIA: ()=>GERMAN_AUSTRIA,
    GERMAN_GERMANY: ()=>GERMAN_GERMANY,
    GERMAN_LIECHTENSTEIN: ()=>GERMAN_LIECHTENSTEIN,
    GERMAN_LUXEMBOURG: ()=>GERMAN_LUXEMBOURG,
    GERMAN_SWITZERLAND: ()=>GERMAN_SWITZERLAND,
    GREEK: ()=>GREEK,
    GREEK_GREECE: ()=>GREEK_GREECE,
    GUJARATI: ()=>GUJARATI,
    GUJARATI_INDIA: ()=>GUJARATI_INDIA,
    HEBREW: ()=>HEBREW,
    HEBREW_ISRAEL: ()=>HEBREW_ISRAEL,
    HINDI: ()=>HINDI,
    HINDI_INDIA: ()=>HINDI_INDIA,
    HUNGARIAN: ()=>HUNGARIAN,
    HUNGARIAN_HUNGARY: ()=>HUNGARIAN_HUNGARY,
    ICELANDIC: ()=>ICELANDIC,
    ICELANDIC_ICELAND: ()=>ICELANDIC_ICELAND,
    INDONESIAN: ()=>INDONESIAN,
    INDONESIAN_INDONESIA: ()=>INDONESIAN_INDONESIA,
    ITALIAN: ()=>ITALIAN,
    ITALIAN_ITALY: ()=>ITALIAN_ITALY,
    ITALIAN_SWITZERLAND: ()=>ITALIAN_SWITZERLAND,
    JAPANESE: ()=>JAPANESE,
    JAPANESE_JAPAN: ()=>JAPANESE_JAPAN,
    KANNADA: ()=>KANNADA,
    KANNADA_INDIA: ()=>KANNADA_INDIA,
    KAZAKH: ()=>KAZAKH,
    KAZAKH_KAZAKHSTAN: ()=>KAZAKH_KAZAKHSTAN,
    KHMER: ()=>KHMER,
    KHMER_CAMBODIA: ()=>KHMER_CAMBODIA,
    KONKANI: ()=>KONKANI,
    KONKANI_INDIA: ()=>KONKANI_INDIA,
    KOREAN: ()=>KOREAN,
    KOREAN_KOREA: ()=>KOREAN_KOREA,
    KYRGYZ: ()=>KYRGYZ,
    KYRGYZ_KYRGYZSTAN: ()=>KYRGYZ_KYRGYZSTAN,
    LAO: ()=>LAO,
    LAO_LAOS: ()=>LAO_LAOS,
    LATVIAN: ()=>LATVIAN,
    LATVIAN_LATVIA: ()=>LATVIAN_LATVIA,
    LITHUANIAN: ()=>LITHUANIAN,
    LITHUANIAN_LITHUANIA: ()=>LITHUANIAN_LITHUANIA,
    MALAY: ()=>MALAY,
    MALAY_BRUNEI_DARUSSALAM: ()=>MALAY_BRUNEI_DARUSSALAM,
    MALAY_MALAYSIA: ()=>MALAY_MALAYSIA,
    MALTESE: ()=>MALTESE,
    MALTESE_MALTA: ()=>MALTESE_MALTA,
    MAORI: ()=>MAORI,
    MAORI_NEW_ZEALAND: ()=>MAORI_NEW_ZEALAND,
    MARATHI: ()=>MARATHI,
    MARATHI_INDIA: ()=>MARATHI_INDIA,
    MONGOLIAN: ()=>MONGOLIAN,
    MONGOLIAN_MONGOLIA: ()=>MONGOLIAN_MONGOLIA,
    NEPALI: ()=>NEPALI,
    NEPALI_NEPAL: ()=>NEPALI_NEPAL,
    NORTHERN_SOTHO: ()=>NORTHERN_SOTHO,
    NORTHERN_SOTHO_SOUTH_AFRICA: ()=>NORTHERN_SOTHO_SOUTH_AFRICA,
    NORWEGIAN_BOKMAL: ()=>NORWEGIAN_BOKMAL,
    NORWEGIAN_BOKMAL_NORWAY: ()=>NORWEGIAN_BOKMAL_NORWAY,
    NORWEGIAN_NYNORSK_NORWAY: ()=>NORWEGIAN_NYNORSK_NORWAY,
    PASHTO: ()=>PASHTO,
    PASHTO_AFGHANISTAN: ()=>PASHTO_AFGHANISTAN,
    POLISH: ()=>POLISH,
    POLISH_POLAND: ()=>POLISH_POLAND,
    PORTUGUESE: ()=>PORTUGUESE,
    PORTUGUESE_BRAZIL: ()=>PORTUGUESE_BRAZIL,
    PORTUGUESE_CAPE_VERDE: ()=>PORTUGUESE_CAPE_VERDE,
    PORTUGUESE_GUINEA_BISSAU: ()=>PORTUGUESE_GUINEA_BISSAU,
    PORTUGUESE_MACAU: ()=>PORTUGUESE_MACAU,
    PORTUGUESE_MOZAMBIQUE: ()=>PORTUGUESE_MOZAMBIQUE,
    PORTUGUESE_PORTUGAL: ()=>PORTUGUESE_PORTUGAL,
    PORTUGUESE_SAO_TOME_AND_PRINCIPE: ()=>PORTUGUESE_SAO_TOME_AND_PRINCIPE,
    PORTUGUESE_TIMOR_LESTE: ()=>PORTUGUESE_TIMOR_LESTE,
    PUNJABI: ()=>PUNJABI,
    PUNJABI_INDIA: ()=>PUNJABI_INDIA,
    QUECHUA: ()=>QUECHUA,
    QUECHUA_BOLIVIA: ()=>QUECHUA_BOLIVIA,
    QUECHUA_ECUADOR: ()=>QUECHUA_ECUADOR,
    QUECHUA_PERU: ()=>QUECHUA_PERU,
    ROMANIAN: ()=>ROMANIAN,
    ROMANIAN_ROMANIA: ()=>ROMANIAN_ROMANIA,
    RUSSIAN: ()=>RUSSIAN,
    RUSSIAN_RUSSIA: ()=>RUSSIAN_RUSSIA,
    SAMI_NORTHERN: ()=>SAMI_NORTHERN,
    SAMI_NORTHERN_FINLAND: ()=>SAMI_NORTHERN_FINLAND,
    SAMI_NORTHERN_NORWAY: ()=>SAMI_NORTHERN_NORWAY,
    SAMI_NORTHERN_SWEDEN: ()=>SAMI_NORTHERN_SWEDEN,
    SANSKRIT: ()=>SANSKRIT,
    SANSKRIT_INDIA: ()=>SANSKRIT_INDIA,
    SERBIAN_CYRILLIC: ()=>SERBIAN_CYRILLIC,
    SERBIAN_CYRILLIC_BOSNIA_AND_HERZEGOVINA: ()=>SERBIAN_CYRILLIC_BOSNIA_AND_HERZEGOVINA,
    SERBIAN_CYRILLIC_SERBIA: ()=>SERBIAN_CYRILLIC_SERBIA,
    SERBIAN_LATIN: ()=>SERBIAN_LATIN,
    SERBIAN_LATIN_BOSNIA_AND_HERZEGOVINA: ()=>SERBIAN_LATIN_BOSNIA_AND_HERZEGOVINA,
    SERBIAN_LATIN_SERBIA_AND_MONTENEGRO: ()=>SERBIAN_LATIN_SERBIA_AND_MONTENEGRO,
    SINHALA: ()=>SINHALA,
    SINHALA_SRI_LANKA: ()=>SINHALA_SRI_LANKA,
    SLOVAK: ()=>SLOVAK,
    SLOVAK_SLOVAKIA: ()=>SLOVAK_SLOVAKIA,
    SLOVENIAN: ()=>SLOVENIAN,
    SLOVENIAN_SLOVENIA: ()=>SLOVENIAN_SLOVENIA,
    SPANISH: ()=>SPANISH,
    SPANISH_ARGENTINA: ()=>SPANISH_ARGENTINA,
    SPANISH_BOLIVIA: ()=>SPANISH_BOLIVIA,
    SPANISH_CHILE: ()=>SPANISH_CHILE,
    SPANISH_COLOMBIA: ()=>SPANISH_COLOMBIA,
    SPANISH_COSTA_RICA: ()=>SPANISH_COSTA_RICA,
    SPANISH_CUBA: ()=>SPANISH_CUBA,
    SPANISH_DOMINICAN_REPUBLIC: ()=>SPANISH_DOMINICAN_REPUBLIC,
    SPANISH_ECUADOR: ()=>SPANISH_ECUADOR,
    SPANISH_EL_SALVADOR: ()=>SPANISH_EL_SALVADOR,
    SPANISH_GUATEMALA: ()=>SPANISH_GUATEMALA,
    SPANISH_HONDURAS: ()=>SPANISH_HONDURAS,
    SPANISH_MEXICO: ()=>SPANISH_MEXICO,
    SPANISH_NICARAGUA: ()=>SPANISH_NICARAGUA,
    SPANISH_PANAMA: ()=>SPANISH_PANAMA,
    SPANISH_PARAGUAY: ()=>SPANISH_PARAGUAY,
    SPANISH_PERU: ()=>SPANISH_PERU,
    SPANISH_PUERTO_RICO: ()=>SPANISH_PUERTO_RICO,
    SPANISH_SPAIN: ()=>SPANISH_SPAIN,
    SPANISH_UNITED_STATES: ()=>SPANISH_UNITED_STATES,
    SPANISH_URUGUAY: ()=>SPANISH_URUGUAY,
    SPANISH_VENEZUELA: ()=>SPANISH_VENEZUELA,
    SWAHILI: ()=>SWAHILI,
    SWAHILI_KENYA: ()=>SWAHILI_KENYA,
    SWEDISH: ()=>SWEDISH,
    SWEDISH_FINLAND: ()=>SWEDISH_FINLAND,
    SWEDISH_SWEDEN: ()=>SWEDISH_SWEDEN,
    SYRIAC: ()=>SYRIAC,
    SYRIAC_SYRIA: ()=>SYRIAC_SYRIA,
    TAGALOG: ()=>TAGALOG,
    TAGALOG_PHILIPPINES: ()=>TAGALOG_PHILIPPINES,
    TAMIL: ()=>TAMIL,
    TAMIL_INDIA: ()=>TAMIL_INDIA,
    TATAR: ()=>TATAR,
    TATAR_RUSSIA: ()=>TATAR_RUSSIA,
    TELUGU: ()=>TELUGU,
    TELUGU_INDIA: ()=>TELUGU_INDIA,
    THAI: ()=>THAI,
    THAI_THAILAND: ()=>THAI_THAILAND,
    TSOGA: ()=>TSOGA,
    TSWANA: ()=>TSWANA,
    TSWANA_SOUTH_AFRICA: ()=>TSWANA_SOUTH_AFRICA,
    TURKISH: ()=>TURKISH,
    TURKISH_TURKEY: ()=>TURKISH_TURKEY,
    UKRAINIAN: ()=>UKRAINIAN,
    UKRAINIAN_UKRAINE: ()=>UKRAINIAN_UKRAINE,
    URDU: ()=>URDU,
    URDU_ISLAMIC_REPUBLIC_OF_PAKISTAN: ()=>URDU_ISLAMIC_REPUBLIC_OF_PAKISTAN,
    UZBEK_LATIN: ()=>UZBEK_LATIN,
    UZBEK_LATIN_UZBEKISTAN: ()=>UZBEK_LATIN_UZBEKISTAN,
    VIETNAMESE: ()=>VIETNAMESE,
    VIETNAMESE_VIET_NAM: ()=>VIETNAMESE_VIET_NAM,
    WELSH: ()=>WELSH,
    WELSH_UNITED_KINGDOM: ()=>WELSH_UNITED_KINGDOM,
    XHOSA: ()=>XHOSA,
    XHOSA_SOUTH_AFRICA: ()=>XHOSA_SOUTH_AFRICA,
    YORUBA: ()=>YORUBA,
    YORUBA_NIGERIA: ()=>YORUBA_NIGERIA,
    ZULU: ()=>ZULU,
    ZULU_SOUTH_AFRICA: ()=>ZULU_SOUTH_AFRICA
});
/** Afrikaans language */ const AFRIKAANS = "af";
/** Afrikaans language as used in South Africa */ const AFRIKAANS_SOUTH_AFRICA = "af-ZA";
/** Arabic language */ const ARABIC = "ar";
/** Arabic language as used in the United Arab Emirates */ const ARABIC_UNITED_ARAB_EMIRATES = "ar-AE";
/** Arabic language as used in Bahrain */ const ARABIC_BAHRAIN = "ar-BH";
/** Arabic language as used in Algeria */ const ARABIC_ALGERIA = "ar-DZ";
/** Arabic language as used in Egypt */ const ARABIC_EGYPT = "ar-EG";
/** Arabic language as used in Iraq */ const ARABIC_IRAQ = "ar-IQ";
/** Arabic language as used in Jordan */ const ARABIC_JORDAN = "ar-JO";
/** Arabic language as used in Kuwait */ const ARABIC_KUWAIT = "ar-KW";
/** Arabic language as used in Lebanon */ const ARABIC_LEBANON = "ar-LB";
/** Arabic language as used in Libya */ const ARABIC_LIBYA = "ar-LY";
/** Arabic language as used in Morocco */ const ARABIC_MOROCCO = "ar-MA";
/** Arabic language as used in Oman */ const ARABIC_OMAN = "ar-OM";
/** Arabic language as used in Qatar */ const ARABIC_QATAR = "ar-QA";
/** Arabic language as used in Saudi Arabia */ const ARABIC_SAUDI_ARABIA = "ar-SA";
/** Arabic language as used in Syria */ const ARABIC_SYRIA = "ar-SY";
/** Arabic language as used in Tunisia */ const ARABIC_TUNISIA = "ar-TN";
/** Arabic language as used in Yemen */ const ARABIC_YEMEN = "ar-YE";
/** Azeri language (Latin script) */ const AZERI_LATIN = "az";
/** Azeri language (Latin script) as used in Azerbaijan */ const AZERI_LATIN_AZERBAIJAN = "az-AZ";
/** Belarusian language */ const BELARUSIAN = "be";
/** Belarusian language as used in Belarus */ const BELARUSIAN_BELARUS = "be-BY";
/** Bulgarian language */ const BULGARIAN = "bg";
/** Bulgarian language as used in Bulgaria */ const BULGARIAN_BULGARIA = "bg-BG";
/** Bosnian */ const BOSNIAN = "bs";
/** Bosnian language as used in Bosnia and Herzegovina */ const BOSNIAN_BOSNIA_AND_HERZEGOVINA = "bs-BA";
/** Catalan language */ const CATALAN = "ca";
/** Catalan language as used in Spain */ const CATALAN_SPAIN = "ca-ES";
/** Czech language */ const CZECH = "cs";
/** Czech language as used in Czech Republic */ const CZECH_CZECH_REPUBLIC = "cs-CZ";
/** Welsh language */ const WELSH = "cy";
/** Welsh language as used in the United Kingdom */ const WELSH_UNITED_KINGDOM = "cy-GB";
/** Danish language */ const DANISH = "da";
/** Danish language as used in Denmark */ const DANISH_DENMARK = "da-DK";
/** German language */ const GERMAN = "de";
/** German language as used in Austria */ const GERMAN_AUSTRIA = "de-AT";
/** German language as used in Switzerland */ const GERMAN_SWITZERLAND = "de-CH";
/** German language as used in Germany */ const GERMAN_GERMANY = "de-DE";
/** German language as used in Liechtenstein */ const GERMAN_LIECHTENSTEIN = "de-LI";
/** German language as used in Luxembourg */ const GERMAN_LUXEMBOURG = "de-LU";
/** Divehi language */ const DIVEHI = "dv";
/** Divehi language as used in Maldives */ const DIVEHI_MALDIVES = "dv-MV";
/** Greek language */ const GREEK = "el";
/** Greek language as used in Greece */ const GREEK_GREECE = "el-GR";
/** English language */ const ENGLISH = "en";
/** English language as used in Australia */ const ENGLISH_AUSTRALIA = "en-AU";
/** English language as used in Belize */ const ENGLISH_BELIZE = "en-BZ";
/** English language as used in Canada */ const ENGLISH_CANADA = "en-CA";
/** English language as used in Caribbean */ const ENGLISH_CARIBBEAN = "en-CB";
/** English language as used in the United Kingdom */ const ENGLISH_UNITED_KINGDOM = "en-GB";
/** English language as used in Ireland */ const ENGLISH_IRELAND = "en-IE";
/** English language as used in Jamaica */ const ENGLISH_JAMAICA = "en-JM";
/** English language as used in New Zealand */ const ENGLISH_NEW_ZEALAND = "en-NZ";
/** English language as used in Philippines */ const ENGLISH_PHILIPPINES = "en-PH";
/** English language as used in Trinidad and Tobago */ const ENGLISH_TRINIDAD_AND_TOBAGO = "en-TT";
/** English language as used in the United States */ const ENGLISH_UNITED_STATES = "en-US";
/** English language as used in South Africa */ const ENGLISH_SOUTH_AFRICA = "en-ZA";
/** English language as used in Zimbabwe */ const ENGLISH_ZIMBABWE = "en-ZW";
/** Esperanto language */ const ESPERANTO = "eo";
/** Spanish language */ const SPANISH = "es";
/** Spanish language as used in Argentina */ const SPANISH_ARGENTINA = "es-AR";
/** Spanish language as used in Bolivia */ const SPANISH_BOLIVIA = "es-BO";
/** Spanish language as used in Chile */ const SPANISH_CHILE = "es-CL";
/** Spanish language as used in Colombia */ const SPANISH_COLOMBIA = "es-CO";
/** Spanish language as used in Costa Rica */ const SPANISH_COSTA_RICA = "es-CR";
/** Spanish language as used in Dominican Republic */ const SPANISH_DOMINICAN_REPUBLIC = "es-DO";
/** Spanish language as used in Ecuador */ const SPANISH_ECUADOR = "es-EC";
/** Spanish language as used in Spain */ const SPANISH_SPAIN = "es-ES";
/** Spanish language as used in Guatemala */ const SPANISH_GUATEMALA = "es-GT";
/** Spanish language as used in Honduras */ const SPANISH_HONDURAS = "es-HN";
/** Spanish language as used in Mexico */ const SPANISH_MEXICO = "es-MX";
/** Spanish language as used in Nicaragua */ const SPANISH_NICARAGUA = "es-NI";
/** Spanish language as used in Panama */ const SPANISH_PANAMA = "es-PA";
/** Spanish language as used in Peru */ const SPANISH_PERU = "es-PE";
/** Spanish language as used in Puerto Rico */ const SPANISH_PUERTO_RICO = "es-PR";
/** Spanish language as used in Paraguay */ const SPANISH_PARAGUAY = "es-PY";
/** Spanish language as used in El Salvador */ const SPANISH_EL_SALVADOR = "es-SV";
/** Spanish language as used in Uruguay */ const SPANISH_URUGUAY = "es-UY";
/** Spanish language as used in Venezuela */ const SPANISH_VENEZUELA = "es-VE";
/** Estonian language */ const ESTONIAN = "et";
/** Estonian language as used in Estonia */ const ESTONIAN_ESTONIA = "et-EE";
/** Basque language */ const BASQUE = "eu";
/** Basque language as used in Spain */ const BASQUE_SPAIN = "eu-ES";
/** Farsi language */ const FARSI = "fa";
/** Farsi language as used in Iran */ const FARSI_IRAN = "fa-IR";
/** Finnish language */ const FINNISH = "fi";
/** Finnish language as used in Finland */ const FINNISH_FINLAND = "fi-FI";
/** Faroese language */ const FAROESE = "fo";
/** Faroese language as used in Faroe Islands */ const FAROESE_FAROE_ISLANDS = "fo-FO";
/** French language */ const FRENCH = "fr";
/** French language as used in Belgium */ const FRENCH_BELGIUM = "fr-BE";
/** French language as used in Canada */ const FRENCH_CANADA = "fr-CA";
/** French language as used in Switzerland */ const FRENCH_SWITZERLAND = "fr-CH";
/** French language as used in France */ const FRENCH_FRANCE = "fr-FR";
/** French language as used in Luxembourg */ const FRENCH_LUXEMBOURG = "fr-LU";
/** French language as used in the Principality of Monaco */ const FRENCH_PRINCIPALITY_OF_MONACO = "fr-MC";
/** Galician language */ const GALICIAN = "gl";
/** Galician language as used in Spain */ const GALICIAN_SPAIN = "gl-ES";
/** Gujarati language */ const GUJARATI = "gu";
/** Gujarati language as used in India */ const GUJARATI_INDIA = "gu-IN";
/** Hebrew language */ const HEBREW = "he";
/** Hebrew language as used in Israel */ const HEBREW_ISRAEL = "he-IL";
/** Hindi language */ const HINDI = "hi";
/** Hindi language as used in India */ const HINDI_INDIA = "hi-IN";
/** Croatian language */ const CROATIAN = "hr";
/** Croatian language as used in Bosnia and Herzegovina */ const CROATIAN_BOSNIA_AND_HERZEGOVINA = "hr-BA";
/** Croatian language as used in Croatia */ const CROATIAN_CROATIA = "hr-HR";
/** Hungarian language */ const HUNGARIAN = "hu";
/** Hungarian language as used in Hungary */ const HUNGARIAN_HUNGARY = "hu-HU";
/** Armenian language */ const ARMENIAN = "hy";
/** Armenian language as used in Armenia */ const ARMENIAN_ARMENIA = "hy-AM";
/** Indonesian language */ const INDONESIAN = "id";
/** Indonesian language as used in Indonesia */ const INDONESIAN_INDONESIA = "id-ID";
/** Icelandic language */ const ICELANDIC = "is";
/** Icelandic language as used in Iceland */ const ICELANDIC_ICELAND = "is-IS";
/** Italian language */ const ITALIAN = "it";
/** Italian language as used in Switzerland */ const ITALIAN_SWITZERLAND = "it-CH";
/** Italian language as used in Italy */ const ITALIAN_ITALY = "it-IT";
/** Japanese language */ const JAPANESE = "ja";
/** Japanese language as used in Japan */ const JAPANESE_JAPAN = "ja-JP";
/** Georgian language */ const GEORGIAN = "ka";
/** Georgian language as used in Georgia */ const GEORGIAN_GEORGIA = "ka-GE";
/** Kazakh language */ const KAZAKH = "kk";
/** Kazakh language as used in Kazakhstan */ const KAZAKH_KAZAKHSTAN = "kk-KZ";
/** Kannada language */ const KANNADA = "kn";
/** Kannada language as used in India */ const KANNADA_INDIA = "kn-IN";
/** Korean language */ const KOREAN = "ko";
/** Korean language as used in Korea */ const KOREAN_KOREA = "ko-KR";
/** Konkani language */ const KONKANI = "kok";
/** Konkani language as used in India */ const KONKANI_INDIA = "kok-IN";
/** Kyrgyz language */ const KYRGYZ = "ky";
/** Kyrgyz language as used in Kyrgyzstan */ const KYRGYZ_KYRGYZSTAN = "ky-KG";
/** Lithuanian language */ const LITHUANIAN = "lt";
/** Lithuanian language as used in Lithuania */ const LITHUANIAN_LITHUANIA = "lt-LT";
/** Latvian language */ const LATVIAN = "lv";
/** Latvian language as used in Latvia */ const LATVIAN_LATVIA = "lv-LV";
/** Maori language */ const MAORI = "mi";
/** Maori language as used in New Zealand */ const MAORI_NEW_ZEALAND = "mi-NZ";
/** Macedonian language (Former Yugoslav Republic of Macedonia) */ const FYRO_MACEDONIAN = "mk";
/** Macedonian language as used in Macedonia */ const FYRO_MACEDONIAN_MACEDONIA = "mk-MK";
/** Mongolian language */ const MONGOLIAN = "mn";
/** Mongolian language as used in Mongolia */ const MONGOLIAN_MONGOLIA = "mn-MN";
/** Marathi language */ const MARATHI = "mr";
/** Marathi language as used in India */ const MARATHI_INDIA = "mr-IN";
/** Malay language */ const MALAY = "ms";
/** Malay language as used in Brunei Darussalam */ const MALAY_BRUNEI_DARUSSALAM = "ms-BN";
/** Malay language as used in Malaysia */ const MALAY_MALAYSIA = "ms-MY";
/** Maltese language */ const MALTESE = "mt";
/** Maltese language as used in Malta */ const MALTESE_MALTA = "mt-MT";
/** Norwegian (Bokmål) language */ const NORWEGIAN_BOKMAL = "nb";
/** Norwegian (Bokmål) language as used in Norway */ const NORWEGIAN_BOKMAL_NORWAY = "nb-NO";
/** Dutch language */ const DUTCH = "nl";
/** Dutch language as used in Belgium */ const DUTCH_BELGIUM = "nl-BE";
/** Dutch language as used in the Netherlands */ const DUTCH_NETHERLANDS = "nl-NL";
/** Norwegian (Nynorsk) language as used in Norway */ const NORWEGIAN_NYNORSK_NORWAY = "nn-NO";
/** Northern Sotho language */ const NORTHERN_SOTHO = "ns";
/** Northern Sotho language as used in South Africa */ const NORTHERN_SOTHO_SOUTH_AFRICA = "ns-ZA";
/** Punjabi language */ const PUNJABI = "pa";
/** Punjabi language as used in India */ const PUNJABI_INDIA = "pa-IN";
/** Polish language */ const POLISH = "pl";
/** Polish language as used in Poland */ const POLISH_POLAND = "pl-PL";
/** Pashto language */ const PASHTO = "ps";
/** Pashto language as used in Afghanistan */ const PASHTO_AFGHANISTAN = "ps-AR";
/** Portuguese language */ const PORTUGUESE = "pt";
/** Portuguese language as used in Brazil */ const PORTUGUESE_BRAZIL = "pt-BR";
/** Portuguese language as used in Portugal */ const PORTUGUESE_PORTUGAL = "pt-PT";
/** Quechua language */ const QUECHUA = "qu";
/** Quechua language as used in Bolivia */ const QUECHUA_BOLIVIA = "qu-BO";
/** Quechua language as used in Ecuador */ const QUECHUA_ECUADOR = "qu-EC";
/** Quechua language as used in Peru */ const QUECHUA_PERU = "qu-PE";
/** Romanian language */ const ROMANIAN = "ro";
/** Romanian language as used in Romania */ const ROMANIAN_ROMANIA = "ro-RO";
/** Russian language */ const RUSSIAN = "ru";
/** Russian language as used in Russia */ const RUSSIAN_RUSSIA = "ru-RU";
/** Sanskrit language */ const SANSKRIT = "sa";
/** Sanskrit language as used in India */ const SANSKRIT_INDIA = "sa-IN";
/** Northern Sami language */ const SAMI_NORTHERN = "se";
/** Northern Sami language as used in Finland */ const SAMI_NORTHERN_FINLAND = "se-FI";
/** Northern Sami language as used in Norway */ const SAMI_NORTHERN_NORWAY = "se-NO";
/** Northern Sami language as used in Sweden */ const SAMI_NORTHERN_SWEDEN = "se-SE";
/** Slovak language */ const SLOVAK = "sk";
/** Slovak language as used in Slovakia */ const SLOVAK_SLOVAKIA = "sk-SK";
/** Slovenian language */ const SLOVENIAN = "sl";
/** Slovenian language as used in Slovenia */ const SLOVENIAN_SLOVENIA = "sl-SI";
/** Albanian language */ const ALBANIAN = "sq";
/** Albanian language as used in Albania */ const ALBANIAN_ALBANIA = "sq-AL";
/** Servian language (Latin script) */ const SERBIAN_LATIN = "sr";
/** Serbian language (Latin script) as used in Bosnia and Herzegovina */ const SERBIAN_LATIN_BOSNIA_AND_HERZEGOVINA = "sr-BA";
/** Serbian language (Latin script) as used in Serbia and Montenegro */ const SERBIAN_LATIN_SERBIA_AND_MONTENEGRO = "sr-SP";
/** Swedish language */ const SWEDISH = "sv";
/** Swedish language as used in Finland */ const SWEDISH_FINLAND = "sv-FI";
/** Swedish language as used in Sweden */ const SWEDISH_SWEDEN = "sv-SE";
/** Swahili language */ const SWAHILI = "sw";
/** Swahili language as used in Kenya */ const SWAHILI_KENYA = "sw-KE";
/** Syriac language */ const SYRIAC = "syr";
/** Syriac language as used in Syria */ const SYRIAC_SYRIA = "syr-SY";
/** Tamil language */ const TAMIL = "ta";
/** Tamil language as used in India */ const TAMIL_INDIA = "ta-IN";
/** Telugu language */ const TELUGU = "te";
/** Telugu language as used in India */ const TELUGU_INDIA = "te-IN";
/** Thai language */ const THAI = "th";
/** Thai language as used in Thailand */ const THAI_THAILAND = "th-TH";
/** Tagalog language */ const TAGALOG = "tl";
/** Tagalog language as used in Philippines */ const TAGALOG_PHILIPPINES = "tl-PH";
/** Tswana language */ const TSWANA = "tn";
/** Tswana language as used in South Africa */ const TSWANA_SOUTH_AFRICA = "tn-ZA";
/** Turkish language */ const TURKISH = "tr";
/** Turkish language as used in Turkey */ const TURKISH_TURKEY = "tr-TR";
/** Tatar language */ const TATAR = "tt";
/** Tatar language as used in Russia */ const TATAR_RUSSIA = "tt-RU";
/** Tsonga language */ const TSOGA = "ts";
/** Ukrainian language */ const UKRAINIAN = "uk";
/** Ukrainian language as used in Ukraine */ const UKRAINIAN_UKRAINE = "uk-UA";
/** Urdu language */ const URDU = "ur";
/** Urdu language as used in Islamic Republic of Pakistan */ const URDU_ISLAMIC_REPUBLIC_OF_PAKISTAN = "ur-PK";
/** Uzbek language (Latin script) */ const UZBEK_LATIN = "uz";
/** Uzbek language (Latin script) as used in Uzbekistan */ const UZBEK_LATIN_UZBEKISTAN = "uz-UZ";
/** Vietnamese language */ const VIETNAMESE = "vi";
/** Vietnamese language as used in Viet Nam */ const VIETNAMESE_VIET_NAM = "vi-VN";
/** Xhosa language */ const XHOSA = "xh";
/** Xhosa language as used in South Africa */ const XHOSA_SOUTH_AFRICA = "xh-ZA";
/** Chinese language */ const CHINESE = "zh";
/** Chinese language (Simplified) */ const CHINESE_SIMPLIFIED = "zh-Hans";
/** Chinese language (Simplified, People's Republic of China) */ const CHINESE_SIMPLIFIED_CHINA = "zh-CN";
/** Chinese language as used in Hong Kong */ const CHINESE_HONG_KONG = "zh-HK";
/** Chinese language as used in Macau */ const CHINESE_MACAU = "zh-MO";
/** Chinese language as used in Singapore */ const CHINESE_SINGAPORE = "zh-SG";
/** Chinese language (Traditional script) */ const CHINESE_TRADITIONAL = "zh-Hant";
/** Zulu language */ const ZULU = "zu";
/** Zulu language as used in South Africa */ const ZULU_SOUTH_AFRICA = "zu-ZA";
/** Bengali / Bangla */ const BENGALI = "bn";
/** Bengali / Bangla as used in Bangladesh */ const BENGALI_BANGLADESH = "bn-BD";
/** Bengali / Bangla as used in India */ const BENGALI_INDIA = "bn-IN";
/** Bengali / Bangla as used in Myanmar */ const BENGALI_MYANMAR = "bn-MM";
/** Burmese language */ const BURMESE = "my";
/** Burmese language as used in Myanmar */ const BURMESE_MYANMAR = "my-MM";
/** Khmer language */ const KHMER = "km";
/** Khmer language as used in Cambodia */ const KHMER_CAMBODIA = "km-KH";
/** Lao language */ const LAO = "lo";
/** Lao language as used in Laos */ const LAO_LAOS = "lo-LA";
/** Yoruba language */ const YORUBA = "yo";
/** Yoruba language as used in Nigeria */ const YORUBA_NIGERIA = "yo-NG";
/** Amharic language */ const AMHARIC = "am";
/** Amharic language as used in Ethiopia */ const AMHARIC_ETHIOPIA = "am-ET";
/** Nepali language */ const NEPALI = "ne";
/** Nepali language as used in Nepal */ const NEPALI_NEPAL = "ne-NP";
/** Sinhala language */ const SINHALA = "si";
/** Sinhala language as used in Sri Lanka */ const SINHALA_SRI_LANKA = "si-LK";
/** Serbian language (Cyrillic script) */ const SERBIAN_CYRILLIC = "sr-Cyrl";
/** Serbian language (Cyrillic script) as used in Serbia */ const SERBIAN_CYRILLIC_SERBIA = "sr-RS";
/** Serbian language (Cyrillic script) as used in Bosnia and Herzegovina */ const SERBIAN_CYRILLIC_BOSNIA_AND_HERZEGOVINA = "sr-BA";
/** English language as used in India */ const ENGLISH_INDIA = "en-IN";
/** English language as used in Singapore */ const ENGLISH_SINGAPORE = "en-SG";
/** English language as used in Hong Kong */ const ENGLISH_HONG_KONG = "en-HK";
/** English language as used in Nigeria */ const ENGLISH_NIGERIA = "en-NG";
/** English language as used in Pakistan */ const ENGLISH_PAKISTAN = "en-PK";
/** English language as used in Malaysia */ const ENGLISH_MALAYSIA = "en-MY";
/** English language as used in Botswana */ const ENGLISH_BOTSWANA = "en-BW";
/** English language as used in Kenya */ const ENGLISH_KENYA = "en-KE";
/** English language as used in Tanzania */ const ENGLISH_TANZANIA = "en-TZ";
/** English language as used in Ghana */ const ENGLISH_GHANA = "en-GH";
/** English language as used in Uganda */ const ENGLISH_UGANDA = "en-UG";
/** Spanish language as used in Cuba */ const SPANISH_CUBA = "es-CU";
/** Spanish language as used in United States */ const SPANISH_UNITED_STATES = "es-US";
/** Portuguese language as used in Guinea-Bissau */ const PORTUGUESE_GUINEA_BISSAU = "pt-GW";
/** Portuguese language as used in Mozambique */ const PORTUGUESE_MOZAMBIQUE = "pt-MZ";
/** Portuguese language as used in São Tomé and Príncipe */ const PORTUGUESE_SAO_TOME_AND_PRINCIPE = "pt-ST";
/** Portuguese language as used in Cape Verde */ const PORTUGUESE_CAPE_VERDE = "pt-CV";
/** Portuguese language as used in Timor-Leste */ const PORTUGUESE_TIMOR_LESTE = "pt-TL";
/** Portuguese language as used in Macau */ const PORTUGUESE_MACAU = "pt-MO";
/** Chinese language as used in Taiwan */ const CHINESE_TAIWAN = "zh-TW";
/** Arabic language as used in Mauritania */ const ARABIC_MAURITANIA = "ar-MR";
/** Arabic language as used in Palestinian Territories */ const ARABIC_PALESTINE = "ar-PS";
/** Arabic language as used in Sudan */ const ARABIC_SUDAN = "ar-SD";
/** Arabic language as used in Djibouti */ const ARABIC_DJIBOUTI = "ar-DJ";
/** Arabic language as used in Somalia */ const ARABIC_SOMALIA = "ar-SO";
/** Arabic language as used in Chad */ const ARABIC_CHAD = "ar-TD";
/** Arabic language as used in Comoros */ const ARABIC_COMOROS = "ar-KM";
const ALL_LOCALES = {
    AFRIKAANS,
    AFRIKAANS_SOUTH_AFRICA,
    ARABIC,
    ARABIC_UNITED_ARAB_EMIRATES,
    ARABIC_BAHRAIN,
    ARABIC_ALGERIA,
    ARABIC_EGYPT,
    ARABIC_IRAQ,
    ARABIC_JORDAN,
    ARABIC_KUWAIT,
    ARABIC_LEBANON,
    ARABIC_LIBYA,
    ARABIC_MOROCCO,
    ARABIC_OMAN,
    ARABIC_QATAR,
    ARABIC_SAUDI_ARABIA,
    ARABIC_SYRIA,
    ARABIC_TUNISIA,
    ARABIC_YEMEN,
    AZERI_LATIN,
    AZERI_LATIN_AZERBAIJAN,
    BELARUSIAN,
    BELARUSIAN_BELARUS,
    BULGARIAN,
    BULGARIAN_BULGARIA,
    BOSNIAN,
    BOSNIAN_BOSNIA_AND_HERZEGOVINA,
    CATALAN,
    CATALAN_SPAIN,
    CZECH,
    CZECH_CZECH_REPUBLIC,
    WELSH,
    WELSH_UNITED_KINGDOM,
    DANISH,
    DANISH_DENMARK,
    GERMAN,
    GERMAN_AUSTRIA,
    GERMAN_SWITZERLAND,
    GERMAN_GERMANY,
    GERMAN_LIECHTENSTEIN,
    GERMAN_LUXEMBOURG,
    DIVEHI,
    DIVEHI_MALDIVES,
    GREEK,
    GREEK_GREECE,
    ENGLISH,
    ENGLISH_AUSTRALIA,
    ENGLISH_BELIZE,
    ENGLISH_CANADA,
    ENGLISH_CARIBBEAN,
    ENGLISH_UNITED_KINGDOM,
    ENGLISH_IRELAND,
    ENGLISH_JAMAICA,
    ENGLISH_NEW_ZEALAND,
    ENGLISH_PHILIPPINES,
    ENGLISH_TRINIDAD_AND_TOBAGO,
    ENGLISH_UNITED_STATES,
    ENGLISH_SOUTH_AFRICA,
    ENGLISH_ZIMBABWE,
    ESPERANTO,
    SPANISH,
    SPANISH_ARGENTINA,
    SPANISH_BOLIVIA,
    SPANISH_CHILE,
    SPANISH_COLOMBIA,
    SPANISH_COSTA_RICA,
    SPANISH_DOMINICAN_REPUBLIC,
    SPANISH_ECUADOR,
    SPANISH_SPAIN,
    SPANISH_GUATEMALA,
    SPANISH_HONDURAS,
    SPANISH_MEXICO,
    SPANISH_NICARAGUA,
    SPANISH_PANAMA,
    SPANISH_PERU,
    SPANISH_PUERTO_RICO,
    SPANISH_PARAGUAY,
    SPANISH_EL_SALVADOR,
    SPANISH_URUGUAY,
    SPANISH_VENEZUELA,
    ESTONIAN,
    ESTONIAN_ESTONIA,
    BASQUE,
    BASQUE_SPAIN,
    FARSI,
    FARSI_IRAN,
    FINNISH,
    FINNISH_FINLAND,
    FAROESE,
    FAROESE_FAROE_ISLANDS,
    FRENCH,
    FRENCH_BELGIUM,
    FRENCH_CANADA,
    FRENCH_SWITZERLAND,
    FRENCH_FRANCE,
    FRENCH_LUXEMBOURG,
    FRENCH_PRINCIPALITY_OF_MONACO,
    GALICIAN,
    GALICIAN_SPAIN,
    GUJARATI,
    GUJARATI_INDIA,
    HEBREW,
    HEBREW_ISRAEL,
    HINDI,
    HINDI_INDIA,
    CROATIAN,
    CROATIAN_BOSNIA_AND_HERZEGOVINA,
    CROATIAN_CROATIA,
    HUNGARIAN,
    HUNGARIAN_HUNGARY,
    ARMENIAN,
    ARMENIAN_ARMENIA,
    INDONESIAN,
    INDONESIAN_INDONESIA,
    ICELANDIC,
    ICELANDIC_ICELAND,
    ITALIAN,
    ITALIAN_SWITZERLAND,
    ITALIAN_ITALY,
    JAPANESE,
    JAPANESE_JAPAN,
    GEORGIAN,
    GEORGIAN_GEORGIA,
    KAZAKH,
    KAZAKH_KAZAKHSTAN,
    KANNADA,
    KANNADA_INDIA,
    KOREAN,
    KOREAN_KOREA,
    KONKANI,
    KONKANI_INDIA,
    KYRGYZ,
    KYRGYZ_KYRGYZSTAN,
    LITHUANIAN,
    LITHUANIAN_LITHUANIA,
    LATVIAN,
    LATVIAN_LATVIA,
    MAORI,
    MAORI_NEW_ZEALAND,
    FYRO_MACEDONIAN,
    FYRO_MACEDONIAN_MACEDONIA,
    MONGOLIAN,
    MONGOLIAN_MONGOLIA,
    MARATHI,
    MARATHI_INDIA,
    MALAY,
    MALAY_BRUNEI_DARUSSALAM,
    MALAY_MALAYSIA,
    MALTESE,
    MALTESE_MALTA,
    NORWEGIAN_BOKMAL,
    NORWEGIAN_BOKMAL_NORWAY,
    DUTCH,
    DUTCH_BELGIUM,
    DUTCH_NETHERLANDS,
    NORWEGIAN_NYNORSK_NORWAY,
    NORTHERN_SOTHO,
    NORTHERN_SOTHO_SOUTH_AFRICA,
    PUNJABI,
    PUNJABI_INDIA,
    POLISH,
    POLISH_POLAND,
    PASHTO,
    PASHTO_AFGHANISTAN,
    PORTUGUESE,
    PORTUGUESE_BRAZIL,
    PORTUGUESE_PORTUGAL,
    QUECHUA,
    QUECHUA_BOLIVIA,
    QUECHUA_ECUADOR,
    QUECHUA_PERU,
    ROMANIAN,
    ROMANIAN_ROMANIA,
    RUSSIAN,
    RUSSIAN_RUSSIA,
    SANSKRIT,
    SANSKRIT_INDIA,
    SAMI_NORTHERN,
    SAMI_NORTHERN_FINLAND,
    SAMI_NORTHERN_NORWAY,
    SAMI_NORTHERN_SWEDEN,
    SLOVAK,
    SLOVAK_SLOVAKIA,
    SLOVENIAN,
    SLOVENIAN_SLOVENIA,
    ALBANIAN,
    ALBANIAN_ALBANIA,
    SERBIAN_LATIN,
    SERBIAN_LATIN_BOSNIA_AND_HERZEGOVINA,
    SERBIAN_LATIN_SERBIA_AND_MONTENEGRO,
    SWEDISH,
    SWEDISH_FINLAND,
    SWEDISH_SWEDEN,
    SWAHILI,
    SWAHILI_KENYA,
    SYRIAC,
    SYRIAC_SYRIA,
    TAMIL,
    TAMIL_INDIA,
    TELUGU,
    TELUGU_INDIA,
    THAI,
    THAI_THAILAND,
    TAGALOG,
    TAGALOG_PHILIPPINES,
    TSWANA,
    TSWANA_SOUTH_AFRICA,
    TURKISH,
    TURKISH_TURKEY,
    TATAR,
    TATAR_RUSSIA,
    TSOGA,
    UKRAINIAN,
    UKRAINIAN_UKRAINE,
    URDU,
    URDU_ISLAMIC_REPUBLIC_OF_PAKISTAN,
    UZBEK_LATIN,
    UZBEK_LATIN_UZBEKISTAN,
    VIETNAMESE,
    VIETNAMESE_VIET_NAM,
    XHOSA,
    XHOSA_SOUTH_AFRICA,
    CHINESE,
    CHINESE_SIMPLIFIED,
    CHINESE_SIMPLIFIED_CHINA,
    CHINESE_HONG_KONG,
    CHINESE_MACAU,
    CHINESE_SINGAPORE,
    CHINESE_TRADITIONAL,
    ZULU,
    ZULU_SOUTH_AFRICA,
    BENGALI,
    BENGALI_BANGLADESH,
    BENGALI_INDIA,
    BENGALI_MYANMAR,
    BURMESE,
    BURMESE_MYANMAR,
    KHMER,
    KHMER_CAMBODIA,
    LAO,
    LAO_LAOS,
    YORUBA,
    YORUBA_NIGERIA,
    AMHARIC,
    AMHARIC_ETHIOPIA,
    NEPALI,
    NEPALI_NEPAL,
    SINHALA,
    SINHALA_SRI_LANKA,
    SERBIAN_CYRILLIC,
    SERBIAN_CYRILLIC_SERBIA,
    SERBIAN_CYRILLIC_BOSNIA_AND_HERZEGOVINA,
    ENGLISH_INDIA,
    ENGLISH_SINGAPORE,
    ENGLISH_HONG_KONG,
    ENGLISH_NIGERIA,
    ENGLISH_PAKISTAN,
    ENGLISH_MALAYSIA,
    ENGLISH_BOTSWANA,
    ENGLISH_KENYA,
    ENGLISH_TANZANIA,
    ENGLISH_GHANA,
    ENGLISH_UGANDA,
    SPANISH_CUBA,
    SPANISH_UNITED_STATES,
    PORTUGUESE_GUINEA_BISSAU,
    PORTUGUESE_MOZAMBIQUE,
    PORTUGUESE_SAO_TOME_AND_PRINCIPE,
    PORTUGUESE_CAPE_VERDE,
    PORTUGUESE_TIMOR_LESTE,
    PORTUGUESE_MACAU,
    CHINESE_TAIWAN,
    ARABIC_MAURITANIA,
    ARABIC_PALESTINE,
    ARABIC_SUDAN,
    ARABIC_DJIBOUTI,
    ARABIC_SOMALIA,
    ARABIC_CHAD,
    ARABIC_COMOROS
};
;
 //# sourceMappingURL=locales.mjs.map
}),
"[project]/node_modules/@intlayer/types/dist/esm/locales.mjs [app-rsc] (ecmascript) <export locales_exports as Locales>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Locales",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["locales_exports"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@intlayer/types/dist/esm/locales.mjs [app-rsc] (ecmascript)");
}),
"[project]/node_modules/@intlayer/core/dist/esm/localization/getHTMLTextDir.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHTMLTextDir",
    ()=>getHTMLTextDir
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__ = __turbopack_context__.i("[project]/node_modules/@intlayer/types/dist/esm/locales.mjs [app-rsc] (ecmascript) <export locales_exports as Locales>");
;
//#region src/localization/getHTMLTextDir.ts
/**
* Returns the text direction of the given locale.
*
* Example:
*
* getHTMLTextDir('en-US') // 'ltr'
* getHTMLTextDir('en') // 'ltr'
* getHTMLTextDir('fr-CA') // 'ltr'
* getHTMLTextDir('fr') // 'ltr'
*
* @param locale The locale to get the text direction for.
* @returns The text direction of the given locale.
*/ const getHTMLTextDir = (locale)=>{
    switch(locale){
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].FARSI:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].URDU:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].PASHTO:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].SYRIAC:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC_UNITED_ARAB_EMIRATES:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC_BAHRAIN:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC_ALGERIA:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC_EGYPT:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC_IRAQ:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC_JORDAN:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC_KUWAIT:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC_LEBANON:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC_LIBYA:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC_MOROCCO:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC_OMAN:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC_QATAR:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC_SAUDI_ARABIA:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC_SYRIA:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC_TUNISIA:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].ARABIC_YEMEN:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].FARSI_IRAN:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].URDU_ISLAMIC_REPUBLIC_OF_PAKISTAN:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].PASHTO_AFGHANISTAN:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$intlayer$2f$types$2f$dist$2f$esm$2f$locales$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__locales_exports__as__Locales$3e$__["Locales"].SYRIAC_SYRIA:
            return "rtl";
        default:
            return "ltr";
    }
};
;
 //# sourceMappingURL=getHTMLTextDir.mjs.map
}),
"[project]/node_modules/next-intlayer/dist/esm/generateStaticParams.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$intlayer$2f$config$2f$configuration$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/.intlayer/config/configuration.json (json)");
;
//#region src/generateStaticParams.ts
const { locales } = __TURBOPACK__imported__module__$5b$project$5d2f2e$intlayer$2f$config$2f$configuration$2e$json__$28$json$29$__["default"].internationalization;
const generateStaticParams = ()=>locales.map((locale)=>({
            locale
        }));
;
 //# sourceMappingURL=generateStaticParams.mjs.map
}),
];

//# sourceMappingURL=_a57d1792._.js.map