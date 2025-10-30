"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { TranslationProvider } from "@/src/contexts/TranslationContext";
import { persistor, store } from "@/src/redux/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <TranslationProvider>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
        <Toaster position="top-center" />
      </TranslationProvider>
    </Provider>
  );
};

export default Providers;
