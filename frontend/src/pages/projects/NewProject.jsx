import { FormProject } from './FormProject'

export const NewProject = () => {
  return (
    <div>
      <h1 className='text-4xl font-black'>Crear Proyecto</h1>

      <div className='mt-10 flex justify-center'>
        <FormProject />
      </div>
    </div>
  )
}
