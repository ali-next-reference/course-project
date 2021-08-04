// _app.js is the root component that is rendered for every page
import Head from 'next/head'
import "../styles/globals.css";
import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }) {
  // wrap the header around the overall page content

  return (
    <Layout>
      <Head>
        {/* fallback title and description, if a page doesn't have one */}
        <title>Next js Events</title>
        <meta name="description" content="Next js Networking Events"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
