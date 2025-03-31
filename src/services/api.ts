import { Patient } from '../types/patient'

const API_URL = 'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users'

class ApiService {
  async getPatients(): Promise<Patient[]> {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error('Failed to fetch patients')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching patients:', error)
      return []
    }
  }

  async addPatient(data: Omit<Patient, 'id' | 'createdAt'>): Promise<Patient> {
    return {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    }
  }

  async updatePatient(
    id: string,
    data: Omit<Patient, 'id' | 'createdAt'>
  ): Promise<Patient> {
    return {
      ...data,
      id,
      createdAt: new Date().toISOString(),
    }
  }

  async deletePatient(id: string): Promise<string> {
    return id
  }
}

export const apiService = new ApiService()
