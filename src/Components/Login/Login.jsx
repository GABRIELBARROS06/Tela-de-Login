import{FaLock} from 'react-icons/fa' 
import{IoMdMail} from 'react-icons/io' 
import { useState } from 'react'
import "./Login.css"
import imagembarros from '../../assets/Logo.png'
import logo from '../../assets/sinalibras.png'


const Login = () => {

  const [email, setUsername] = useState("")
  const [senha, setPassword] = useState("")
  const [error, setError] = useState(null);

  


  const handleSubmit = async (event) => {
    event.preventDefault();

    const isAuthenticated = await authenticateUser(email, senha);

    if (isAuthenticated) {
      // Redireciona para a tela do dashboard
      navigate('/Components/StudentOrTeacher');
    } else {
      // Lida com erro de autenticação
      alert('Credenciais inválidas');
    }

    try {
      const response = await fetch('/v1/sinalibras/alunos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Login bem-sucedido, redireciona para a tela do dashboard
        navigate('/dashboard');
      } else {
        // Exibe mensagem de erro
        setError(result.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    }

  }

  return (

    <><div className="left">
      
      <img className='sina-libras-logo' src={logo} alt="Sina Libras Logo" />
      <h1>
        Acesse sua conta
      </h1>
    </div>
    
    <div className='container'>



      <form onSubmit={handleSubmit}>


        <img className='logo' src={imagembarros} alt="" />

        <div className='input-field'>
          <input
            type="text"
            placeholder='E-mail'
            required
            id='email'
            onChange={(e) => setUsername(e.target.value)} />
          <IoMdMail className='icon' />
        </div>

        

        <div className='input-field'>
          <input type="password" id='senha' placeholder='Senha'
            onChange={(e) => setPassword(e.target.value)} />
          <FaLock className='icon' />
        </div>

       <div className='esqueci'>
        <a href="">
          Esqueci a Senha
        </a>
       </div>

        <div>
          <button id='Cadastrar'>Login</button>
        </div>
        <div className='footer'>
            <p>Não tem uma conta?</p>
            <a href="">
              Faça seu Cadastro!
            </a>
          </div>
      </form>
    </div></>

    
  )
}

export default Login
