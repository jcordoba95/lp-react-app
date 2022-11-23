import { useRecoilValue } from 'recoil';

import { authAtom } from '../../state/auth';
import { RecordsTable } from '../RecordsTable';

export function Dashboard() {
  const auth = useRecoilValue(authAtom);

  return (
    <div>
      <h1>Hi {auth?.username}!</h1>
      <p>Welcome to your dashboard</p>
      <RecordsTable auth={auth} />
    </div>
  );
}