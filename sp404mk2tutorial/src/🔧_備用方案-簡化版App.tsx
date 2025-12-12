# 🔧 備用方案：簡化版 App.tsx

## 🎯 什麼時候用這個？

**如果上傳 ErrorBoundary 後還是白屏，使用這個簡化版本**

這個版本：
- ✅ 不使用 modal
- ✅ 直接在右側顯示詳細資訊
- ✅ 移除所有 guide 模式
- ✅ 最簡單、最穩定

---

## 📤 使用方法

### 前往編輯：
https://github.com/leekylee-works/sp404mk2tutorial/edit/main/App.tsx

### 刪除所有內容，貼上：

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
```

---

## ✅ 這個版本的特點

### 簡化的邏輯：

1. **只有一個狀態：** `selectedId`
2. **固定使用 detail 模式**
3. **沒有 modal**
4. **沒有 guide/detail 切換**

### 行為：

- 📍 初始狀態：右側顯示引導畫面
- 🖱️ 點擊按鈕：右側顯示詳細資訊
- ↩️ 點擊返回：回到引導畫面

---

## 🔍 預期結果

### Console 輸出：

**初始載入：**
```
🔍 當前狀態: { selectedId: null, hasHotspot: false, hasContent: false }
```

**點擊按鈕（例如 PLAY）：**
```
🔍 點擊按鈕: play
🔍 當前狀態: { selectedId: "play", hasHotspot: true, hasContent: true }
```

**點擊返回：**
```
🔍 返回首頁
🔍 當前狀態: { selectedId: null, hasHotspot: false, hasContent: false }
```

---

## 📊 診斷指南

### 如果還是白屏：

#### 檢查 Console 輸出：

**情況 1：沒有任何輸出**
```
（空白）
```
→ **App.tsx 根本沒有執行**
→ 檢查是否有語法錯誤

---

**情況 2：有初始輸出，但點擊後白屏**
```
🔍 當前狀態: { selectedId: null, hasHotspot: false, hasContent: false }
🔍 點擊按鈕: play
[錯誤訊息]
```
→ **InfoPanel 渲染失敗**
→ 複製錯誤訊息給我

---

**情況 3：點擊後有輸出，但 hasContent: false**
```
🔍 點擊按鈕: play
🔍 當前狀態: { selectedId: "play", hasHotspot: true, hasContent: false }
```
→ **database.tsx 缺少該按鈕的資料**
→ 檢查 `contentDB` 是否包含 "play"

---

**情況 4：點擊後沒有任何輸出**
```
（點擊後沒反應）
```
→ **DeviceSection 或 Hotspot 組件問題**
→ 檢查 onClick 事件是否正確綁定

---

## 🎯 如果這個版本也不行

### 最終診斷清單：

請提供以下資訊：

1. **完整 Console 輸出**（從開啟頁面到點擊按鈕）
2. **Network 請求**（F12 → Network）
3. **錯誤堆疊**（如果有紅色錯誤）
4. **GitHub 上的檔案列表**（確認所有檔案都存在）

需要檢查的檔案：
- [ ] /App.tsx
- [ ] /components/ErrorBoundary.tsx
- [ ] /components/DeviceSection.tsx
- [ ] /components/Hotspot.tsx
- [ ] /components/InfoPanelModular.tsx
- [ ] /data/database.tsx
- [ ] /types/guide.ts

---

## 🚀 立即執行

**如果第一個方案（帶 ErrorBoundary）不行，馬上使用這個！**

**Commit message：**
```
Fix: Simplify to detail-only mode without modal
```

---

**部署後 2 分鐘，刷新頁面，查看 Console，告訴我結果！** 🔍
