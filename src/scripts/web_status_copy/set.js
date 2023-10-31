const status = `替换成你的get.js输出的内容`;
const store = JSON.parse(status);
Object.keys(store.localStorage).forEach((key) =>
  localStorage.setItem(key, store.localStorage[key])
);
Object.keys(store.sessionStorage).forEach((key) =>
  sessionStorage.setItem(key, store.sessionStorage[key])
);
document.cookie = store.cookie;
