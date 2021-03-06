/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const FILTER_CHANGE = 'deezer/App/FILTER_CHANGE';
export const FILTER_CLEAR = 'deezer/App/FILTER_CLEAR';


export const STORE_NEXT_PAGE_INDEX = 'deezer/App/STORE_NEXT_PAGE_INDEX';
export const LOAD_TRACKS = 'deezer/App/LOAD_TRACKS';

export const LOAD_NEXT_PAGE = 'deezer/App/LOAD_NEXT_PAGE';
export const LOAD_NEXT_PAGE_SUCCESS = 'deezer/App/LOAD_NEXT_PAGE_SUCCESS';
export const SET_NO_NEXT_PAGE = 'deezer/App/SET_NO_NEXT_PAGE'

export const LOAD_TRACKS_SUCCESS = 'deezer/App/LOAD_TRACKS_SUCCESS';
export const LOAD_TRACKS_ERROR = 'deezer/App/LOAD_TRACKS_ERROR';

export const DEEZER_SCRIPT_LOADED = 'deezer/App/DEEZER_SCRIPT_LOADED';

export const SORT_ROWS_SUCCESS = 'deezer/App/SORT_ROWS_SUCCESS';
export const SORT_TRACKS = 'deezer/App/SORT_TRACKS';

export const DEFAULT_LOCALE = 'en';
