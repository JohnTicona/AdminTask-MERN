import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../../components/Alert'
import clientAxios from '../../config/clientAxios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ([email, password].includes('')) {
      return setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
    }

    try {
      const { data } = await clientAxios.post('/users/login', { email, password })
      window.localStorage.setItem('token', data.token)
      setAlert({})
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <>
      <h1 className='text-emerald-500 text-center font-black text-4xl md:text-5xl capitalize'>
        Inicia Sesión y administra tus
        <span className='text-slate-700'> proyectos</span>
      </h1>

      {alert.msg && <Alert alert={alert} />}

      <form onSubmit={handleSubmit} className='my-8 bg-white shadow rounded-lg px-10 p-10 '>
        <div className='mb-5'>
          <label
            htmlFor='email'
            className='text-lg text-gray-600 font-bold block uppercase'
          >
            Correo:
          </label>
          <input
            id='email'
            type='email'
            placeholder='Email de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='password'
            className='text-lg text-gray-600 font-bold block uppercase'
          >
            Contraseña:
          </label>
          <input
            id='password'
            type='password'
            placeholder='Contraseña de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <input
          type='submit'
          value='Iniciar Sesión'
          className='bg-emerald-600 w-full text-white uppercase font-bold rounded-md py-3 hover:cursor-pointer hover:bg-emerald-700 transition-colors mt-3'
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          to='/registrar'
          className='block text-center text-slate-500 text-sm font-bold'
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
        <Link
          to='/olvide-password'
          className='block text-center my-5 lg:my-0 text-slate-500 text-sm font-bold'
        >
          Olvide mi contraseña
        </Link>
      </nav>
    </>
  )
}

export default Login
