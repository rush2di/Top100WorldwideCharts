import * as actions from "../../../configs/axios/config";

export const fetchingPlaylistStart = () => ({
  type: "FETCHING_PLAYLIST_START"
});
export const fetchingPlaylistSuccess = result => ({
  type: "FETCHING_PLAYLIST_SUCCESS",
  payload: result
});
export const fetchingPlaylistError = error => ({
  type: "FETCHING_PLAYLIST_ERROR",
  payload: error
});

export const fetchPlaylist = albumId => {
  return dispatch => {
    dispatch(fetchingPlaylistStart());
    actions
      .getCharts(albumId)
      .then(res => dispatch(fetchingPlaylistSuccess(res)))
      .catch(err => dispatch(fetchingPlaylistError(err)));
  };
};
