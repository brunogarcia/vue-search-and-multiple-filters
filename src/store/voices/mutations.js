import types from '@/store/voices/utils/types';
import getFilteredVoices from '@/store/voices/utils/getFilteredVoices';

const {
  RESET_STATE,

  SAVE_SORT,
  SAVE_SEARCH,
  SAVE_TAG,
  SAVE_TAGS,
  SAVE_ALL_VOICES,
  SAVE_FAVOURITE_VOICES,

  FILTER_VOICES,

  TOGGLE_SEARCH_MODE,
  TOGGLE_FAVOURITE_VOICE,
} = types;

export default {
  /**
   * Save sort value
   *
   * @param {object} state - Module state
   * @param {string} value - The value to store
   */
  [SAVE_SORT](state, value) {
    state.sort = value;
  },

  /**
   * Save seach value
   *
   * @param {object} state - Module state
   * @param {string} value - The value to store
   */
  [SAVE_SEARCH](state, value) {
    state.search = value;
  },

  /**
   * Save tag value
   *
   * @param {object} state - Module state
   * @param {string} value - The value to store
   */
  [SAVE_TAG](state, value) {
    state.tag = value;
  },

  /**
   * Save tags
   *
   * @param {object} state - Module state
   * @param {Array<string>} tags - The tags to store
   */
  [SAVE_TAGS](state, tags) {
    state.tags = tags;
  },

  /**
   * Save voices
   *
   * @param {object} state - Module state
   * @param {object} voices - The voices to store
   */
  [SAVE_ALL_VOICES](state, voices) {
    state.all = voices;
    state.allCache = voices;
  },

  /**
   * Save favourite voices
   *
   * @param {object} state - Module state
   */
  [SAVE_FAVOURITE_VOICES](state) {
    const voices = state.all.filter((voice) => voice.favourite);
    state.favourite = voices;
    state.favouriteCache = voices;
  },

  /**
   * Toggle favourite voice
   *
   * @param {object} state - Module state
   * @param {string} id - The voice id
   */
  [TOGGLE_FAVOURITE_VOICE](state, id) {
    const temp = [...state.all];

    // Find the index of the voice
    const voiceIndex = temp.findIndex((voice) => voice.id === id);

    // Update the voice
    temp[voiceIndex].favourite = !temp[voiceIndex].favourite;

    state.all = temp;
  },

  /**
   * Toggle search mode
   *
   * @param {object} state - Module state
   * @param {boolean} isValidValue - Flag for checking if the value is valid
   */
  [TOGGLE_SEARCH_MODE](state, isValidValue) {
    state.searching = isValidValue;
  },

  /**
   * Filter and sort the voices by tag and search value
   *
   * @param {object} state - Module state
   */
  [FILTER_VOICES](state) {
    const {
      tag,
      sort,
      search,
      allCache,
      favouriteCache,
    } = state;

    const options = { search, tag, sortType: sort };
    const optionsAll = { ...options, voices: allCache };
    const optionsFavourite = { ...options, voices: favouriteCache };

    state.all = getFilteredVoices(optionsAll);
    state.favourite = getFilteredVoices(optionsFavourite);
  },

  /**
   * Reset state
   *
   * @param {object} state - Module state
   */
  [RESET_STATE](state) {
    const { allCache, favouriteCache } = state;

    state.all = [...allCache];
    state.favourite = [...favouriteCache];
  },
};
