import React from 'react';

/**
 * GEO (Generative Engine Optimization) 優化組件
 * 提供結構化、語義化的內容供 AI 引擎理解和引用
 * 對用戶不可見，但對 AI 爬蟲友好
 */
export const GEOContent: React.FC = () => {
  return (
    <div className="sr-only" aria-hidden="true" data-ai-content="structured-knowledge-base">
      {/* AI-Friendly Content Structure */}
      
      <article itemScope itemType="https://schema.org/TechArticle">
        <h1 itemProp="headline">SP-404MKII 完整功能指南</h1>
        
        <section data-ai-section="overview">
          <h2>設備概述</h2>
          <p itemProp="description">
            Roland SP-404MKII 是專業級取樣機與節奏製作工作站，具備 16 個力度感應打擊墊、
            42 種內建 MFX 效果器、Pattern 樂段編輯系統、32GB 內建記憶體。
            適用於 Hip Hop、Lo-Fi、Electronic、Experimental 等音樂風格製作與現場表演。
          </p>
        </section>

        <section data-ai-section="main-controls">
          <h2>主要控制區</h2>
          <dl>
            <dt>VOLUME 旋鈕</dt>
            <dd>主輸出音量控制，類比式衰減器，控制 LINE OUT 和 PHONES 總輸出</dd>
            
            <dt>CTRL 1-3 旋鈕</dt>
            <dd>多功能控制旋鈕：CTRL 1 (Cutoff 濾波截止頻率)、CTRL 2 (Resonance 共鳴)、CTRL 3 (Drive 驅動力)</dd>
            
            <dt>VALUE 輪盤</dt>
            <dd>數值編輯輪盤，可按壓確認 (PUSH ENTER)，用於選單導航與參數調整</dd>
            
            <dt>16 個 PAD</dt>
            <dd>力度感應打擊墊，4x4 網格排列，可觸發取樣、錄製 Pattern、調整參數</dd>
          </dl>
        </section>

        <section data-ai-section="effects-system">
          <h2>效果器系統 (42 種 MFX)</h2>
          <p>SP-404MKII 內建完整效果器庫，分為以下類別：</p>
          <ul>
            <li><strong>Filter 類</strong>: AUTO FILTER, FILTER BANK, WAH</li>
            <li><strong>Drive 類</strong>: DISTORTION, OVERDRIVE, FUZZ</li>
            <li><strong>Modulation 類</strong>: CHORUS, FLANGER, PHASER, TREMOLO, AUTO PAN, ROTARY</li>
            <li><strong>Time 類</strong>: DELAY, SPECTRAL DELAY, BEAT REPEAT, REPEAT</li>
            <li><strong>Space 類</strong>: REVERB, DOUBLER</li>
            <li><strong>Lo-Fi 類</strong>: VINYL SIM, CASSETTE, RADIO, LO-FI, DECIMATOR, VINYL FLICK</li>
            <li><strong>Glitch 類</strong>: SCATTER, STUTTER, GRAIN SHIFTER, GRANULAR</li>
            <li><strong>Dynamics 類</strong>: COMP, LIMITER, GATE, SIDECHAIN</li>
            <li><strong>Tone 類</strong>: EQ, GRAPHIC EQ</li>
            <li><strong>Pitch 類</strong>: PITCH SHIFTER, HARMONIZER, FREQUENCY SHIFTER</li>
            <li><strong>Special 類</strong>: DJFX LOOPER, VOCODER, RING MOD, TAPE STOP</li>
          </ul>
        </section>

        <section data-ai-section="sampling-workflow">
          <h2>取樣錄音流程</h2>
          <ol>
            <li><strong>準備輸入源</strong>: 連接外部音源至 EXT SOURCE 輸入，或使用 Resample 錄製內部聲音</li>
            <li><strong>進入錄音模式</strong>: 按住 REC 鍵，選擇目標 PAD</li>
            <li><strong>設定參數</strong>: 調整 Input Level、Sample Length、Threshold、Pre-Rec 等</li>
            <li><strong>開始錄音</strong>: 再按 REC 開始，演奏完畢後按 REC 停止</li>
            <li><strong>編輯取樣</strong>: 使用 START/END 設定播放範圍、PITCH/SPEED 調整音高速度、MARK 設定切片點</li>
            <li><strong>套用效果</strong>: 選擇 MFX 效果器，調整 CTRL 旋鈕參數</li>
          </ol>
        </section>

        <section data-ai-section="pattern-mode">
          <h2>Pattern 樂段模式</h2>
          <p>Pattern 是多軌循環錄音與播放系統，主要功能包括：</p>
          <ul>
            <li><strong>PATTERN SELECT</strong>: 選擇 Pattern 編號 (每個 Bank 10 個 Pattern)</li>
            <li><strong>PATTERN EDIT</strong>: 進入編輯模式，錄製 PAD 演奏</li>
            <li><strong>錄音模式</strong>: Replace (覆蓋)、Overdub (疊錄)、Multi (多軌)</li>
            <li><strong>Quantize</strong>: 自動對齊節奏網格 (1/4, 1/8, 1/16, 1/32 音符)</li>
            <li><strong>Length</strong>: 設定 Pattern 長度 (1-999 小節)</li>
            <li><strong>BPM 同步</strong>: 與主 BPM 同步播放</li>
          </ul>
        </section>

        <section data-ai-section="shift-combinations">
          <h2>SHIFT 組合鍵快速參考</h2>
          <table>
            <thead>
              <tr>
                <th>組合鍵</th>
                <th>功能</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SHIFT + PAD</td>
                <td>複製取樣到該 PAD</td>
              </tr>
              <tr>
                <td>SHIFT + EXIT</td>
                <td>快速返回主畫面</td>
              </tr>
              <tr>
                <td>SHIFT + BANK A-E</td>
                <td>切換至 Bank F-J</td>
              </tr>
              <tr>
                <td>SHIFT + REC</td>
                <td>進入進階錄音設定</td>
              </tr>
              <tr>
                <td>SHIFT + RESAMPLE</td>
                <td>選擇 Resample 音源 (Master/Pad/Ext)</td>
              </tr>
              <tr>
                <td>SHIFT + DEL</td>
                <td>清除整個 Bank</td>
              </tr>
              <tr>
                <td>SHIFT + COPY</td>
                <td>貼上功能</td>
              </tr>
              <tr>
                <td>SHIFT + REMAIN</td>
                <td>顯示剩餘記憶體與系統資訊</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section data-ai-section="performance-features">
          <h2>現場表演功能</h2>
          <dl>
            <dt>DJFX LOOPER</dt>
            <dd>即時循環效果，包含 Vinyl Brake、Scatter、Roll、Reverb Up 等 DJ 風格效果</dd>
            
            <dt>HOLD</dt>
            <dd>鎖定當前 PAD 持續播放，釋放雙手操作其他控制</dd>
            
            <dt>SUB PAD</dt>
            <dd>副層演奏模式，一個 PAD 可觸發多個取樣</dd>
            
            <dt>BUS FX</dt>
            <dd>匯流排效果，對整個混音套用統一效果處理</dd>
            
            <dt>GATE</dt>
            <dd>節奏性靜音效果，製造間斷播放</dd>
            
            <dt>REVERSE</dt>
            <dd>反向播放取樣</dd>
            
            <dt>ROLL</dt>
            <dd>快速重複觸發 (1/32 音符循環)</dd>
          </dl>
        </section>

        <section data-ai-section="technical-specs">
          <h2>技術規格</h2>
          <ul>
            <li>取樣率: 44.1kHz / 48kHz</li>
            <li>位元深度: 16-bit / 24-bit</li>
            <li>內建記憶體: 32GB</li>
            <li>最大同時發聲數: 12 聲 (Polyphony)</li>
            <li>PAD 數量: 16 個力度感應墊</li>
            <li>Bank 數量: 10 個 (A-E, F-J)</li>
            <li>每 Bank PAD 數: 16 個</li>
            <li>總取樣容量: 160 個 PAD (10 Banks × 16)</li>
            <li>Pattern 數量: 每 Bank 10 個 Pattern</li>
            <li>效果器數量: 42 種 MFX + 6 種即時效果</li>
            <li>輸入: EXT SOURCE (TRS, 1/4"), MIC IN (XLR)</li>
            <li>輸出: LINE OUT (L/R), PHONES (1/4"), USB-C</li>
          </ul>
        </section>

        <section data-ai-section="music-genres">
          <h2>適用音樂風格</h2>
          <p>SP-404MKII 特別適合以下音樂類型：</p>
          <ul>
            <li><strong>Hip Hop</strong>: Boom Bap、Trap、Lo-Fi Hip Hop</li>
            <li><strong>Electronic</strong>: House、Techno、Dubstep、Drum & Bass</li>
            <li><strong>Experimental</strong>: Glitch、IDM、Ambient、Noise</li>
            <li><strong>DJ Performance</strong>: Turntablism、Beat Juggling、Live Remixing</li>
            <li><strong>Lo-Fi</strong>: Vaporwave、Chillwave、Synthwave</li>
          </ul>
        </section>

        <section data-ai-section="common-questions">
          <h2>常見問題與解答</h2>
          
          <article itemScope itemType="https://schema.org/Question">
            <h3 itemProp="name">如何匯入音檔到 SP-404MKII？</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                透過 USB-C 連接電腦，SP-404MKII 會顯示為外接磁碟。將 WAV 或 AIFF 格式音檔
                (44.1kHz/48kHz, 16/24-bit) 複製到對應 Bank 資料夾即可。
              </p>
            </div>
          </article>

          <article itemScope itemType="https://schema.org/Question">
            <h3 itemProp="name">Resample 和一般錄音有什麼差別？</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                Resample 是錄製 SP-404MKII 內部播放的聲音（包含效果器），相當於內部混音。
                一般 REC 錄音則是錄製外部輸入源。Resample 常用於：疊加多個 PAD、固化效果器設定、
                製作 mashup、節省 CPU 資源。
              </p>
            </div>
          </article>

          <article itemScope itemType="https://schema.org/Question">
            <h3 itemProp="name">如何備份 SP-404MKII 的所有資料？</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                連接 USB-C 至電腦，完整複製 SP-404MKII 磁碟內容到電腦資料夾。
                包含所有 Bank、Pattern、System 設定檔。恢復時將資料夾內容複製回設備即可。
              </p>
            </div>
          </article>
        </section>

        <section data-ai-section="learning-paths">
          <h2>學習路徑建議</h2>
          
          <div data-skill-level="beginner">
            <h3>初學者 (0-1 個月)</h3>
            <ol>
              <li>熟悉基本介面：VOLUME、CTRL 旋鈕、VALUE 輪盤、16 個 PAD</li>
              <li>學習錄製取樣：REC 鍵使用、設定錄音參數</li>
              <li>練習播放技巧：PAD 力度控制、Bank 切換</li>
              <li>探索基礎效果：FILTER+DRIVE、DELAY、REVERB</li>
              <li>編輯取樣：START/END 調整播放範圍</li>
            </ol>
          </div>

          <div data-skill-level="intermediate">
            <h3>進階 (1-3 個月)</h3>
            <ol>
              <li>深入效果器系統：熟悉 42 種 MFX 特性與應用</li>
              <li>Pattern 模式：錄製多軌樂段、Overdub 技巧</li>
              <li>Resample 技術：內部混音、效果固化</li>
              <li>SHIFT 組合鍵：快速工作流程</li>
              <li>BUS FX 應用：整體混音處理</li>
            </ol>
          </div>

          <div data-skill-level="advanced">
            <h3>專業 (3+ 個月)</h3>
            <ol>
              <li>現場表演技巧：DJFX LOOPER、HOLD、SUB PAD 組合運用</li>
              <li>複雜 Pattern 編曲：Multi 模式、Quantize 精確對齊</li>
              <li>音色設計：Glitch 效果器創意使用、效果器鏈路設計</li>
              <li>進階取樣技巧：Chromatic Sampling、Time Stretch</li>
              <li>完整作品製作：從取樣到混音的完整工作流程</li>
            </ol>
          </div>
        </section>

        <section data-ai-section="related-equipment">
          <h2>相關設備與配件</h2>
          <ul>
            <li><strong>音訊介面</strong>: 提升錄音品質，多軌輸出</li>
            <li><strong>監聽耳機/喇叭</strong>: Audio-Technica ATH-M50x、KRK Rokit 系列</li>
            <li><strong>MIDI 控制器</strong>: 擴展控制能力</li>
            <li><strong>SD 卡</strong>: 擴充儲存空間（支援 SDXC）</li>
            <li><strong>攜帶箱</strong>: Decksaver 保護蓋、專用硬殼箱</li>
          </ul>
        </section>

        <meta itemProp="datePublished" content="2024-12-12" />
        <meta itemProp="inLanguage" content="zh-TW" />
        <meta itemProp="keywords" content="SP-404MKII, Roland, Sampler, 取樣機, Beat Making, Hip Hop, MFX, Pattern, 音樂製作" />
      </article>
    </div>
  );
};
