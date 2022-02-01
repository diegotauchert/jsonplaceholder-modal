import {lazy, useEffect, useState} from "react";
import { Loading } from "./components/Loading";
import ContentWrapper from './components/ContentWrapper';
import { IUser } from "./interfaces/IUser";
import { UserService } from "./services/UserService";
const UserList = lazy(() => import('./components/UserList'));

function App() {
  const [users, setUsers] = useState<IUser[]>([] as IUser[]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    setLoading(true);
    UserService.users(3, offset).then(res => {
      if(res.status === 200) {
        setUsers([...users, ...res.data]);
      }
    })
    .finally(() => setLoading(false));
  }, [offset]);

  return (
    <ContentWrapper>
      {loading && <Loading />}
      <UserList users={users} />
      
      <div className="text-center mb-5">
        <button onClick={() => setOffset(offset + 3)} type="button" className="btn btn-primary btn-lg">Adicionar Mais +</button>
      </div>
    </ContentWrapper>
  );
}

export default App;