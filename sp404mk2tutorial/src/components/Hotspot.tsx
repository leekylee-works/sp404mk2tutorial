import React from 'react';
import { HotspotData } from '../data/database';

interface HotspotProps {
  data: HotspotData;
  isActive: boolean;
  onClick: () => void;
}

export const Hotspot: React.FC<HotspotProps> = ({ data, isActive, onClick }) => {
  const [top, left, width, height] = data.rect;
  
  const style: React.CSSProperties = {
    top: `${top}%`,
    left: `${left}%`,
    width: `${width}%`,
    height: `${height}%`,
  };

  const shapeClass = data.type === 'knob' ? 'rounded-full' : 'rounded';

  return (
    <div
      className={`
        absolute cursor-pointer z-10
        border border-orange-600/30 bg-white/[0.01]
        transition-all duration-100
        hover:border-orange-600 hover:bg-orange-600/20 hover:shadow-[0_0_15px_rgba(255,107,0,0.5)] hover:z-20
        ${shapeClass}
        ${isActive ? 'border-[3px] border-orange-400 bg-orange-500/40 shadow-[0_0_40px_rgba(255,107,0,0.9),0_0_80px_rgba(255,107,0,0.5),inset_0_0_20px_rgba(255,107,0,0.3)] z-30 animate-pulse scale-110' : ''}
      `}
      style={style}
      onClick={onClick}
      title={data.name}
    />
  );
};