module.exports = [
"[project]/src/actions/base.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40af97d20c21145baf4d8ec83b0d1110d1aa34c5d4":"baseAction"},"",""] */ __turbopack_context__.s([
    "baseAction",
    ()=>baseAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function baseAction(config) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const access_token = cookieStore.get("access_token")?.value;
    const refresh_token = cookieStore.get("refresh_token")?.value;
    const headers = {
        ...config.headers || {},
        Cookie: `access_token=${access_token}; refresh_token=${refresh_token}`
    };
    const res = await fetch(config.url, {
        ...config,
        headers,
        credentials: "include"
    });
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) {
        cookieStore.set({
            name: "access_token",
            value: extractToken(setCookie),
            httpOnly: true,
            path: "/"
        });
    }
    if (!res.ok) {
        let message = "Request failed";
        try {
            const data = await res.json();
            message = data?.message || message;
        } catch  {}
        throw new Error(message);
    }
    return res.json();
}
function extractToken(setCookie) {
    return setCookie.split("=")[1].split(";")[0];
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    baseAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(baseAction, "40af97d20c21145baf4d8ec83b0d1110d1aa34c5d4", null);
}),
"[project]/src/actions/profile.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"009b0390c952713b635cf4efb24e41e46c58693cef":"profileAction"},"",""] */ __turbopack_context__.s([
    "profileAction",
    ()=>profileAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$base$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/base.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function profileAction() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$base$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseAction"])({
        url: {},
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
"[project]/.next-internal/server/app/account/user/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/profile.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/actions/base.tsx [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$profile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/profile.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$base$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/base.tsx [app-rsc] (ecmascript)");
;
;
}),
"[project]/.next-internal/server/app/account/user/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/profile.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/actions/base.tsx [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "009b0390c952713b635cf4efb24e41e46c58693cef",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$profile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["profileAction"],
    "40af97d20c21145baf4d8ec83b0d1110d1aa34c5d4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$base$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$account$2f$user$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$profile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$base$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/account/user/page/actions.js { ACTIONS_MODULE0 => "[project]/src/actions/profile.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/actions/base.tsx [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$profile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/profile.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$base$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/base.tsx [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_e5d26362._.js.map