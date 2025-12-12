import React from 'react';
import { Hotspot } from './Hotspot';
import { HotspotData } from '../data/database';

interface DeviceSectionProps {
  hotspots: HotspotData[];
  activeId: string | null;
  onHotspotClick: (id: string) => void;
  deviceImageUrl: string;
}

export const DeviceSection: React.FC<DeviceSectionProps> = ({
  hotspots,
  activeId,
  onHotspotClick,
  deviceImageUrl,
}) => {
  return (
    <div className="flex-1 bg-black flex justify-center items-center p-2 relative overflow-hidden min-w-0">
      <div className="relative h-[98%] max-w-full bg-[#222] rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]" style={{ aspectRatio: '1000 / 1580' }}>
        <img
          src={deviceImageUrl}
          alt="SP-404MKII"
          className="w-full h-full object-cover rounded-xl pointer-events-none select-none"
        />
        {hotspots.map((hotspot) => (
          <Hotspot
            key={hotspot.id}
            data={hotspot}
            isActive={activeId === hotspot.id}
            onClick={() => onHotspotClick(hotspot.id)}
          />
        ))}
      </div>
    </div>
  );
};