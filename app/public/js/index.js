"use strict";
const indexModule = (() => {
    var _a, _b, _c, _d, _e, _f;
    const path = window.location.pathname;
    try {
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
                (_b = document
                    .getElementById('save-button')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                    return usersModule.createUser();
                });
                (_c = document
                    .getElementById('cancel-button')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
                    return (window.location.href = '/');
                });
                break;
            case '/edit.html':
                const uid = window.location.search.split('?uid=')[1];
                (_d = document
                    .getElementById('save-button')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
                    return usersModule.saveUser(uid);
                });
                (_e = document
                    .getElementById('cancel-button')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => {
                    return (window.location.href = '/');
                });
                (_f = document
                    .getElementById('delete-button')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', () => {
                    return usersModule.deleteUser(uid);
                });
                return usersModule.setExistingValue(uid);
            default:
                break;
        }
    }
    catch (e) {
        console.error('Error: ', e);
    }
})();
