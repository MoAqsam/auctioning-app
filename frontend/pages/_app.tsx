import '../scss/globals.scss';
import '@shopify/polaris/dist/styles.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

import Navigation from '../components/Navigation';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.endpoint
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <AppProvider i18n={enTranslations}>
        <Navigation />
        <Component {...pageProps} />;
      </AppProvider>
    </ApolloProvider>
  );
};

export default MyApp;
