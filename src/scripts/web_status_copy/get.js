const store = { cookie: "", localStorage: {}, sessionStorage: {} };
Object.keys(localStorage).forEach(
  (key) => (store.localStorage[key] = localStorage.getItem(key))
);
Object.keys(sessionStorage).forEach(
  (key) => (store.sessionStorage[key] = sessionStorage.getItem(key))
);
store.cookie = document.cookie;
console.log(JSON.stringify(store));
