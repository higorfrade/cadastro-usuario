import './styles.css'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api'


function Home() {

  let users = [];

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios');

    users = usersFromApi.data;
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='main-container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input name='name' type="text" placeholder='Nome' />
        <input name='age' type="number" placeholder='Idade' />
        <input name='email' type="email" placeholder='E-mail' />
        <button type="button">Cadastrar</button>
      </form>

    {users.map(user => (
      <div key={user.id} className='card'>
        <div>
          <p>Nome: <span>{user.name}</span></p>
          <p>Idade: <span>{user.age}</span></p>
          <p>E-mail: <span>{user.email}</span></p>
        </div>
        <button className='delete-btn'>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    ))}
      
    </div>
  )
}

export default Home
