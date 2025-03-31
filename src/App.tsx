import { useState, useEffect } from 'react'
import { Patient } from './types/patient'
import { apiService } from './services/api'
import PatientCard from './components/PatientCard'
import PatientForm from './components/PatientForm'
import Modal from './components/Modal'
import Button from './components/Button'
import { ToastProvider, useToast } from './contexts/ToastContext'

function AppContent() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [patientToDelete, setPatientToDelete] = useState<string | null>(null)
  const { showToast } = useToast()

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await apiService.getPatients()
      setPatients(data)
    } catch (error) {
      setError('Failed to load patients. Please try again later.')
      showToast('Failed to load patients', 'error')
      console.error('Error loading patients:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPatient = () => {
    setSelectedPatient(undefined)
    setIsModalOpen(true)
  }

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsModalOpen(true)
  }

  const handleDeletePatient = (id: string) => {
    setPatientToDelete(id)
    setIsConfirmModalOpen(true)
  }
  const confirmDeletePatient = async () => {
    if (!patientToDelete) return

    try {
      await apiService.deletePatient(patientToDelete)
      setPatients(patients.filter((p) => p.id !== patientToDelete))
      showToast('Patient deleted successfully', 'success')
    } catch (error) {
      showToast('Failed to delete patient', 'error')
      console.error('Error deleting patient:', error)
    } finally {
      setIsConfirmModalOpen(false)
      setPatientToDelete(null)
    }
  }

  const handleSubmit = async (data: Omit<Patient, 'id' | 'createdAt'>) => {
    setIsSubmitting(true)
    try {
      if (selectedPatient) {
        const updatedPatient = await apiService.updatePatient(
          selectedPatient.id,
          data
        )
        setPatients(
          patients.map((p) =>
            p.id === selectedPatient.id ? updatedPatient : p
          )
        )
        showToast('Patient updated successfully', 'success')
      } else {
        const newPatient = await apiService.addPatient(data)
        setPatients([...patients, newPatient])
        showToast('Patient added successfully', 'success')
      }
      setIsModalOpen(false)
      setSelectedPatient(undefined)
    } catch (error) {
      showToast('Failed to save patient', 'error')
      console.error('Error saving patient:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 w-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Patient Management
          </h1>
          <Button onClick={handleAddPatient}>Add New Patient</Button>
        </div>

        {error && (
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : patients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No patients found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onEdit={handleEditPatient}
                onDelete={handleDeletePatient}
              />
            ))}
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedPatient(undefined)
          }}
          title={selectedPatient ? 'Edit Patient' : 'Add New Patient'}
        >
          <PatientForm
            patient={selectedPatient}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsModalOpen(false)
              setSelectedPatient(undefined)
            }}
            isLoading={isSubmitting}
          />
        </Modal>
        <Modal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          title="Confirm Deletion"
        >
          <p>Are you sure you want to delete this patient?</p>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="secondary"
              onClick={() => setIsConfirmModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmDeletePatient} variant="danger">
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}

export default App
