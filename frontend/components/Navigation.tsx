import { ActionList, AppProvider, Frame, TopBar } from '@shopify/polaris';
import { ArrowLeftMinor } from '@shopify/polaris-icons';
import { useCallback, useState } from 'react';

// import Logo from './logo.svg';

const Navigation = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isDarkTheme] = useState(false);

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );

  const handleSearchResultsDismiss = useCallback(() => {
    setIsSearchActive(false);
    setSearchValue('');
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setIsSearchActive(value.length > 0);
  }, []);

  const handleNavigationToggle = useCallback(() => {
    console.log('toggle navigation visibility');
  }, []);

  const darkTopBarColors = {
    background: '#000000',
    backgroundLighter: '#262626',
    backgroundDarker: '#444444',
    border: '#000000',
    color: '#ffffff'
  };

  const lightTopBarColors = {
    background: '#FFFFFF',
    backgroundLighter: '#F4F6F8',
    backgroundDarker: '#DFE3E8',
    border: '#C4CDD5',
    color: '#212B36'
  };

  const theme = {
    colors: {
      topBar: isDarkTheme ? darkTopBarColors : lightTopBarColors
    },
    logo: {
      width: 25,
      topBarSource: './logo.svg',
      url: 'https://plus.shopify.com',
      accessibilityLabel: 'Shopify Plus'
    }
  };

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [{ content: 'Back to Shopify Plus', icon: ArrowLeftMinor }]
        },
        {
          items: [{ content: 'Community forums' }]
        }
      ]}
      name="Scott"
      detail="Snow Devil"
      initials="S"
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  const searchResultsMarkup = (
    <ActionList items={[{ content: 'Shopify help center' }, { content: 'Community forums' }]} />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder="Search"
      showFocusBorder
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      searchResultsVisible={isSearchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={handleNavigationToggle}
    />
  );

  return (
    <div style={{ height: '250px' }}>
      <AppProvider
        theme={theme}
        i18n={{
          Polaris: {
            Avatar: {
              label: 'Avatar',
              labelWithInitials: 'Avatar with initials {initials}'
            },
            Frame: { skipToContent: 'Skip to content' },
            TopBar: {
              toggleMenuLabel: 'Toggle menu',
              SearchField: {
                clearButtonLabel: 'Clear',
                search: 'Search'
              }
            }
          }
        }}>
        <Frame topBar={topBarMarkup}></Frame>
      </AppProvider>
    </div>
  );
};

export default Navigation;
