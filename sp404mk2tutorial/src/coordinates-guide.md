# SP-404MKII 座標校準指南

## 當前圖片
- URL: https://shoplineimg.com/65190bc9a15766003cd85c31/68215d2c305c6800104fe5bf/3860x.webp?source_format=jpeg
- Aspect Ratio: 330 / 288 (實際設備尺寸比例)

## 座標系統說明
```typescript
rect: [top%, left%, height%, width%]
```
- **top%**: 從圖片頂部往下的百分比 (0-100)
- **left%**: 從圖片左側往右的百分比 (0-100)  
- **height%**: 元素高度百分比
- **width%**: 元素寬度百分比

## 視覺參考區域劃分（基於 SP-404MKII 實際佈局）

### 左上區域 - 旋鈕 (0-20% top, 0-60% left)
- VOLUME: 左上角
- CTRL 1, 2, 3: 依序向右

### 中上區域 - 螢幕與效果鍵 (15-40% top, 10-60% left)
- FILTER+DRIVE, RESONATOR, DELAY: 螢幕上方
- ISOLATOR, DJFX LOOPER, MFX: 螢幕下方
- VALUE 輪盤: 螢幕右下

### 中間區域 - 編輯與控制鍵 (35-60% top, 5-65% left)
- 左列: PATTERN SELECT, PATTERN EDIT, RECORD SETTING, START/END, PITCH/SPEED, MARK
- 中列: DEL, REC, RESAMPLE, BPM SYNC, GATE, LOOP, REVERSE, ROLL
- 右列: EXIT, COPY, REMAIN, BANK A-E, SHIFT

### 右下區域 - 16 個 Pad (55-100% top, 5-60% left)
- 4x4 網格排列
- Pad 1-4: 第一行
- Pad 5-8: 第二行
- Pad 9-12: 第三行
- Pad 13-16: 第四行

### 最右下 - 四個功能鍵 (55-100% top, 58-100% left)
- BUS FX, HOLD, EXT SOURCE, SUB PAD

## 調整建議
如果按鈕位置不準，請告訴我具體哪些按鈕偏移了（例如"PAD 1-16 全部往右偏移了"或"SHIFT 按鈕太低了"），我會精確調整座標。
