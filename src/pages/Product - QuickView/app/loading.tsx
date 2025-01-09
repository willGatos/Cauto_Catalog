import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="text-center">
        <Loader className="h-12 w-12 animate-spin text-slate-900 mx-auto" />
        <p className="mt-4 text-slate-900 text-lg font-medium">Cargando...</p>
      </div>
    </div>
  )
}

