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
    pathname.replace("/", "")
  );

  useEffect(() => {
    const channelId = pathname.replace("/", "");
    if (channelId) setChannelIdInUrl(channelId);
  }, [pathname]);

  return (
    <ChatProvider channelId={channelIdInUrl}>
      <Chat />
    </ChatProvider>
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ChatWithProvider />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
