import {lazy, useEffect, useState} from "react";
import ContentWrapper from '../../components/ContentWrapper';
import { IUser } from "../../interfaces/IUser";
import { UserService } from "../../providers/services/UserService";
const UserList = lazy(() => import('../../components/UserList'));

function App() {
  const [users, setUsers] = useState<IUser[]>([] as IUser[]);
  const [offset, setOffset] = useState<number>(0);
  
  useEffect(() => {
    UserService.users(3, offset).then(res => {
      if(res.status === 200) {
        setUsers([...users, ...res.data]);
      }
    }).catch(err => console.log(err));
  }, [offset]);

  return (
    <ContentWrapper>
      <UserList users={users} />
      
      <div className="text-center mb-5">
        <button onClick={() => setOffset(offset + 3)} type="button" className="btn btn-primary btn-lg">Adicionar Mais +</button>
      </div>
    </ContentWrapper>
  );
}

export default App;
