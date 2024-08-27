const indexModule = (() => {
  const path = window.location.pathname;

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
      document.getElementById('save-button')?.addEventListener('click', () => {
        return usersModule.createUser();
      });
      document
        .getElementById('cancel-button')
        ?.addEventListener('click', () => {
          return (window.location.href = '/');
        });
      break;
    default:
      break;
  }
})();
