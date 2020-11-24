import { useState, useCallback } from 'react';
import { statuses } from '../utils/constants';
import api from '../api/mainApi';
import { getName } from '../utils/utils';
import { clean } from '../utils/utils';
import searchHandler from '../handlers/searchHandler';
import savedHandler from '../handlers/savedHandler';
import { UI } from '../locales/ru';
import { omit } from './../utils/utils';

export default function useController(onError) {
  const [currentUser, setCurrentUser] = useState({
    status: statuses.user.UNKNOWN,
  });
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState(statuses.UNKNOWN);

  const login = useCallback((data) => {
    return api
      .signin(clean(data, ['password']))
      .then(() => api.me())
      .then((user) => {
        setCurrentUser({
          ...user,
          name: getName(user.name),
          status: statuses.user.AUTHORIZED,
        });
      });
  }, []);

  const signup = useCallback((data) => {
    return api.signup(data);
  }, []);

  const clear = useCallback(() => {
    searchHandler.clear();
    setKeyword('');
    setData([]);
    setStatus(statuses.UNKNOWN);
  }, []);

  const logout = useCallback(() => {
    api
      .logout()
      .then(() => {
        setCurrentUser({ status: statuses.user.LOGGEDOUT });
        clear();
      })
      .catch(onError);
  }, [onError, clear]);

  const search = useCallback(
    (keyword) => {
      if (!keyword) {
        onError({ message: UI.KEYWORD_REQUIRED });
        return Promise.resolve(false);
      }
      setStatus(statuses.SEARCHING);
      return searchHandler
        .search(keyword) // possible errors handled in searchHandler
        .then((res) => {
          setData(searchHandler.data());
          setStatus(res);
          return true;
        });
    },
    [onError],
  );

  const obtain = useCallback(() => {
    return api
      .me()
      .then((user) => {
        searchHandler.obtain();
        if (searchHandler.data().length) {
          setStatus(statuses.OK);
        }
        setKeyword(searchHandler.keyword());
        setData(searchHandler.data());
        setCurrentUser({
          ...user,
          name: getName(user.name),
          status: statuses.user.AUTHORIZED,
        });
      })
      .catch((err) => {
        searchHandler.clear();
        setCurrentUser({ status: statuses.user.UNAUTHORIZED });
        if (err.code !== 401) {
          onError(err);
        }
      });
  }, [onError]);

  const remove = useCallback(
    (data) => {
      return savedHandler.delete(data).catch(onError);
    },
    [onError],
  );

  const switchSaved = useCallback(
    (data) => {
      if (currentUser.status !== statuses.user.AUTHORIZED) {
        onError({ type: 'auth' });
        return;
      }

      (() => {
        if (data._id) {
          return api.deleteArticle(data._id).then(() => {
            return omit(data, ['_id']);
          });
        }
        return api.saveArticle(data);
      })()
        .then((article) => {
          searchHandler.handle(article);
          setData(searchHandler.data());
        })
        .catch(onError);
    },
    [onError, currentUser.status],
  );

  return {
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
  };
}
