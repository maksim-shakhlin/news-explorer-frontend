import { useState, useCallback, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SavedNews from '../SavedNews/SavedNews';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import { getName } from '../../utils/utils';
import { statuses } from '../../utils/constants';

function App() {
  const [currentUser, setCurrentUser] = useState({
    status: statuses.user.UNKNOWN,
  });

  useEffect(() => {
    // DEMO
    setCurrentUser({
      name: getName('Грета Тунберг Вторая'),
      status: statuses.user.AUTHORIZED,
    });
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser({ status: statuses.user.UNAUTHORIZED });
  }, []);

  const handleLogin = useCallback(() => {}, []);

  const authHandlers = {
    onLogout: handleLogout,
    onLogin: handleLogin,
  };

  const handleBookmarkClick = useCallback((card) => {
    // DEMO implementation
    card.saved = !card.saved;
    return Promise.resolve(card);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header {...authHandlers} isMain={true} />
          </Route>
          <Route path="*">
            <Header {...authHandlers} />
          </Route>
        </Switch>
        <main className="app__unit">
          <Switch>
            <Route exact path="/">
              <Main onSave={handleBookmarkClick} {...authHandlers} />
            </Route>
            <Route exact path="/saved-news" component={SavedNews} />
            <Route path="*" component={() => Redirect({ to: '/' })} />
          </Switch>
        </main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
