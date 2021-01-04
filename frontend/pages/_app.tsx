import '../scss/globals.scss';
import '@shopify/polaris/dist/styles.css';

import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

import Navigation from '../components/Navigation';

// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: process.env.endpoint
// });

// const MyApp = ({ Component, pageProps }) => {
//   return (
//     <ApolloProvider client={client}>
//       <Component {...pageProps} />
//     </ApolloProvider>
//   );
// };

const MyApp = ({ Component, pageProps }) => {
  return (
    <AppProvider i18n={enTranslations}>
      <Navigation />
      <Component {...pageProps} />;
    </AppProvider>
  );
};

export default MyApp;
