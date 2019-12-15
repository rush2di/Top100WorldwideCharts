import { combineReducers } from "redux";
import chartsReducer from "./reducers/chartsReducer";
import playlistReducer from "./reducers/playlistReducer";
import artistReducer from "./reducers/artistReducer";
import playerReducer from "./reducers/playerReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  chart: chartsReducer,
  playlist: playlistReducer,
  artist: artistReducer,
  player: playerReducer,
  statut: userReducer
});

export default rootReducer;
