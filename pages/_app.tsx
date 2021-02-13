import type { AppProps} from 'next/app';
import { StateProvider } from '../components/Offers';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <StateProvider>
      <Component {...pageProps}/>
    </StateProvider>
  );
};

export default App;
