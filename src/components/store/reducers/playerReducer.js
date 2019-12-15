const initState = {
  trackIndex: 0,
  isPlaying: false
};

const playerReducer = (state = initState, action) => {
  switch (action.type) {
    case "USER_SET_TRACK":
      return { ...state, trackIndex: action.index };
    case "NEXT_SONG":
      if (state.trackIndex === action.listLength - 1) {
        return { ...state, trackIndex: 0 };
      } else {
        return { ...state, trackIndex: state.trackIndex + 1 };
      }
    case "RESET_INDEX":
      return { ...state, trackIndex: 0 };
    case "PREVIOUS_SONG":
      if (state.trackIndex > 0) {
        return { ...state, trackIndex: state.trackIndex - 1 };
      } else {
        return { ...state, trackIndex: action.listLength - 1 };
      }
    case "PLAY_PAUSE":
      return {
        ...state,
        isPlaying: !state.isPlaying
      };
    default:
      return state;
  }
};

export default playerReducer;
