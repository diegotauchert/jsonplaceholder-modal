import {useState, useEffect, useRef} from 'react';
import { IUser } from "../interfaces/IUser";
import MyModal from './MyModal';

type IUserListProps = {
  users: IUser[];
}

const UserList = ({users}:IUserListProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser>({} as IUser);
  
  const divRef = useRef(null);

  const handleClose = () => {
    setSelectedUser({} as IUser)
    setShow(false);
  }

  const handleShow = (user:IUser) => {
    setSelectedUser(user)
    setShow(true);
  }

  useEffect(() => {
    try{
      // @ts-ignore
      divRef.current?.scrollIntoView({ behavior: 'smooth' });
    }catch(err){
      
    }
  },[users])
  
  return (
    <>
      <MyModal show={show} selectedUser={selectedUser} handleClose={() => handleClose()}/>

      <div className="p-5">
        <h1 className="fs-2 text-center">Usuarios</h1>
        <div className="card">
          <ul className="list-group list-group-flush">
            {Array.from(users)?.map((user:IUser, key: number) => (
              <li key={key} className="list-group-item">
                <h2 className="card-text fs-5 py-3 gap-4">
                  <small className="fs-6">{key+1}.</small> 
                  <button className="resetBtn d-inline-block mx-2" onClick={() => handleShow(user)}>{user.name}</button>
                </h2>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div ref={divRef} />
    </>
  )
};

export default UserList;
