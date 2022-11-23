import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '../../state/auth';
import { useUserActions } from '../../actions/userActions';

export function Navbar() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();

  // only show nav when logged in
  if (!auth) return null;
  
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav">
        <NavLink exact to="/" className="nav-item nav-link">Dashboard</NavLink>
        <NavLink exact to="/operation" className="nav-item nav-link">Operations</NavLink>
        <a onClick={userActions.logout} className="nav-item nav-link" href="/login">Logout</a>
      </div>
    </nav>
  );
}
