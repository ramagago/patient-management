import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Patient } from '../types/patient'
import Button from './Button'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  avatar: yup
    .string()
    .url('Must be a valid URL')
    .required('Avatar URL is required'),
  description: yup.string().required('Description is required'),
  website: yup
    .string()
    .url('Must be a valid URL')
    .required('Website URL is required'),
})

interface PatientFormProps {
  patient?: Patient
  onSubmit: (data: Omit<Patient, 'id' | 'createdAt'>) => void
  onCancel: () => void
  isLoading?: boolean
}

const PatientForm: React.FC<PatientFormProps> = ({
  patient,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: patient || {
      name: '',
      avatar: '',
      description: '',
      website: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 border-[1px] shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="avatar"
          className="block text-sm font-medium text-gray-700"
        >
          Avatar URL
        </label>
        <input
          type="url"
          id="avatar"
          {...register('avatar')}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 border-[1px] shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.avatar && (
          <p className="mt-1 text-sm text-red-600">{errors.avatar.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          {...register('description')}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 border-[1px] shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="website"
          className="block text-sm font-medium text-gray-700"
        >
          Website URL
        </label>
        <input
          type="url"
          id="website"
          {...register('website')}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 border-[1px] shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.website && (
          <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
        )}
      </div>

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full sm:col-start-2"
        >
          {patient ? 'Update Patient' : 'Add Patient'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="mt-3 w-full sm:mt-0 sm:col-start-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default PatientForm
