
import {  cleanup } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";




export function withStoreProvider(store) {
  return function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  };
}

export const setupApiStore = (api, extraReducers, withoutListeners) => {
  const getStore = () =>
    configureStore({
      reducer: { ...(api.reducerPath ? { [api.reducerPath]: api.reducer } : {}), ...extraReducers },
      middleware: (gdm) =>
        gdm({ serializableCheck: false, immutableCheck: false }).concat(api.middleware),
    });

  const initialStore = getStore();
  const refObj = {
    api,
    store: initialStore,
    wrapper: withStoreProvider(initialStore),
  };

  let cleanupListeners;

  beforeEach(() => {
    const store = getStore();
    refObj.store = store;
    refObj.wrapper = withStoreProvider(store);

    if (!withoutListeners) {
      cleanupListeners = setupListeners(store.dispatch);
    }
  });

  afterEach(() => {
    cleanup();

    if (!withoutListeners) {
      cleanupListeners();
    }

    refObj.store.dispatch(api.util.resetApiState());
  });

  return refObj;
};


