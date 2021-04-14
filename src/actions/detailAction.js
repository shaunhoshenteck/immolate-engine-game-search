import axios from "axios";
import { gameDetailsURL, gameScreenShotURL } from "../api";

const cache = {}; // create cache object

const loadDetail = (id) => async (dispatch) => {
  dispatch({
    type: "LOADING_DETAIL",
  });

  if (cache[id]) {
    // check in cache
    const data = cache[id];
    dispatch({
      type: "GET_DETAIL",
      payload: {
        game: data.detail,
        screen: data.screenshot,
      },
    });
  } else {
    const detailData = await axios.get(gameDetailsURL(id));
    const screenShotData = await axios.get(gameScreenShotURL(id));
    cache[id] = { detail: detailData.data, screenshot: screenShotData.data };
    dispatch({
      type: "GET_DETAIL",
      payload: {
        game: detailData.data,
        screen: screenShotData.data,
      },
    });
  }
};

export default loadDetail;
