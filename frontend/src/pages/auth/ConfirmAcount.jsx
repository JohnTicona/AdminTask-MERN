import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Alert from '../../components/Alert'
import { ConfirmUserAccount, setAlert } from '../../redux/slices/auth'

export const ConfirmAcount = () => {
  const { token } = useParams()

  const { alert } = useSelector(state => state.authState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ConfirmUserAccount(token))
    setTimeout(() => {
      dispatch(setAlert({}))
    }, 3000)
  }, [])

  return (
    <div>
      <h1 className='text-emerald-500 text-center font-black text-5xl capitalize'>
        Confirma tu cuenta y comienza a crear tus proyectos
        <span className='text-slate-700'> acceso</span>
      </h1>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rouded-xl bg-white'>
        {alert.msg && <Alert alert={alert} />}
        {!alert.error &&
          <Link
            to='/'
            className='text-2xl block text-center text-slate-500 font-bold mt-5'
          >Inicia Sesión
          </Link>}
      </div>
    </div>
  )
}
