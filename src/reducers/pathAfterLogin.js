import { SET_PATH_AFTER_LOGIN } from "../actions/pathAfterLogin";

export default function path(state = '/', action) {
  switch (action.type) {
    case SET_PATH_AFTER_LOGIN:
      return action.pathAfterLogin;
    default:
      return state;
  }
} 