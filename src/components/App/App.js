import { useCallback, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Prompt from '../Prompt/Prompt';
import Header from '../Header/Header';
import SavedNews from '../SavedNews/SavedNews';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import usePrompt from '../../hooks/usePrompt';
import usePopup from '../../hooks/usePopup';
import useController from '../../hooks/useController';

import { UI } from '../../locales/ru';
import { statuses } from '../../utils/constants';

function App() {
  const {
    promptText,
    isPromptOpen,
    promptItems,
    openPrompt,
    closePrompt,
  } = usePrompt();
  const { isPopupOpen, closePopup, openPopup } = usePopup();

  const handleError = useCallback(
    (err) => {
      if (err.type === 'auth') {
        openPopup();
        return;
      }
      openPrompt(err.message, [{ text: UI.OK }]);
    },
    [openPrompt, openPopup],
  );

  const {
    currentUser,
    data,
    status,
    keyword,
    login,
    signup,
    logout,
    obtain,
    search,
    remove,
    clear,
    switchSaved,
  } = useController(handleError);

  useEffect(() => {
    obtain();
  }, [obtain]);

  const authHandlers = {
    onLogout: logout,
    onLogin: login,
    onSignup: signup,
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {currentUser.status !== statuses.user.UNKNOWN ? (
          <Switch>
            <Route exact path="/">
              <Header
                {...authHandlers}
                isMain={true}
                popup={{ isPopupOpen, closePopup, openPopup }}
              />
            </Route>
            <Route path="*">
              <Header
                {...authHandlers}
                popup={{ isPopupOpen, closePopup, openPopup }}
              />
            </Route>
          </Switch>
        ) : (
          ''
        )}
        <main className="app__unit">
          <Switch>
            <Route exact path="/">
              <Main
                onAction={switchSaved}
                onSearch={search}
                data={data}
                status={status}
                keyword={keyword}
                clear={clear}
              />
            </Route>
            <ProtectedRoute
              exact
              path="/saved-news"
              component={SavedNews}
              onDelete={remove}
            />
            <Redirect from="*" to="/" />
          </Switch>
        </main>
        {currentUser.status !== statuses.user.UNKNOWN ? <Footer /> : ''}
        <Prompt
          text={promptText}
          isOpen={isPromptOpen}
          items={promptItems}
          onClose={closePrompt}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
