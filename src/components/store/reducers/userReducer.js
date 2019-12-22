const initState = {
  userId: "",
  username: "",
  likedTracks: [],
  errorMessage: "",
  isFetching: false,
  active: false,
  mount: false,
  notification: false
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "SIGNUP_START":
      return { ...state, isFetching: true };
    case "SIGNUP_SUCCESS":
      return { ...state, isFetching: false };
    case "SIGNUP_ERROR":
      return { ...state, errorMessage: action.err, isFetching: false };
    case "LOGOUT_START":
      return { ...state, isFetching: true };
    case "LOGOUT_SUCCESS":
      return { ...state, isFetching: false };
    case "LOGOUT_ERROR":
      return { ...state, errorMessage: action.err, isFetching: false };
    case "USER_IS_ACTIVE":
      return {
        ...state,
        active: true,
        userId: action.id,
        username: action.username,
        likedTracks: action.likedTracks,
        mount: true
      };
    case "USER_IS_NOT_ACTIVE":
      return {
        ...state,
        active: false,
        userId: "",
        username: "",
        likedTracks: [],
        mount: true
      };
    case "USER_UPDATE_START":
      return { ...state, likedTracks: action.newfavs };
    case "USER_UPDATE_SUCCESS":
      return { ...state };
    case "USER_UPDATE_ERROR":
      return { ...state, errorMessage: action.err };
    default:
      return state;
  }
};

export default userReducer;
