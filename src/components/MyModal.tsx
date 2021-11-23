import { useEffect, useRef, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserService } from "../providers/services/UserService";
import { IPost } from "../interfaces/IPost";
import { IUser } from "../interfaces/IUser";

type IMyModalProps = {
  show: boolean;
  handleClose: Function;
  selectedUser: IUser;
}
const MyModal = ({show, handleClose, selectedUser}:IMyModalProps) => {
  
  const [posts, setPosts] = useState<IPost[]>([] as IPost[]);
  const [offset, setOffset] = useState<number>(0);
  const divRef = useRef(null);
  
  useEffect(() => {
    if(selectedUser.id){
      UserService.posts(selectedUser.id, 3, offset).then(res => {
        if(res.status === 200) {
          setPosts([...posts, ...res.data]);
          // @ts-ignore
          divRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }).catch(err => console.log(err));
    }
  }, [selectedUser, offset]);

  const handleBeforeClose = () => {
    console.log('limpando componente');

    setPosts([]);
    setOffset(0);
    handleClose();
  }

  const deletarPost = (post:IPost) => {
    setPosts(posts.filter(item => item.id !== post.id));
  }

  return (
    <>
    <Modal show={show}>
        <Modal.Header>
          <Modal.Title className="w-100 d-flex justify-content-between">
            Postagens &raquo; {selectedUser.name}
            <Button variant="secondary" onClick={() => handleBeforeClose()}>
              X
            </Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column">
            {posts ? posts.map((post:IPost, key:number) => (
              <div key={post.id} className="post d-flex flex-row align-items-center border-bottom border-secondary bg-light pt-4 px-2">
                <div className="col-3 text-center">
                  <strong>{key+1}.</strong>
                </div>
                <div className="col-7 align-self-stretch px-3">
                  <h3 className="text-capitalize fs-6">{post.title}</h3>
                  <p className="fs-6 text-justify"><small>{post.body}</small></p>
                </div>
                <div className="col-2">
                  <button onClick={() => deletarPost(post)} className="resetBtn text-primary">
                    <small><i className="fas fa-trash-alt"></i> Deletar</small>
                  </button>
                </div>
              </div>
            )) : <div className="d-flex justify-content-center">Carregando...</div>}
          </div>
          <div ref={divRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setOffset(offset + 3)}>
            Buscar Mais +
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default MyModal;
