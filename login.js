const menus = [
    { menu: '#LoginMenu', login: '#Login', close: '#CloseLogin' },
    { menu: '#LoginMenuScore', login: '#LoginScore', close: '#CloseLoginScore' },
    { menu: '#LoginMenuQa', login: '#LoginQa', close: '#CloseLoginQa' },
    { menu: '#LoginMenuForum', login: '#LoginForum', close: '#CloseLoginForum' },
    { menu: '#LoginMenuForumMax', login: '#LoginForumMax', close: '#CloseLoginForumMax' },
    { menu: '#LoginMenuQaMax', login: '#LoginQaMax', close: '#CloseLoginQaMax' },
    { menu: '#LoginMenuMaxScreen', login: '#LoginMaxScreen', close: '#CloseLoginMaxScreen' },
];

function setupMenuHandlers(menuId, loginId, closeId) {
    const menu = document.querySelector(menuId);
    const login = document.querySelector(loginId);
    const close = document.querySelector(closeId);

    if (!menu || !login || !close) return;

    menu.addEventListener('click', () => {
        login.classList.toggle('hidelogin');
        hideSidebar();
    });

    document.addEventListener('click', (e) => {
        if (!close.contains(e.target) && e.target !== menu) {
            login.classList.add('hidelogin');
        }
    });
}

menus.forEach(({ menu, login, close }) => setupMenuHandlers(menu, login, close));

////////////////////////////////////////////////////////////

