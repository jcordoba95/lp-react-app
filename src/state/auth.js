import { atom } from 'recoil';

export const authAtom = atom({
  key: 'auth',
  // get initial state from local storage to enable user to stay logged in
  default: JSON.parse(localStorage.getItem('user'))
});
