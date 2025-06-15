
import { ExternalLink } from "lucide-react";

interface AppCardProps {
  name: string;
  description: string;
  image: string;
  link: string;
}

export const AppCard = ({ name, description, image, link }: AppCardProps) => {
  const handleClick = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:bg-white/90 dark:hover:bg-gray-800/90 group relative"
    >
      <div className="flex">
        {/* Image Section */}
        <div className="w-32 h-32 flex-shrink-0">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {name}
              </h3>
              <ExternalLink 
                className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 flex-shrink-0 ml-2" 
              />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>
          
          {/* Hover indicator */}
          <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm font-medium">Acessar aplicação</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
      
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};
