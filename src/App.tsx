import {lazy, useEffect, useState} from "react";
import { Loading } from "./components/Loading";
import ContentWrapper from './components/ContentWrapper';
import { IUser } from "./interfaces/IUser";
import { useFetchUsers } from "./hooks/useFetchUsers";
const UserList = lazy(() => import('./components/UserList'));

function App() {
  const [users, setUsers] = useState<IUser[]>([] as IUser[]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { data, error } = useFetchUsers(3, offset);
  
  useEffect(() => {
    if(data){
      setLoading(true);
      if(data.status === 200 && !error) {
        setUsers([...users, ...data.data]);
      }else{
        throw new Error(error);
      }
      setLoading(false);
    }
  }, [data, error, setUsers]);

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