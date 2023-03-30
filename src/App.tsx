import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { ChatProvider } from "store/Chat";
import Chat from "pages/Chat/Chat";

const client = new ApolloClient({
  uri: "https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql",
  cache: new InMemoryCache(),
});

const ChatWithProvider = () => {
  const { pathname } = useLocation();
  const [channelIdInUrl, setChannelIdInUrl] = useState(
    pathname.replaceAll("/", "").replaceAll("?", "")
  );

  useEffect(() => {
    const channelId = pathname.replaceAll("/", "").replaceAll("?", "");
    if (channelId) setChannelIdInUrl(channelId);
  }, [pathname]);

  return (
    <ChatProvider channelId={channelIdInUrl}>
      <Chat />
    </ChatProvider>
  );
};

const url = window.location.href;
const isLocalHost = !!(
  url.indexOf("localhost") > -1 ||
  url === "[::1]" ||
  url.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);
// first one is for local and later one is for github pages.
const basename = isLocalHost ? "" : "/one-day-chat";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="*" element={<ChatWithProvider />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
