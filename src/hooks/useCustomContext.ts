import { useContext } from 'react'

const useCustomContext = <T>(customContext: React.Context<T | undefined>): T => {
  const context = useContext(customContext)
  if (!context) {
    throw new Error('No context found')
  }
  return context as T
}

export { useCustomContext }
