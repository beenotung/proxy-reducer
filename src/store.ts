import { createStore } from 'redux';
import { proxyReducer } from './proxy-reducer';

export type State = {
  text: string;
  list: string[];
  grid: number[][];
};
const initialState: State = {
  text: '',
  list: ['init'],
  grid: [
    [1, 2],
    [3, 4],
  ],
};

export type Updater = (state: State) => void;
export function updateAction(updater: Updater) {
  return {
    type: '@@App/update' as const,
    updater,
  };
}
export type Action = ReturnType<typeof updateAction>;

export let reducer = (state = initialState, action: Action) => {
  if (action.type === '@@App/update') {
    return proxyReducer(state, (state) => {
      action.updater(state);
    });
  }
  return state;
};

export let store = createStore(reducer);
