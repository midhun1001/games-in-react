// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout';
import Home from '../layouts/Home';
import SAL from '../layouts/SAL';
import HANGMAN from '../layouts/HANGMAN';
import Test from '../layouts/Test';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => (
  {
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    childRoutes: [
      SAL(store),
      HANGMAN(store),
      Test()
    ]
  }
);

export default createRoutes;
