import React, { useState } from 'react'
import { Patient } from '../types/patient'
import Button from './Button'
import { IoIosArrowUp } from 'react-icons/io'

interface PatientCardProps {
  patient: Patient
  onEdit: (patient: Patient) => void
  onDelete: (id: string) => void
}

const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onEdit,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-12 w-12 rounded-full"
              src={patient.avatar}
              alt={patient.name}
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">
              {patient.name}
            </h3>
            <p className="text-sm text-gray-500">
              Created {new Date(patient.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <a
              href={patient.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Visit Website
            </a>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-gray-500 hover:text-gray-700 flex justify-between items-center"
            >
              <span> {isExpanded ? 'Show Less' : 'Show More'}</span>
              <IoIosArrowUp
                className={`${
                  isExpanded ? 'rotate-0' : 'rotate-180'
                } transition duration-300 ease-in-out ml-2`}
              />
            </button>
          </div>

          {isExpanded && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">{patient.description}</p>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="secondary" size="sm" onClick={() => onEdit(patient)}>
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(patient.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PatientCard
