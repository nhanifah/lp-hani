import React, { useEffect, useRef } from 'react';
import { X, Calendar, MapPin, ExternalLink, Download } from 'lucide-react';

export interface ProjectDetailType {
  imageUrl: string;
  title: string;
  date: string;
  location?: string;
  description?: string;
  fullDescription?: string;
  externalLink?: string;
  downloadLink?: string;
  tags?: string[];
  category?: string;
}

interface ProjectDetailModalProps {
  item: ProjectDetailType | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ item, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="absolute right-4 top-4 z-10">
          <button
            onClick={onClose}
            className="rounded-full bg-black/20 p-2 text-white transition-colors hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-white/80"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex h-full flex-col md:flex-row">
          <div className="relative h-64 w-full md:h-auto md:w-1/2">
            <img 
              src={item.imageUrl} 
              alt={item.title}
              className="h-full w-full object-cover" 
            />
            {item.category && (
              <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium ${getCategoryColorClass(item.category)}`}>
                {item.category}
              </span>
            )}
          </div>

          <div className="flex w-full flex-col overflow-y-auto p-6 md:w-1/2">
            <h2 id="modal-title" className="text-2xl font-bold text-gray-900">{item.title}</h2>
            
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={16} className="mr-1.5 text-gray-400" />
                {item.date}
              </div>
              
              {item.location && (
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={16} className="mr-1.5 text-gray-400" />
                  {item.location}
                </div>
              )}
            </div>
            
            <div className="mt-4 flex-grow">
              <p className="text-gray-700 whitespace-pre-line">{item.fullDescription || item.description}</p>
            </div>
            
            {(item.externalLink || item.downloadLink) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {item.externalLink && (
                  <a 
                    href={item.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <ExternalLink size={16} className="mr-1.5" />
                    Learn More
                  </a>
                )}
                
                {item.downloadLink && (
                  <a 
                    href={item.downloadLink}
                    className="inline-flex items-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    <Download size={16} className="mr-1.5" />
                    Download
                  </a>
                )}
              </div>
            )}
            
            {item.tags && item.tags.length > 0 && (
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get the appropriate color class based on category
const getCategoryColorClass = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'Publication': 'bg-blue-100 text-blue-800',
    'Conference': 'bg-purple-100 text-purple-800',
    'Award': 'bg-amber-100 text-amber-800',
    'Grant': 'bg-emerald-100 text-emerald-800',
    'Collaboration': 'bg-indigo-100 text-indigo-800',
    'Media': 'bg-rose-100 text-rose-800',
  };
  
  return categoryMap[category] || 'bg-gray-100 text-gray-800';
};

export default ProjectDetailModal;
