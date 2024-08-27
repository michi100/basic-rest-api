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
const searchModule = (() => {
    const BASE_URL = 'http://localhost:3000/api/v1/search';
    return {
        searchUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            const query = document.getElementById('search')
                .value;
            const res = yield fetch(BASE_URL + '?q=' + query);
            const result = yield res.json();
            let body = '';
            for (let i = 0; i < result.length; i++) {
                const user = result[i];
                body += `<tr>
                  <td>${user.id}</td>
                  <td>${user.name}</td>
                  <td>${user.profile}</td>
                  <td>${user.date_of_birth}</td>
                  <td>${user.created_at}</td>
                  <td>${user.updated_at}</td>
                </tr>`;
            }
            document.getElementById('users-list').innerHTML = body;
        }),
    };
})();
