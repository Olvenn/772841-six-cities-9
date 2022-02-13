import MainPage from '../main-page/main-page';
import FavoritesPage from '../favorites-page/favorites-page';
import LoginPage from '../login-page/login-page';
import PropertyCard from '../property-page/property-page';

interface StringArray {
  [index: string]: string
}

type AppProps = {
  offerCount: number;
  userName: string;
  citiesList: StringArray;
  isEmpty: boolean;
}

function App({ offerCount, userName, citiesList, isEmpty }: AppProps): JSX.Element {
  return (
    <>
      <MainPage offerCount={offerCount} userName={userName} citiesList={citiesList} />
      <FavoritesPage userName={userName} isEmpty={isEmpty} />
      <LoginPage />
      <PropertyCard userName={userName} />
    </>
  );
}

export default App;

