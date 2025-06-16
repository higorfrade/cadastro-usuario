import './styles.css'
import { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api'


function Home() {

  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios');

    setUsers(usersFromApi.data);
  }

  async function addUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: parseInt(inputAge.current.value, 10),
      email: inputEmail.current.value
    });

    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);

    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='main-container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input name='name' type="text" placeholder='Nome' ref={inputName} />
        <input name='age' type="number" placeholder='Idade' ref={inputAge} />
        <input name='email' type="email" placeholder='E-mail' ref={inputEmail} />
        <button type="button" onClick={addUsers}>Cadastrar</button>
      </form>

    {users.map(user => (
      <div key={user.id} className='card'>
        <div>
          <p>Nome: <span>{user.name}</span></p>
          <p>Idade: <span>{user.age}</span></p>
          <p>E-mail: <span>{user.email}</span></p>
        </div>
        <button className='delete-btn' onClick={() => deleteUsers(user.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    ))}
      
    </div>
  )
}

export default Home
