import "../styles/index.css";
import "../styles/App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";
import { useState } from "react";
function MyApp({ Component, pageProps }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    );
}

export default MyApp;
