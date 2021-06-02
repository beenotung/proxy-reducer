import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State, Updater, updateAction } from './store';

function DemoUseStateProxy() {
  const { list, text } = useSelector((state: State) => state);
  const dispatch = useDispatch();
  function update(updater: Updater) {
    dispatch(updateAction(updater));
  }
  return (
    <>
      <input
        value={text}
        onChange={(e) => update((state) => (state.text = e.target.value))}
      />
      <button
        onClick={() =>
          update((state) => [list.push(state.text), (state.text = '')])
        }
      >
        Save
      </button>
      <ul>
        {list.map((item, i) => (
          <li key={i}>
            <button onClick={() => update((state) => state.list.splice(i, 1))}>
              Delete
            </button>
            <span>{item}</span>
            <input
              value={item}
              onChange={(e) =>
                update((state) => [
                  (state.list[i] = e.target.value),
                  (state.list = state.list),
                ])
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default DemoUseStateProxy;
