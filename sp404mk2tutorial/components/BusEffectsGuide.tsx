import React from 'react';

export const BusEffectsGuide: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/10 border border-blue-700/30 rounded-lg p-5 text-sm">
      <h3 className="text-blue-400 text-lg font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">🎚️</span>
        Bus 效果器系統完整解析
      </h3>
      
      {/* 餐廳廚房比喻 */}
      <div className="bg-purple-900/10 border border-purple-600/30 rounded-lg p-4 mb-5 text-sm">
        <p className="text-purple-200/90 leading-relaxed">
          <strong className="text-purple-400">🍳 廚房比喻：</strong>如果把 SP-404 的 Bus 效果器想像成一家餐廳的廚房，<strong className="text-orange-400">Bus 1 和 Bus 2</strong> 就像是不同的廚師工作站，各自負責處理不同的食材（取樣，如肉類或蔬菜），並添加特定的調味料（效果器，如鹽巴或香料）。<strong className="text-cyan-400">Bus 3 和 Bus 4</strong> 則是最後的裝盤區和品質檢查區（母帶處理），無論食材從哪個工作站來，最終都會在這裡被統整和塑形，確保上桌的菜餚（最終混音）口感一致。
        </p>
      </div>

      {/* 一、Bus 效果器邏輯概述 */}
      <div className="mb-5">
        <h4 className="text-white font-semibold mb-3 text-base flex items-center gap-2">
          <span className="bg-blue-600/20 px-2 py-0.5 rounded text-xs">一</span>
          Bus 效果器邏輯概述
        </h4>
        <p className="text-[#bbb] text-sm leading-relaxed mb-4">
          Bus 效果器可以視為<strong className="text-blue-400">音訊路由通道（audio routing lanes）</strong>。您可以將不同的取樣（samples）發送到不同的 Bus 通道，每個通道上都設有專屬的效果器。您能夠控制這些效果器彼此之間如何串接（flow into each other），最終進入您的最終混音（final mix）。
        </p>
        <p className="text-[#bbb] text-sm leading-relaxed">
          SP-404 MKII 共有<strong className="text-orange-400">四個主要的 Bus 效果器</strong>：Bus 1、Bus 2、Bus 3 和 Bus 4。
        </p>
      </div>

      {/* Bus 1 & 2：表演效果器 */}
      <div className="mb-5">
        <h4 className="text-orange-400 font-semibold mb-3 text-sm flex items-center gap-2">
          <span className="bg-orange-600/20 px-2 py-0.5 rounded text-xs">1</span>
          Bus 1 與 Bus 2：表演效果器（Performance Effects）
        </h4>
        
        <div className="bg-[#1a1a1a] border border-orange-600/40 rounded-lg p-4 mb-3">
          <p className="text-[#bbb] text-sm leading-relaxed mb-3">
            Bus 1 和 Bus 2 可以透過 <strong className="text-orange-400">REMAIN + Pad</strong> 輕鬆切換。它們被視為<strong className="text-orange-400">表演效果器（performance effects）</strong>，適合即時演出時快速調整。
          </p>

          <div className="space-y-3">
            <div className="bg-[#141414] border-l-4 border-orange-500 p-3 rounded">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                <strong className="text-orange-400 text-sm">取樣路由設定</strong>
              </div>
              <ul className="list-disc list-inside text-sm text-[#bbb] space-y-1 ml-2">
                <li><span className="text-orange-400">亮橙色 (Lit Orange)</span> → 送往 <strong>BUS 1</strong>，套用 BUS 1 上的效果器</li>
                <li><span className="text-green-400">亮綠色 (Lit Green)</span> → 送往 <strong>BUS 2</strong>，套用 BUS 2 上的效果器</li>
                <li><span className="text-white">亮白色 (Lit White)</span> → <strong>DRY（乾訊號）</strong>，不套用 BUS 1 或 BUS 2 上的效果器</li>
              </ul>
            </div>

            <div className="bg-[#141414] border-l-4 border-green-500 p-3 rounded">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <strong className="text-green-400 text-sm">建議用途</strong>
              </div>
              <ul className="list-disc list-inside text-sm text-[#bbb] space-y-1 ml-2">
                <li><strong className="text-orange-400">Bus 1</strong> 通常用於<strong>旋律音效（melodic sounds）</strong>，可以放置 Reverb、Kodama、404 Sim 或 Lo-Fi 等效果，將旋律元素融合在一起</li>
                <li><strong className="text-blue-400">Bus 2</strong> 用於<strong>鼓組和低音（drums and bass）</strong>，這樣這些節奏元素就不會受到 Bus 1 上的殘響等效果影響</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bus 3 & 4：母帶處理鏈 */}
      <div className="mb-5">
        <h4 className="text-cyan-400 font-semibold mb-3 text-sm flex items-center gap-2">
          <span className="bg-cyan-600/20 px-2 py-0.5 rounded text-xs">2</span>
          Bus 3 與 Bus 4：母帶處理鏈（Mastering Chain）
        </h4>
        
        <div className="bg-[#1a1a1a] border border-cyan-600/40 rounded-lg p-4 mb-3">
          <p className="text-[#bbb] text-xs leading-relaxed mb-3">
            Bus 3 和 Bus 4 需要透過按下 <strong className="text-cyan-400">SHIFT + Pad 16</strong> 才能進入設定。由於它們不如 Bus 1 和 Bus 2 那樣容易存取，因此常被視為<strong className="text-cyan-400">母帶處理鏈（mastering chain）</strong>或所有聲音最終會被發送到的處理環節。
          </p>

          <div className="space-y-3">
            <div className="bg-[#141414] border-l-4 border-cyan-500 p-3 rounded">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-cyan-500 rounded-full"></span>
                <strong className="text-cyan-400 text-xs">設定調整</strong>
              </div>
              <p className="text-[#bbb] text-xs leading-relaxed ml-2">
                在 <strong className="text-cyan-400">SHIFT + Pad 16</strong> 的效果設定頁面中，您可以使用<strong>最右邊的旋鈕</strong>來調整 Bus 3 和 Bus 4 的設定，或是點擊 <strong>Enter 旋鈕</strong>來切換效果器類型（EFX type）。
              </p>
            </div>

            <div className="bg-[#141414] border-l-4 border-purple-500 p-3 rounded">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                <strong className="text-purple-400 text-xs">用途建議</strong>
              </div>
              <p className="text-[#bbb] text-xs leading-relaxed ml-2">
                這些 Bus 通常用於<strong>將所有聲音黏合在一起（glue all the sound together）</strong>，例如使用 Cassette Sim 和 303 Vinyl Sim（作為壓縮器使用）。此外，它們也可以用於<strong>重取樣（resampling）</strong>過程中的聲音設計，讓您能使用四個效果器而不是只有 Bus 1 和 Bus 2 的兩個效果器。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 二、效果器路由設定 */}
      <div className="mb-5">
        <h4 className="text-white font-semibold mb-3 text-base flex items-center gap-2">
          <span className="bg-blue-600/20 px-2 py-0.5 rounded text-xs">二</span>
          效果器路由設定與技巧
        </h4>

        {/* 串聯/並聯路由 */}
        <div className="bg-[#1a1a1a] border border-yellow-600/40 rounded-lg p-4 mb-3">
          <h5 className="text-yellow-400 font-semibold mb-3 text-xs flex items-center gap-2">
            <span className="bg-yellow-600/20 px-2 py-0.5 rounded text-[10px]">1</span>
            Bus 1 與 Bus 2 的串聯/並聯路由
          </h5>
          
          <p className="text-[#bbb] text-xs leading-relaxed mb-3">
            Bus 1 和 Bus 2 進入 Bus 3 和 Bus 4 的路由方式有兩種，可以在 <strong className="text-yellow-400">EFX 設定頁面</strong>中切換：
          </p>

          <div className="space-y-3">
            <div className="bg-[#141414] border border-green-600/40 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <strong className="text-green-400 text-xs">🔀 並聯模式 (Parallel)</strong>
                <span className="text-[10px] px-2 py-0.5 rounded bg-green-600/20 text-green-400">獨立處理</span>
              </div>
              <p className="text-[#bbb] text-xs leading-relaxed mb-2">
                <strong>邏輯：</strong>Bus 1 和 Bus 2 是獨立分開的。
              </p>
              <p className="text-[#bbb] text-xs leading-relaxed mb-2">
                <strong>用途：</strong>允許 Bus 1 和 Bus 2 獨立處理不同的聲音元素。
              </p>
              <div className="bg-green-900/10 border-l-2 border-green-500/50 pl-2 py-1 text-[11px] text-green-300/90">
                <strong>範例：</strong>在 Bus 1 上加入 Reverb 給旋律取樣；在 Bus 2 上使用 Isolator 或 DJ Effects Looper 快速靜音或處理鼓組。
              </div>
            </div>

            <div className="bg-[#141414] border border-orange-600/40 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <strong className="text-orange-400 text-xs">⛓️ 串聯模式 (Serial)</strong>
                <span className="text-[10px] px-2 py-0.5 rounded bg-orange-600/20 text-orange-400">串接處理</span>
              </div>
              <p className="text-[#bbb] text-xs leading-relaxed mb-2">
                <strong>邏輯：</strong>Bus 1 的輸出會進入 Bus 2。
              </p>
              <p className="text-[#bbb] text-xs leading-relaxed mb-2">
                <strong>用途：</strong>適合現場表演，讓所有元素（包括 Bus 1 和 Input 效果）在進入 Bus 3/4 之前，都經過 Bus 2 的處理。
              </p>
              <div className="bg-orange-900/10 border-l-2 border-orange-500/50 pl-2 py-1 text-[11px] text-orange-300/90">
                <strong>範例：</strong>如果在 Bus 2 上設定了 DJ Effects Looper，所有聲音都會受到該效果的處理。
              </div>
            </div>
          </div>
        </div>

        {/* 乾訊號路由 */}
        <div className="bg-[#1a1a1a] border border-gray-600/40 rounded-lg p-4 mb-3">
          <h5 className="text-gray-300 font-semibold mb-3 text-xs flex items-center gap-2">
            <span className="bg-gray-600/20 px-2 py-0.5 rounded text-[10px]">2</span>
            乾訊號（Dry Samples）的路由
          </h5>
          
          <p className="text-[#bbb] text-xs leading-relaxed mb-2">
            未分配到 Bus 1 或 Bus 2 的取樣（白色的 Pad）預設可能是不進入 Bus 3 和 4（Dry）。
          </p>
          <div className="bg-blue-900/10 border-l-2 border-blue-500/50 pl-2 py-1.5 text-[11px] text-blue-300/90">
            <strong className="text-blue-400">💡 建議設定：</strong>為了確保所有聲音都經過母帶處理鏈，建議將乾訊號的路由切換到 <strong>Bus 3</strong>。
          </div>
        </div>

        {/* 輸入效果路由 */}
        <div className="bg-[#1a1a1a] border border-purple-600/40 rounded-lg p-4 mb-3">
          <h5 className="text-purple-400 font-semibold mb-3 text-xs flex items-center gap-2">
            <span className="bg-purple-600/20 px-2 py-0.5 rounded text-[10px]">3</span>
            輸入效果（Input Effect）的路由
          </h5>
          
          <p className="text-[#bbb] text-xs leading-relaxed mb-3">
            輸入效果處理來自外部訊號源的聲音。您可以按下 <strong className="text-purple-400">SHIFT + External Source</strong> 來調整輸入效果。
          </p>

          <div className="space-y-2">
            <div className="bg-[#141414] border-l-2 border-purple-500 p-2 rounded">
              <strong className="text-purple-300 text-xs">標準路由：</strong>
              <p className="text-[#bbb] text-xs mt-1">
                Input → Bus 1 → Bus 2 → Bus 3 → Bus 4
              </p>
            </div>

            <div className="bg-[#141414] border-l-2 border-purple-500 p-2 rounded">
              <strong className="text-purple-300 text-xs">自訂路由：</strong>
              <p className="text-[#bbb] text-xs mt-1 mb-2">
                您可以在 EFX 設定頁面中更改<strong>輸入 Bus（Input Bus）</strong>的設定。例如，您可以將其設定為 <strong>Bus 2</strong>。
              </p>
              <div className="bg-purple-900/10 pl-2 py-1 text-[11px] text-purple-300/90">
                <strong>應用情境：</strong>如果外部音源（如 Digitakt）進入 Bus 2，而 SP 內部的取樣使用 Bus 1，則 Bus 1 上的效果（例如 Reverb）只會處理 SP 內部的取樣，而來自外部訊源的聲音則不會被 Bus 1 處理。
              </div>
            </div>
          </div>
        </div>

        {/* 母帶處理建議設定 */}
        <div className="bg-[#1a1a1a] border border-cyan-600/40 rounded-lg p-4">
          <h5 className="text-cyan-400 font-semibold mb-3 text-xs flex items-center gap-2">
            <span className="bg-cyan-600/20 px-2 py-0.5 rounded text-[10px]">4</span>
            建議的 Bus 3 與 Bus 4 設定（Mastering）
          </h5>
          
          <p className="text-[#bbb] text-xs leading-relaxed mb-3">
            若將 Bus 3 和 Bus 4 用於長期母帶處理，以下是建議的流程：
          </p>

          <div className="space-y-3">
            <div className="bg-[#141414] border border-cyan-500/40 rounded p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-cyan-600/20 px-2 py-0.5 rounded text-xs text-cyan-400">Bus 3</span>
                <strong className="text-cyan-400 text-xs">Cassette Sim</strong>
              </div>
              <p className="text-[#bbb] text-xs leading-relaxed mb-2">
                <strong>目的：</strong>將聲音黏合（glue all the sound together）。
              </p>
              <div className="bg-cyan-900/10 border-l-2 border-cyan-500/50 pl-2 py-1.5 text-[11px] text-cyan-300/90">
                <strong>建議參數：</strong><br />
                • Drive 設定為 <strong>19 (±)</strong><br />
                • Wow and Flutter 設定為 <strong>36</strong>（讓音高有較多動態）<br />
                • Tone（調整低頻和高頻）或 Age（模擬音訊老化）可依需求調整<br />
                • 通常不使用 Catch
              </div>
            </div>

            <div className="bg-[#141414] border border-purple-500/40 rounded p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-purple-600/20 px-2 py-0.5 rounded text-xs text-purple-400">Bus 4</span>
                <strong className="text-purple-400 text-xs">303 Vinyl Sim 或 Compressor</strong>
              </div>
              <p className="text-[#bbb] text-xs leading-relaxed mb-2">
                <strong>目的：</strong>使用其內建的壓縮器功能。
              </p>
              <div className="bg-purple-900/10 border-l-2 border-purple-500/50 pl-2 py-1.5 text-[11px] text-purple-300/90">
                <strong>建議參數：</strong><br />
                • Compressor 通常設定為 <strong>50 或 60</strong>（取決於取樣的增益級別）<br />
                • Noise 建議設定為 <strong>0</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 快速操作指南 */}
      <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3 text-xs">
        <strong className="text-yellow-400">⚡ 快速操作指南</strong>
        <ul className="mt-2 space-y-1 text-yellow-200/80">
          <li>• <strong>REMAIN + Pad</strong>：設定 Sample 的 Bus 1/2 路由（<span className="text-orange-400">橙</span>/<span className="text-green-400">綠</span>/<span className="text-white">白</span> 色燈）</li>
          <li>• <strong>SHIFT + Pad 16</strong>：進入 Bus 3/4 設定頁面（母帶處理鏈）</li>
          <li>• <strong>SHIFT + External Source</strong>：調整輸入效果路由</li>
          <li>• <strong>EFX 設定頁面</strong>：切換串聯/並聯模式、調整乾訊號路由</li>
          <li>• <strong>REMAIN + BUS FX</strong>：交換 Bus 1 和 Bus 2 的效果器</li>
        </ul>
      </div>
    </div>
  );
};