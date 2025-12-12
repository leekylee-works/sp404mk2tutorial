import React, { useState } from 'react';
import { DeviceSection } from './components/DeviceSection';
import { InfoPanel } from './components/InfoPanelModular';
import { SEOHead } from './components/SEOHead';
import { GEOContent } from './components/GEOContent';
import { hotspots, contentDB } from './data/database';

// 🔧 DEBUG: Force rebuild at 2024-12-12 23:45
export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<'guide' | 'detail'>('guide');
  const [modalHotspotId, setModalHotspotId] = useState<string | null>(null);

  const handleHotspotClick = (id: string) => {
    // 如果在 guide 模式下，使用 modal 顯示
    if (mode === 'guide') {
      setModalHotspotId(id);
      setSelectedId(id); // 同時設置 selectedId 以高亮左側熱點
    } else {
      // 如果在 detail 模式下，切換到新的詳細頁面
      setSelectedId(id);
      setMode('detail');
    }
  };

  const handleBack = () => {
    setMode('guide');
    setSelectedId(null);
  };

  const handleCloseModal = () => {
    setModalHotspotId(null);
    setSelectedId(null); // 關閉 modal 時也清除選中狀態
  };

  const selectedHotspot = selectedId ? hotspots.find(h => h.id === selectedId) : null;
  const selectedContent = selectedId ? contentDB[selectedId] : null;

  // 動態 SEO meta tags
  const pageTitle = selectedId && selectedHotspot
    ? `${selectedHotspot.name} - SP-404MKII 操作懶人包`
    : 'SP-404MKII 操作懶人包 - 完整互動式中文說明書';
  
  const pageDescription = selectedId && selectedContent
    ? `${selectedContent.def} ${selectedContent.detail.substring(0, 100)}...`
    : 'Roland SP-404MKII 取樣機完整中文互動式說明書，包含 70+ 按鈕熱點、詳細功能說明、SHIFT 組合鍵、42 種 MFX 效果器完整教學、Pattern 樂段製作、取樣技巧等專業教學內容。';

  return (
    <>
      {/* SEO, AEO, GEO 優化 */}
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
        <InfoPanel
          mode={mode}
          selectedId={selectedId}
          selectedName={selectedHotspot?.name || ''}
          selectedCat={selectedHotspot?.cat || ''}
          content={selectedContent}
          onBack={handleBack}
          onHotspotSelect={handleHotspotClick}
          modalHotspotId={modalHotspotId}
          onCloseModal={handleCloseModal}
        />
      </div>
    </>
  );
}