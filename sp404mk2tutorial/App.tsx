```typescript
import React, { useState } from 'react';
import { DeviceSection } from './components/DeviceSection';
import { InfoPanel } from './components/InfoPanelModular';
import { SEOHead } from './components/SEOHead';
import { GEOContent } from './components/GEOContent';
import { ErrorBoundary } from './components/ErrorBoundary';
import { hotspots, contentDB } from './data/database';

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<'guide' | 'detail'>('guide');
  const [modalHotspotId, setModalHotspotId] = useState<string | null>(null);

  const handleHotspotClick = (id: string) => {
    try {
      console.log('🔍 點擊按鈕:', id);
      console.log('🔍 當前 mode:', mode);
      
      // 如果在 guide 模式下，使用 modal 顯示
      if (mode === 'guide') {
        setModalHotspotId(id);
        setSelectedId(id);
        console.log('✅ 設置 modalHotspotId:', id);
      } else {
        // 如果在 detail 模式下，切換到新的詳細頁面
        setSelectedId(id);
        setMode('detail');
        console.log('✅ 設置 selectedId 並切換到 detail 模式:', id);
      }
    } catch (error) {
      console.error('❌ handleHotspotClick 錯誤:', error);
    }
  };

  const handleBack = () => {
    try {
      setMode('guide');
      setSelectedId(null);
      setModalHotspotId(null);
      console.log('✅ 返回 guide 模式');
    } catch (error) {
      console.error('❌ handleBack 錯誤:', error);
    }
  };

  const handleCloseModal = () => {
    try {
      setModalHotspotId(null);
      setSelectedId(null);
      console.log('✅ 關閉 modal');
    } catch (error) {
      console.error('❌ handleCloseModal 錯誤:', error);
    }
  };

  const selectedHotspot = selectedId ? hotspots.find(h => h.id === selectedId) : null;
  const selectedContent = selectedId ? contentDB[selectedId] : null;

  const pageTitle = selectedId && selectedHotspot
    ? `${selectedHotspot.name} - SP-404MKII 操作懶人包`
    : 'SP-404MKII 操作懶人包 - 完整互動式中文說明書';
  
  const pageDescription = selectedId && selectedContent
    ? `${selectedContent.def} ${selectedContent.detail.substring(0, 100)}...`
    : 'Roland SP-404MKII 取樣機完整中文互動式說明書，包含 70+ 按鈕熱點、詳細功能說明、SHIFT 組合鍵、42 種 MFX 效果器完整教學、Pattern 樂段製作、取樣技巧等專業教學內容。';

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
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}
```
