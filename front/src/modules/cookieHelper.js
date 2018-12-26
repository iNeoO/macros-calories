const cookieName = process.env.VUE_APP_COOKIE;

export default {
  getCookie() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return '';
  },

  setCookie(token) {
    const expires = new Date(token.expire_at);
    const value = token.token;
    document.cookie = `${cookieName}=${value};expires=${expires};path=/`;
  },

  deleteCookie() {
    const d = new Date();
    d.setTime(d.getTime() - (1000 * 60 * 60 * 24));
    const expires = `expires=${d.toGMTString()}`;
    window.document.cookie = `${cookieName}=; ${expires}`;
  },
};
