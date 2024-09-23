const usersModule = (() => {
  const BASE_URL = 'http://localhost:3000/api/v1/users';
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  const handleError = async (res: Response) => {
    const resJson = await res.json();
    switch (res.status) {
      case 200:
        alert(resJson.message);
        window.location.href = '/';
        break;
      case 201:
        alert(resJson.message);
        window.location.href = '/';
        break;
      case 400:
        // リクエストのパラメータミス
        alert(resJson.error);
        break;
      case 404:
        // リソースが見つからない
        alert(resJson.error);
        break;
      case 500:
        alert(resJson.error);
        break;
      default:
        alert('何らかのエラーが発生しました。');
        break;
    }
  };

  return {
    fetchAllUsers: async () => {
      try {
        const res = await fetch(BASE_URL);
        const users = await res.json();
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          const body = `<tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.profile}</td>
                        <td>${user.date_of_birth}</td>
                        <td>${user.created_at}</td>
                        <td>${user.updated_at}</td>
                        <td><a href='edit.html?uid=${user.id}'>編集</a></td>
                      </tr>`;
          document
            .getElementById('users-list')!
            .insertAdjacentHTML('beforeend', body);
        }
      } catch (e) {
        console.error('Error: ', e);
      }
    },

    createUser: async () => {
      const name = (document.getElementById('name') as HTMLInputElement).value;
      const profile = (document.getElementById('profile') as HTMLInputElement)
        .value;
      const dateOfBirth = (
        document.getElementById('date-of-birth') as HTMLInputElement
      ).value;
      const body = {
        name: name,
        profile: profile,
        date_of_birth: dateOfBirth,
      };
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });
      const resJson = await res.json();
      alert(resJson.message);
      // window.location.href = '/';
      return handleError(res);
    },

    setExistingValue: async (uid: string) => {
      const res = await fetch(BASE_URL + '/' + uid);
      const resJson = await res.json();
      (document.getElementById('name') as HTMLInputElement).value =
        resJson.name;
      (document.getElementById('profile') as HTMLInputElement).value =
        resJson.profile;
      (document.getElementById('date-of-birth') as HTMLInputElement).value =
        resJson.date_of_birth;
      return handleError(res);
    },

    saveUser: async (uid: string) => {
      const name = (document.getElementById('name') as HTMLInputElement).value;
      const profile = (document.getElementById('profile') as HTMLInputElement)
        .value;
      const dateOfBirth = (
        document.getElementById('date-of-birth') as HTMLInputElement
      ).value;
      const body = {
        name: name,
        profile: profile,
        date_of_birth: dateOfBirth,
      };
      console.log('🚀 ~ saveUser: ~ body:', body);
      const res = await fetch(BASE_URL + '/' + uid, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
      });
      const resJson = await res.json();
      console.log('🚀 ~ saveUser: ~ resJson:', resJson);
      alert(resJson.message);
      window.location.href = '/';
      return handleError(res);
    },

    deleteUser: async (uid: string) => {
      const ret = window.confirm('このユーザを削除しますか？');
      if (!ret) {
        return false;
      } else {
        const res = await fetch(BASE_URL + '/' + uid, {
          method: 'DELETE',
          headers: headers,
        });
        const resJson = await res.json();
        alert(resJson.message);
        window.location.href = '/';
        return handleError(res);
      }
    },
  };
})();
