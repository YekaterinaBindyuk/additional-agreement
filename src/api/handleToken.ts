import authRedirectService from "./authRedirectService";

export const handleToken = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const sessionToken = urlParams.get("session");

  if (sessionToken) {
    authRedirectService.setToken(sessionToken);

    const updatedUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState({ path: updatedUrl }, "", updatedUrl);
  } else {
    console.error("Токен сессии не найден в URL.");
  }
};
