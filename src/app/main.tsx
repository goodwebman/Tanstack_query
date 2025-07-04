import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

import { onlineManager } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { queryClient } from "../shared/api/queryClient.ts";
import { store } from "../shared/redux.ts";
import App from "./App.tsx";
import "./index.css";
import Loader from "./Loader.tsx";

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

onlineManager.setOnline(navigator.onLine);



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistQueryClientProvider
      persistOptions={{ persister }}
      client={queryClient}
      onSuccess={() =>
        queryClient.resumePausedMutations().then(() => {
          queryClient.invalidateQueries();
        })
      }
    >
      <Provider store={store}>
        <Loader>
          <App />
        </Loader>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  </StrictMode>,
);
