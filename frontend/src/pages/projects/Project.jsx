import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Spinner } from '../../components/Spinner'
import { getProject, setModal } from '../../redux/slices/projects'
import { ModalFormTask } from '../tasks/ModalFormTask'
import { Task } from '../tasks/Task'

export const Project = () => {
  const { id } = useParams()

  const { currentProject, loading } = useSelector(
    (state) => state.projectsState
  )
  const { name } = currentProject

  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(getProject(id))
    }
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='font-black text-4xl'>{name}</h1>
        <div className='flex gap-1 items-center text-gray-600 hover:text-black'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
            />
          </svg>
          <Link to={`/proyectos/editar/${id}`} className='uppercase font-bold'>
            Editar
          </Link>
        </div>
      </div>
      <button
        type='button'
        className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-emerald-600 text-white text-center mt-5 flex gap-2 justify-center items-center'
        onClick={() => dispatch(setModal())}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-6 h-6'
        >
          <path
            fillRule='evenodd'
            d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
            clipRule='evenodd'
          />
        </svg>
        Nueva Tarea
      </button>

      <p className='font-bold text-xl mt-10'>Tareas del Proyecto</p>

      <div className='bg-white shadow mt-10 rounded-lg'>
        {currentProject.tasks?.length
          ? currentProject.tasks?.map(task => (
            <Task key={task._id} task={task} />
          ))
          : <p className='text-center my-5 p-10'>No hay tareas en este proyecto</p>}
      </div>
      <ModalFormTask />
    </>
  )
}
