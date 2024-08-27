"use strict";
const indexModule = (() => {
    var _a, _b, _c;
    const path = window.location.pathname;
    switch (path) {
        case '/':
            // 検索ボタンクリックした時のイベントリスナー設定
            (_a = document
                .getElementById('search-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                return searchModule.searchUsers();
            });
            return usersModule.fetchAllUsers();
        case '/create.html':
            // 保存ボタンクリックした時のイベントリスナー設定
            (_b = document.getElementById('save-button')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                return usersModule.createUser();
            });
            (_c = document
                .getElementById('cancel-button')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
                return (window.location.href = '/');
            });
            break;
        default:
            break;
    }
})();
