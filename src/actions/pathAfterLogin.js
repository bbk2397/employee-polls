export const SET_PATH_AFTER_LOGIN = "SET_PATH_AFTER_LOGIN";

export function setPathAfterLogin(pathAfterLogin) {
  return {
    type: SET_PATH_AFTER_LOGIN,
    pathAfterLogin,
  };
}