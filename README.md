# proxy-reducer

Using Proxy API to auto construct new State for Redux Reducer

Inspired by [Immer](https://immerjs.github.io/immer/example-reducer) by smaller in bundle size;
Powered by [use-state-proxy](https://github.com/beenotung/use-state-proxy)

[![npm Package Version](https://img.shields.io/npm/v/proxy-reducer?maxAge=3600)](https://www.npmjs.com/package/proxy-reducer)

## Installation

```bash
## using npm
npm install proxy-reducer

## or using yarn
yarn add proxy-reducer

## or using pnpm
pnpm install proxy-reducer
```

## Typescript Signature
```typescript
// auto construct new state when updater carry out in-place update
export function proxyReducer<T extends object>(
  state: T,
  updater: (state: T) => void,
): T
```

## Features
- [x] Support Reducer of Redux
- [x] Auto construct new state when invoking mutating methods on state fields
  - [x] Array
  - [x] Map
  - [x] Set
  - [x] Date
  - [x] Object
  - [X] Custom Classes
- [x] Tested with `@testing-library/jest-dom`

## Comparison

### With proxy-reducer
In the reducer, you can call `proxyReducer()` with the state and a `updater()` function.
In the `updater()`, you can get/set the values, and call mutating methods (e.g. `array.push()`) directly.

`proxyReducer()` will auto construct a new state (on-demand) and return as reducer result.

**Usage Example**:
```typescript jsx
export const reducer = (state, action) => {
  return proxyReducer(state, state => {
    switch (action.type) {
      case 'set':
        state.text = action.text
        return
      case 'push':
        state.list.push(state.text)
        state.text = ''
        return
      case 'del':
        state.list.slice(action.i, 1)
        return
      default:
        return
    }
  })
}
```

Using `proxyReducer()`, the array can be updated with `state.list.push(action.text)` and `state.list.slice(action.i, 1)` directly.
This invokes proxied methods, and it will auto construct new state.

### Without proxy-reducer
You need to construct new states by explicitly copying the old fields and setting new values.

Moreover, there is syntax noise when updating complex data type, e.g. Array, Map, Set, and Object.

```typescript jsx
export const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        text: action.text,
      }
    case 'push':
      return {
        ...state,
        text: '',
        list: [...state.list, state.text],
      }
    case 'del': {
      return {
        ...state,
        list: state.list.filter((_, j) => action.i !== j)
      }
    }
    default:
      return state
  }
}
```

In this example, in order to 'push' an item to the list, it manually destructs the original array with spread syntax `...` then append the new item at the end.

Also, to remove an item from the list, it constructs a new array with `list.filter()`, involving multiple levels of array indices, which is error-prone.

The same hurdles applies to object as well, and it gets even worse when it comes to `Set`* and `Map`**.

*: To update a `Set`, we can run `setList(new Set([...list, item]))` or `setList(new Set([...list].filter(x => x !== target)))`

**: To update a `Map`, we can run `setList(new Map([...list, [key, value]]))` or `setList(new Map([...list].filter(([key]) => key !== target)))`

## Register Mutating Methods on Custom Classes

Details refers to [demo-custom-mutable-class.ts](https://github.com/beenotung/use-state-proxy/blob/master/src/demo-custom-mutable-class.ts) in [use-state-proxy](https://github.com/beenotung/use-state-proxy)

## License
[BSD-2-Clause](./LICENSE) (Free Open Source Software)
