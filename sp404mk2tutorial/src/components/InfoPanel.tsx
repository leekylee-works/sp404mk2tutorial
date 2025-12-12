import React, { useState } from 'react';
import { ArrowLeft, Info, Zap, Lightbulb, ToggleLeft, BookOpen, Play, Music, Settings, Command, Home } from 'lucide-react';
import { ContentData } from '../data/database';
import { GuideModuleId, guideModules } from '../types/guide';
import { GuideModuleCard } from './GuideModuleCard';

interface InfoPanelProps {
  mode: 'guide' | 'detail';
  selectedId: string | null;
  selectedName: string;
  selectedCat: string;
  content: ContentData | null;
  onBack: () => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({
  mode,
  selectedId,
  selectedName,
  selectedCat,
  content,
  onBack,
}) => {
  const [activeModule, setActiveModule] = useState<GuideModuleId | null>(null);

  const handleModuleClick = (moduleId: GuideModuleId) => {
    setActiveModule(activeModule === moduleId ? null : moduleId);
  };

  const handleBackToModules = () => {
    setActiveModule(null);
  };

  return (
    <div className="w-[400px] flex-shrink-0 bg-[#1a1a1a] border-l border-[#333] flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.6)] z-30">
      <div className="p-4 bg-gradient-to-b from-[#252525] to-[#1a1a1a] border-b border-[#333] flex-shrink-0">
        <h1 className="text-lg text-white">
          SP-404MKII 互動說明書
        </h1>
        <p className="text-xs text-gray-400 mt-1">點擊左側機器元件查看詳細說明</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {mode === 'guide' ? (
          <GuideContent 
            activeModule={activeModule} 
            onModuleClick={handleModuleClick}
            onBackToModules={handleBackToModules}
          />
        ) : (
          <DetailContent
            selectedName={selectedName}
            selectedCat={selectedCat}
            content={content}
            onBack={onBack}
          />
        )}
      </div>
    </div>
  );
};

const GuideContent: React.FC<{ activeModule: GuideModuleId | null, onModuleClick: (moduleId: GuideModuleId) => void, onBackToModules: () => void }> = ({
  activeModule,
  onModuleClick,
  onBackToModules,
}) => {
  return (
    <div className="p-5 text-[#ccc] leading-relaxed text-sm">
      <h2 className="text-orange-600 font-bold text-base mt-2 mb-3 border-b border-[#444] pb-1">
        Roland SP-404MKII 初學者指南
      </h2>
      <p className="mb-4">
        這是一台專業的取樣機（Sampler），適合音樂製作、現場表演和DJ使用。它可以錄音（取樣）、編輯聲音、添加效果器，並組合成歌曲（Pattern）。點擊左側機器上的任何按鈕、旋鈕或打擊墊，即可查看其詳細功能與使用技巧。
      </p>

      <h2 className="text-orange-600 font-bold text-base mt-6 mb-3 border-b border-[#444] pb-1 flex items-center gap-2">
        <BookOpen size={16} />
        基本概念
      </h2>
      
      <div className="bg-[#232323] border border-[#333] rounded-lg p-3 mb-4">
        <h3 className="text-white text-sm font-semibold mb-2">資料組織架構</h3>
        <ul className="space-y-2 text-xs">
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

      <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3 mb-4 text-xs">
        <strong className="text-yellow-400">⚠️ 重要提醒</strong>
        <ul className="mt-2 space-y-1 text-yellow-200/80">
          <li>• 機器使用SD卡儲存資料，無SD卡無法儲存Project</li>
          <li>• 音量從小調起，避免損壞耳朵或喇叭</li>
          <li>• 總是備份Project，使用Protect功能防止誤刪</li>
        </ul>
      </div>

      <h2 className="text-orange-600 font-bold text-base mt-6 mb-3 border-b border-[#444] pb-1 flex items-center gap-2">
        <Play size={16} />
        快速上手步驟
      </h2>
      
      <div className="space-y-3">
        <div className="bg-[#1e1e1e] border-l-4 border-orange-600 p-3 rounded">
          <h3 className="text-white text-sm font-semibold mb-1.5">步驟 1：準備與開機</h3>
          <ol className="list-decimal list-inside text-xs space-y-1 text-[#bbb]">
            <li>連接設備：插SD卡、電源、耳機/喇叭</li>
            <li>按電源鍵開機，選擇Project</li>
            <li>初次使用：格式化SD卡（Utility &gt; Format SD）</li>
          </ol>
        </div>

        <div className="bg-[#1e1e1e] border-l-4 border-orange-600 p-3 rounded">
          <h3 className="text-white text-sm font-semibold mb-1.5">步驟 2：播放Sample（Sample Mode）</h3>
          <ol className="list-decimal list-inside text-xs space-y-1 text-[#bbb]">
            <li>選Bank：按Bank鍵（A-J）</li>
            <li>按Pad [1-16]播放預設音色</li>
            <li>調整：BPM Sync（同步速度）、Loop（循環）、Gate（按住播放）</li>
          </ol>
        </div>

        <div className="bg-[#1e1e1e] border-l-4 border-orange-600 p-3 rounded">
          <h3 className="text-white text-sm font-semibold mb-1.5">步驟 3：錄音取樣</h3>
          <ol className="list-decimal list-inside text-xs space-y-1 text-[#bbb]">
            <li>按REC進入Record Setting</li>
            <li>設定輸入源（麥克風/樂器/USB）</li>
            <li>再按REC開始錄音，按END結束</li>
            <li>使用RESAMPLE可將播放+效果錄回機器</li>
          </ol>
        </div>

        <div className="bg-[#1e1e1e] border-l-4 border-orange-600 p-3 rounded">
          <h3 className="text-white text-sm font-semibold mb-1.5">步驟 4：編輯Sample</h3>
          <ol className="list-decimal list-inside text-xs space-y-1 text-[#bbb]">
            <li>START/END：設定播放起訖點</li>
            <li>MARK：加標記點，SHIFT + START/END = Chop分割</li>
            <li>PITCH/SPEED：調整音高/速度</li>
            <li>SHIFT + PITCH/SPEED：Envelope（淡入/淡出）</li>
          </ol>
        </div>

        <div className="bg-[#1e1e1e] border-l-4 border-orange-600 p-3 rounded">
          <h3 className="text-white text-sm font-semibold mb-1.5">步驟 5：製作Pattern（歌曲）</h3>
          <ol className="list-decimal list-inside text-xs space-y-1 text-[#bbb]">
            <li>按PATTERN SELECT進入Pattern模式</li>
            <li>即時錄：按REC，播放Pad錄製演奏</li>
            <li>步進錄：SHIFT + REC進入TR-REC模式</li>
            <li>可將Pattern Resample成新Sample</li>
          </ol>
        </div>
      </div>

      <h2 className="text-orange-600 font-bold text-base mt-6 mb-3 border-b border-[#444] pb-1 flex items-center gap-2">
        <Music size={16} />
        主要控制區
      </h2>
      
      <h3 className="text-white text-sm font-semibold mt-4 mb-2">
        音量與參數控制
      </h3>
      <ul className="list-disc pl-5 mb-3 text-xs space-y-1">
        <li><strong>VOLUME</strong>: 總音量控制（類比衰減器）</li>
        <li><strong>CTRL 1-3</strong>: 多功能參數旋鈕（Filter, Resonance, Drive）</li>
        <li><strong>VALUE輪盤</strong>: 核心導航控制器，轉動選擇、按下確認</li>
      </ul>

      <h3 className="text-white text-sm font-semibold mt-4 mb-2">
        效果器區
      </h3>
      <ul className="list-disc pl-5 mb-3 text-xs space-y-1">
        <li><strong>MFX</strong>: 41 種多重效果器（Vinyl Sim, Cassette, Scatter等）</li>
        <li><strong>FILTER+DRIVE</strong>: 經典濾波器與破音效果</li>
        <li><strong>DELAY</strong>: 延遲回音效果</li>
        <li><strong>RESONATOR</strong>: 共鳴器效果</li>
        <li><strong>ISOLATOR</strong>: 頻率隔離器（DJ EQ）</li>
        <li><strong>DJFX LOOPER</strong>: DJ 風格循環效果</li>
      </ul>

      <h3 className="text-white text-sm font-semibold mt-4 mb-2">
        錄音與編輯
      </h3>
      <ul className="list-disc pl-5 mb-3 text-xs space-y-1">
        <li><strong>REC</strong>: 錄音（SHIFT+REC = TR-REC 步進模式）</li>
        <li><strong>RESAMPLE</strong>: 重新取樣（核心工作流！）</li>
        <li><strong>START/END</strong>: 設定取樣起訖點</li>
        <li><strong>PITCH/SPEED</strong>: 音高與速度調整</li>
        <li><strong>MARK</strong>: 標記波形切點</li>
      </ul>

      <h3 className="text-white text-sm font-semibold mt-4 mb-2">
        表演功能
      </h3>
      <ul className="list-disc pl-5 mb-3 text-xs space-y-1">
        <li><strong>ROLL</strong>: 滾奏效果（Hi-hat rolls）</li>
        <li><strong>LOOP</strong>: 循環播放</li>
        <li><strong>REVERSE</strong>: 倒轉播放 / Pad Mute</li>
        <li><strong>GATE</strong>: 門限播放模式（按住播放）</li>
        <li><strong>HOLD</strong>: 鎖定播放（無限延音）</li>
        <li><strong>BPM SYNC</strong>: 速度同步至Project BPM</li>
      </ul>

      <h2 className="text-orange-600 font-bold text-base mt-6 mb-3 border-b border-[#444] pb-1 flex items-center gap-2">
        <ToggleLeft size={16} />
        SHIFT 組合鍵精選
      </h2>
      <p className="text-xs mb-3">
        按住 <strong className="text-orange-400">SHIFT</strong> 鍵可以啟用所有按鈕下方的次要功能（橘色標示）。以下是最常用的組合：
      </p>
      
      <div className="grid grid-cols-1 gap-2 mb-4">
        <div className="bg-[#232323] border border-[#333] rounded p-2 text-xs">
          <span className="text-orange-400 font-mono text-[10px] bg-orange-600/10 px-1.5 py-0.5 rounded mr-2">SHIFT + EXIT</span>
          <span className="text-[#bbb]">停止所有聲音（緊急靜音）</span>
        </div>
        <div className="bg-[#232323] border border-[#333] rounded p-2 text-xs">
          <span className="text-orange-400 font-mono text-[10px] bg-orange-600/10 px-1.5 py-0.5 rounded mr-2">SHIFT + Pad 13</span>
          <span className="text-[#bbb]">進入 Utility 系統選單</span>
        </div>
        <div className="bg-[#232323] border border-[#333] rounded p-2 text-xs">
          <span className="text-orange-400 font-mono text-[10px] bg-orange-600/10 px-1.5 py-0.5 rounded mr-2">SHIFT + Pad 4</span>
          <span className="text-[#bbb]">Chromatic 模式（音階演奏）</span>
        </div>
        <div className="bg-[#232323] border border-[#333] rounded p-2 text-xs">
          <span className="text-orange-400 font-mono text-[10px] bg-orange-600/10 px-1.5 py-0.5 rounded mr-2">SHIFT + MFX</span>
          <span className="text-[#bbb]">進入 MFX 選單選擇效果</span>
        </div>
        <div className="bg-[#232323] border border-[#333] rounded p-2 text-xs">
          <span className="text-orange-400 font-mono text-[10px] bg-orange-600/10 px-1.5 py-0.5 rounded mr-2">SHIFT + START/END</span>
          <span className="text-[#bbb]">Chop（分割Sample至多個Pad）</span>
        </div>
        <div className="bg-[#232323] border border-[#333] rounded p-2 text-xs">
          <span className="text-orange-400 font-mono text-[10px] bg-orange-600/10 px-1.5 py-0.5 rounded mr-2">SHIFT + REC</span>
          <span className="text-[#bbb]">TR-REC（步進錄音模式）</span>
        </div>
        <div className="bg-[#232323] border border-[#333] rounded p-2 text-xs">
          <span className="text-orange-400 font-mono text-[10px] bg-orange-600/10 px-1.5 py-0.5 rounded mr-2">SHIFT + PITCH/SPEED</span>
          <span className="text-[#bbb]">Envelope（ADSR / 淡入淡出）</span>
        </div>
        <div className="bg-[#232323] border border-[#333] rounded p-2 text-xs">
          <span className="text-orange-400 font-mono text-[10px] bg-orange-600/10 px-1.5 py-0.5 rounded mr-2">SHIFT + Pad 1</span>
          <span className="text-[#bbb]">Fixed Velocity（固定力度）</span>
        </div>
        <div className="bg-[#232323] border border-[#333] rounded p-2 text-xs">
          <span className="text-orange-400 font-mono text-[10px] bg-orange-600/10 px-1.5 py-0.5 rounded mr-2">SHIFT + Pad 9</span>
          <span className="text-[#bbb]">開關節拍器</span>
        </div>
      </div>

      <h2 className="text-orange-600 font-bold text-base mt-6 mb-3 border-b border-[#444] pb-1 flex items-center gap-2">
        <Lightbulb size={16} />
        進階使用技巧
      </h2>
      <ul className="space-y-2 text-xs">
        <li className="bg-[#232323] border border-[#333] rounded p-2">
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
          <span className="text-[#bbb]"> 這是 SP 的核心！將 Pattern 錄成 Audio Loop，可以釋放發音數並添加效果</span>
        </li>
        <li className="bg-[#232323] border border-[#333] rounded p-2">
          <strong className="text-blue-400">Chop 功能：</strong>
          <span className="text-[#bbb]"> 非常強大，可用於製作 Hip Hop 鼓組，自動將 Sample 切片至 16 個 Pad</span>
        </li>
        <li className="bg-[#232323] border border-[#333] rounded p-2">
          <strong className="text-blue-400">Live Mode：</strong>
          <span className="text-[#bbb]"> 按住 REMAIN 3 秒鎖定不常用鍵，現場表演防止誤觸</span>
        </li>
      </ul>

      <h2 className="text-orange-600 font-bold text-base mt-6 mb-3 border-b border-[#444] pb-1 flex items-center gap-2">
        <Command size={16} />
        快捷鍵完整列表（Ver. 3.00）
      </h2>
      <p className="text-xs mb-3 text-[#bbb]">
        SP-404MKII 提供豐富的快捷鍵組合，讓你在不進入選單的情況下快速存取功能。以下按功能鍵分類：
      </p>

      {/* SHIFT 快捷鍵 */}
      <details className="mb-3 bg-[#1e1e1e] border border-[#333] rounded overflow-hidden">
        <summary className="cursor-pointer p-3 text-sm font-semibold text-orange-400 hover:bg-[#252525] transition-colors">
          使用 SHIFT 鍵的快捷功能（最常用）
        </summary>
        <div className="p-3 pt-0 space-y-2 text-xs">
          <div className="grid grid-cols-1 gap-1.5 mt-2">
            <ShortcutItem keys="SHIFT + Pad 1" desc="FIXED VELOCITY - 固定力度 127 播放" />
            <ShortcutItem keys="SHIFT + Pad 2" desc="VELOCITY - 步進改變力度" />
            <ShortcutItem keys="SHIFT + Pad 3" desc="CUE - 調整耳機監聽平衡" />
            <ShortcutItem keys="SHIFT + Pad 4" desc="CHROMATIC - 半音階模式（音階演奏）" />
            <ShortcutItem keys="SHIFT + Pad 5" desc="EXCHANGE - 交換 Pad 資料" />
            <ShortcutItem keys="SHIFT + Pad 6" desc="INIT PARAM - 初始化參數" />
            <ShortcutItem keys="SHIFT + Pad 7" desc="PAD LINK - 群組同時播放" />
            <ShortcutItem keys="SHIFT + Pad 8" desc="MUTE GROUP - 互斥群組設定" />
            <ShortcutItem keys="SHIFT + Pad 9" desc="METRONOME - 開關節拍器" />
            <ShortcutItem keys="SHIFT + Pad 10" desc="COUNT-IN - 加入預備拍" />
            <ShortcutItem keys="SHIFT + Pad 11" desc="TAP TEMPO - 敲擊設定 BPM" />
            <ShortcutItem keys="SHIFT + Pad 12" desc="GAIN - 顯示增益選單" />
            <ShortcutItem keys="SHIFT + Pad 13" desc="UTILITY - 進入系統選單" />
            <ShortcutItem keys="SHIFT + Pad 14" desc="IMPORT/EXPORT - 匯入匯出選單" />
            <ShortcutItem keys="SHIFT + Pad 15" desc="PAD SETTING - Pad 設定" />
            <ShortcutItem keys="SHIFT + Pad 16" desc="EFX SETTING - 效果器設定" />
            <div className="h-px bg-[#333] my-2" />
            <ShortcutItem keys="SHIFT + BUS FX" desc="MUTE BUS - 僅輸出效果聲（暫時關閉原音）" />
            <ShortcutItem keys="SHIFT + HOLD" desc="PAUSE - 暫停播放" />
            <ShortcutItem keys="SHIFT + EXT SOURCE" desc="INPUT SETTING - 輸入設定畫面" />
            <ShortcutItem keys="SHIFT + SUB PAD" desc="PROJECT - 選擇專案" />
            <ShortcutItem keys="SHIFT + MARK (3秒)" desc="SAVE EFX PARAM - 儲存效果器參數" />
            <ShortcutItem keys="SHIFT + PITCH/SPEED" desc="ENVELOPE - 淡入淡出設定（ADSR）" />
            <ShortcutItem keys="SHIFT + START/END" desc="CHOP - 自動切片至 16 個 Pad" />
            <ShortcutItem keys="SHIFT + PATTERN SELECT" desc="UNDO - 撤銷錄音" />
            <ShortcutItem keys="SHIFT + ROLL" desc="ROLL SET - 設定滾奏間隔" />
            <ShortcutItem keys="SHIFT + REVERSE + Pad" desc="PAD MUTE - 開關 Pad 靜音" />
            <ShortcutItem keys="SHIFT + REVERSE + REMAIN" desc="PAD MUTE MODE - 鎖定靜音模式" />
            <ShortcutItem keys="SHIFT + LOOP" desc="PING-PONG LOOP - 來回循環" />
            <ShortcutItem keys="SHIFT + GATE" desc="GATE ALL ON/OFF - 全 Bank Gate 開關" />
            <ShortcutItem keys="SHIFT + BPM SYNC" desc="SYNC ALL ON/OFF - 全 Bank 同步開關" />
            <ShortcutItem keys="SHIFT + REC" desc="TR-REC - 步進錄音模式" />
            <ShortcutItem keys="SHIFT + Bank 鍵" desc="BANK VOLUME - 調整 Bank 音量" />
            <ShortcutItem keys="SHIFT + REMAIN (3秒)" desc="LIVE MODE - 鎖定不常用鍵" />
            <ShortcutItem keys="SHIFT + COPY" desc="BANK PROTECT - 保護 Bank 防誤刪" />
            <ShortcutItem keys="SHIFT + EXIT" desc="STOP - 緊急停止所有聲音" highlight />
          </div>
        </div>
      </details>

      {/* REMAIN 快捷鍵 */}
      <details className="mb-3 bg-[#1e1e1e] border border-[#333] rounded overflow-hidden">
        <summary className="cursor-pointer p-3 text-sm font-semibold text-blue-400 hover:bg-[#252525] transition-colors">
          使用 REMAIN 鍵的快捷功能（效果路由）
        </summary>
        <div className="p-3 pt-0 space-y-2 text-xs">
          <div className="grid grid-cols-1 gap-1.5 mt-2">
            <ShortcutItem keys="REMAIN + Pad 1-16" desc="設定 Sample 的 Bus 路由（橘=Bus1, 綠=Bus2, 白=Dry）" highlight />
            <ShortcutItem keys="REMAIN + Bank 鍵" desc="設定整個 Bank 的 Bus Send" />
            <ShortcutItem keys="REMAIN + MFX" desc="鎖定效果器編輯畫面" />
            <ShortcutItem keys="REMAIN + BUS FX" desc="交換 Bus 1 和 Bus 2 的效果器" />
            <ShortcutItem keys="REMAIN + 編輯參數" desc="同時編輯多個 Sample（Pitch/Speed/Envelope 畫面）" />
          </div>
        </div>
      </details>

      {/* VALUE 快捷鍵 */}
      <details className="mb-3 bg-[#1e1e1e] border border-[#333] rounded overflow-hidden">
        <summary className="cursor-pointer p-3 text-sm font-semibold text-green-400 hover:bg-[#252525] transition-colors">
          使用 VALUE 輪盤的快捷功能
        </summary>
        <div className="p-3 pt-0 space-y-2 text-xs">
          <div className="grid grid-cols-1 gap-1.5 mt-2">
            <ShortcutItem keys="VALUE + Pad 1-16" desc="選擇 Sample 不播放（靜音選擇）" highlight />
            <ShortcutItem keys="VALUE + BUS FX" desc="暫時 Bypass Bus 3/4" />
            <ShortcutItem keys="VALUE + SUB PAD" desc="最小延遲多 Pad 播放" />
            <ShortcutItem keys="VALUE + 效果器鍵" desc="Effect Grab（僅按住時應用效果）" highlight />
            <ShortcutItem keys="VALUE + GATE" desc="One-Shot 單次播放模式開關" />
          </div>
        </div>
      </details>

      {/* DEL 快捷鍵 */}
      <details className="mb-3 bg-[#1e1e1e] border border-[#333] rounded overflow-hidden">
        <summary className="cursor-pointer p-3 text-sm font-semibold text-red-400 hover:bg-[#252525] transition-colors">
          使用 DEL 鍵的快捷功能（小心使用）
        </summary>
        <div className="p-3 pt-0 space-y-2 text-xs">
          <div className="grid grid-cols-1 gap-1.5 mt-2">
            <ShortcutItem keys="DEL + MARK" desc="刪除 Pattern 的效果器動作（Motion）" />
            <ShortcutItem keys="DEL + REVERSE" desc="刪除 Pattern 的 Pad Mute 動作" />
            <ShortcutItem keys="DEL + EXIT" desc="刪除整個 Bank（不可復原！）" danger />
          </div>
        </div>
      </details>

      {/* COPY 快捷鍵 */}
      <details className="mb-3 bg-[#1e1e1e] border border-[#333] rounded overflow-hidden">
        <summary className="cursor-pointer p-3 text-sm font-semibold text-purple-400 hover:bg-[#252525] transition-colors">
          使用 COPY 鍵的快捷功能
        </summary>
        <div className="p-3 pt-0 space-y-2 text-xs">
          <div className="grid grid-cols-1 gap-1.5 mt-2">
            <ShortcutItem keys="COPY + 編輯參數" desc="同時編輯 Mute Group 的多個 Sample" />
            <ShortcutItem keys="COPY + EXIT" desc="複製整個 Bank" />
          </div>
        </div>
      </details>

      {/* MFX/DJ/TR-REC 快捷鍵 */}
      <details className="mb-3 bg-[#1e1e1e] border border-[#333] rounded overflow-hidden">
        <summary className="cursor-pointer p-3 text-sm font-semibold text-cyan-400 hover:bg-[#252525] transition-colors">
          其他快捷功能（MFX / DJ / TR-REC）
        </summary>
        <div className="p-3 pt-0 space-y-2 text-xs">
          <h4 className="text-white font-semibold mt-2 mb-1">MFX 快捷鍵</h4>
          <div className="grid grid-cols-1 gap-1.5">
            <ShortcutItem keys="MFX + DJFX LOOPER" desc="跳至 MFX 列表 #17~" />
            <ShortcutItem keys="MFX + ISOLATOR" desc="跳至 MFX 列表 #33~" />
          </div>

          <h4 className="text-white font-semibold mt-3 mb-1">DJ 模式專用</h4>
          <div className="grid grid-cols-1 gap-1.5">
            <ShortcutItem keys="SHIFT + REVERSE + Pad 13/15" desc="CH1/CH2 靜音" />
            <ShortcutItem keys="SHIFT + Pad 1-16" desc="從標記點播放" />
            <ShortcutItem keys="SHIFT + REMAIN" desc="鎖定 SHIFT（方便選標記）" />
            <ShortcutItem keys="SHIFT + MARK" desc="播放中加標記" />
            <ShortcutItem keys="SHIFT + START/END" desc="播放中編輯標記" />
            <ShortcutItem keys="SHIFT + DEL + Pad" desc="刪除標記" />
            <ShortcutItem keys="SHIFT + ROLL" desc="設定 Roll Size（1/4~2 小節）" />
            <ShortcutItem keys="ROLL + Pad 13/15" desc="CH1/CH2 Roll" />
            <ShortcutItem keys="ROLL + Pad 1-4" desc="改變 Roll 間隔" />
            <ShortcutItem keys="REMAIN + Pad 14/16" desc="切換 CH1/CH2 Bus FX" />
            <ShortcutItem keys="RESAMPLE + VALUE" desc="選擇音量曲線（Fast Cut/Linear/Square/Cubic）" />
            <ShortcutItem keys="DEL + Pad 2+6 / 4+8" desc="重置 CH1/CH2 BPM" />
            <ShortcutItem keys="START/END" desc="切換 CTRL3 功能（CUE/X-FADE）" />
            <ShortcutItem keys="PITCH/SPEED" desc="改變 BPM 顯示位數" />
            <ShortcutItem keys="MARK" desc="切換 EFX/MIXER 畫面" />
            <ShortcutItem keys="BPM SYNC" desc="選擇 Reverse 控制頻道" />
          </div>

          <h4 className="text-white font-semibold mt-3 mb-1">TR-REC 步進錄音模式</h4>
          <div className="grid grid-cols-1 gap-1.5">
            <ShortcutItem keys="DEL + A/F" desc="刪除一小節音符（單 Pad）" />
            <ShortcutItem keys="DEL + B/G" desc="刪除一小節音符（全 Pad）" />
            <ShortcutItem keys="ROLL + CTRL 1/2/3" desc="錄製旋鈕動作（Motion）" />
            <ShortcutItem keys="VALUE + SUB PAD + Pad" desc="選擇不播放" />
          </div>
        </div>
      </details>

      <div className="bg-gradient-to-r from-orange-900/20 to-orange-800/10 border border-orange-700/30 rounded-lg p-3 mt-4 text-xs">
        <strong className="text-orange-400">💡 快捷鍵學習建議</strong>
        <ul className="mt-2 space-y-1 text-orange-200/80">
          <li>• 先熟記 SHIFT + Pad 1-16 的功能，這是最常用的</li>
          <li>• REMAIN + Pad 控制效果路由，這是進階音色設計的關鍵</li>
          <li>• VALUE + Pad 靜音選擇，編輯時超好用</li>
          <li>• SHIFT + EXIT 是緊急停止鍵，現場表演必備</li>
          <li>• 點擊左側機器上的按鈕可查看該按鈕的完整快捷鍵列表</li>
        </ul>
      </div>

      <h2 className="text-orange-600 font-bold text-base mt-6 mb-3 border-b border-[#444] pb-1 flex items-center gap-2">
        <Settings size={16} />
        重要功能索引
      </h2>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-[#1e1e1e] border border-[#333] rounded p-2">
          <div className="text-orange-400 font-semibold mb-1">取樣/錄音</div>
          <div className="text-[#999]">REC, RESAMPLE, Skip-Back</div>
        </div>
        <div className="bg-[#1e1e1e] border border-[#333] rounded p-2">
          <div className="text-orange-400 font-semibold mb-1">效果器</div>
          <div className="text-[#999]">BUS FX, MFX (41種)</div>
        </div>
        <div className="bg-[#1e1e1e] border border-[#333] rounded p-2">
          <div className="text-orange-400 font-semibold mb-1">編輯Sample</div>
          <div className="text-[#999]">Start/End, Chop, Envelope</div>
        </div>
        <div className="bg-[#1e1e1e] border border-[#333] rounded p-2">
          <div className="text-orange-400 font-semibold mb-1">Pattern</div>
          <div className="text-[#999]">Create, TR-REC, Chain</div>
        </div>
        <div className="bg-[#1e1e1e] border border-[#333] rounded p-2">
          <div className="text-orange-400 font-semibold mb-1">DJ Mode</div>
          <div className="text-[#999]">Mix, CUE, Crossfader</div>
        </div>
        <div className="bg-[#1e1e1e] border border-[#333] rounded p-2">
          <div className="text-orange-400 font-semibold mb-1">系統</div>
          <div className="text-[#999]">Utility, Import/Export</div>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 mt-6 text-xs">
        <strong className="text-blue-400">💡 初學者建議</strong>
        <ul className="mt-2 space-y-1 text-blue-200/80">
          <li>1. 先玩預設 Sample，熟悉按鍵和效果器</li>
          <li>2. 學會 RESAMPLE 工作流，這是 SP 的精髓</li>
          <li>3. 熟記常用 SHIFT 組合鍵</li>
          <li>4. 使用 Protect 功能保護重要 Sample</li>
          <li>5. 定期備份 Project 到 SD 卡</li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 mt-8 border-t border-[#333] pt-4">
        <em>此為互動式說明書，整合自 Roland 官方手冊 Ver. 3.00 & 2.00。點擊左側機器元件可查看更詳細的按鈕說明。</em>
      </p>
    </div>
  );
};

interface DetailContentProps {
  selectedName: string;
  selectedCat: string;
  content: ContentData | null;
  onBack: () => void;
}

const DetailContent: React.FC<DetailContentProps> = ({
  selectedName,
  selectedCat,
  content,
  onBack,
}) => {
  if (!content) return null;

  return (
    <div className="p-5">
      <button
        onClick={onBack}
        className="bg-[#333] text-white px-3 py-1 rounded text-xs cursor-pointer flex items-center gap-2 transition-all duration-200 border border-[#444] hover:bg-orange-600 hover:border-orange-600 mb-4"
      >
        <ArrowLeft size={14} />
        返回指南
      </button>

      <div className="text-2xl font-bold text-white leading-tight mb-1.5 tracking-tight">
        {selectedName}
      </div>

      <span className="inline-block bg-orange-600/15 text-orange-600 border border-orange-600/30 px-1.5 py-0.5 rounded text-[10px] font-extrabold mb-2 uppercase tracking-wider">
        {selectedCat}
      </span>

      <div className="text-[#bbb] text-sm border-l-2 border-orange-600 pl-2.5 mb-4 italic leading-relaxed">
        {content.def}
      </div>

      {/* 詳細說明 */}
      <ContentBlock title="詳細說明" icon={<Info size={14} />}>
        <div className="bg-[#232323] border border-[#333] rounded-lg p-3 text-sm leading-relaxed text-[#d1d5db]">
          {content.detail}
        </div>
      </ContentBlock>

      {/* SHIFT 組合鍵 */}
      {content.shift && content.shift.length > 0 && content.shift[0] !== "無" && (
        <ContentBlock title="SHIFT 組合鍵" icon={<ToggleLeft size={14} />}>
          <ul className="space-y-1.5">
            {content.shift.map((item, idx) => (
              <li key={idx} className="py-1.5 border-b border-dashed border-[#333] last:border-b-0 flex items-start gap-2.5 text-sm">
                <span className="text-orange-600 font-mono bg-orange-600/10 px-1 rounded min-w-[70px] text-center flex-shrink-0 text-xs font-bold">
                  SHIFT
                </span>
                <span className="text-[#d1d5db]">{item.replace('SHIFT + ', '').replace('SHIFT+', '')}</span>
              </li>
            ))}
          </ul>
        </ContentBlock>
      )}

      {/* 常見用途 */}
      {content.usage && content.usage.length > 0 && (
        <ContentBlock title="常見用途" icon={<Zap size={14} />}>
          <div className="bg-[#232323] border border-[#333] rounded-lg p-3">
            <ul className="list-disc list-inside space-y-1 text-sm text-[#d1d5db]">
              {content.usage.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </ContentBlock>
      )}

      {/* 使用技巧 */}
      {content.tip && (
        <ContentBlock title="使用技巧" icon={<Lightbulb size={14} />}>
          <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/10 border border-blue-700/30 rounded-lg p-3 text-sm leading-relaxed text-blue-200">
            💡 {content.tip}
          </div>
        </ContentBlock>
      )}

      {/* MFX 列表 */}
      {content.mfxList && content.mfxList.length > 0 && (
        <ContentBlock title="MFX 效果列表 (41 種)" icon={<Zap size={14} />}>
          <div className="flex flex-col gap-1.5">
            {content.mfxList.map((mfx) => (
              <div
                key={mfx.num}
                className="bg-[#181818] p-2 rounded border border-[#333] transition-all duration-200 hover:border-orange-600 hover:bg-[#222]"
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="text-white font-bold text-xs">
                    <span className="text-orange-600 font-mono mr-1.5 opacity-80">#{mfx.num}</span>
                    {mfx.name}
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#333] text-[#999] uppercase">
                    {mfx.cat}
                  </span>
                </div>
                <div className="text-[#aaa] text-[11px] leading-snug">
                  {mfx.desc}
                </div>
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
    <div className="mb-5">
      <div className="text-xs font-bold text-[#888] uppercase tracking-wide mb-2 flex items-center gap-1.5 border-b border-[#333] pb-1">
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
};

interface ShortcutItemProps {
  keys: string;
  desc: string;
  highlight?: boolean;
  danger?: boolean;
}

const ShortcutItem: React.FC<ShortcutItemProps> = ({ keys, desc, highlight, danger }) => {
  return (
    <div className={`flex items-start gap-2 p-1.5 rounded ${
      highlight ? 'bg-orange-600/5 border border-orange-600/20' : ''
    } ${
      danger ? 'bg-red-600/5 border border-red-600/20' : ''
    }`}>
      <span
        className={`font-mono text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap flex-shrink-0 ${
          highlight ? 'bg-orange-600/20 text-orange-300' : danger ? 'bg-red-600/20 text-red-300' : 'bg-[#333] text-[#aaa]'
        }`}
      >
        {keys}
      </span>
      <span className={`text-[11px] ${danger ? 'text-red-200' : 'text-[#bbb]'}`}>{desc}</span>
    </div>
  );
};