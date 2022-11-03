import React, { useCallback, useEffect } from "react";
import { Provider } from "react-redux";
import { NativeBaseProvider, StatusBar } from "native-base";

import store from "./redux/store";

import Navigation from "./Navigation";
import "./lib/prototype";
import { THEME_COLORS } from "./config/constants";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <StatusBar backgroundColor={THEME_COLORS.PRIMARY_COLOR_DEEP} />
        <Navigation />
      </NativeBaseProvider>
    </Provider>
  );
}
// jf2JGHLXffXtz7CG88M7