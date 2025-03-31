import React, { useEffect, useState } from 'react'

interface ToastProps {
  id: string
  message: string
  type: 'success' | 'error'
  onClose: () => void
  duration?: number
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Inicia el temporizador para la salida
    const timer = setTimeout(() => {
      setFadeOut(true) // Activa la animación de salida
      setTimeout(() => {
        onClose() // Elimina el toast después de la animación
      }, 300) // Debe coincidir con la duración de la animación CSS
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const baseStyles =
    'fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out z-50'

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
  }

  return (
    <div
      className={`${baseStyles} ${typeStyles[type]} ${
        fadeOut ? 'animate-slide-fade-out' : 'animate-slide-fade-in'
      }`}
    >
      <div className="flex items-center">
        {type === 'success' ? (
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
        <span>{message}</span>
      </div>
    </div>
  )
}

export default Toast
