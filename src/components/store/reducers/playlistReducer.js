const initState = {
  isFetching: true,
  switchable: false,
  playlist: "",
  errorMessage: "",
  playlistId: ""
};

const playlistReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCHING_PLAYLIST_START":
      return { ...state, isFetching: true };
    case "FETCHING_PLAYLIST_SUCCESS":
      return {
        ...state,
        isFetching: false,
        playlist: action.payload,
        switchable: true,
        playlistId: action.payload.id
      };
    case "FETCHING_PLAYLIST_ERROR":
      return { ...state, isFetching: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export default playlistReducer;
