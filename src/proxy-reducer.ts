import { useStateProxy, UseState } from 'use-state-proxy';

export function proxyReducer<T extends object>(
  state: T,
  updater: (state: T) => void,
): T {
  function useState(state: T) {
    return [state, dispatch] as ReturnType<UseState<T>>;
  }
  function dispatch(newState: T) {
    state = newState;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const stateProxy = useStateProxy<T>(state, useState);
  updater(stateProxy);
  return state;
}
