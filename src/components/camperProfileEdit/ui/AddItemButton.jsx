import { Plus } from 'lucide-react'

const AddItemButton = ({ type, className }) => {
  const getCardContent = () => {
    switch (type) {
      case 'project':
        return {
          title: 'Añadir Nuevo Proyecto',
          containerClass: 'h-[475px] bg-indigo-950 border-2 border-dashed border-gray-600/40 hover:bg-indigo-900',
          iconClass: 'text-white border-white',
          textClass: 'text-white'
        }
      case 'dream':
        return {
          title: 'Añadir Nuevo Sueño',
          containerClass: 'w-full h-full bg-indigo-950 border-2 border-dashed border-gray-600/40 hover:border-gray-400/60',
          iconClass: 'text-gray-400/80 border-gray-600/40',
          textClass: 'text-gray-400/80'
        }
      case 'tiktok':
        return {
          title: 'Añadir Nuevo TikTok',
          containerClass: 'h-[600px] bg-black/5 backdrop-blur-sm border border-gray-700 hover:bg-black/10',
          iconClass: 'text-gray-300 border-gray-300',
          textClass: 'text-gray-300'
        }
      default:
        return {
          title: 'Añadir Nuevo Item',
          containerClass: 'h-[300px] bg-gray-100',
          iconClass: 'text-gray-600',
          textClass: 'text-gray-600'
        }
    }
  }

  const content = getCardContent()

  return (
    <button
      className={`
        group
        relative 
        flex 
        flex-col 
        items-center 
        justify-center 
        w-full 
        h-full
        rounded-xl 
        transition-all 
        duration-300
        ${content.containerClass}
        ${className}
      `}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 transform transition-transform group-hover:scale-105">
        {content.iconClass !== 'hidden' && (
          <div className={`
            p-4 
            rounded-full 
            border-2
            ${content.iconClass}
          `}>
            <Plus className="w-8 h-8" />
          </div>
        )}
        <p className={`
          text-sm 
          font-medium
          ${content.textClass}
        `}>
          {content.title}
        </p>
      </div>
    </button>
  );
}

export default AddItemButton;