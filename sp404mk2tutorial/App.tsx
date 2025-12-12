import React, { useState } from 'react';
import { DeviceSection } from './components/DeviceSection';
import { InfoPanel } from './components/InfoPanelModular';
import { SEOHead } from './components/SEOHead';
import { GEOContent } from './components/GEOContent';
import { ErrorBoundary } from './components/ErrorBoundary';
import { hotspots, contentDB } from './data/database';

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleHotspotClick = (id: string) => {
    console.log('🔍 點擊按鈕:', id);
    setSelectedId(id);
  };

  const handleBack = () => {
    console.log('🔍 返回首頁');
    setSelectedId(null);
  };

  const selectedHotspot = selectedId ? hotspots.find(h => h.id === selectedId) : null;
  const selectedContent = selectedId ? contentDB[selectedId] : null;

  const pageTitle = selectedId && selectedHotspot
    ? `${selectedHotspot.name} - SP-404MKII 操作懶人包`
    : 'SP-404MKII 操作懶人包 - 完整互動式中文說明書';
  
  const pageDescription = selectedId && selectedContent
    ? `${selectedContent.def} ${selectedContent.detail.substring(0, 100)}...`
    : 'Roland SP-404MKII 取樣機完整中文互動式說明書，包含 70+ 按鈕熱點、詳細功能說明、SHIFT 組合鍵、42 種 MFX 效果器完整教學、Pattern 樂段製作、取樣技巧等專業教學內容。';

  console.log('🔍 當前狀態:', { selectedId, hasHotspot: !!selectedHotspot, hasContent: !!selectedContent });

  return (
    <ErrorBoundary>
      <SEOHead 
        title={pageTitle}
        description={pageDescription}
        currentButton={selectedHotspot?.name}
      />
      <GEOContent />
      
      <div className="h-screen overflow-hidden flex bg-[#121212] text-[#e0e0e0]">
        <DeviceSection
          hotspots={hotspots}
          activeId={selectedId}
          onHotspotClick={handleHotspotClick}
          deviceImageUrl="https://shoplineimg.com/65190bc9a15766003cd85c31/68215d2c305c6800104fe5bf/3860x.webp?source_format=jpeg"
        />
        
        <ErrorBoundary>
          <InfoPanel
            mode="detail"
            selectedId={selectedId}
            selectedName={selectedHotspot?.name || ''}
            selectedCat={selectedHotspot?.cat || ''}
            content={selectedContent}
            onBack={handleBack}
            onHotspotSelect={handleHotspotClick}
            modalHotspotId={null}
            onCloseModal={() => {}}
          />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}
