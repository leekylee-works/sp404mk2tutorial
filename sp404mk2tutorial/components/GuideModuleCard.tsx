import React from 'react';
import { GuideModule } from '../types/guide';

interface GuideModuleCardProps {
  module: GuideModule;
  isActive: boolean;
  onClick: () => void;
}

export const GuideModuleCard: React.FC<GuideModuleCardProps> = ({ module, isActive, onClick }) => {
  const categoryLabels = {
    beginner: '初學者',
    intermediate: '進階',
    advanced: '專家',
    reference: '參考'
  };

  const categoryColors = {
    beginner: 'bg-green-600/20 text-green-400 border-green-600/30',
    intermediate: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
    advanced: 'bg-purple-600/20 text-purple-400 border-purple-600/30',
    reference: 'bg-gray-600/20 text-gray-400 border-gray-600/30'
  };

  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full text-left p-3.5 rounded-lg border transition-all duration-300
        ${isActive 
          ? 'border-orange-600 bg-gradient-to-br from-orange-600/20 to-orange-500/10 shadow-lg shadow-orange-600/20' 
          : 'border-[#333] bg-[#1e1e1e] hover:border-orange-600/50 hover:bg-[#252525]'
        }
      `}
    >
      {/* 圖示與標題 */}
      <div className="flex items-start gap-3">
        <span className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          {module.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-bold mb-1 transition-colors ${isActive ? 'text-orange-400' : 'text-white group-hover:text-orange-400'}`}>
            {module.title}
          </h3>
          <p className="text-xs text-[#aaa] leading-relaxed line-clamp-2">
            {module.description}
          </p>
        </div>
      </div>

      {/* Hover 效果 */}
      <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
    </button>
  );
};