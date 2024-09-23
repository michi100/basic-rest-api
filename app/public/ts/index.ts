const indexModule = (() => {
  const path = window.location.pathname;
  try {
    switch (path) {
      case '/':
        // 検索ボタンクリックした時のイベントリスナー設定
        document
          .getElementById('search-button')
          ?.addEventListener('click', () => {
            return searchModule.searchUsers();
          });
        return usersModule.fetchAllUsers();
      case '/create.html':
        // 保存ボタンクリックした時のイベントリスナー設定
        document
          .getElementById('save-button')
          ?.addEventListener('click', () => {
            return usersModule.createUser();
          });
        document
          .getElementById('cancel-button')
          ?.addEventListener('click', () => {
            return (window.location.href = '/');
          });
        break;
      case '/edit.html':
        const uid = window.location.search.split('?uid=')[1];
        document
          .getElementById('save-button')
          ?.addEventListener('click', () => {
            return usersModule.saveUser(uid);
          });
        document
          .getElementById('cancel-button')
          ?.addEventListener('click', () => {
            return (window.location.href = '/');
          });
        document
          .getElementById('delete-button')
          ?.addEventListener('click', () => {
            return usersModule.deleteUser(uid);
          });
        return usersModule.setExistingValue(uid);
      default:
        break;
    }
  } catch (e) {
    console.error('Error: ', e);
  }
})();
