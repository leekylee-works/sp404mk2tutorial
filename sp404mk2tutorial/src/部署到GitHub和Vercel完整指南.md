# 🚀 部署到 GitHub 和 Vercel 完整指南

## ✅ 準備工作已完成

所有必要的配置檔案已經創建完成：
- ✅ index.html
- ✅ main.tsx
- ✅ package.json
- ✅ vite.config.ts
- ✅ tsconfig.json
- ✅ vercel.json
- ✅ .gitignore

---

## 📂 第一步：準備上傳檔案

### 需要上傳到 GitHub 的核心檔案（共 13 個）

```
核心檔案（6 個）：
✅ index.html
✅ main.tsx
✅ App.tsx
✅ package.json
✅ vite.config.ts
✅ tsconfig.json
✅ vercel.json
✅ .gitignore

資料夾：
✅ components/
   ├── DeviceSection.tsx
   ├── InfoPanelModular.tsx
   ├── SEOHead.tsx
   └── GEOContent.tsx

✅ data/
   └── database.ts

✅ styles/
   └── globals.css
```

---

## 🌐 第二步：上傳到 GitHub（網頁版操作）

### 方法 A：使用 GitHub 網頁介面（推薦，最簡單）

#### 1. 前往您的 GitHub Repository
- 網址：https://github.com/leekylee-works/sp404mk2tutorial

#### 2. 刪除舊的 sp404mk2tutorial 資料夾（如果存在）
1. 點擊 `sp404mk2tutorial` 資料夾
2. 點擊每個檔案右側的「...」→ Delete file
3. 或者使用 GitHub 的批量刪除功能

#### 3. 上傳核心檔案（根目錄）

**A. 上傳配置檔案（8 個）**
1. 點擊「Add file」→「Upload files」
2. 拖曳以下檔案：
   ```
   index.html
   main.tsx
   App.tsx
   package.json
   vite.config.ts
   tsconfig.json
   vercel.json
   .gitignore
   ```
3. Commit message：`Add core configuration files`
4. 點擊「Commit changes」

**B. 創建並上傳 components 資料夾**
1. 點擊「Add file」→「Create new file」
2. 在檔案名稱輸入：`components/DeviceSection.tsx`
3. 複製 DeviceSection.tsx 的內容貼上
4. 點擊「Commit changes」
5. 重複步驟上傳：
   - `components/InfoPanelModular.tsx`
   - `components/SEOHead.tsx`
   - `components/GEOContent.tsx`

**C. 創建並上傳 data 資料夾**
1. 點擊「Add file」→「Create new file」
2. 在檔案名稱輸入：`data/database.ts`
3. 複製 database.ts 的內容貼上
4. 點擊「Commit changes」

**D. 創建並上傳 styles 資料夾**
1. 點擊「Add file」→「Create new file」
2. 在檔案名稱輸入：`styles/globals.css`
3. 複製 globals.css 的內容貼上
4. 點擊「Commit changes」

---

### 方法 B：使用 GitHub Desktop（圖形化介面）

#### 1. 下載並安裝 GitHub Desktop
- 下載：https://desktop.github.com/

#### 2. Clone Repository
1. 開啟 GitHub Desktop
2. File → Clone Repository
3. 選擇 `leekylee-works/sp404mk2tutorial`
4. 選擇本地資料夾位置
5. 點擊 Clone

#### 3. 複製檔案到本地 Repository
1. 開啟檔案總管，前往 Clone 的資料夾
2. **刪除所有舊檔案**（如果有 sp404mk2tutorial 子資料夾，刪除它）
3. 從 Figma Make 複製以下檔案和資料夾到根目錄：
   ```
   index.html
   main.tsx
   App.tsx
   package.json
   vite.config.ts
   tsconfig.json
   vercel.json
   .gitignore
   components/
   data/
   styles/
   ```

#### 4. Commit 和 Push
1. 回到 GitHub Desktop
2. 左側會顯示所有變更
3. 在下方輸入 Commit message：`Deploy Version 63 - Complete restore`
4. 點擊「Commit to main」
5. 點擊「Push origin」

---

### 方法 C：使用 Git 命令列（進階）

```bash
# 1. Clone repository
git clone https://github.com/leekylee-works/sp404mk2tutorial.git
cd sp404mk2tutorial

# 2. 刪除舊的 sp404mk2tutorial 子資料夾（如果存在）
rm -rf sp404mk2tutorial

# 3. 複製所有檔案到根目錄
# （從 Figma Make 複製 index.html, main.tsx, App.tsx, package.json 等）

# 4. Commit 和 Push
git add .
git commit -m "Deploy Version 63 - Complete restore"
git push origin main
```

---

## 🚀 第三步：部署到 Vercel

### 方法 1：使用 Vercel Dashboard（推薦）

#### 1. 前往 Vercel
- 網址：https://vercel.com/

#### 2. 登入並連接 GitHub
1. 使用 GitHub 帳號登入
2. 如果還沒授權，授權 Vercel 存取您的 GitHub

#### 3. Import Project
1. 點擊「Add New...」→「Project」
2. 從列表中找到 `sp404mk2tutorial`
3. 點擊「Import」

#### 4. 配置專案設定

**重要！請檢查以下設定：**

```
Framework Preset: Vite
Root Directory: ./           （不要設定為 sp404mk2tutorial！）
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**✅ 正確的設定：**
- Root Directory: `./` 或留空
- 這樣 Vercel 會直接從 Repository 的根目錄讀取檔案

**❌ 錯誤的設定（之前的問題）：**
- Root Directory: `sp404mk2tutorial`
- 這會導致 Vercel 找不到檔案

#### 5. 環境變數（選用）
- 目前不需要設定環境變數

#### 6. 部署
1. 點擊「Deploy」
2. 等待 2-3 分鐘
3. 部署成功後會顯示：
   ```
   ✅ Deployment Ready
   Visit: https://sp404mk2tutorial.vercel.app
   ```

---

## ✅ 第四步：驗證部署

### 1. 檢查 GitHub Repository
訪問：https://github.com/leekylee-works/sp404mk2tutorial

**應該看到：**
```
sp404mk2tutorial/
├── index.html
├── main.tsx
├── App.tsx
├── package.json
├── vite.config.ts
├── tsconfig.json
├── vercel.json
├── .gitignore
├── components/
│   ├── DeviceSection.tsx
│   ├── InfoPanelModular.tsx
│   ├── SEOHead.tsx
│   └── GEOContent.tsx
├── data/
│   └── database.ts
└── styles/
    └── globals.css
```

### 2. 檢查 Vercel 部署
訪問：https://sp404mk2tutorial.vercel.app

**應該看到：**
- ✅ 左側：SP-404MKII 產品圖片
- ✅ 右側：按鈕列表面板
- ✅ 點擊熱點：彈出 Modal
- ✅ Roland 品牌配色（橘色 + 藍色）
- ✅ 沒有錯誤訊息

---

## 🐛 常見問題排除

### 問題 1：Vercel 建置失敗
**錯誤訊息：**
```
Error: Cannot find module 'components/DeviceSection'
```

**解決方案：**
1. 檢查 Vercel 的 Root Directory 設定
2. 應該是 `./` 或留空
3. **不要**設定為 `sp404mk2tutorial`

---

### 問題 2：頁面顯示空白
**可能原因：**
- 檔案結構不正確
- components 資料夾不在根目錄

**解決方案：**
1. 確認 GitHub Repository 的檔案結構：
   ```
   根目錄/
   ├── components/    ← 應該在這裡
   ├── data/
   ├── styles/
   └── App.tsx
   ```

2. **不應該有**：
   ```
   根目錄/
   └── sp404mk2tutorial/    ← 錯誤！不應該有這層
       ├── components/
       └── ...
   ```

---

### 問題 3：GitHub 上傳檔案數量限制
**解決方案：**
- 使用 GitHub Desktop 或 Git 命令列
- 網頁版一次最多上傳 100 個檔案

---

### 問題 4：Vercel 部署後找不到 CSS
**解決方案：**
1. 確認 `styles/globals.css` 已上傳
2. 確認 `main.tsx` 有引入：
   ```typescript
   import './styles/globals.css';
   ```

---

## 📝 快速檢查清單

### GitHub 上傳前
- [ ] 確認所有核心檔案已準備好
- [ ] 確認檔案結構正確（沒有多餘的子資料夾）
- [ ] 已刪除舊的 sp404mk2tutorial 子資料夾

### GitHub 上傳後
- [ ] 檢查 Repository 根目錄有 index.html
- [ ] 檢查 components/ 資料夾存在且有 4 個檔案
- [ ] 檢查 data/database.ts 存在
- [ ] 檢查 styles/globals.css 存在

### Vercel 部署前
- [ ] GitHub Repository 檔案結構正確
- [ ] Root Directory 設定為 `./` 或留空
- [ ] Framework Preset 選擇 Vite

### Vercel 部署後
- [ ] 部署成功無錯誤
- [ ] 網站可以正常訪問
- [ ] 熱點可以點擊
- [ ] Modal 可以彈出
- [ ] 樣式正確顯示

---

## 🎯 推薦流程（最簡單）

### 使用 GitHub Desktop + Vercel Dashboard

1. **下載 GitHub Desktop**
2. **Clone Repository**
3. **複製所有檔案到根目錄**（刪除任何 sp404mk2tutorial 子資料夾）
4. **Commit 和 Push**
5. **前往 Vercel**
6. **Import Project**（Root Directory 設為 `./`）
7. **Deploy**
8. **完成！** 🎉

---

## 📞 需要協助？

如果遇到任何問題：
1. 檢查 Vercel 的部署日誌（Deployment Logs）
2. 檢查 GitHub Repository 的檔案結構
3. 確認 Root Directory 設定正確

---

## ✨ 成功標準

當您看到以下畫面，就表示部署成功：

**GitHub：**
```
✅ Repository 根目錄有所有核心檔案
✅ 沒有多餘的 sp404mk2tutorial 子資料夾
```

**Vercel：**
```
✅ Deployment Status: Ready
✅ 網站可以訪問
✅ 所有功能正常運作
```

**網站：**
```
✅ 左側顯示 SP-404MKII 產品圖
✅ 右側顯示按鈕列表
✅ 點擊熱點彈出 Modal
✅ 搜尋功能正常
```

---

**準備好了嗎？開始上傳吧！** 🚀
