import { Plus } from 'lucide-react'

const AddItemButton = ({ type, className, onClick }) => {
  const getCardContent = () => {
    switch (type) {
      case 'project':
        return {
          title: 'Añadir Nuevo Proyecto',
          containerClass: `
            h-[460px] w-full
            bg-gradient-to-b from-gray-800/40 to-gray-900/40 
            backdrop-blur-sm 
            border border-gray-700/50 
            hover:border-gray-500 
            hover:from-gray-800/50 hover:to-gray-900/50
            group-hover:border-gray-400/60
          `,
          iconClass: 'text-gray-300 border-gray-500/50 group-hover:border-gray-300/80',
          textClass: 'text-gray-300 group-hover:text-white'
        }
      case 'dream':
        return {
          title: 'Añadir Nuevo Sueño',
          containerClass: `
            aspect-[3/4] w-full
            bg-gradient-to-b from-gray-800/40 to-gray-900/40 
            backdrop-blur-sm 
            border border-gray-700/50 
            hover:border-gray-500 
            hover:from-gray-800/50 hover:to-gray-900/50
            group-hover:border-gray-400/60
          `,
          iconClass: 'text-gray-300 border-gray-500/50 group-hover:border-gray-300/80',
          textClass: 'text-gray-300 group-hover:text-white'
        }
      case 'tiktok':
        return {
          title: 'Añadir Nuevo TikTok',
          containerClass: `
            w-[325px] h-[770px]
            bg-gradient-to-b from-gray-800/40 to-gray-900/40 
            backdrop-blur-sm 
            border border-gray-700/50 
            hover:border-gray-500 
            hover:from-gray-800/50 hover:to-gray-900/50
            group-hover:border-gray-400/60
          `,
          iconClass: 'text-gray-300 border-gray-500/50 group-hover:border-gray-300/80',
          textClass: 'text-gray-300 group-hover:text-white'
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
      onClick={onClick}
      className={`
        group
        relative 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-2xl
        overflow-hidden
        transition-all 
        duration-300 
        ease-in-out
        ${content.containerClass}
        ${className}
      `}
    >
      {/* Efecto de overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex flex-col items-center justify-center gap-6 transform transition-transform duration-300 group-hover:scale-105 z-10">
        <div className={`
          p-5
          rounded-full 
          border-2
          transition-all
          duration-300
          backdrop-blur-sm
          ${content.iconClass}
        `}>
          <Plus className="w-8 h-8" />
        </div>

        <p className={`
          text-lg
          font-medium
          transition-colors
          duration-300
          text-center
          px-4
          ${content.textClass}
        `}>
          {content.title}
        </p>
      </div>
    </button>
  );
}


export default AddItemButton;