import React from 'react';
import { ArrowLeft, Info, Zap, Lightbulb, ToggleLeft, BookOpen, Play, Music, Settings, Command, AlertTriangle, Target, Workflow, Download, FileText, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { ContentData, mfxEffects, hotspots, contentDB } from '../data/database';
import { GuideModule, guideModules, GuideModuleId } from '../types/guide';
import { GuideModuleCard } from './GuideModuleCard';
import { BusEffectsGuide } from './BusEffectsGuide';
import { enrichedContentDB, mergeEnrichedContent } from '../data/enriched-content';

interface InfoPanelProps {
  mode: 'guide' | 'detail';
  selectedId: string | null;
  selectedName: string;
  selectedCat: string;
  content: ContentData | null;
  onBack: () => void;
  onHotspotSelect: (id: string) => void;
  modalHotspotId: string | null;
  onCloseModal: () => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({
  mode,
  selectedId,
  selectedName,
  selectedCat,
  content,
  onBack,
  onHotspotSelect,
  modalHotspotId,
  onCloseModal,
}) => {
  return (
    <div className="w-[680px] flex-shrink-0 bg-[#1a1a1a] border-l border-[#333] flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.6)] z-30 relative">
      <div className="p-5 bg-gradient-to-b from-[#252525] to-[#1a1a1a] border-b border-[#333] flex-shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl text-white">
              SP-404MKII 操作懶人包
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {mode === 'detail' ? '按鈕詳細說明' : '選擇下方章節開始實作'}
            </p>
          </div>
          
          {/* 返回按鈕 - 右側 */}
          {mode === 'detail' && (
            <button
              onClick={onBack}
              className="bg-[#333] text-white px-4 py-2 rounded text-sm cursor-pointer flex items-center gap-2 transition-all duration-200 border border-[#444] hover:bg-orange-600 hover:border-orange-600 flex-shrink-0"
            >
              <ArrowLeft size={16} />
              返回指南
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {mode === 'guide' ? (
          <GuideModuleSelector onHotspotSelect={onHotspotSelect} />
        ) : (
          <DetailContent
            selectedId={selectedId}
            selectedName={selectedName}
            selectedCat={selectedCat}
            content={content}
            onBack={onBack}
          />
        )}
      </div>

      {/* 4/5 蓋板 Modal */}
      {modalHotspotId && <HotspotDetailModal hotspotId={modalHotspotId} onClose={onCloseModal} />}
    </div>
  );
};

interface GuideModuleSelectorProps {
  activeModule: GuideModuleId | null;
  onModuleClick: (id: GuideModuleId) => void;
  onBackToHome: () => void;
  onHotspotSelect: (id: string) => void;
}

const GuideModuleSelector: React.FC<GuideModuleSelectorProps> = ({ onHotspotSelect }) => {
  const [modalModuleId, setModalModuleId] = React.useState<GuideModuleId | null>(null);
  const [isOfficialResourcesOpen, setIsOfficialResourcesOpen] = React.useState(false);

  // 首頁：顯示主要模組卡片（前8個）
  const mainModules = guideModules.slice(0, 8);

  const handleModuleClick = (id: GuideModuleId) => {
    setModalModuleId(id);
  };

  const handleCloseModal = () => {
    setModalModuleId(null);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!modalModuleId) return;
    const currentIndex = guideModules.findIndex(m => m.id === modalModuleId);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + guideModules.length) % guideModules.length
      : (currentIndex + 1) % guideModules.length;
    
    setModalModuleId(guideModules[newIndex].id);
  };

  return (
    <div className="p-5">
      <div className="mb-4">
        <h2 className="text-white text-lg font-bold mb-1">
          📖 學習指南
        </h2>
        <p className="text-xs text-[#aaa] leading-relaxed">
          點擊章節展開內容，或點擊左側機器上的按鈕查看詳細說明。
        </p>
      </div>

      {/* 所有模組 */}
      <div className="grid grid-cols-1 gap-2.5">
        {mainModules.map(module => (
          <GuideModuleCard
            key={module.id}
            module={module}
            isActive={false}
            onClick={() => handleModuleClick(module.id)}
          />
        ))}
      </div>

      {/* Roland 官方資源 - 可收折 */}
      <div className="mt-2.5">
        <div
          onClick={() => setIsOfficialResourcesOpen(!isOfficialResourcesOpen)}
          className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 hover:from-blue-900/30 hover:to-blue-800/20 border border-blue-600/30 rounded-lg p-3.5 cursor-pointer transition-all duration-200 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/30 to-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-blue-600/40 group-hover:to-blue-500/30 transition-all">
                <Download size={20} className="text-blue-400" />
              </div>
              <div>
                <div className="text-white font-bold text-base group-hover:text-blue-300 transition-colors">
                  Roland 官方資源
                </div>
                <div className="text-xs text-blue-400/60 mt-0.5">
                  軟體更新、教學手冊、操作說明
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isOfficialResourcesOpen ? (
                <ChevronUp size={20} className="text-blue-400 group-hover:text-blue-300" />
              ) : (
                <ChevronDown size={20} className="text-blue-400 group-hover:text-blue-300" />
              )}
            </div>
          </div>
        </div>

        {/* 展開內容 */}
        {isOfficialResourcesOpen && (
          <div className="mt-2 bg-[#1a1a1a] border border-blue-600/20 rounded-lg p-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* 軟體更新 */}
            <a
              href="https://www.roland.com/global/support/by_product/sp-404mk2/updates_drivers/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[#151515] hover:bg-[#202020] border border-blue-600/20 hover:border-blue-500/40 rounded-lg p-3 transition-all duration-200 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <Download size={16} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold group-hover:text-blue-400 transition-colors">軟體更新下載</div>
                  <div className="text-xs text-[#888]">System Program Updates</div>
                </div>
              </div>
              <ExternalLink size={14} className="text-blue-500/60 group-hover:text-blue-400 transition-colors" />
            </a>

            {/* 更新教學 */}
            <a
              href="https://support.roland.com/hc/en-us/articles/4409641783579-SP-404MK2-System-Program-Version-Update"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[#151515] hover:bg-[#202020] border border-cyan-600/20 hover:border-cyan-500/40 rounded-lg p-3 transition-all duration-200 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-cyan-600/20 flex items-center justify-center flex-shrink-0">
                  <Settings size={16} className="text-cyan-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold group-hover:text-cyan-400 transition-colors">更新安裝教學</div>
                  <div className="text-xs text-[#888]">Update Instructions</div>
                </div>
              </div>
              <ExternalLink size={14} className="text-cyan-500/60 group-hover:text-cyan-400 transition-colors" />
            </a>

            {/* 操作手冊 */}
            <a
              href="https://tw.roland.com/support/by_product/sp-404mk2/owners_manuals"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[#151515] hover:bg-[#202020] border border-orange-600/20 hover:border-orange-500/40 rounded-lg p-3 transition-all duration-200 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-orange-600/20 flex items-center justify-center flex-shrink-0">
                  <FileText size={16} className="text-orange-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold group-hover:text-orange-400 transition-colors">操作手冊 PDF</div>
                  <div className="text-xs text-[#888]">Owner's Manual</div>
                </div>
              </div>
              <ExternalLink size={14} className="text-orange-500/60 group-hover:text-orange-400 transition-colors" />
            </a>

            {/* 提示 */}
            <div className="mt-3 pt-3 border-t border-blue-600/20">
              <p className="text-xs text-blue-300/60 leading-relaxed">
                💡 建議定期檢查軟體更新以獲得最新功能與錯誤修正
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 模組詳細蓋板 */}
      {modalModuleId && (
        <ModuleDetailModal
          moduleId={modalModuleId}
          onClose={handleCloseModal}
          onNavigate={handleNavigate}
          onHotspotSelect={onHotspotSelect}
        />
      )}
    </div>
  );
};

// 模組內容渲染
interface ModuleContentProps {
  moduleId: GuideModuleId;
  onBack: () => void;
  onModuleClick: (id: GuideModuleId) => void;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ moduleId, onBack, onModuleClick }) => {
  const module = guideModules.find(m => m.id === moduleId);
  
  return (
    <div className="p-6">
      <div className="mb-5">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl">{module?.icon}</span>
          <div>
            <h2 className="text-white text-2xl font-bold">{module?.title}</h2>
            <p className="text-sm text-[#aaa] mt-2">{module?.description}</p>
          </div>
        </div>
      </div>

      <div className="text-[#ccc] leading-relaxed text-sm">
        {moduleId === 'quickstart' && <QuickstartContent />}
        {moduleId === 'controls' && <ControlsContent />}
        {moduleId === 'effects' && <EffectsContent />}
        {moduleId === 'shortcuts' && <ShortcutsOverviewContent onModuleClick={onModuleClick} />}
        {moduleId === 'shortcuts-shift' && <ShortcutsShiftContent />}
        {moduleId === 'shortcuts-remain' && <ShortcutsRemainContent />}
        {moduleId === 'shortcuts-value' && <ShortcutsValueContent />}
        {moduleId === 'shortcuts-other' && <ShortcutsOtherContent />}
        {moduleId === 'sampling' && <SamplingContent />}
        {moduleId === 'pattern' && <PatternContent />}
        {moduleId === 'tips' && <TipsContent />}
        {moduleId === 'index' && <IndexContent onHotspotSelect={onHotspotSelect} />}
      </div>
    </div>
  );
};

// ========== 模組內容組件 ==========

const QuickstartContent = () => (
  <div className="space-y-5">
    {/* 基本概念 */}
    <div>
      <h3 className="text-orange-400 text-lg font-bold mb-3 pb-2 border-b border-[#444]">📚 基本概念</h3>
      
      <div className="bg-[#232323] border border-[#333] rounded-lg p-4 mb-4">
        <h4 className="text-white text-base font-semibold mb-3">資料組織架構</h4>
        <ul className="space-y-2.5 text-sm">
          <li className="border-l-2 border-orange-600 pl-2">
            <strong className="text-orange-400">Sample（取樣）</strong>：錄下的聲音檔案，加上設定（如Loop循環、效果器）。想像成一塊聲音「磚塊」，可以分配到按鍵上播放。
          </li>
          <li className="border-l-2 border-blue-400 pl-2">
            <strong className="text-blue-400">Bank（取樣庫）</strong>：16個Sample的集合。共有10個Bank（A-J），按Bank鍵切換。
          </li>
          <li className="border-l-2 border-green-400 pl-2">
            <strong className="text-green-400">Pattern（樂段）</strong>：用Sample組合成的歌曲序列。可以即時錄音或步進式編輯。
          </li>
          <li className="border-l-2 border-purple-400 pl-2">
            <strong className="text-purple-400">Project（專案）</strong>：整個作品檔，包括所有Bank、Sample、Pattern、設定。儲存在SD卡上。
          </li>
        </ul>
      </div>

      <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4 text-sm">
        <strong className="text-yellow-400">⚠️ 重要提醒</strong>
        <ul className="mt-2 space-y-1.5 text-yellow-200/80">
          <li>• 機器使用SD卡儲存資料，無SD卡無法儲存Project</li>
          <li>• 音量從小調起，避免損壞耳朵或喇叭</li>
          <li>• 總是備份Project，使用Protect功能防止誤刪</li>
        </ul>
      </div>
    </div>

    {/* 快速上手步驟 */}
    <div>
      <h3 className="text-orange-400 text-lg font-bold mb-3 pb-2 border-b border-[#444]">⚡ 快速上手步驟</h3>
      
      <div className="space-y-4">
    {[
      {
        title: '步驟 1：準備與開機',
        steps: [
          '連接設備：插SD卡、電源、耳機/喇叭',
          '按電源鍵開機，選擇Project',
          '初次使用：格式化SD卡（Utility > Format SD）'
        ]
      },
      {
        title: '步驟 2：播放Sample（Sample Mode）',
        steps: [
          '選Bank：按Bank鍵（A-J）',
          '按Pad [1-16]播放預設音色',
          '調整：BPM Sync（同步速度）、Loop（循環）、Gate（按住播放）'
        ]
      },
      {
        title: '步驟 3：錄音取樣',
        steps: [
          '按REC進入Record Setting',
          '設定輸入源（麥克風/樂器/USB）',
          '再按REC開始錄音，按END結束',
          '使用RESAMPLE可將播放+效果錄回機器'
        ]
      },
      {
        title: '步驟 4：編輯Sample',
        steps: [
          'START/END：設定播放起訖點',
          'MARK：加標記點，SHIFT + START/END = Chop分割',
          'PITCH/SPEED：調整音高/速度',
          'SHIFT + PITCH/SPEED：Envelope（淡入/淡出）'
        ]
      },
      {
        title: '步驟 5：製作Pattern（歌曲）',
        steps: [
          '按PATTERN SELECT進入Pattern模式',
          '即時錄：按REC，播放Pad錄製演奏',
          '步進錄：SHIFT + REC進入TR-REC模式',
          '可將Pattern Resample成新Sample'
        ]
      }
    ].map((section, idx) => (
      <div key={idx} className="bg-[#1e1e1e] border-l-4 border-orange-600 p-4 rounded">
        <h3 className="text-white text-base font-semibold mb-2">{section.title}</h3>
        <ol className="list-decimal list-inside text-sm space-y-1.5 text-[#bbb]">
          {section.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    ))}
      </div>
    </div>
  </div>
);

const ControlsContent = ({ onHotspotSelect }: { onHotspotSelect?: (id: string) => void }) => {
  // 可點擊的按鈕組件
  const ClickableButton: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
    if (!onHotspotSelect) return <strong>{children}</strong>;
    
    return (
      <strong 
        className="text-orange-400 cursor-pointer hover:text-orange-300 hover:underline transition-colors"
        onClick={() => onHotspotSelect(id)}
      >
        {children}
      </strong>
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-white text-base font-semibold mt-4 mb-2">音量與參數控制</h3>
        <ul className="list-disc pl-5 mb-3 text-sm space-y-1.5">
          <li><ClickableButton id="vol">VOLUME</ClickableButton>: 總音量控制（類比衰減器）</li>
          <li><ClickableButton id="c1">CTRL 1</ClickableButton> / <ClickableButton id="c2">CTRL 2</ClickableButton> / <ClickableButton id="c3">CTRL 3</ClickableButton>: 多功能參數旋鈕（Filter, Resonance, Drive）</li>
          <li><ClickableButton id="enc">VALUE輪盤</ClickableButton>: 核心導航控制器，轉動選擇、按下確認</li>
        </ul>
      </div>

      <div>
        <h3 className="text-white text-base font-semibold mt-4 mb-2">效果器區</h3>
        <ul className="list-disc pl-5 mb-3 text-sm space-y-1.5">
          <li><ClickableButton id="fx_mfx">MFX</ClickableButton>: 42 種多重效果器（Vinyl Sim, Cassette, Scatter等）</li>
          <li><ClickableButton id="fx_filt">FILTER+DRIVE</ClickableButton>: 經典濾波器與破音效果</li>
          <li><ClickableButton id="fx_delay">DELAY</ClickableButton>: 延遲回音效果</li>
          <li><ClickableButton id="fx_reso">RESONATOR</ClickableButton>: 共鳴器效果</li>
          <li><ClickableButton id="fx_iso">ISOLATOR</ClickableButton>: 頻率隔離器（DJ EQ）</li>
          <li><ClickableButton id="fx_djfx">DJFX LOOPER</ClickableButton>: DJ 風格循環效果</li>
        </ul>
      </div>

      <div>
        <h3 className="text-white text-base font-semibold mt-4 mb-2">錄音與編輯</h3>
        <ul className="list-disc pl-5 mb-3 text-sm space-y-1.5">
          <li><ClickableButton id="rec">REC</ClickableButton>: 錄音（SHIFT+REC = TR-REC 步進模式）</li>
          <li><ClickableButton id="res">RESAMPLE</ClickableButton>: 重新取樣（核心工作流！）</li>
          <li><ClickableButton id="st_end">START/END</ClickableButton>: 設定取樣起訖點</li>
          <li><ClickableButton id="pitch">PITCH/SPEED</ClickableButton>: 音高與速度調整</li>
          <li><ClickableButton id="mark">MARK</ClickableButton>: 標記波形切點</li>
        </ul>
      </div>

      <div>
        <h3 className="text-white text-base font-semibold mt-4 mb-2">表演功能</h3>
        <ul className="list-disc pl-5 mb-3 text-sm space-y-1.5">
          <li><ClickableButton id="roll">ROLL</ClickableButton>: 滾奏效果（Hi-hat rolls）</li>
          <li><ClickableButton id="loop">LOOP</ClickableButton>: 循環播放</li>
          <li><ClickableButton id="rev">REVERSE</ClickableButton>: 倒��播放 / Pad Mute</li>
          <li><ClickableButton id="gate">GATE</ClickableButton>: 門限播放模式（按住播放）</li>
          <li><ClickableButton id="hold">HOLD</ClickableButton>: 鎖定播放（無限延音）</li>
          <li><ClickableButton id="bpm">BPM SYNC</ClickableButton>: 速度同步至Project BPM</li>
        </ul>
      </div>
    </div>
  );
};

const EffectsContent = () => (
  <div className="space-y-4">
    <h3 className="text-white text-base font-semibold mb-3">效果器系統概覽</h3>
    <ul className="list-disc pl-5 mb-4 text-sm space-y-1.5">
      <li><strong>MFX</strong>: 42 種多重效果器（下方完整列表）</li>
      <li><strong>FILTER+DRIVE</strong>: 經典濾波器與破音效果</li>
      <li><strong>DELAY</strong>: 延遲回音效果</li>
      <li><strong>RESONATOR</strong>: 共鳴器效果</li>
      <li><strong>ISOLATOR</strong>: 頻率隔離器（DJ EQ）</li>
      <li><strong>DJFX LOOPER</strong>: DJ 風格循環效果（也是 MFX #42）</li>
    </ul>

    <BusEffectsGuide />

    {/* 42 種 MFX 效果完整列表 */}
    <div className="mt-6">
      <h3 className="text-orange-400 text-lg font-bold mb-4 pb-2 border-b border-[#444]">🎵 MFX 效果器完整列表（42 種 - 按字母排序）</h3>
      
      <div className="grid grid-cols-1 gap-3">
        {mfxEffects.map((mfx) => (
          <div
            key={mfx.num}
            className="bg-[#181818] p-4 rounded-lg border border-[#333] transition-all duration-200 hover:border-orange-600 hover:bg-[#222]"
          >
            {/* 標題行 */}
            <div className="flex justify-between items-center mb-2">
              <div className="text-white font-semibold text-base">
                <span className="text-orange-600 font-mono mr-2 opacity-80">#{mfx.num}</span>
                {mfx.name}
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#333] text-[#999] uppercase font-bold">
                {mfx.cat}
              </span>
            </div>
            
            {/* 效果描述 */}
            <div className="text-[#aaa] text-sm leading-relaxed mb-3">
              {mfx.desc}
            </div>

            {/* 調整建議 */}
            {mfx.tips && (
              <div className="bg-blue-900/10 border-l-2 border-blue-500/50 pl-2 py-1.5 mb-1.5 text-sm text-blue-300/90">
                <span className="text-blue-400 font-semibold">💡 調整：</span> {mfx.tips}
              </div>
            )}
            
            {/* 適合曲風 */}
            {mfx.genre && (
              <div className="flex items-center gap-1.5 text-sm">
                <span className="text-[#666] font-semibold">🎵</span>
                <span className="text-[#888]">{mfx.genre}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ShortcutsOverviewContent = ({ onModuleClick }: { onModuleClick: (id: GuideModuleId) => void }) => {
  const [expandedShortcut, setExpandedShortcut] = React.useState<GuideModuleId | null>(null);

  const shortcutCategories = [
    { id: 'shortcuts-shift' as GuideModuleId, icon: '🔀', title: 'SHIFT', desc: '35+ 組合鍵', colorClass: 'orange' },
    { id: 'shortcuts-remain' as GuideModuleId, icon: '🎚️', title: 'REMAIN', desc: 'Bus 路由', colorClass: 'blue' },
    { id: 'shortcuts-value' as GuideModuleId, icon: '🎯', title: 'VALUE', desc: '靜音選擇', colorClass: 'green' },
    { id: 'shortcuts-other' as GuideModuleId, icon: '🚀', title: '進階', desc: 'DJ / TR-REC', colorClass: 'purple' },
  ];

  const toggleShortcut = (id: GuideModuleId) => {
    setExpandedShortcut(expandedShortcut === id ? null : id);
  };

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      orange: {
        bg: 'from-orange-600/10 to-orange-500/5',
        border: isActive ? 'border-orange-600' : 'border-orange-600/30',
        hoverBg: 'hover:from-orange-600/20 hover:to-orange-500/10',
        hoverBorder: 'hover:border-orange-600',
        text: 'text-orange-400',
        hoverText: 'group-hover:text-orange-300'
      },
      blue: {
        bg: 'from-blue-600/10 to-blue-500/5',
        border: isActive ? 'border-blue-600' : 'border-blue-600/30',
        hoverBg: 'hover:from-blue-600/20 hover:to-blue-500/10',
        hoverBorder: 'hover:border-blue-600',
        text: 'text-blue-400',
        hoverText: 'group-hover:text-blue-300'
      },
      green: {
        bg: 'from-green-600/10 to-green-500/5',
        border: isActive ? 'border-green-600' : 'border-green-600/30',
        hoverBg: 'hover:from-green-600/20 hover:to-green-500/10',
        hoverBorder: 'hover:border-green-600',
        text: 'text-green-400',
        hoverText: 'group-hover:text-green-300'
      },
      purple: {
        bg: 'from-purple-600/10 to-purple-500/5',
        border: isActive ? 'border-purple-600' : 'border-purple-600/30',
        hoverBg: 'hover:from-purple-600/20 hover:to-purple-500/10',
        hoverBorder: 'hover:border-purple-600',
        text: 'text-purple-400',
        hoverText: 'group-hover:text-purple-300'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div>
      <p className="mb-4 text-sm text-[#bbb]">
        SP-404MKII 提供豐富的快捷鍵組合，讓你在不進入選單的情況下快速存取功能。點擊下方按鈕查看詳細說明：
      </p>
      
      <div className="grid grid-cols-1 gap-3">
        {shortcutCategories.map((category) => {
          const isActive = expandedShortcut === category.id;
          const colors = getColorClasses(category.colorClass, isActive);
          
          return (
            <div key={category.id}>
              <button
                onClick={() => toggleShortcut(category.id)}
                className={`w-full bg-gradient-to-r ${colors.bg} border ${colors.border} rounded-lg p-3 text-left transition-all duration-200 ${colors.hoverBorder} ${colors.hoverBg} cursor-pointer group`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <div>
                      <div className={`${colors.text} text-sm font-bold ${colors.hoverText}`}>
                        {category.title}
                      </div>
                      <div className="text-sm text-[#999]">{category.desc}</div>
                    </div>
                  </div>
                  <div className={`${colors.text} transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}>
                    ▼
                  </div>
                </div>
              </button>

              {/* 風琴式展開內容 */}
              {isActive && (
                <div className="mt-2 ml-1 p-4 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg animate-fadeIn">
                  {category.id === 'shortcuts-shift' && <ShortcutsShiftContent />}
                  {category.id === 'shortcuts-remain' && <ShortcutsRemainContent />}
                  {category.id === 'shortcuts-value' && <ShortcutsValueContent />}
                  {category.id === 'shortcuts-other' && <ShortcutsOtherContent />}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-orange-900/20 to-orange-800/10 border border-orange-700/30 rounded-lg p-4 mt-5 text-sm">
        <strong className="text-orange-400">💡 快捷鍵學習建議</strong>
        <ul className="mt-2 space-y-1.5 text-orange-200/80 text-sm">
          <li>• 先熟記 SHIFT + Pad 1-16 的功能，這是最常用的</li>
          <li>• REMAIN + Pad 控制效果路由，這是進階音色設計的關鍵</li>
          <li>• VALUE + Pad 靜音選擇，編輯時超好用</li>
          <li>• SHIFT + EXIT 是緊急停止鍵，現場表演必備</li>
        </ul>
      </div>
    </div>
  );
};

const ShortcutsShiftContent = () => (
  <div className="space-y-2 text-sm">
    <p className="mb-4 text-[#bbb]">
      按住 <strong className="text-orange-400">SHIFT</strong> 鍵可以啟用所有按鈕下方的次要功能（橘色標示）。以下是完整列表：
    </p>
    
    <div className="grid grid-cols-1 gap-2">
      <ShortcutItem keys="SHIFT + Pad 1" desc="FIXED VELOCITY - 固定力度 127 播放" />
      <ShortcutItem keys="SHIFT + Pad 2" desc="VELOCITY - 步進改變力度" />
      <ShortcutItem keys="SHIFT + Pad 3" desc="CUE - 調整耳機監聽平衡" />
      <ShortcutItem keys="SHIFT + Pad 4" desc="CHROMATIC - 半音階模式（音階演奏）" highlight />
      <ShortcutItem keys="SHIFT + Pad 5" desc="EXCHANGE - 交換 Pad 資料" />
      <ShortcutItem keys="SHIFT + Pad 6" desc="INIT PARAM - 初始化參數" />
      <ShortcutItem keys="SHIFT + Pad 7" desc="PAD LINK - 群組同時播放" />
      <ShortcutItem keys="SHIFT + Pad 8" desc="MUTE GROUP - 互斥群組設定" />
      <ShortcutItem keys="SHIFT + Pad 9" desc="METRONOME - 開關節拍器" highlight />
      <ShortcutItem keys="SHIFT + Pad 10" desc="COUNT-IN - 加入預備拍" />
      <ShortcutItem keys="SHIFT + Pad 11" desc="TAP TEMPO - 敲擊設定 BPM" highlight />
      <ShortcutItem keys="SHIFT + Pad 12" desc="GAIN - 顯示增益選單" />
      <ShortcutItem keys="SHIFT + Pad 13" desc="UTILITY - 進入系統選單" highlight />
      <ShortcutItem keys="SHIFT + Pad 14" desc="IMPORT/EXPORT - 匯入匯出選單" />
      <ShortcutItem keys="SHIFT + Pad 15" desc="PAD SETTING - Pad 設定" />
      <ShortcutItem keys="SHIFT + Pad 16" desc="EFX SETTING - 效果器設定" />
      <div className="h-px bg-[#333] my-2" />
      <ShortcutItem keys="SHIFT + BUS FX" desc="MUTE BUS - 僅輸出效果聲（暫時關閉原音）" />
      <ShortcutItem keys="SHIFT + HOLD" desc="PAUSE - 暫停播放" />
      <ShortcutItem keys="SHIFT + EXT SOURCE" desc="INPUT SETTING - 輸入設定畫面" />
      <ShortcutItem keys="SHIFT + SUB PAD" desc="PROJECT - 選擇專案" />
      <ShortcutItem keys="SHIFT + MARK (3秒)" desc="SAVE EFX PARAM - 儲存效果器參數" />
      <ShortcutItem keys="SHIFT + PITCH/SPEED" desc="ENVELOPE - 淡入淡出設定（ADSR）" highlight />
      <ShortcutItem keys="SHIFT + START/END" desc="CHOP - 自動切片至 16 個 Pad" highlight />
      <ShortcutItem keys="SHIFT + PATTERN SELECT" desc="UNDO - 撤銷錄音" />
      <ShortcutItem keys="SHIFT + ROLL" desc="ROLL SET - 設定滾奏間隔" />
      <ShortcutItem keys="SHIFT + REVERSE + Pad" desc="PAD MUTE - 開關 Pad 靜音" />
      <ShortcutItem keys="SHIFT + REVERSE + REMAIN" desc="PAD MUTE MODE - 鎖定靜音模式" />
      <ShortcutItem keys="SHIFT + LOOP" desc="PING-PONG LOOP - 來回循環" />
      <ShortcutItem keys="SHIFT + GATE" desc="GATE ALL ON/OFF - 全 Bank Gate 開關" />
      <ShortcutItem keys="SHIFT + BPM SYNC" desc="SYNC ALL ON/OFF - 全 Bank 同步開關" />
      <ShortcutItem keys="SHIFT + REC" desc="TR-REC - 步進錄音模式" highlight />
      <ShortcutItem keys="SHIFT + Bank 鍵" desc="BANK VOLUME - 調整 Bank 音量" />
      <ShortcutItem keys="SHIFT + REMAIN (3秒)" desc="LIVE MODE - 鎖定不常用鍵" />
      <ShortcutItem keys="SHIFT + COPY" desc="BANK PROTECT - 保護 Bank 防誤刪" />
      <ShortcutItem keys="SHIFT + EXIT" desc="STOP - 緊急停止所有聲音" highlight />
    </div>
  </div>
);

const ShortcutsRemainContent = () => (
  <div className="space-y-2 text-sm">
    <p className="mb-3 text-[#bbb]">
      <strong className="text-blue-400">REMAIN</strong> 鍵主要用於 Bus 路由設定和同時編輯多個 Sample。
    </p>
    
    <div className="grid grid-cols-1 gap-1.5">
      <ShortcutItem keys="REMAIN + Pad 1-16" desc="設定 Sample 的 Bus 路由（橘=Bus1, 綠=Bus2, 白=Dry）" highlight />
      <ShortcutItem keys="REMAIN + Bank 鍵" desc="設定整個 Bank 的 Bus Send" />
      <ShortcutItem keys="REMAIN + MFX" desc="鎖定效果器編輯畫面" />
      <ShortcutItem keys="REMAIN + BUS FX" desc="交換 Bus 1 和 Bus 2 的效果器" />
      <ShortcutItem keys="REMAIN + 編輯參數" desc="同時編輯多個 Sample（Pitch/Speed/Envelope 畫面）" highlight />
    </div>

    <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 mt-4 text-sm">
      <strong className="text-blue-400">💡 Bus 路由工作流</strong>
      <p className="mt-2 text-blue-200/80">
        按住 REMAIN 鍵，然後按 Pad 1-16，觀察 Pad 燈號：<br />
        • 橘色：Sample 送至 Bus 1<br />
        • 綠色：Sample 送至 Bus 2<br />
        • 白色：Dry（不經過效果器）<br />
        <br />
        這讓你可以靈活控制哪些 Sample 使用哪種效果器！
      </p>
    </div>
  </div>
);

const ShortcutsValueContent = () => (
  <div className="space-y-2 text-sm">
    <p className="mb-3 text-[#bbb]">
      按住 <strong className="text-green-400">VALUE</strong> 輪盤（中間的大旋鈕）可以啟用以下功能：
    </p>
    
    <div className="grid grid-cols-1 gap-1.5">
      <ShortcutItem keys="VALUE + Pad 1-16" desc="選擇 Sample 不播放（靜音選擇）" highlight />
      <ShortcutItem keys="VALUE + BUS FX" desc="暫時 Bypass Bus 3/4" />
      <ShortcutItem keys="VALUE + SUB PAD" desc="最小延遲多 Pad 播放" />
      <ShortcutItem keys="VALUE + 效果器鍵" desc="Effect Grab（僅按住時應用效果）" highlight />
      <ShortcutItem keys="VALUE + GATE" desc="One-Shot 單次播放模式開關" />
    </div>

    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3 mt-4 text-sm">
      <strong className="text-green-400">💡 Effect Grab 技巧</strong>
      <p className="mt-2 text-green-200/80">
        按住 VALUE + MFX（或其他效果器鍵），效果只在你按住時啟用。<br />
        放開鍵盤，效果立刻停止。<br />
        <br />
        這在現場表演時非常實用，可以即興添加效果！
      </p>
    </div>
  </div>
);

const ShortcutsOtherContent = () => (
  <div className="space-y-4 text-sm">
    <div>
      <h4 className="text-white font-semibold mb-2">MFX 快捷鍵</h4>
      <div className="grid grid-cols-1 gap-1.5">
        <ShortcutItem keys="MFX + DJFX LOOPER" desc="跳至 MFX 列表 #17~" />
        <ShortcutItem keys="MFX + ISOLATOR" desc="跳至 MFX 列表 #33~" />
      </div>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-2">DEL 快捷鍵（小心使用）</h4>
      <div className="grid grid-cols-1 gap-1.5">
        <ShortcutItem keys="DEL + MARK" desc="刪除 Pattern 的效果器動作（Motion）" />
        <ShortcutItem keys="DEL + REVERSE" desc="刪除 Pattern 的 Pad Mute 動作" />
        <ShortcutItem keys="DEL + EXIT" desc="刪除整個 Bank（不可復原！）" danger />
      </div>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-2">COPY 快捷鍵</h4>
      <div className="grid grid-cols-1 gap-1.5">
        <ShortcutItem keys="COPY + 編輯參數" desc="同時編輯 Mute Group 的多個 Sample" />
        <ShortcutItem keys="COPY + EXIT" desc="複製整個 Bank" />
      </div>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-2">DJ 模式專用（精選）</h4>
      <div className="grid grid-cols-1 gap-1.5">
        <ShortcutItem keys="SHIFT + REVERSE + Pad 13/15" desc="CH1/CH2 靜音" />
        <ShortcutItem keys="SHIFT + Pad 1-16" desc="從標記點播放" />
        <ShortcutItem keys="SHIFT + REMAIN" desc="鎖定 SHIFT（方便選標記）" />
        <ShortcutItem keys="ROLL + Pad 13/15" desc="CH1/CH2 Roll" />
        <ShortcutItem keys="REMAIN + Pad 14/16" desc="切換 CH1/CH2 Bus FX" />
        <ShortcutItem keys="RESAMPLE + VALUE" desc="選擇音量曲線" />
      </div>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-2">TR-REC 步進錄音模式</h4>
      <div className="grid grid-cols-1 gap-1.5">
        <ShortcutItem keys="DEL + A/F" desc="刪除一小節音符（單 Pad）" />
        <ShortcutItem keys="DEL + B/G" desc="刪除一小節音符（全 Pad）" />
        <ShortcutItem keys="ROLL + CTRL 1/2/3" desc="錄製旋鈕動作（Motion）" />
        <ShortcutItem keys="VALUE + SUB PAD + Pad" desc="選擇不播放" />
      </div>
    </div>
  </div>
);

const SamplingContent = () => (
  <div className="space-y-5">
    {/* 一、取樣前置作業 */}
    <div>
      <h3 className="text-pink-400 text-lg font-bold mb-3 pb-2 border-b border-[#444]">📋 一、取樣前置作業</h3>
      
      <div className="space-y-4">
        {/* SD 卡準備 */}
        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <span className="text-orange-400">💾</span> SD 卡準備
          </h4>
          <p className="text-[#bbb] text-sm leading-relaxed">
            建議使用 <strong className="text-orange-400">32 GB 的 SD 卡</strong>，不要使用超過 32 GB 的卡片。SD 卡主要用於儲存取樣文件（例如鼓組 One-shots）。
          </p>
        </div>

        {/* 設定專案 BPM */}
        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <span className="text-blue-400">🎵</span> 設定專案 BPM
          </h4>
          <p className="text-[#bbb] text-sm leading-relaxed mb-2">
            在開始匯入或錄製取樣之前，建議先設定專案的 BPM (Beats Per Minute)。
          </p>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3 space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-orange-400 font-mono text-xs bg-[#333] px-2 py-1 rounded">操作</span>
              <span className="text-[#ccc]">進入 <strong className="text-orange-400">SHIFT + Tap Tempo</strong></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400 font-mono text-xs bg-[#333] px-2 py-1 rounded">調整</span>
              <span className="text-[#ccc]">可選擇只更改當前 Bank 的 BPM，或更改整個專案的 BPM</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400 font-mono text-xs bg-[#333] px-2 py-1 rounded">目的</span>
              <span className="text-[#ccc]">預先設定數值有助於預估</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* 二、匯入取樣 */}
    <div>
      <h3 className="text-pink-400 text-lg font-bold mb-3 pb-2 border-b border-[#444]">📥 二、匯入取樣（One-shots）</h3>
      
      <p className="text-[#bbb] text-sm mb-3">匯入 One-shots（單一鼓聲或單一音效）的流程：</p>
      
      <div className="space-y-2">
        <div className="bg-[#232323] border-l-2 border-orange-600 p-3 rounded-r">
          <div className="text-orange-400 font-semibold text-sm mb-1">步驟 1：進入匯入介面</div>
          <div className="text-[#bbb] text-sm">按下 <strong className="text-orange-400">SHIFT + Pad 14</strong></div>
        </div>
        <div className="bg-[#232323] border-l-2 border-blue-600 p-3 rounded-r">
          <div className="text-blue-400 font-semibold text-sm mb-1">步驟 2：選擇來源</div>
          <div className="text-[#bbb] text-sm">選擇「Import from SD Card」</div>
        </div>
        <div className="bg-[#232323] border-l-2 border-green-600 p-3 rounded-r">
          <div className="text-green-400 font-semibold text-sm mb-1">步驟 3：瀏覽文件</div>
          <div className="text-[#bbb] text-sm">進入 SD 卡的資料夾（例如 samples），找到您要匯入的音效</div>
        </div>
        <div className="bg-[#232323] border-l-2 border-purple-600 p-3 rounded-r">
          <div className="text-purple-400 font-semibold text-sm mb-1">步驟 4：試聽與載入</div>
          <div className="text-[#bbb] text-sm space-y-1">
            <div>• 按下 <strong className="text-purple-400">Subpad</strong> 可以試聽不同的音效</div>
            <div>• 選擇喜歡的音效後，點選您想要放置的 Pad，然後按下 <strong className="text-purple-400">Enter</strong> 即可載入</div>
          </div>
        </div>
        <div className="bg-[#232323] border-l-2 border-cyan-600 p-3 rounded-r">
          <div className="text-cyan-400 font-semibold text-sm mb-1">步驟 5：持續匯入</div>
          <div className="text-[#bbb] text-sm">在最新更新中（例如 1.14 版本），完成一次載入後，系統會停留在匯入選單，您可以繼��試聽和���入其他音效</div>
        </div>
      </div>
    </div>

    {/* 三、錄製取樣 */}
    <div>
      <h3 className="text-pink-400 text-lg font-bold mb-3 pb-2 border-b border-[#444]">🎙️ 三、錄製取樣（長旋律或音軌）</h3>
      
      <p className="text-[#bbb] text-sm mb-3">若要錄製來自外部來源（如電腦或唱盤）的長取樣，通常用於旋律片段或長音軌：</p>
      
      <div className="space-y-3">
        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 text-sm">連接設置與接收訊號</h4>
          <ul className="space-y-2 text-sm text-[#bbb]">
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">1.</span>
              <span>將 SP-404 MK2 透過 USB-C 連接到電腦，並將電腦的音訊輸出設置為 404 MK2</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">2.</span>
              <span>按下 <strong className="text-blue-400">External Source</strong>，這樣電腦播放的任何聲音都可以被錄製到 404 中</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 text-sm">調整錄音增益</h4>
          <ul className="space-y-2 text-sm text-[#bbb]">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              <span>按下 <strong className="text-green-400">Record</strong>，錄音電平選單會彈出</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              <span>可將增益調到最高 127，或根據需求調低</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 text-sm">選擇 Pad 與組織建議</h4>
          <p className="text-[#bbb] text-sm mb-2">閃爍的紅色 Pad 表示該 Pad 可用於錄音。</p>
          <div className="bg-blue-900/20 border border-blue-700/30 rounded p-3 text-sm text-blue-200/90">
            <strong className="text-blue-400">💡 組織建議：</strong> 建議將長的旋律取樣放在一個 Bank（例如 Bank H），而後續的切片（Chops）則放在另一個 Bank（例如 Bank C），以便於組織管理。
          </div>
        </div>

        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 text-sm">開始錄製與保存</h4>
          <ul className="space-y-2 text-sm text-[#bbb]">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">1.</span>
              <span>選擇一個空白 Pad，它會等待訊號達到門檻後自動開始錄音</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">2.</span>
              <span>按下 Play，音訊就會開始錄入</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">3.</span>
              <span>再次按下 <strong className="text-purple-400">Record</strong> 即可保存取樣</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* 四、取樣編輯與裁切 */}
    <div>
      <h3 className="text-pink-400 text-lg font-bold mb-3 pb-2 border-b border-[#444]">✂️ 四、取樣編輯與裁切（Truncating）</h3>
      
      <p className="text-[#bbb] text-sm mb-3">錄製完成後，您需要定義取樣的開始點和結束點：</p>
      
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-[#232323] border border-[#333] rounded-lg p-3">
          <h5 className="text-orange-400 font-semibold text-sm mb-2">查看波形</h5>
          <p className="text-[#bbb] text-sm">進入 <strong className="text-orange-400">Start/End</strong> 模式，您可以看到取樣的波形</p>
        </div>

        <div className="bg-[#232323] border border-[#333] rounded-lg p-3">
          <h5 className="text-blue-400 font-semibold text-sm mb-2">設定起始/結束點</h5>
          <ul className="space-y-1.5 text-sm text-[#bbb]">
            <li>• 按住 Pad，點擊 <strong className="text-blue-400">Marker</strong> 設定起點（Start Point）</li>
            <li>• 再次點擊 <strong className="text-blue-400">Marker</strong> 設定終點（End Point）</li>
          </ul>
        </div>

        <div className="bg-[#232323] border border-[#333] rounded-lg p-3">
          <h5 className="text-green-400 font-semibold text-sm mb-2">精確調整（Zooming）</h5>
          <p className="text-[#bbb] text-sm">按住 <strong className="text-green-400">SHIFT</strong>，然後調整旋鈕，即可放大（Zoom In）波形，對起始點進行精確調整</p>
        </div>

        <div className="bg-[#232323] border border-[#333] rounded-lg p-3">
          <h5 className="text-purple-400 font-semibold text-sm mb-2">檢查循環（Loop Check）</h5>
          <ul className="space-y-1.5 text-sm text-[#bbb]">
            <li>• 若 Loop 功能已啟用，進入終點（End Point），按住 <strong className="text-purple-400">SHIFT</strong> 並放大</li>
            <li>• 按下 <strong className="text-purple-400">Roll</strong>，系統會從終點前幾秒開始播放並循環回到起點，��您檢查循環是否完美</li>
          </ul>
        </div>

        <div className="bg-[#232323] border border-[#333] rounded-lg p-3">
          <h5 className="text-cyan-400 font-semibold text-sm mb-2">裁切（Truncate）</h5>
          <ul className="space-y-1.5 text-sm text-[#bbb]">
            <li>• 當您對所選的循環片段滿意後，點擊編碼器旋鈕（encoder button）</li>
            <li>• 選擇 <strong className="text-cyan-400">Truncate</strong>，這會刪除起點之前和終點之後的所有音訊，只保留您選擇的循環部分</li>
          </ul>
        </div>
      </div>
    </div>

    {/* 五、BPM 偵測與同步 */}
    <div>
      <h3 className="text-pink-400 text-lg font-bold mb-3 pb-2 border-b border-[#444]">🎯 五、BPM 偵測與同步</h3>
      
      <p className="text-[#bbb] text-sm mb-3">為了使取樣與專案 BPM 匹配，您需要偵測其速度：</p>
      
      <div className="space-y-3">
        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 text-sm">偵測 BPM</h4>
          <ol className="space-y-2 text-sm text-[#bbb]">
            <li className="flex items-start gap-2">
              <span className="text-orange-400">1.</span>
              <span>點擊 <strong className="text-orange-400">Pitch/Speed</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400">2.</span>
              <span>可選擇 <strong className="text-blue-400">Auto</strong> 讓系統自動選擇 BPM，或選擇 <strong className="text-green-400">Manual</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400">3.</span>
              <span>在 Manual 模式下，按住 Pad，然後使用 <strong className="text-purple-400">Tap Tempo</strong> Subpad 來手動敲擊取樣的速度</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400">4.</span>
              <span>偵測到 BPM 後，點擊編碼器旋鈕，將數值調整為整數（例如從 83.8 調整為 83）</span>
            </li>
          </ol>
        </div>

        <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
          <h4 className="text-blue-400 font-semibold mb-2 text-sm">💡 BPM 改變的效果</h4>
          <p className="text-blue-200/90 text-sm">
            一旦 404 知道取樣的確切 BPM，當您調整該取樣的音高（Pitch）時，系統會自動調整並告訴您當前的音高對應多少 BPM。
          </p>
        </div>

        <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
          <h4 className="text-green-400 font-semibold mb-2 text-sm">🔄 BPM 同步 (BPM Sync)</h4>
          <p className="text-green-200/90 text-sm mb-2">
            如果您的專案 Session BPM 改變了（例如從 83 變為 90 BPM）：
          </p>
          <ul className="space-y-1.5 text-sm text-green-200/80">
            <li>• 按下 <strong className="text-green-400">BPM Sync</strong>，SP-404 會自動調整該取樣的音高，使其速度與專案 Session 的 BPM 完美匹配</li>
            <li>• <strong className="text-yellow-400">注意：</strong> 此功能生效的前提是您必須先偵測出該循環（Loop）的原始 BPM</li>
          </ul>
        </div>
      </div>
    </div>

    {/* 六、切片處理 */}
    <div>
      <h3 className="text-pink-400 text-lg font-bold mb-3 pb-2 border-b border-[#444]">🔪 六、切片處理（Chopping/Slicing）</h3>
      
      <p className="text-[#bbb] text-sm mb-3">將長取樣分割成可演奏的片段（Chops）：</p>
      
      <div className="space-y-3">
        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 text-sm">進入切片模式</h4>
          <p className="text-[#bbb] text-sm">按住 <strong className="text-orange-400">SHIFT</strong> 並點擊 <strong className="text-orange-400">Start/End</strong></p>
        </div>

        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3 text-sm">選擇切片方式</h4>
          
          <div className="space-y-3">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3">
              <div className="text-blue-400 font-semibold text-sm mb-2">Lazy Chop Mode</div>
              <p className="text-[#bbb] text-sm">類似 MPC 的模式，每當您擊打一個 Pad，系統就會自動創建一個切片（Slice）。這是一種快速創建切片的方法。</p>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3">
              <div className="text-green-400 font-semibold text-sm mb-2">Auto Mark</div>
              <p className="text-[#bbb] text-sm mb-2">如果您選擇了一個完美的一小節或兩小節循環：</p>
              <ul className="space-y-1 text-sm text-[#bbb]">
                <li>• 點擊編碼器旋鈕，選擇 <strong className="text-green-400">Auto Mark</strong></li>
                <li>• 可設定時間分割（time division），例如創建 8 個或 16 個切片</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 text-sm">調整切片起點</h4>
          <ul className="space-y-2 text-sm text-[#bbb]">
            <li>• 如果需要調整某個切片的起點，放大波形</li>
            <li>• 使用 <strong className="text-purple-400">Control Knob 2</strong> 來選擇並調整該切片的起點</li>
          </ul>
        </div>

        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 text-sm">指派到 Bank</h4>
          <ol className="space-y-2 text-sm text-[#bbb]">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">1.</span>
              <span>點擊編碼器旋鈕，選擇 <strong className="text-cyan-400">Assign to Pad</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">2.</span>
              <span>選擇您希望放置切片的目標 Bank（例如 Bank C）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">3.</span>
              <span>點擊該 Bank 中您要放置這些切片的 Pad</span>
            </li>
          </ol>
        </div>
      </div>
    </div>

    {/* 七、通用取樣技巧 */}
    <div>
      <h3 className="text-pink-400 text-lg font-bold mb-3 pb-2 border-b border-[#444]">💡 七、通用取樣技巧</h3>
      
      <div className="space-y-3">
        <div className="bg-[#232323] border border-[#333] rounded-lg p-3">
          <h5 className="text-orange-400 font-semibold text-sm mb-2">1. 關閉 Gate 功能</h5>
          <p className="text-[#bbb] text-sm mb-2">新載入或切片的取樣預設可能處於 Gated 狀態（只在按住 Pad 時播放）。</p>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-2 text-sm">
            <strong className="text-orange-400">操作：</strong> 要關閉整個 Bank 的 Gate，按住 <strong className="text-orange-400">SHIFT</strong> 並點擊 <strong className="text-orange-400">Gate</strong>
          </div>
        </div>

        <div className="bg-[#232323] border border-[#333] rounded-lg p-3">
          <h5 className="text-blue-400 font-semibold text-sm mb-2">2. 設置 Mute Groups</h5>
          <p className="text-[#bbb] text-sm mb-2">將取樣設置到同一個 Mute Group 可以讓它們互相切斷，防止聲音重疊：</p>
          <ol className="space-y-1.5 text-sm text-[#bbb]">
            <li>• 按住 <strong className="text-blue-400">SHIFT</strong> 並點擊 <strong className="text-blue-400">Mute Groups</strong> (Pad 8)</li>
            <li>• 選擇您要放入同一 Mute Group 的取樣（例如所有的 Chops）</li>
            <li>• 將它們指派給一個 Mute Group（例如 Group C）</li>
          </ol>
        </div>

        <div className="bg-[#232323] border border-[#333] rounded-lg p-3">
          <h5 className="text-green-400 font-semibold text-sm mb-2">3. 調整整個 Bank 的音高</h5>
          <p className="text-[#bbb] text-sm mb-2">如果您想同時調整整個 Mute Group 或 Bank 的��高：</p>
          <ul className="space-y-1.5 text-sm text-[#bbb]">
            <li>• 在 <strong className="text-green-400">Pitch/Speed</strong> 模式下</li>
            <li>• 按住 <strong className="text-green-400">COPY</strong>，同時調整音高，這樣就會影響該 Mute Group 中的所有取樣</li>
            <li>• 這是一種非常快速的工作流程</li>
          </ul>
        </div>
      </div>
    </div>

    {/* 類比理解 */}
    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/20 border border-purple-700/40 rounded-lg p-4 mt-5">
      <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
        <span>🎬</span> 類比理解
      </h4>
      <p className="text-purple-200/90 text-sm leading-relaxed">
        SP-404 MK2 的取樣工作流程就像是在製作一部電影：首先，您需要準備好攝影器材和劇本（設定 BPM 和 SD 卡）。接著，您或是匯入事先拍好的片段（One-shots），或是直接在現場錄製一段長鏡頭（長取樣）。錄製後，您進入剪輯室（Start/End 編輯），精確定義鏡頭的起點和終點（裁切）。然後，您根據電影的節奏（BPM）來校準或加速/放慢鏡頭（BPM 偵測與同步）。最後，您可以將長鏡頭分割成多個短小的場景（Chopping/Slicing），���確保它們在播��時不會互相衝突或重疊（Mute Groups）。
      </p>
    </div>
  </div>
);

const PatternContent = () => (
  <div className="space-y-5">
    {/* 一、編曲模式邏輯與切換 */}
    <div>
      <h3 className="text-indigo-400 text-lg font-bold mb-3 pb-2 border-b border-[#444]">🎹 一、編曲模式邏輯與切換</h3>
      
      <div className="space-y-4">
        {/* 模式區分 */}
        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span className="text-orange-400">🔀</span> 模式區分
          </h4>
          <p className="text-[#bbb] text-sm mb-3">SP-404 MK2 具有兩種主要模式：</p>
          
          <div className="space-y-3">
            <div className="bg-[#1a1a1a] border-l-2 border-orange-600 p-3 rounded-r">
              <div className="text-orange-400 font-semibold text-sm mb-1">取樣播放模式 (Sample Playback Mode)</div>
              <div className="text-[#bbb] text-sm">這是開機時的預設模式，Pad 顯示的是您錄製或匯入的取樣 (samples)</div>
            </div>
            
            <div className="bg-[#1a1a1a] border-l-2 border-blue-600 p-3 rounded-r">
              <div className="text-blue-400 font-semibold text-sm mb-1">樂段選取模式 (Pattern Select Mode)</div>
              <div className="text-[#bbb] text-sm mb-2">按下 <strong className="text-blue-400">Pattern Select</strong> 按鈕即可進入此模式</div>
              <div className="text-blue-200/80 text-sm">此時 Pad 不再顯示取樣，而是變成用於<strong>儲存不同樂段或序列的插槽 (slots)</strong></div>
            </div>
          </div>
        </div>

        {/* 錄音前準備 */}
        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span className="text-green-400">⚙️</span> 錄音前準備
          </h4>
          
          <div className="space-y-3">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3">
              <div className="text-green-400 font-semibold text-sm mb-2">進入錄音狀態</div>
              <ul className="space-y-1.5 text-sm text-[#bbb]">
                <li>• 在 Pattern Select 模式下，按下 <strong className="text-green-400">Record</strong> 按鈕</li>
                <li>• 所有可供錄製的空白 Pad 會閃爍紅色</li>
                <li>• 可以選擇任何 Bank 來錄製樂段</li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3">
              <div className="text-blue-400 font-semibold text-sm mb-2">節拍器 (Metronome)</div>
              <p className="text-[#bbb] text-sm">按住 <strong className="text-blue-400">SHIFT + Pad 9 (Metronome)</strong> 來開啟</p>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3">
              <div className="text-purple-400 font-semibold text-sm mb-2">倒數計時 (Count-in)</div>
              <p className="text-[#bbb] text-sm">建議進入 <strong className="text-purple-400">SHIFT + Pad 10</strong>，設定一小節的倒數計時，以便有時間準備</p>
            </div>
          </div>
        </div>

        {/* 專案速度設定 */}
        <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
          <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
            <span>⏱️</span> 專案速度設定 (BPM)
          </h4>
          <p className="text-blue-200/90 text-sm mb-3">SP-404 MK2 的速度（BPM）可以透過兩種方式設定：</p>
          
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="bg-blue-950/40 rounded p-2">
              <strong className="text-blue-300">Bank 速度：</strong>
              <span className="text-blue-200/80"> 速度只影響當前 Bank</span>
            </div>
            <div className="bg-blue-950/40 rounded p-2">
              <strong className="text-blue-300">Project 速度：</strong>
              <span className="text-blue-200/80"> 速度影響整個專案的所有 Bank</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-blue-700/30 text-sm text-blue-200/80">
            可透過 <strong className="text-blue-400">SHIFT + Pad 11 (Tap Tempo)</strong> 進入菜單選擇
          </div>
        </div>
      </div>
    </div>

    {/* 二、樂段參數與量化設定 */}
    <div>
      <h3 className="text-indigo-400 text-lg font-bold mb-3 pb-2 border-b border-[#444]">⚙️ 二、樂段參數與量化設定</h3>
      
      <p className="text-[#bbb] text-sm mb-3">選定要錄製的 Pad 後（例如 Pad 1），會彈出設定視窗，讓您可以調整錄音參數：</p>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-[#333]">
          <thead className="bg-[#1a1a1a]">
            <tr>
              <th className="text-left p-2 border border-[#333] text-orange-400">參數</th>
              <th className="text-left p-2 border border-[#333] text-blue-400">說明</th>
              <th className="text-left p-2 border border-[#333] text-green-400">調整與建議</th>
            </tr>
          </thead>
          <tbody className="text-[#bbb]">
            <tr>
              <td className="p-2 border border-[#333]"><strong className="text-orange-400">BPM</strong></td>
              <td className="p-2 border border-[#333]">樂段的速度</td>
              <td className="p-2 border border-[#333]">可以在此設定，之後也可以更改</td>
            </tr>
            <tr>
              <td className="p-2 border border-[#333]"><strong className="text-orange-400">Length</strong></td>
              <td className="p-2 border border-[#333]">樂段的小節長度</td>
              <td className="p-2 border border-[#333]">建議使用 <strong className="text-green-400">2 或 4 小節</strong>，因為編輯較長的樂段會比較困難。最長可達 64 小節</td>
            </tr>
            <tr>
              <td className="p-2 border border-[#333]"><strong className="text-orange-400">Quantization Strength</strong></td>
              <td className="p-2 border border-[#333]">MIDI 事件對齊網格的嚴格程度</td>
              <td className="p-2 border border-[#333]"><strong className="text-green-400">100%</strong> = 完全對齊網格；<strong className="text-yellow-400">0% (Off)</strong> = 關閉量化，可用於錄製幽靈踢鼓</td>
            </tr>
            <tr>
              <td className="p-2 border border-[#333]"><strong className="text-orange-400">Quantization Grid</strong></td>
              <td className="p-2 border border-[#333]">樂段的最小時間單位</td>
              <td className="p-2 border border-[#333]">可選範圍從 32 分音符到 1/4 音符。通常建議設定為 <strong className="text-green-400">16th Grid</strong></td>
            </tr>
            <tr>
              <td className="p-2 border border-[#333]"><strong className="text-orange-400">Shuffle</strong></td>
              <td className="p-2 border border-[#333]">調整搖擺感，使上拍的音符移動</td>
              <td className="p-2 border border-[#333]">建議設定保持在 <strong className="text-green-400">5 到 15 之間</strong>，以獲得更自然的感覺</td>
            </tr>
            <tr>
              <td className="p-2 border border-[#333]"><strong className="text-orange-400">其他選項</strong></td>
              <td className="p-2 border border-[#333]">拍號與節拍器音量</td>
              <td className="p-2 border border-[#333]">按下 <strong className="text-blue-400">SHIFT</strong> 可以切換拍號和調整節拍器音量</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* 三、錄音模式教學 */}
    <div>
      <h3 className="text-indigo-400 text-lg font-bold mb-3 pb-2 border-b border-[#444]">🎙️ 三、錄音模式教學</h3>
      
      <p className="text-[#bbb] text-sm mb-4">SP-404 MK2 提供兩種主要的錄音模式：實時錄音與步進編曲。</p>
      
      <div className="space-y-4">
        {/* 實時錄音 */}
        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span className="text-red-400">⏺️</span> 1. 實時錄音 (Real Time Recording)
          </h4>
          
          <p className="text-[#bbb] text-sm mb-3">實時錄音是透過即時敲擊 Pad 來記錄音符事件的方法：</p>
          
          <div className="space-y-3">
            <div className="bg-[#1a1a1a] border-l-2 border-red-600 p-3 rounded-r">
              <div className="text-red-400 font-semibold text-sm mb-1">開始錄音</div>
              <div className="text-[#bbb] text-sm">設定參數後，再次按下 <strong className="text-red-400">Record</strong>，倒數計時結束後，敲擊 Pad 即可開始錄製</div>
            </div>
            
            <div className="bg-[#1a1a1a] border-l-2 border-yellow-600 p-3 rounded-r">
              <div className="text-yellow-400 font-semibold text-sm mb-1">排練模式 (Rehearsal Mode)</div>
              <div className="text-[#bbb] text-sm">在錄音過程中再次按下 <strong className="text-yellow-400">Record</strong>，即可進入排練模式。此時敲擊 Pad 不會被錄製，只供試聽與練習</div>
            </div>
            
            <div className="bg-[#1a1a1a] border-l-2 border-purple-600 p-3 rounded-r">
              <div className="text-purple-400 font-semibold text-sm mb-1">16 級力度模式</div>
              <div className="text-[#bbb] text-sm">按下 <strong className="text-purple-400">SHIFT + Pad 2</strong>，可進入 16 級力度模式，讓您錄製帶有力道變化的取樣</div>
            </div>
          </div>
        </div>

        {/* 步進編曲模式 */}
        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span className="text-cyan-400">📊</span> 2. 步進編曲模式 (TR-Rec Mode)
          </h4>
          
          <p className="text-[#bbb] text-sm mb-3">TR-Rec 是一種步進編曲（Step Sequencer）模式，允許您在網格上精確放置音符：</p>
          
          <div className="space-y-3">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3">
              <div className="text-cyan-400 font-semibold text-sm mb-2">切換模式</div>
              <p className="text-[#bbb] text-sm">在錄製新樂段的選單中，點擊 <strong className="text-cyan-400">Remain</strong> 按鈕，即可從 Real Time 切換到 <strong className="text-cyan-400">TR-Rec</strong></p>
            </div>
            
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3">
              <div className="text-green-400 font-semibold text-sm mb-2">添加音符</div>
              <p className="text-[#bbb] text-sm mb-2">介面會顯示分步的網格（例如 16 分音符）：</p>
              <ul className="space-y-1.5 text-sm text-[#bbb]">
                <li>• 按住 <strong className="text-green-400">Subpad</strong> 選擇要加入的取樣（例如 Kick 或 Snare）</li>
                <li>• 在網格上點擊 Pad 即可將音符放置到對應的步進位置</li>
              </ul>
            </div>
            
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3">
              <div className="text-blue-400 font-semibold text-sm mb-2">精細編輯</div>
              <p className="text-[#bbb] text-sm">在 TR-Rec 模式中，可以調整單一音符的<strong className="text-blue-400">力度（Velocity）</strong>、<strong className="text-blue-400">音高（Pitch）</strong>，甚至使用<strong className="text-blue-400">子步進（Substep）</strong>來創建類似於 Roll 的效果</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* 四、樂段修正與編輯 */}
    <div>
      <h3 className="text-indigo-400 text-lg font-bold mb-3 pb-2 border-b border-[#444]">✏️ 四、樂段修正與編輯</h3>
      
      <div className="space-y-4">
        {/* 撤銷與刪除 */}
        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3">撤銷與刪除</h4>
          
          <div className="space-y-3">
            <div className="bg-[#1a1a1a] border-l-2 border-orange-600 p-3 rounded-r">
              <div className="text-orange-400 font-semibold text-sm mb-1">撤銷 (Undo)</div>
              <p className="text-[#bbb] text-sm">錄音時，若想取消上一步的錄音，可以按下 <strong className="text-orange-400">SHIFT + Undo</strong>（或 <strong className="text-orange-400">SHIFT + Pattern Select</strong>）</p>
            </div>
            
            <div className="bg-[#1a1a1a] border-l-2 border-red-600 p-3 rounded-r">
              <div className="text-red-400 font-semibold text-sm mb-2">刪除 (Delete Mode)</div>
              <ul className="space-y-2 text-sm text-[#bbb]">
                <li>• 按下 <strong className="text-red-400">Delete</strong> 按鈕，Pad 會轉為藍色</li>
                <li>• <strong className="text-yellow-400">刪除邏輯：</strong> 必須在該音符開始播放的<strong>瞬間</strong>按下並按住該 Pad，系統才會刪除該 Pad 在按住期間內的所有錄音</li>
                <li>• 如果刪除一整個四小節樂段的錄音，必須按住 Pad 等待四小節播放結束</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 樂段編輯功能 */}
        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3">樂段編輯功能 (Pattern Edit)</h4>
          
          <p className="text-[#bbb] text-sm mb-3">進入 <strong className="text-blue-400">Pattern Edit</strong> 模式並選取樂段後，可以進行以下操作：</p>
          
          <div className="space-y-2">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3">
              <div className="text-blue-400 font-semibold text-sm mb-1">加倍長度 (Duplicate)</div>
              <p className="text-[#bbb] text-sm">點擊編碼器旋鈕（menu icon），選擇 <strong className="text-blue-400">Duplicate</strong>，可將樂段長度加倍（例如 2 小節複製成 4 小節）</p>
            </div>
            
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3">
              <div className="text-green-400 font-semibold text-sm mb-1">裁切 (Crop)</div>
              <p className="text-[#bbb] text-sm">可用於刪除樂段開頭或結尾不需要的小節</p>
            </div>
          </div>
        </div>

        {/* 聲音調整 */}
        <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
          <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
            <span>🔊</span> 聲音調整
          </h4>
          <p className="text-yellow-200/90 text-sm">
            如果樂段中的取樣音量太大或太小，您必須先退出 Pattern Select 模式，回到取樣播放模式，選擇該取樣的 Pad，進入 <strong className="text-yellow-400">Pitch/Speed</strong> ��面，使用 <strong className="text-yellow-400">Control Knob 3 (Volume)</strong> 調整音量。
          </p>
        </div>
      </div>
    </div>

    {/* 五、樂段變化與進階功能 */}
    <div>
      <h3 className="text-indigo-400 text-lg font-bold mb-3 pb-2 border-b border-[#444]">🎨 五、樂段變化與進階功能</h3>
      
      <div className="space-y-4">
        {/* 樂段複製與變化 */}
        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span className="text-purple-400">📋</span> 樂段複製與變化 (Variation)
          </h4>
          
          <div className="space-y-3">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3">
              <div className="text-purple-400 font-semibold text-sm mb-2">創建變化</div>
              <p className="text-[#bbb] text-sm">
                使用 <strong className="text-purple-400">Copy</strong> 功能將一個樂段（例如 Pad 1 上的鼓組）複製到另一個空的 Pad（例如 Pad 5），然後在 Pad 5 上錄製不同的旋律切片或鼓組變化，以創建 Intro、Verse 或 Chorus 等不同結構。
              </p>
            </div>
            
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3">
              <div className="text-cyan-400 font-semibold text-sm mb-2">選擇性複��</div>
              <p className="text-[#bbb] text-sm">
                在 Copy 過程中，可以點擊 <strong className="text-cyan-400">Remain</strong> 選項，然後選擇只複製樂段中的<strong>特定取樣</strong>到新的 Pad 上（例如只複製 snare，不複製 kick）。
              </p>
            </div>
          </div>
        </div>

        {/* 彈跳成取樣 */}
        <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span className="text-green-400">💿</span> 彈跳成取樣 (Bounce to Sample)
          </h4>
          
          <div className="space-y-3">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3">
              <div className="text-green-400 font-semibold text-sm mb-2">功能說明</div>
              <p className="text-[#bbb] text-sm">您可以將一整個樂段轉換成單一取樣</p>
            </div>
            
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3">
              <div className="text-blue-400 font-semibold text-sm mb-2">操作步驟</div>
              <ol className="space-y-1.5 text-sm text-[#bbb]">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">1.</span>
                  <span>按下 <strong className="text-blue-400">Copy</strong>，選擇源樂段</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">2.</span>
                  <span>然後按下 <strong className="text-blue-400">Pattern Select</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">3.</span>
                  <span>選擇一個空白的取樣 Pad 作為目標</span>
                </li>
              </ol>
            </div>
            
            <div className="bg-green-900/20 border border-green-700/30 rounded p-3">
              <div className="text-green-400 font-semibold text-sm mb-1">💡 應用</div>
              <p className="text-green-200/90 text-sm">這個新的取樣可以進行音高調整（Pitch up/down）、加入效果，或進行重取樣（resample），用於製作有趣的 Intro 或其他聲音設計</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* 六、樂段串接 */}
    <div>
      <h3 className="text-indigo-400 text-lg font-bold mb-3 pb-2 border-b border-[#444]">🔗 六、樂段串接 (Pattern Chaining)</h3>
      
      <p className="text-[#bbb] text-sm mb-4">樂段串接允許您將多個樂段按順序排列，以組成完整的曲目：</p>
      
      <div className="space-y-3">
        <div className="bg-[#232323] border-l-2 border-orange-600 p-3 rounded-r">
          <div className="text-orange-400 font-semibold text-sm mb-1">步驟 1：進入模式</div>
          <div className="text-[#bbb] text-sm">按住 <strong className="text-orange-400">Hold</strong> 按鈕</div>
        </div>
        
        <div className="bg-[#232323] border-l-2 border-blue-600 p-3 rounded-r">
          <div className="text-blue-400 font-semibold text-sm mb-1">步驟 2：建立鏈條</div>
          <div className="text-[#bbb] text-sm">選擇一個 Pad 作為鏈條的起始點</div>
        </div>
        
        <div className="bg-[#232323] border-l-2 border-green-600 p-3 rounded-r">
          <div className="text-green-400 font-semibold text-sm mb-1">步驟 3：添加樂段</div>
          <div className="text-[#bbb] text-sm">依序點擊您想播放的樂段 Pad，它們會被加入鏈條中</div>
        </div>
        
        <div className="bg-[#232323] border-l-2 border-purple-600 p-3 rounded-r">
          <div className="text-purple-400 font-semibold text-sm mb-2">步驟 4：播放與編輯</div>
          <ul className="space-y-1.5 text-sm text-[#bbb]">
            <li>• 按下 <strong className="text-purple-400">Subpad</strong> 即可開始播放鏈條</li>
            <li>• 使用編碼器旋鈕來滾動鏈條中的樂段</li>
            <li>• 按下 <strong className="text-purple-400">Delete</strong> 來移除��定的樂段</li>
          </ul>
        </div>
        
        <div className="bg-[#232323] border-l-2 border-cyan-600 p-3 rounded-r">
          <div className="text-cyan-400 font-semibold text-sm mb-2">步驟 5：手動切換</div>
          <p className="text-[#bbb] text-sm">在一個樂段播放時，點擊下一個樂段，它將會排隊（Queue），在當前樂段結束後自動切換</p>
        </div>
        
        <div className="bg-[#232323] border-l-2 border-yellow-600 p-3 rounded-r">
          <div className="text-yellow-400 font-semibold text-sm mb-1">暫停功能</div>
          <div className="text-[#bbb] text-sm">按下 <strong className="text-yellow-400">SHIFT + Hold</strong> 可以暫停樂段播放</div>
        </div>
      </div>
    </div>

    {/* 類比理解 */}
    <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/20 border border-purple-700/40 rounded-lg p-4 mt-5">
      <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
        <span>🎬</span> 類比理解
      </h4>
      <p className="text-purple-200/90 text-sm leading-relaxed">
        SP-404 MK2 的編曲器邏輯就像是電影導演的工作檯：您首先定義好拍攝的規格（設定 BPM、長度和量化），然後可以選擇實時表演（實時錄音）或精細排程（TR-Rec）來記錄場景（樂段）。一旦有了不同的場景（例如 Intro、Verse），您就可以透過樂段��接（Pattern Chaining）功能，將這些場景組合成一部完整的電影（曲目）結構。
      </p>
    </div>
  </div>
);

const TipsContent = () => (
  <ul className="space-y-3 text-sm">
    <li className="bg-[#232323] border border-[#333] rounded p-3">
      <strong className="text-blue-400">靜音選擇：</strong>
      <span className="text-[#bbb]"> 按住 VALUE + Pad 可以選擇 Sample 而不觸發播放，適合編輯正在播放中的 Pattern</span>
    </li>
    <li className="bg-[#232323] border border-[#333] rounded p-2">
      <strong className="text-blue-400">Effect Grab：</strong>
      <span className="text-[#bbb]"> 按住效果鍵（如 MFX）可以暫時應用效果，放開即停止</span>
    </li>
    <li className="bg-[#232323] border border-[#333] rounded p-2">
      <strong className="text-blue-400">Bus 路由：</strong>
      <span className="text-[#bbb]"> 使用 REMAIN + Pad 設定 Sample 的 Bus 路由（橘=Bus1, 綠=Bus2, 白=Dry）</span>
    </li>
    <li className="bg-[#232323] border border-[#333] rounded p-2">
      <strong className="text-blue-400">Resample 工作流：</strong>
      <span className="text-[#bbb]"> 這是 SP 的核心！將 Pattern 錄成 Audio Loop，可���釋放發音數並添加效果</span>
    </li>
    <li className="bg-[#232323] border border-[#333] rounded p-2">
      <strong className="text-blue-400">Chop 功能：</strong>
      <span className="text-[#bbb]"> 非常強大，可用於製作 Hip Hop 鼓組，自動將 Sample 切片至 16 個 Pad</span>
    </li>
    <li className="bg-[#232323] border border-[#333] rounded p-2">
      <strong className="text-blue-400">Live Mode：</strong>
      <span className="text-[#bbb]"> 按住 REMAIN 3 秒鎖定不常用鍵，現場表演防止誤觸</span>
    </li>

    <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 mt-5 text-sm">
      <strong className="text-blue-400">💡 初學者建議</strong>
      <ul className="mt-2 space-y-1.5 text-blue-200/80">
        <li>1. 先玩預設 Sample，熟悉按鍵和效果器</li>
        <li>2. 學會 RESAMPLE 工作流，這是 SP 的精髓</li>
        <li>3. 熟記常用 SHIFT 組合鍵</li>
        <li>4. 使用 Protect 功能保護重要 Sample</li>
        <li>5. 定期備份 Project 到 SD 卡</li>
      </ul>
    </div>
  </ul>
);

const IndexContent = ({ onHotspotSelect }: { onHotspotSelect?: (id: string) => void }) => {
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);
  const [expandedHotspot, setExpandedHotspot] = React.useState<string | null>(null);
  
  // 從 database 導入 hotspots 和 contentDB
  
  // 按分類分組
  const categorizedHotspots = hotspots.reduce((acc: Record<string, typeof hotspots>, hotspot: typeof hotspots[0]) => {
    if (!acc[hotspot.cat]) {
      acc[hotspot.cat] = [];
    }
    acc[hotspot.cat].push(hotspot);
    return acc;
  }, {});

  // 定義分類順序和中文名稱
  const categoryOrder = [
    { key: '主控', name: '🎛️ 主控', color: 'orange' },
    { key: '控制旋鈕', name: '🔊 控制旋鈕', color: 'purple' },
    { key: '效果器', name: '🎵 效果器', color: 'blue' },
    { key: '導航', name: '⚙️ 導航', color: 'cyan' },
    { key: '模式', name: '📋 模式', color: 'green' },
    { key: '錄音', name: '🎙️ 錄音', color: 'red' },
    { key: '取樣編輯', name: '✂️ 取樣編輯', color: 'yellow' },
    { key: '編輯', name: '📝 編輯', color: 'pink' },
    { key: '播放', name: '▶️ 播放', color: 'teal' },
    { key: '功能', name: '🔧 功能', color: 'indigo' },
    { key: 'BANK', name: '🗂️ Bank 切換', color: 'violet' },
    { key: 'SHIFT', name: '🔀 SHIFT 鍵', color: 'orange' },
    { key: '打擊墊', name: '🎹 打擊墊 (Pads)', color: 'gray' },
    { key: '路由', name: '🎚️ 路由', color: 'blue' },
    { key: '表演', name: '🎭 表演', color: 'purple' },
    { key: '輸入', name: '🔌 輸入', color: 'green' },
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const colorMap: Record<string, any> = {
      orange: { bg: 'from-orange-600/10 to-orange-500/5', border: isActive ? 'border-orange-600' : 'border-orange-600/30', text: 'text-orange-400' },
      purple: { bg: 'from-purple-600/10 to-purple-500/5', border: isActive ? 'border-purple-600' : 'border-purple-600/30', text: 'text-purple-400' },
      blue: { bg: 'from-blue-600/10 to-blue-500/5', border: isActive ? 'border-blue-600' : 'border-blue-600/30', text: 'text-blue-400' },
      cyan: { bg: 'from-cyan-600/10 to-cyan-500/5', border: isActive ? 'border-cyan-600' : 'border-cyan-600/30', text: 'text-cyan-400' },
      green: { bg: 'from-green-600/10 to-green-500/5', border: isActive ? 'border-green-600' : 'border-green-600/30', text: 'text-green-400' },
      red: { bg: 'from-red-600/10 to-red-500/5', border: isActive ? 'border-red-600' : 'border-red-600/30', text: 'text-red-400' },
      yellow: { bg: 'from-yellow-600/10 to-yellow-500/5', border: isActive ? 'border-yellow-600' : 'border-yellow-600/30', text: 'text-yellow-400' },
      pink: { bg: 'from-pink-600/10 to-pink-500/5', border: isActive ? 'border-pink-600' : 'border-pink-600/30', text: 'text-pink-400' },
      teal: { bg: 'from-teal-600/10 to-teal-500/5', border: isActive ? 'border-teal-600' : 'border-teal-600/30', text: 'text-teal-400' },
      indigo: { bg: 'from-indigo-600/10 to-indigo-500/5', border: isActive ? 'border-indigo-600' : 'border-indigo-600/30', text: 'text-indigo-400' },
      violet: { bg: 'from-violet-600/10 to-violet-500/5', border: isActive ? 'border-violet-600' : 'border-violet-600/30', text: 'text-violet-400' },
      gray: { bg: 'from-gray-600/10 to-gray-500/5', border: isActive ? 'border-gray-600' : 'border-gray-600/30', text: 'text-gray-400' },
    };
    return colorMap[color];
  };

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategory(expandedCategory === categoryKey ? null : categoryKey);
    setExpandedHotspot(null); // 切換分類時收合詳細內容
  };

  const toggleHotspot = (hotspotId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedHotspot(expandedHotspot === hotspotId ? null : hotspotId);
  };

  return (
    <div className="space-y-3 text-sm">
      <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/10 border border-blue-700/30 rounded-lg p-3.5 mb-4">
        <strong className="text-blue-400 flex items-center gap-2">
          <span className="text-lg">📑</span>
          功能索引說明
        </strong>
        <p className="mt-2 text-blue-200/80 text-sm leading-relaxed">
          這裡列出 SP-404MKII 上所有 70+ 個可互動的按鈕、旋鈕和打擊墊。
          點擊任何分類展開查看，再點擊項目即可查看完整的功能說明、SHIFT 組合鍵、使用技巧等詳細資訊。
        </p>
      </div>

      {categoryOrder.map((category) => {
        const items = categorizedHotspots[category.key] || [];
        if (items.length === 0) return null;

        const isExpanded = expandedCategory === category.key;
        const colors = getColorClasses(category.color, isExpanded);

        return (
          <div key={category.key}>
            <button
              onClick={() => toggleCategory(category.key)}
              className={`w-full bg-gradient-to-r ${colors.bg} border ${colors.border} rounded-lg p-3 text-left transition-all duration-200 cursor-pointer group`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`${colors.text} font-semibold text-sm`}>
                    {category.name}
                  </span>
                  <span className="text-[#666] text-xs">({items.length})</span>
                </div>
                <div className={`${colors.text} transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                  ▼
                </div>
              </div>
            </button>

            {/* 第二層：風琴式展開分類內的按鈕列表 */}
            {isExpanded && (
              <div className="mt-2 ml-1 p-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg animate-fadeIn">
                <div className="grid grid-cols-1 gap-2">
                  {items.map((hotspot: typeof hotspots[0]) => {
                    const isHotspotExpanded = expandedHotspot === hotspot.id;
                    const content = contentDB[hotspot.id];
                    
                    return (
                      <div key={hotspot.id}>
                        <button
                          onClick={(e) => toggleHotspot(hotspot.id, e)}
                          className={`w-full bg-gradient-to-r ${colors.bg} border ${isHotspotExpanded ? colors.border.replace('/30', '') : colors.border} rounded px-2.5 py-2 text-left transition-all duration-200 cursor-pointer group hover:border-orange-600`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 flex-1">
                              <div className="text-white text-sm font-semibold group-hover:text-orange-400 transition-colors">
                                {hotspot.name}
                              </div>
                              <div className="text-[10px] text-[#888]">
                                {hotspot.type === 'knob' ? '🎛️' : hotspot.type === 'pad' ? '🔲' : '🔘'}
                              </div>
                            </div>
                            <div className={`${colors.text} transition-transform duration-200 text-sm ${isHotspotExpanded ? 'rotate-180' : ''}`}>
                              ▼
                            </div>
                          </div>
                        </button>

                        {/* 第三層：風琴式展開詳細內容 */}
                        {isHotspotExpanded && content && (
                          <div className="mt-2 ml-2 p-4 bg-[#050505] border border-[#1a1a1a] rounded-lg animate-fadeIn space-y-3 text-xs">
                            {/* 定義 */}
                            <div className="border-l-2 border-orange-600 pl-3 text-[#ccc] italic">
                              {content.def}
                            </div>

                            {/* 詳細說明 */}
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Info size={14} className="text-blue-400" />
                                <span className="text-blue-400 font-semibold">詳細說明</span>
                              </div>
                              <div className="bg-[#0a0a0a] border border-[#222] rounded p-3 text-[#bbb] leading-relaxed">
                                {content.detail}
                              </div>
                            </div>

                            {/* SHIFT 組合鍵 */}
                            {content.shift && content.shift.length > 0 && content.shift[0] !== "無" && (
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <ToggleLeft size={14} className="text-orange-400" />
                                  <span className="text-orange-400 font-semibold">SHIFT 組合鍵</span>
                                </div>
                                <ul className="space-y-1.5">
                                  {content.shift.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-[#aaa]">
                                      <span className="text-orange-600 font-mono bg-orange-600/10 px-1.5 py-0.5 rounded text-[10px] flex-shrink-0">
                                        SHIFT
                                      </span>
                                      <span>{item.replace('SHIFT + ', '').replace('SHIFT+', '')}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* 使用技巧 */}
                            {content.usage && content.usage.length > 0 && (
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Lightbulb size={14} className="text-yellow-400" />
                                  <span className="text-yellow-400 font-semibold">使用技巧</span>
                                </div>
                                <ul className="space-y-1.5">
                                  {content.usage.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-[#aaa]">
                                      <span className="text-yellow-600 flex-shrink-0 mt-0.5">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* 提示 */}
                            {content.tip && (
                              <div className="bg-green-900/20 border border-green-700/30 rounded p-2.5">
                                <div className="flex items-start gap-2">
                                  <span className="text-green-400 text-sm flex-shrink-0">💡</span>
                                  <span className="text-green-200/80 text-sm">{content.tip}</span>
                                </div>
                              </div>
                            )}

                            {/* 點擊查看左側機器按鈕 */}
                            {onHotspotSelect && (
                              <button
                                onClick={() => onHotspotSelect(hotspot.id)}
                                className="w-full bg-gradient-to-r from-orange-600/20 to-orange-500/10 border border-orange-600/40 rounded px-3 py-2 text-center transition-all duration-200 hover:border-orange-600 hover:from-orange-600/30 hover:to-orange-500/20 cursor-pointer"
                              >
                                <span className="text-orange-400 text-xs font-semibold">🔍 查看機器上的位置</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3 mt-5 text-sm">
        <strong className="text-yellow-400">💡 使用提示</strong>
        <ul className="mt-2 space-y-1 text-yellow-200/80">
          <li>• 點擊任何分類名稱即可展開查看該分類下的所���按鈕</li>
          <li>• 再點擊按鈕名稱即可展開查看詳細說明、SHIFT 組合鍵、使用技巧</li>
          <li>• 打擊墊 (Pads) 有 16 個，支援力度感應</li>
          <li>• 也可以直接點擊左側機器圖片上的熱點區域</li>
        </ul>
      </div>
    </div>
  );
};

// ========== Detail Content ==========

interface DetailContentProps {
  selectedId: string | null;
  selectedName: string;
  selectedCat: string;
  content: ContentData | null;
  onBack: () => void;
}

const DetailContent: React.FC<DetailContentProps> = ({
  selectedId,
  selectedName,
  selectedCat,
  content,
  onBack,
}) => {
  if (!content) return null;

  // 合併豐富內容
  const enrichedData = selectedId ? enrichedContentDB[selectedId] : undefined;
  const mergedContent = enrichedData ? mergeEnrichedContent(content, enrichedData) : content;

  return (
    <div className="p-6">
      {/* 🔧 臨時調試信息 - 始終顯示 */}
      <div className="mb-4 p-3 bg-red-900/50 border-2 border-red-500 rounded text-white text-xs font-mono space-y-1">
        <div>🔍 selectedId: <strong className="text-yellow-300">"{selectedId}"</strong> (type: {typeof selectedId})</div>
        <div>🔍 selectedId === "copy": {selectedId === "copy" ? '✅ YES' : '❌ NO'}</div>
        <div>🔍 在陣列中: {selectedId && ['shift', 'exit', 'del', 'copy', 'remain', 'enc'].includes(selectedId) ? '✅ YES' : '❌ NO'}</div>
        <div>🔍 enrichedData: {enrichedData ? '✅ 存在' : '❌ 不存在'}</div>
        <div>🔍 mergedContent.combinations: {mergedContent.combinations ? `✅ 存在 (${mergedContent.combinations.length}筆)` : '❌ 不存在'}</div>
        <div>🔍 完整條件: {selectedId && ['shift', 'exit', 'del', 'copy', 'remain', 'enc'].includes(selectedId) && mergedContent.combinations && mergedContent.combinations.length > 0 ? '✅ 應該顯示' : '❌ 不應顯示'}</div>
      </div>

      <div className="text-3xl font-bold text-white leading-tight mb-2 tracking-tight">
        {selectedName}
      </div>

      <span className="inline-block bg-orange-600/15 text-orange-600 border border-orange-600/30 px-2 py-1 rounded text-xs font-extrabold mb-3 uppercase tracking-wider">
        {selectedCat}
      </span>

      <div className="text-[#bbb] text-base border-l-2 border-orange-600 pl-3 mb-5 italic leading-relaxed">
        {mergedContent.def}
      </div>

      {/* 詳細說明 */}
      <ContentBlock title="詳細說明" icon={<Info size={16} />}>
        <div className="bg-[#232323] border border-[#333] rounded-lg p-4 text-base leading-relaxed text-[#d1d5db]">
          {mergedContent.detail}
        </div>
      </ContentBlock>

      {/* 🔧 臨時調試區塊 - 移除條件限制 */}
      {mergedContent.combinations && mergedContent.combinations.length > 0 && (
        <div className="mb-6 p-4 bg-yellow-900/30 border border-yellow-600 rounded">
          <div className="text-yellow-300 text-xs font-mono">
            <div>✅ selectedId: {selectedId}</div>
            <div>✅ enrichedData 存在: {enrichedData ? 'YES' : 'NO'}</div>
            <div>✅ combinations 長度: {mergedContent.combinations.length}</div>
            <div className="mt-2">組合鍵內容:</div>
            <pre className="text-[10px] mt-1 overflow-auto max-h-32">
              {JSON.stringify(mergedContent.combinations, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* 複合功能區（所有有 combinations 資料的按鈕都顯示） */}
      {mergedContent.combinations && mergedContent.combinations.length > 0 && (
        <div className="mb-6">
          <div className="bg-gradient-to-r from-orange-900/30 to-red-900/20 border border-orange-600/40 rounded-xl overflow-hidden">
            {/* 標題區 */}
            <div className="bg-gradient-to-r from-orange-600/20 to-red-600/10 border-b border-orange-600/30 px-4 py-3">
              <div className="flex items-center gap-2">
                <Command size={18} className="text-orange-400" />
                <span className="text-orange-400 font-bold text-base uppercase tracking-wide">複合功能</span>
              </div>
              <p className="text-orange-200/60 text-xs mt-1">
                {selectedName} 可與其他按鍵組合使用，執行進階功能
              </p>
            </div>

            {/* 組合鍵列表 */}
            <div className="p-4 space-y-2">
              {mergedContent.combinations.map((combo, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 bg-[#0a0a0a] border border-[#333] hover:border-orange-600/40 rounded-lg p-3 transition-all duration-200 group"
                >
                  <span className="text-orange-400 font-mono bg-orange-600/15 border border-orange-600/30 px-2.5 py-1 rounded text-xs font-bold flex-shrink-0 group-hover:bg-orange-600/25 transition-colors">
                    {combo.keys}
                  </span>
                  <span className="text-[#d1d5db] text-sm leading-relaxed">{combo.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 工作流程 */}
      {mergedContent.workflow && mergedContent.workflow.length > 0 && (
        <ContentBlock title="操作流程" icon={<Workflow size={16} />}>
          <div className="space-y-4">
            {mergedContent.workflow.map((wf, idx) => (
              <div key={idx} className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border border-cyan-700/30 rounded-lg p-4">
                <div className="text-cyan-300 font-bold text-base mb-2">📋 {wf.title}</div>
                <ol className="space-y-2">
                  {wf.steps.map((step, stepIdx) => (
                    <li key={stepIdx} className="text-sm text-[#d1d5db] flex gap-2">
                      <span className="text-cyan-400 font-bold min-w-[20px]">{stepIdx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </ContentBlock>
      )}

      {/* 舊的 SHIFT 組合鍵（僅在沒有 combinations 資料時顯示，向後兼容） */}
      {(!mergedContent.combinations || mergedContent.combinations.length === 0) && 
        mergedContent.shift && mergedContent.shift.length > 0 && mergedContent.shift[0] !== "無" && (
        <ContentBlock title="SHIFT 組合鍵" icon={<ToggleLeft size={16} />}>
          <ul className="space-y-2">
            {mergedContent.shift.map((item, idx) => (
              <li key={idx} className="py-2 border-b border-dashed border-[#333] last:border-b-0 flex items-start gap-3 text-sm">
                <span className="text-orange-600 font-mono bg-orange-600/10 px-2 py-1 rounded min-w-[80px] text-center flex-shrink-0 text-sm font-bold">
                  SHIFT
                </span>
                <span className="text-[#d1d5db]">{item.replace('SHIFT + ', '').replace('SHIFT+', '')}</span>
              </li>
            ))}
          </ul>
        </ContentBlock>
      )}

      {/* 音樂範例 */}
      {mergedContent.examples && mergedContent.examples.length > 0 && (
        <ContentBlock title="實戰範例" icon={<Music size={16} />}>
          <div className="space-y-3">
            {mergedContent.examples.map((example, idx) => (
              <div key={idx} className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-purple-300 font-bold text-base">🎵 {example.title}</span>
                  {example.genre && (
                    <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-600/30">
                      {example.genre}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#d1d5db] leading-relaxed">{example.desc}</p>
              </div>
            ))}
          </div>
        </ContentBlock>
      )}

      {/* 注意事項 */}
      {mergedContent.warnings && mergedContent.warnings.length > 0 && (
        <ContentBlock title="注意事項" icon={<AlertTriangle size={16} />}>
          <div className="bg-gradient-to-r from-red-900/20 to-red-800/10 border border-red-700/30 rounded-lg p-4">
            <ul className="space-y-2">
              {mergedContent.warnings.map((warning, idx) => (
                <li key={idx} className="text-sm text-red-200 flex gap-2">
                  <span className="text-red-400">⚠️</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </ContentBlock>
      )}

      {/* 專業技巧 */}
      {mergedContent.proTips && mergedContent.proTips.length > 0 && (
        <ContentBlock title="專業技巧" icon={<Target size={16} />}>
          <div className="bg-gradient-to-r from-green-900/20 to-green-800/10 border border-green-700/30 rounded-lg p-4">
            <ul className="space-y-2">
              {mergedContent.proTips.map((tip, idx) => (
                <li key={idx} className="text-sm text-green-200 flex gap-2">
                  <span className="text-green-400">💎</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </ContentBlock>
      )}

      {/* 常見用途（向後兼容） */}
      {mergedContent.usage && mergedContent.usage.length > 0 && (
        <ContentBlock title="常見用途" icon={<Zap size={16} />}>
          <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
            <ul className="list-disc list-inside space-y-2 text-base text-[#d1d5db]">
              {mergedContent.usage.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </ContentBlock>
      )}

      {/* 使用技巧（向後兼容） */}
      {mergedContent.tip && (
        <ContentBlock title="使用技巧" icon={<Lightbulb size={16} />}>
          <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/10 border border-blue-700/30 rounded-lg p-4 text-base leading-relaxed text-blue-200">
            💡 {mergedContent.tip}
          </div>
        </ContentBlock>
      )}

      {/* MFX 列表 */}
      {mergedContent.mfxList && mergedContent.mfxList.length > 0 && (
        <ContentBlock title="MFX 效果列表 (42 種)" icon={<Zap size={16} />}>
          <div className="flex flex-col gap-2">
            {mergedContent.mfxList.map((mfx) => (
              <div
                key={mfx.num}
                className="bg-[#181818] p-3 rounded border border-[#333] transition-all duration-200 hover:border-orange-600 hover:bg-[#222]"
              >
                <div className="flex justify-between items-center mb-1.5">
                  <div className="text-white font-bold text-sm">
                    <span className="text-orange-600 font-mono mr-2 opacity-80">#{mfx.num}</span>
                    {mfx.name}
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#333] text-[#999] uppercase">
                    {mfx.cat}
                  </span>
                </div>
                <div className="text-[#aaa] text-sm leading-relaxed mb-2">
                  {mfx.desc}
                </div>
                
                {/* 調整建議 */}
                {mfx.tips && (
                  <div className="bg-blue-900/10 border-l-2 border-blue-500/50 pl-2 py-1.5 mb-1.5 text-sm text-blue-300/90">
                    <span className="text-blue-400 font-semibold">💡 調整：</span> {mfx.tips}
                  </div>
                )}
                
                {/* 適合曲風 */}
                {mfx.genre && (
                  <div className="flex items-center gap-1.5 text-sm">
                    <span className="text-[#666] font-semibold">🎵</span>
                    <span className="text-[#888]">{mfx.genre}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ContentBlock>
      )}
    </div>
  );
};

interface ContentBlockProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ title, icon, children }) => {
  return (
    <div className="mb-6">
      <div className="text-sm font-bold text-[#888] uppercase tracking-wide mb-3 flex items-center gap-2 border-b border-[#333] pb-2">
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
};

// ========== Helper Components ==========

interface ShortcutItemProps {
  keys: string;
  desc: string;
  highlight?: boolean;
  danger?: boolean;
}

const ShortcutItem: React.FC<ShortcutItemProps> = ({ keys, desc, highlight, danger }) => {
  return (
    <div className={`flex items-start gap-2.5 p-2 rounded ${
      highlight ? 'bg-orange-600/5 border border-orange-600/20' : ''
    } ${
      danger ? 'bg-red-600/5 border border-red-600/20' : ''
    }`}>
      <span
        className={`font-mono text-xs px-2 py-1 rounded whitespace-nowrap flex-shrink-0 ${
          highlight ? 'bg-orange-600/20 text-orange-300' : danger ? 'bg-red-600/20 text-red-300' : 'bg-[#333] text-[#aaa]'
        }`}
      >
        {keys}
      </span>
      <span className={`text-sm ${danger ? 'text-red-200' : 'text-[#bbb]'}`}>{desc}</span>
    </div>
  );
};

// ========== Expanded Content Component ==========

interface ModuleExpandedContentProps {
  moduleId: GuideModuleId;
  onModuleClick: (id: GuideModuleId) => void;
  onHotspotSelect: (id: string) => void;
}

const ModuleExpandedContent: React.FC<ModuleExpandedContentProps> = ({ moduleId, onModuleClick, onHotspotSelect }) => {
  const module = guideModules.find(m => m.id === moduleId);
  
  return (
    <div className="text-[#ccc] leading-relaxed text-sm">
      {moduleId === 'quickstart' && <QuickstartContent />}
      {moduleId === 'controls' && <ControlsContent onHotspotSelect={onHotspotSelect} />}
      {moduleId === 'effects' && <EffectsContent />}
      {moduleId === 'shortcuts' && <ShortcutsOverviewContent onModuleClick={onModuleClick} />}
      {moduleId === 'shortcuts-shift' && <ShortcutsShiftContent />}
      {moduleId === 'shortcuts-remain' && <ShortcutsRemainContent />}
      {moduleId === 'shortcuts-value' && <ShortcutsValueContent />}
      {moduleId === 'shortcuts-other' && <ShortcutsOtherContent />}
      {moduleId === 'sampling' && <SamplingContent />}
      {moduleId === 'pattern' && <PatternContent />}
      {moduleId === 'tips' && <TipsContent />}
      {moduleId === 'index' && <IndexContent onHotspotSelect={onHotspotSelect} />}
    </div>
  );
};

// ========== Module Detail Modal ==========

interface ModuleDetailModalProps {
  moduleId: GuideModuleId;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onHotspotSelect: (id: string) => void;
}

const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({ moduleId, onClose, onNavigate, onHotspotSelect }) => {
  const currentModule = guideModules.find(m => m.id === moduleId);
  const currentIndex = guideModules.findIndex(m => m.id === moduleId);
  
  const prevModule = currentIndex > 0 ? guideModules[currentIndex - 1] : guideModules[guideModules.length - 1];
  const nextModule = currentIndex < guideModules.length - 1 ? guideModules[currentIndex + 1] : guideModules[0];
  
  if (!currentModule) return null;

  return (
    <div 
      className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-end justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#1a1a1a] border-t-2 border-orange-600 rounded-t-2xl w-full h-[80vh] flex flex-col shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 頂部拖曳條 + 標題 */}
        <div className="sticky top-0 bg-gradient-to-b from-[#252525] to-[#1a1a1a] border-b border-[#333] flex-shrink-0 z-10">
          <div className="flex justify-center py-2">
            <div className="w-12 h-1 bg-[#666] rounded-full"></div>
          </div>
          <div className="px-5 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{currentModule.icon}</span>
                  <h1 className="text-xl text-white font-bold">
                    {currentModule.title}
                  </h1>
                </div>
                <p className="text-sm text-gray-400">{currentModule.description}</p>
              </div>
              
              {/* 關閉按鈕 */}
              <button
                onClick={onClose}
                className="bg-[#333] text-white p-2 rounded-full text-sm cursor-pointer transition-all duration-200 border border-[#444] hover:bg-orange-600 hover:border-orange-600 flex-shrink-0"
              >
                <ArrowLeft size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* 內容區域 - 可滾動 */}
        <div className="flex-1 overflow-y-auto p-5">
          <ModuleExpandedContent 
            moduleId={moduleId} 
            onModuleClick={() => {}} 
            onHotspotSelect={onHotspotSelect} 
          />
        </div>

        {/* 底部導航 + 摘要預覽 */}
        <div className="border-t-2 border-[#444] bg-[#0d0d0d] flex-shrink-0">
          <div className="grid grid-cols-2 gap-px bg-[#444]">
            {/* 上一篇 */}
            <button
              onClick={() => onNavigate('prev')}
              className="bg-gradient-to-br from-blue-950/40 to-blue-900/20 p-4 hover:from-blue-900/60 hover:to-blue-800/40 transition-all duration-200 text-left group border-r border-[#444]"
            >
              <div className="flex items-center gap-2 mb-2">
                <ArrowLeft size={16} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span className="text-xs text-blue-300/70 uppercase tracking-wider font-semibold">上一篇</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{prevModule.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm truncate group-hover:text-blue-300 transition-colors">
                    {prevModule.title}
                  </div>
                  <div className="text-xs text-blue-200/50 truncate">
                    {prevModule.description}
                  </div>
                </div>
              </div>
            </button>

            {/* 下一篇 */}
            <button
              onClick={() => onNavigate('next')}
              className="bg-gradient-to-bl from-orange-950/40 to-orange-900/20 p-4 hover:from-orange-900/60 hover:to-orange-800/40 transition-all duration-200 text-right group"
            >
              <div className="flex items-center justify-end gap-2 mb-2">
                <span className="text-xs text-orange-300/70 uppercase tracking-wider font-semibold">下一篇</span>
                <ArrowLeft size={16} className="text-orange-400 group-hover:text-orange-300 transition-colors rotate-180" />
              </div>
              <div className="flex items-center gap-2 flex-row-reverse">
                <span className="text-lg">{nextModule.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm truncate group-hover:text-orange-300 transition-colors">
                    {nextModule.title}
                  </div>
                  <div className="text-xs text-orange-200/50 truncate">
                    {nextModule.description}
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== Hotspot Detail Modal ==========

interface HotspotDetailModalProps {
  hotspotId: string;
  onClose: () => void;
}

const HotspotDetailModal: React.FC<HotspotDetailModalProps> = ({ hotspotId, onClose }) => {
  // 從 database 導入 hotspots 和 contentDB
  
  // 找到對應的 hotspot 和 content
  const hotspot = hotspots.find((h: any) => h.id === hotspotId);
  const content = contentDB[hotspotId];
  
  if (!hotspot || !content) return null;

  return (
    <div 
      className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-end justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#1a1a1a] border-t-2 border-orange-600 rounded-t-2xl w-full h-[80vh] overflow-y-auto shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 頂部拖曳條 */}
        <div className="sticky top-0 bg-gradient-to-b from-[#252525] to-[#1a1a1a] border-b border-[#333] flex-shrink-0 z-10">
          <div className="flex justify-center py-2">
            <div className="w-12 h-1 bg-[#666] rounded-full"></div>
          </div>
          <div className="px-5 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-xl text-white font-bold">
                  {hotspot.name}
                </h1>
                <span className="inline-block bg-orange-600/15 text-orange-400 border border-orange-600/30 px-2 py-0.5 rounded text-xs font-bold mt-1 uppercase tracking-wider">
                  {hotspot.cat}
                </span>
              </div>
              
              {/* 關閉按鈕 */}
              <button
                onClick={onClose}
                className="bg-[#333] text-white p-2 rounded-full text-sm cursor-pointer transition-all duration-200 border border-[#444] hover:bg-orange-600 hover:border-orange-600 flex-shrink-0"
              >
                <ArrowLeft size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-5">
          {/* 定義 */}
          <div className="text-[#bbb] text-sm border-l-2 border-orange-600 pl-3 mb-5 italic leading-relaxed">
            {content.def}
          </div>

          {/* 詳細說明 */}
          <ContentBlock title="詳細說明" icon={<Info size={16} />}>
            <div className="bg-[#232323] border border-[#333] rounded-lg p-4 text-sm leading-relaxed text-[#d1d5db]">
              {content.detail}
            </div>
          </ContentBlock>

          {/* SHIFT 組合鍵 */}
          {content.shift && content.shift.length > 0 && content.shift[0] !== "無" && (
            <ContentBlock title="SHIFT 組合鍵" icon={<ToggleLeft size={16} />}>
              <ul className="space-y-2">
                {content.shift.map((item: string, idx: number) => (
                  <li key={idx} className="py-2 border-b border-dashed border-[#333] last:border-b-0 flex items-start gap-3 text-sm">
                    <span className="text-orange-600 font-mono bg-orange-600/10 px-2 py-1 rounded min-w-[70px] text-center flex-shrink-0 text-xs font-bold">
                      SHIFT
                    </span>
                    <span className="text-[#d1d5db] text-sm">{item.replace('SHIFT + ', '').replace('SHIFT+', '')}</span>
                  </li>
                ))}
              </ul>
            </ContentBlock>
          )}

          {/* 常見用途 */}
          {content.usage && content.usage.length > 0 && (
            <ContentBlock title="常見用途" icon={<Zap size={16} />}>
              <div className="bg-[#232323] border border-[#333] rounded-lg p-4">
                <ul className="list-disc list-inside space-y-1.5 text-sm text-[#d1d5db]">
                  {content.usage.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </ContentBlock>
          )}

          {/* 使用技巧 */}
          {content.tip && (
            <ContentBlock title="使用技巧" icon={<Lightbulb size={16} />}>
              <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/10 border border-blue-700/30 rounded-lg p-4 text-sm leading-relaxed text-blue-200">
                💡 {content.tip}
              </div>
            </ContentBlock>
          )}

          {/* MFX 列表 */}
          {content.mfxList && content.mfxList.length > 0 && (
            <ContentBlock title="MFX 效果列表 (42 種)" icon={<Zap size={16} />}>
              <div className="flex flex-col gap-2">
                {content.mfxList.map((mfx: any) => (
                  <div
                    key={mfx.num}
                    className="bg-[#181818] p-3 rounded border border-[#333] transition-all duration-200 hover:border-orange-600 hover:bg-[#222]"
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="text-white font-bold text-sm">
                        <span className="text-orange-600 font-mono mr-2 opacity-80">#{mfx.num}</span>
                        {mfx.name}
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#333] text-[#999] uppercase">
                        {mfx.cat}
                      </span>
                    </div>
                    <div className="text-[#aaa] text-sm leading-relaxed mb-2">
                      {mfx.desc}
                    </div>
                    
                    {/* 調整建議 */}
                    {mfx.tips && (
                      <div className="bg-blue-900/10 border-l-2 border-blue-500/50 pl-2 py-1.5 mb-1.5 text-sm text-blue-300/90">
                        <span className="text-blue-400 font-semibold">💡 調整：</span> {mfx.tips}
                      </div>
                    )}
                    
                    {/* 適合曲風 */}
                    {mfx.genre && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <span className="text-[#666] font-semibold">🎵</span>
                        <span className="text-[#888]">{mfx.genre}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ContentBlock>
          )}
        </div>
      </div>
    </div>
  );
};
