// 指南模組類型定義

export type GuideModuleId = 
  | 'quickstart'
  | 'controls'
  | 'effects'
  | 'shortcuts'
  | 'shortcuts-shift'
  | 'shortcuts-remain'
  | 'shortcuts-value'
  | 'shortcuts-other'
  | 'tips'
  | 'sampling'
  | 'pattern'
  | 'index';

export interface GuideModule {
  id: GuideModuleId;
  title: string;
  icon: string;
  description: string;
  color: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'reference';
}

export const guideModules: GuideModule[] = [
  {
    id: 'quickstart',
    title: '基本概念與快速上手',
    icon: '🚀',
    description: '了解 SP-404MKII 架構，5 步驟從開機到製作歌曲',
    color: 'from-orange-600/20 to-orange-500/10',
    category: 'beginner'
  },
  {
    id: 'controls',
    title: '主要控制區',
    icon: '🎛️',
    description: '音量、參數旋鈕、錄音、表演功能詳解',
    color: 'from-purple-600/20 to-purple-500/10',
    category: 'intermediate'
  },
  {
    id: 'sampling',
    title: '取樣教學',
    icon: '🎤',
    description: '完整取樣工作流程：匯入、錄製、編輯、BPM 同步與切片',
    color: 'from-pink-600/20 to-pink-500/10',
    category: 'advanced'
  },
  {
    id: 'pattern',
    title: 'Pattern 樂段教學',
    icon: '🎼',
    description: '編曲器系統：實時錄音、TR-Rec、樂段串接完整流程',
    color: 'from-indigo-600/20 to-indigo-500/10',
    category: 'advanced'
  },
  {
    id: 'effects',
    title: '效果器系統',
    icon: '🎵',
    description: 'MFX、濾波器、延遲、Bus 路由完整說明',
    color: 'from-green-600/20 to-green-500/10',
    category: 'intermediate'
  },
  {
    id: 'shortcuts',
    title: '快捷鍵總覽',
    icon: '⌨️',
    description: 'SHIFT、REMAIN、VALUE 等所有快捷鍵組合',
    color: 'from-cyan-600/20 to-cyan-500/10',
    category: 'advanced'
  },
  {
    id: 'tips',
    title: '使用技巧',
    icon: '💡',
    description: '6 個進階工作流程與初學者建議',
    color: 'from-yellow-600/20 to-yellow-500/10',
    category: 'intermediate'
  },
  {
    id: 'index',
    title: '功能索引',
    icon: '📑',
    description: '快速查找特定功能',
    color: 'from-gray-600/20 to-gray-500/10',
    category: 'reference'
  },
  // 隱藏的子模組（不在主列表顯示）
  {
    id: 'shortcuts-shift',
    title: 'SHIFT 快捷鍵',
    icon: '🔀',
    description: '35+ 個最常用的 SHIFT 組合鍵',
    color: 'from-orange-600/20 to-orange-500/10',
    category: 'advanced'
  },
  {
    id: 'shortcuts-remain',
    title: 'REMAIN 快捷鍵',
    icon: '🎚️',
    description: 'Bus 路由與同時編輯功能',
    color: 'from-blue-600/20 to-blue-500/10',
    category: 'advanced'
  },
  {
    id: 'shortcuts-value',
    title: 'VALUE 快捷鍵',
    icon: '🎯',
    description: '靜音選擇與 Effect Grab',
    color: 'from-green-600/20 to-green-500/10',
    category: 'advanced'
  },
  {
    id: 'shortcuts-other',
    title: '進階快捷鍵',
    icon: '🚀',
    description: 'DJ 模式、TR-REC、MFX、DEL、COPY 專用',
    color: 'from-purple-600/20 to-purple-500/10',
    category: 'advanced'
  }
];