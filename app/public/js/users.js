"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const usersModule = (() => {
    const BASE_URL = 'http://localhost:3000/api/v1/users';
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    return {
        fetchAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield fetch(BASE_URL);
            const users = yield res.json();
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                const body = `<tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.profile}</td>
                        <td>${user.date_of_birth}</td>
                        <td>${user.created_at}</td>
                        <td>${user.updated_at}</td>
                      </tr>`;
                document
                    .getElementById('users-list')
                    .insertAdjacentHTML('beforeend', body);
            }
        }),
        createUser: () => __awaiter(void 0, void 0, void 0, function* () {
            const name = document.getElementById('name').value;
            const profile = document.getElementById('profile')
                .value;
            const dateOfBirth = document.getElementById('date-of-birth').value;
            const body = {
                name: name,
                profile: profile,
                date_of_birth: dateOfBirth,
            };
            const res = yield fetch(BASE_URL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
            });
            const resJson = yield res.json();
            alert(resJson.message);
            window.location.href = '/';
        }),
    };
})();
