const initState = {
  isFetching: true,
  payload: "",
  errorMessage: "",
  artistTracks: "",
  tracksError: ""
};

const artistReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCHING_ARTIST_START":
      return { ...state, isFetching: true };
    case "FETCHING_ARTIST_SUCCESS":
      return {
        ...state,
        payload: action.payload
      };
    case "FETCHING_ARTIST_TRACKS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        artistTracks: action.payload
      };
    case "FETCHING_ARTIST_ERROR":
      return {
        ...state,
        errorMessage: action.payload
      };
    case "FETCHING_ARTIST_TRACKS_ERROR":
      return {
        ...state,
        tracksError: action.payload
      };
    default:
      return state;
  }
};

export default artistReducer;
