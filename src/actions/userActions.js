import { useSetRecoilState } from 'recoil';
import { history } from '../helpers/history';
import { useFetchWrapper } from '../helpers/fetchWrapper';
import { authAtom } from '../state/auth';

export function useUserActions () {
  const baseUrl = `${process.env.REACT_APP_API_URL}`;
  const fetchWrapper = useFetchWrapper();
  const setAuth = useSetRecoilState(authAtom);

  return {
    login,
    logout,
  }

  function login(username, password) {
    return fetchWrapper.post(`${baseUrl}/login`, { username, password })
      .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        const newUser = {username, ...user};
        localStorage.setItem('user', JSON.stringify(newUser));
        setAuth(newUser);
        // get return url from location state or default to home page
        const { from } = history.location.state || { from: { pathname: '/' } };
        history.push(from);
      });
  }

  function logout() {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem('user');
    setAuth(null);
    history.push('/login');
  }
}