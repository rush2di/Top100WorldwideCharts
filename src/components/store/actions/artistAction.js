import * as actions from "../../../configs/axios/config";

export const fetchingArtistStart = () => ({
  type: "FETCHING_ARTIST_START"
});
export const fetchingArtistSuccess = result => ({
  type: "FETCHING_ARTIST_SUCCESS",
  payload: result
});
export const fetchingArtistError = error => ({
  type: "FETCHING_ARTIST_ERROR",
  payload: error
});

export const fetchingArtistTracksStart = () => ({
  type: "FETCHING_ARTIST_TRACKS_START"
});
export const fetchingArtistTracksSuccess = result => ({
  type: "FETCHING_ARTIST_TRACKS_SUCCESS",
  payload: result
});
export const fetchingArtistTracksError = error => ({
  type: "FETCHING_ARTIST_TRACKS_ERROR",
  payload: error
});

export const fetchArtist = artistId => {
  return dispatch => {
    dispatch(fetchingArtistStart());
    actions
      .getArtist(artistId)
      .then(res => dispatch(fetchingArtistSuccess(res)))
      .catch(err => dispatch(fetchingArtistError(err)))
      .then(
        actions
          .getArtistTracks(artistId)
          .then(res => dispatch(fetchingArtistTracksSuccess(res)))
          .catch(err => dispatch(fetchingArtistTracksError(err)))
      );
  };
};
