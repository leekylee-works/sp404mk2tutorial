// ========== SP-404MKII 資料庫 (database.ts) ==========

export interface HotspotData {
  id: string;
  name: string;
  cat: string;
  rect: [number, number, number, number]; // [top%, left%, width%, height%]
  type: 'knob' | 'rect' | 'pad';
}

export interface WorkflowStep {
  title: string;
  steps: string[];
}

export interface KeyCombination {
  keys: string;
  desc: string;
}

export interface MusicExample {
  title: string;
  desc: string;
  genre?: string;
}

export interface ContentData {
  def: string;
  detail: string;
  shift: string[];
  usage: string[];
  tip: string;
  mfxList?: MFXItem[];
  category?: string; // 新增：功能分類
  relatedButtons?: string[]; // 新增：相關按鈕
  workflow?: WorkflowStep[]; // 新增：工作流程
  combinations?: KeyCombination[]; // 新增：詳細組合鍵
  examples?: MusicExample[]; // 新增：音樂範例
  warnings?: string[]; // 新增：注意事項
  proTips?: string[]; // 新增：專業技巧
}

export interface MFXItem {
  num: number;
  name: string;
  cat: string;
  desc: string;
  tips: string;
  genre: string;
}

export const mfxEffects: MFXItem[] = [
  // === 按字母排序 A-Z (唯一編號 1-42) ===
  { num: 1, name: "AUTO FILTER", cat: "Filter", desc: "自動濾波器", tips: "同步 1/8 或 1/4，Resonance 70% 製造律動", genre: "House, Techno, Electro" },
  { num: 2, name: "AUTO PAN", cat: "Modulation", desc: "節奏性聲像移動", tips: "同步 1/16 音符製造律動感，Depth 80%", genre: "Techno, Drum & Bass, Breakbeat" },
  { num: 3, name: "BEAT REPEAT", cat: "Time", desc: "節拍重複效果", tips: "1/16 同步，Repeat 2-4 次，用於 Fill", genre: "Trap, Hip Hop, Glitch Hop" },
  { num: 4, name: "CASSETTE", cat: "Lo-Fi", desc: "卡帶機老化音色，Wow & Flutter 效果", tips: "增加 Wow 製造音高漂移，Saturation 加溫暖感", genre: "Synthwave, Vaporwave, Chillwave" },
  { num: 5, name: "CHORUS", cat: "Modulation", desc: "合唱效果", tips: "Rate 慢速（0.5-2Hz），Depth 適中避免過於飄", genre: "Pop, R&B, Synthpop" },
  { num: 6, name: "COMP", cat: "Dynamics", desc: "壓縮器，控制動態範圍", tips: "Ratio 3:1 起步，Attack 慢讓打擊感保留", genre: "所有曲風（混音必備）" },
  { num: 7, name: "DECIMATOR", cat: "Lo-Fi", desc: "破壞性降頻效果", tips: "Sample Rate 降至極低，製造極端毀損感", genre: "Glitch, Industrial, Harsh Noise" },
  { num: 8, name: "DELAY", cat: "Time", desc: "延遲回音", tips: "1/4 或 1/8 音符同步 BPM，Feedback 40-60%", genre: "Dub, Reggae, Ambient, Techno" },
  { num: 9, name: "DISTORTION", cat: "Drive", desc: "失真破音", tips: "Drive 適中，配合 Filter 削減高頻噪音", genre: "Rock, Industrial, Drum & Bass" },
  { num: 10, name: "DJFX LOOPER", cat: "DJ/Performance", desc: "DJ 風格循環效果與即時操作", tips: "Length 設 1/2 或 1 bar，Roll + Scatter 組合", genre: "Hip Hop, Breaks, DJ Sets, Live Performance" },
  { num: 11, name: "DOUBLER", cat: "Space", desc: "加倍效果", tips: "Delay 10-30ms，微調 Pitch 製造厚度", genre: "Pop, R&B, Vocals" },
  { num: 12, name: "EQ", cat: "Tone", desc: "參數等化器", tips: "Low Shelf 提升溫暖，High Shelf 削減刺耳", genre: "所有曲風（調音必備）" },
  { num: 13, name: "FILTER BANK", cat: "Filter", desc: "多頻段濾波器組", tips: "分段調整製造 Vowel 母音效果", genre: "Techno, Electro, Experimental" },
  { num: 14, name: "FLANGER", cat: "Modulation", desc: "鑲邊效果", tips: "Feedback 提高製造金屬感，Rate 配合節奏", genre: "Psychedelic Rock, Techno" },
  { num: 15, name: "FREQUENCY SHIFTER", cat: "Modulation", desc: "頻率偏移", tips: "±50-200Hz 製造不和諧金屬音色", genre: "Industrial, Experimental, Sci-Fi" },
  { num: 16, name: "FUZZ", cat: "Drive", desc: "重度破音", tips: "全開製造極端失真，Mix 50% 混合乾聲", genre: "Psych Rock, Stoner Rock, Noise" },
  { num: 17, name: "GATE", cat: "Dynamics", desc: "噪音門", tips: "Threshold 設定在底噪之上，Release 快速", genre: "Techno, Minimal, Dubstep" },
  { num: 18, name: "GRAIN SHIFTER", cat: "Glitch", desc: "顆粒合成效果", tips: "Grain Size 小製造顆粒感，Pitch 隨機化", genre: "Ambient, Glitch, Experimental" },
  { num: 19, name: "GRANULAR", cat: "Glitch", desc: "顆粒延遲", tips: "Grain Density 高，Feedback 適中製造雲霧感", genre: "Ambient, Glitch, Soundscape" },
  { num: 20, name: "GRAPHIC EQ", cat: "Tone", desc: "圖形等化器", tips: "中頻略降製造 Smiley EQ（笑臉曲線）", genre: "EDM, Pop, Dance" },
  { num: 21, name: "HARMONIZER", cat: "Pitch", desc: "和聲產生器", tips: "+7 或 +5 半音疊加和弦，Mix 40%", genre: "Trance, Psytrance, Melodic House" },
  { num: 22, name: "LIMITER", cat: "Dynamics", desc: "限幅器", tips: "Threshold -1dB，避免削波，用於 Master", genre: "所有曲風（Mastering）" },
  { num: 23, name: "LO-FI", cat: "Lo-Fi", desc: "降低位元深度與取樣率", tips: "Bit Depth 降至 8-10 bit，Sample Rate 減半", genre: "Lo-Fi Hip Hop, Chiptune" },
  { num: 24, name: "OVERDRIVE", cat: "Drive", desc: "溫和破音", tips: "Drive 40-60%，保留動態，適合鼓組", genre: "Blues, Lo-Fi, Boom Bap" },
  { num: 25, name: "PAN", cat: "Modulation", desc: "自動聲像移動", tips: "Rate 慢速製造寬廣感，快速製造迷幻感", genre: "Trance, Ambient, Experimental" },
  { num: 26, name: "PHASER", cat: "Modulation", desc: "相位效果", tips: "Stages 4-6，Resonance 適中避免太尖銳", genre: "Funk, Disco, Psytrance" },
  { num: 27, name: "PITCH SHIFTER", cat: "Pitch", desc: "音高變換", tips: "+12 或 -12 半音疊加和聲，Mix 30-50%", genre: "Pop, EDM, Trap" },
  { num: 28, name: "RADIO", cat: "Lo-Fi", desc: "收音機質感", tips: "Frequency 調至 AM 範圍，加入雜訊", genre: "Lo-Fi, Vaporwave, Retro" },
  { num: 29, name: "REPEAT", cat: "Time", desc: "循環重複", tips: "1/16 或 1/32 製造 Stutter，手動觸發最佳", genre: "Trap, Dubstep, Bass Music" },
  { num: 30, name: "REVERB", cat: "Space", desc: "空間混響", tips: "Time 1-2 秒適中，Pre-Delay 20-40ms 增加深度", genre: "所有曲風" },
  { num: 31, name: "RING MOD", cat: "Modulation", desc: "環形調變，金屬音色", tips: "Frequency 調至音階音高，Mix 30% 以下", genre: "Industrial, Experimental, Sci-Fi 音效" },
  { num: 32, name: "ROTARY", cat: "Modulation", desc: "旋轉喇叭模擬", tips: "Slow/Fast 切換製造經典 Hammond 風格", genre: "Jazz, Gospel, Psychedelic Rock" },
  { num: 33, name: "SCATTER", cat: "Glitch", desc: "隨機切片與重組", tips: "Intensity 50-70%，Length 短促製造碎片感", genre: "Glitch Hop, IDM, Footwork" },
  { num: 34, name: "SIDECHAIN", cat: "Dynamics", desc: "側鏈壓縮，製作 Pumping 效果", tips: "Threshold 調至 -20dB，Release 配合節奏", genre: "EDM, House, Future Bass" },
  { num: 35, name: "SPECTRAL DELAY", cat: "Time", desc: "頻譜延遲", tips: "不同頻段設不同延遲時間，製造空間感", genre: "Ambient, Dub Techno, Experimental" },
  { num: 36, name: "STUTTER", cat: "Glitch", desc: "結巴效果", tips: "1/32 或 1/64，手動觸發製造斷續感", genre: "Glitch Hop, Bass Music, IDM" },
  { num: 37, name: "TAPE STOP", cat: "Time", desc: "磁帶停止效果", tips: "Time 設 1-2 秒，用於歌曲過場或 Drop 前", genre: "所有曲風（過場效果）" },
  { num: 38, name: "TREMOLO", cat: "Modulation", desc: "震音效果", tips: "Rate 同步 BPM（1/4 或 1/8），Depth 70%", genre: "Surf Rock, Dub, Ambient" },
  { num: 39, name: "VINYL FLICK", cat: "Lo-Fi", desc: "唱針刮擦模擬", tips: "速度配合節奏，適合做 DJ Scratch 音效", genre: "Hip Hop, Turntablism, Breaks" },
  { num: 40, name: "VINYL SIM", cat: "Lo-Fi", desc: "模擬黑膠唱片質感，含雜訊與頻率衰減", tips: "調高 Crackle 增加雜訊，Age 控制老化程度", genre: "Lo-Fi Hip Hop, Jazz, Soul" },
  { num: 41, name: "VOCODER", cat: "Voice", desc: "機器人聲效", tips: "用合成器 Pad 當 Carrier，人聲當 Modulator", genre: "Electro, Daft Punk 風格, Future Funk" },
  { num: 42, name: "WAH", cat: "Filter", desc: "哇哇踏板效果", tips: "Resonance 提高，Frequency 範圍 200Hz-2kHz", genre: "Funk, Disco, Acid House" },
];

export const hotspots: HotspotData[] = [
  // --- 第一排：旋鈕 (Knobs) ---
  { id: "vol", name: "VOLUME (總音量)", cat: "主控", rect: [7.5, 11, 11, 7], type: "knob" },
  { id: "c1", name: "CTRL 1 / CUTOFF", cat: "控制旋鈕", rect: [7.5, 32, 11, 7], type: "knob" },
  { id: "c2", name: "CTRL 2 / RESO", cat: "控制旋鈕", rect: [7.5, 53, 11, 7], type: "knob" },
  { id: "c3", name: "CTRL 3 / DRIVE", cat: "控制旋鈕", rect: [7.5, 74, 11, 7], type: "knob" },

  // --- 第二排：螢幕周圍效果鍵 (Screen FX) ---
  { id: "fx_filt", name: "FILTER+DRIVE", cat: "效果器", rect: [21, 17.5, 10, 4.5], type: "rect" },
  { id: "fx_reso", name: "RESONATOR", cat: "效果器", rect: [26, 17.5, 10, 4.5], type: "rect" },
  { id: "fx_delay", name: "DELAY", cat: "效果器", rect: [32, 17.5, 10, 4.5], type: "rect" },
  { id: "fx_iso", name: "ISOLATOR", cat: "效果器", rect: [21, 71.5, 10, 4.5], type: "rect" },
  { id: "fx_djfx", name: "DJFX LOOPER", cat: "效果器", rect: [26, 71.5, 10, 4.5], type: "rect" },
  { id: "fx_mfx", name: "MFX", cat: "效果器", rect: [32, 71.5, 10, 4.5], type: "rect" },

  // --- 中間：Encoder --- 
  { id: "enc", name: "PUSH ENTER", cat: "導航", rect: [39.5, 80, 8, 5], type: "knob" },

  // --- 第三排：Utility / Edit Row --- 
  { id: "ptn_sel", name: "PATTERN SELECT", cat: "模式", rect: [42, 14, 7, 3.5], type: "rect" },
  { id: "ptn_edit", name: "PATTERN EDIT", cat: "模式", rect: [42, 23, 7, 3.5], type: "rect" },
  { id: "rec_set", name: "RECORD SETTING", cat: "錄音", rect: [42, 32, 7, 3.5], type: "rect" },
  { id: "st_end", name: "START/END", cat: "取樣編輯", rect: [42, 48, 7, 3.5], type: "rect" },
  { id: "pitch", name: "PITCH/SPEED", cat: "取樣編輯", rect: [42, 57, 7, 3.5], type: "rect" },
  { id: "mark", name: "MARK", cat: "取樣編輯", rect: [42, 66, 7, 3.5], type: "rect" },

  // --- 第四排：Transport Row --- 
  { id: "del", name: "DEL", cat: "編輯", rect: [47, 13, 6, 3.5], type: "rect" },
  { id: "rec", name: "REC", cat: "錄音", rect: [47, 21, 7, 3.5], type: "rect" },
  { id: "res", name: "RESAMPLE", cat: "錄音", rect: [47, 30, 8, 3.5], type: "rect" },
  { id: "bpm", name: "BPM SYNC", cat: "播放", rect: [47, 44, 6, 3.5], type: "rect" },
  { id: "gate", name: "GATE", cat: "播放", rect: [47, 51.5, 6, 3.5], type: "rect" },
  { id: "loop", name: "LOOP", cat: "播放", rect: [47, 59, 6, 3.5], type: "rect" },
  { id: "rev", name: "REVERSE", cat: "播放", rect: [47, 70.5, 6, 3.5], type: "rect" },
  { id: "roll", name: "ROLL", cat: "播放", rect: [47, 81, 6, 3.5], type: "rect" },

  // --- 第五排：Func / Banks --- 
  { id: "exit", name: "EXIT", cat: "導航", rect: [54.5, 13, 6, 3.5], type: "rect" },
  { id: "copy", name: "COPY", cat: "功能", rect: [54.5, 23, 6, 3.5], type: "rect" },
  { id: "remain", name: "REMAIN", cat: "功能", rect: [54.5, 33, 7, 3.5], type: "rect" },
  { id: "ba", name: "BANK A/F", cat: "BANK", rect: [54.5, 43, 5.5, 3.5], type: "rect" },
  { id: "bb", name: "BANK B/G", cat: "BANK", rect: [54.5, 51.5, 5.5, 3.5], type: "rect" },
  { id: "bc", name: "BANK C/H", cat: "BANK", rect: [54.5, 60, 5.5, 3.5], type: "rect" },
  { id: "bd", name: "BANK D/I", cat: "BANK", rect: [54.5, 67.5, 5.5, 3.5], type: "rect" },
  { id: "be", name: "BANK E/J", cat: "BANK", rect: [54.5, 76, 5.5, 3.5], type: "rect" },
  { id: "shift", name: "SHIFT", cat: "SHIFT", rect: [54.5, 81, 7, 3.5], type: "rect" },

  // --- PADS (Grid 4x4) --- 
  { id: "p1", name: "PAD 1", cat: "打擊墊", rect: [59, 12, 13, 7.5], type: "pad" },
  { id: "p2", name: "PAD 2", cat: "打擊墊", rect: [59, 28, 13, 7.5], type: "pad" },
  { id: "p3", name: "PAD 3", cat: "打擊墊", rect: [59, 44, 13, 7.5], type: "pad" },
  { id: "p4", name: "PAD 4", cat: "打擊墊", rect: [59, 60, 13, 7.5], type: "pad" },
  { id: "p5", name: "PAD 5", cat: "打擊墊", rect: [68, 12, 13, 7.5], type: "pad" },
  { id: "p6", name: "PAD 6", cat: "打擊墊", rect: [68, 28, 13, 7.5], type: "pad" },
  { id: "p7", name: "PAD 7", cat: "打擊墊", rect: [68, 44, 13, 7.5], type: "pad" },
  { id: "p8", name: "PAD 8", cat: "打擊墊", rect: [68, 60, 13, 7.5], type: "pad" },
  { id: "p9", name: "PAD 9", cat: "打擊墊", rect: [77, 12, 13, 7.5], type: "pad" },
  { id: "p10", name: "PAD 10", cat: "打擊墊", rect: [77, 28, 13, 7.5], type: "pad" },
  { id: "p11", name: "PAD 11", cat: "打擊墊", rect: [77, 44, 13, 7.5], type: "pad" },
  { id: "p12", name: "PAD 12", cat: "打擊墊", rect: [77, 60, 13, 7.5], type: "pad" },
  { id: "p13", name: "PAD 13", cat: "打擊墊", rect: [86, 12, 13, 7.5], type: "pad" },
  { id: "p14", name: "PAD 14", cat: "打擊墊", rect: [86, 28, 13, 7.5], type: "pad" },
  { id: "p15", name: "PAD 15", cat: "打擊墊", rect: [86, 44, 13, 7.5], type: "pad" },
  { id: "p16", name: "PAD 16", cat: "打擊墊", rect: [86, 60, 13, 7.5], type: "pad" },

  // --- RIGHT SIDEBAR --- 
  { id: "bus", name: "BUS FX", cat: "路由", rect: [59, 76, 10, 6], type: "rect" },
  { id: "hold", name: "HOLD", cat: "表演", rect: [68, 76, 10, 6], type: "rect" },
  { id: "ext", name: "EXT SOURCE", cat: "輸入", rect: [77, 76, 10, 6], type: "rect" },
  { id: "sub", name: "SUB PAD", cat: "表演", rect: [86, 76, 10, 7.5], type: "rect" },
];

export const contentDB: Record<string, ContentData> = {
  "vol": { 
    def: "主輸出音量 (Master Volume)", 
    detail: "控制 LINE OUT 和 PHONES 的總輸出音量。這是一個純類比 (Analog) 的音量衰減器，直接影響最後端輸出。請從小聲開始調整，避免損壞聽力或設備。(參見指南 p.11)", 
    shift: ["無"], 
    usage: [
      "開機前先轉到最小，避免突然的巨大音量損壞耳朵或喇叭",
      "在現場表演或錄音時，根據場地大小和設備逐步調整適當音量",
      "歌曲結束時可以慢慢向左轉，製作手動淡出（Fade Out）效果",
      "連接外部音響系統時，先從小聲測試，確認訊號正常後再調大"
    ], 
    tip: "💡 Tip: 錄音時保持 VOLUME 在 12 點鐘位置，音量控制交給外接設備，確保訊號品質最佳化。現場表演時可用它製作動態音量淡入淡出效果。"
  },
  "c1": { 
    def: "控制旋鈕 1 / CUTOFF (濾波截止頻率)", 
    detail: "預設為濾波器的 Cutoff (截止頻率) 控制，但可在各個模式或效果器中被重新映射為其他參數。幾乎所有效果器都會分配一個關鍵參數到 CTRL 1-3，方便即時調整。(參見指南 p.23)", 
    shift: ["無"], 
    usage: [
      "在 FILTER+DRIVE 模式下，向右轉增加高頻（更明亮），向左轉減少高頻（更悶）",
      "調整 MFX 效果器的主參數（例如 DELAY 的 Time、REVERB 的 Size）",
      "表演時可用手掌或手指緩慢轉動，製作 Filter Sweep 掃頻效果",
      "配合其他控制旋鈕，可即時調整 Sound Design"
    ], 
    tip: "💡 Tip: CTRL 旋鈕是表演神器！在 DJ SET 或 Beat Making 時，轉動 CTRL 1 製作 Filter Sweep 是最經典的技巧之一。錄製 Pattern 時也可以錄製旋鈕動態（Parameter Automation），讓效果隨著時間變化。"
  },
  "c2": { 
    def: "控制旋鈕 2 / RESO (濾波共鳴)", 
    detail: "預設為濾波器的 Resonance (共鳴) 控制。當 Resonance 增加時，濾波器截止頻率附近的頻段會被強化，產生尖銳的電子音色或自激振盪。搭配 CTRL 1 (Cutoff) 可創造豐富的音色變化。(參見指南 p.23)", 
    shift: ["無"], 
    usage: [
      "在 FILTER 模式下，向右轉增加共鳴（製造更尖銳的電子聲響），向左轉減少共鳴（柔和）",
      "用於調整 MFX 效果的副參數（例如 DELAY 的 Feedback、REVERB 的 Damping）",
      "配合 CTRL 1，可以製造經典的 Acid Techno 音色（高 Resonance + 動態 Cutoff）",
      "調整到極致（90% 以上）會出現自激振盪音，可用來製作雷射音效或 Synth Lead"
    ], 
    tip: "💡 Tip: CTRL 1 + CTRL 2 配合使用是製作電子音色的經典技法。例如在 House 或 Techno 中，開啟 FILTER 效果，CTRL 2 設在 60-80%，然後緩慢轉動 CTRL 1 製造經典的 Filter Sweep。"
  },
  "c3": { 
    def: "控制旋鈕 3 / DRIVE (驅動 / 失真)", 
    detail: "預設為 Drive (驅動/飽和) 控制。增加 Drive 可為聲音添加溫暖的飽和感或激烈的失真效果，取決於增加的程度。也可被重新映射為其他效果參數。(參見指南 p.23)", 
    shift: ["無"], 
    usage: [
      "在 FILTER+DRIVE 模式下，向右轉增加失真（溫暖、厚實或破音），向左轉關閉失真",
      "調整 MFX 效果器的第三參數（例如 COMPRESSOR 的 Ratio、OVERDRIVE 的 Gain）",
      "為 Kick、Snare 或整體 Mix 增加飽和感和 Punch",
      "錄製旋鈕動態，製造從乾淨到失真的漸變過渡效果"
    ], 
    tip: "💡 Tip: DRIVE 可以讓聲音更飽滿、更厚實，但不要過度使用。一般建議控制在 30-50% 範圍，除非你追求極端的破音效果（例如 Industrial 或 Harsh Noise）。"
  },
  "fx_filt": { 
    def: "FILTER+DRIVE (濾波器 + 驅動)", 
    detail: "整合濾波器與驅動/失真的複合效果器。可透過 CTRL 1 調整截止頻率 (Cutoff)、CTRL 2 調整共鳴 (Resonance)、CTRL 3 調整驅動量 (Drive)。是最常用的效果之一，適合現場調整音色。(參見指南 p.24)", 
    shift: ["SHIFT + FILTER+DRIVE: 切換濾波器類型 (LPF / HPF / BPF 等)"], 
    usage: [
      "按 FILTER+DRIVE 鍵啟動，CTRL 1-3 即可即時調整濾波參數",
      "用 CTRL 1 掃頻製作經典的 Filter Sweep 律動",
      "CTRL 2 增加共鳴製造尖銳電子音色或 Acid Sound",
      "CTRL 3 增加 Drive 為聲音添加飽和感或失真",
      "SHIFT + FILTER+DRIVE 切換濾波器模式（LPF 低通、HPF 高通、BPF 帶通）"
    ], 
    tip: "💡 Tip: FILTER+DRIVE 是 SP-404MKII 最經典也最常用的效果器之一。在製作 House、Techno、Hip Hop 時，它可以快速調整音色的明暗與厚度。建議熟悉這三個旋鈕的配合，你就能即時掌控整體音色！"
  },
  "fx_reso": { 
    def: "RESONATOR (共振器)", 
    detail: "透過強調特定頻率製造類似弦樂或金屬質感的共鳴效果。可以將鼓組或噪音轉化為具有音高的音色，非常適合實驗性音樂和環境音樂。(參見指南 p.25)", 
    shift: ["無"], 
    usage: [
      "將打擊樂或噪音 Sample 轉化為有音高的共鳴音色",
      "配合 BPM SYNC 使用，讓共鳴頻率跟隨音樂節奏變化",
      "在 Ambient 或 Experimental 音樂中製造空靈的共鳴效果",
      "用於 Sound Design，例如製作金屬質感或弦樂質感的音色"
    ], 
    tip: "💡 Tip: RESONATOR 是一個極具創造力的效果器，可以把簡單的 Hi-hat 或白噪音轉化為類似弦樂或鐘聲的音色。在 Ambient、Drone、Experimental 音樂中非常好用！"
  },
  "fx_delay": { 
    def: "DELAY (延遲效果器)", 
    detail: "經典的延遲回音效果，可同步 BPM。支援 Stereo Delay 和 Ping-Pong Delay 等模式，適合製作空間感和節奏性回音。(參見指南 p.26)", 
    shift: ["無"], 
    usage: [
      "啟動 DELAY 後，用 CTRL 1 調整延遲時間（Time），CTRL 2 調整回饋量（Feedback）",
      "開啟 BPM SYNC 讓延遲時間自動對齊節拍（1/4、1/8、1/16 等）",
      "製作 Dub 風格的深度回音（長延遲時間 + 高 Feedback）",
      "在 Techno、House 中製造律動性回音（短延遲時間 + 低 Feedback）",
      "錄製 Pattern 時可記錄 Delay 參數變化，製作動態回音效果"
    ], 
    tip: "💡 Tip: DELAY 最適合同步 BPM 使用。設定 1/4 或 1/8 音符延遲，Feedback 控制在 40-60%，可以製造經典的 Dub 或 Techno 回音。記得不要讓 Feedback 過高，否則會失控！"
  },
  "fx_iso": { 
    def: "ISOLATOR (三頻段隔離器)", 
    detail: "DJ 風格的三頻段等化器，可獨立靜音或增強 Low / Mid / High 三個頻段。非常適合現場表演時快速調整音色平衡或製作 Kill Effect（完全消除某頻段）。(參見指南 p.27)", 
    shift: ["無"], 
    usage: [
      "用 CTRL 旋鈕分別控制 Low / Mid / High 頻段的音量",
      "表演時可完全消除某個頻段（Kill），例如拿掉 Bass 或拿掉高頻",
      "製作經典的 DJ 過場技巧：逐漸減少 Mid 和 High，只留下 Low（Bass Drop）",
      "在 Build-Up 時逐步增加 High 頻段，製造能量累積感",
      "配合 FILTER 使用，可製造更豐富的音色變化"
    ], 
    tip: "💡 Tip: ISOLATOR 是 DJ 表演的經典工具，在 EDM、House、Techno 中非常常用。最經典的用法是在 Drop 前把 Mid 和 High 全部 Kill 掉，只留下 Kick，然後在 Drop 瞬間全開，製造爆炸性的能量釋放！"
  },
  "fx_djfx": { 
    def: "DJFX LOOPER (DJ 特效循環器)", 
    detail: "整合多種 DJ 風格即時效果，包括 Roll、Scatter、Vinyl Break 等。可設定循環長度，非常適合現場表演時製作 Fill、Transition 和創意效果。(參見指南 p.28)", 
    shift: ["無"], 
    usage: [
      "按下 DJFX LOOPER 啟動，選擇想要的效果類型（Roll / Scatter / Break 等）",
      "用 CTRL 旋鈕調整效果強度或循環長度",
      "在歌曲過場（Transition）時使用，製作律動性的填充音效",
      "配合 BPM SYNC 使用，讓效果對齊節拍",
      "現場表演時手動觸發，製作即興的 Glitch 或 Stutter 效果"
    ], 
    tip: "💡 Tip: DJFX LOOPER 是現場表演的強大武器！在 Hip Hop、Trap、Bass Music 中，可以在 Fill 或 Transition 部分使用 Roll 或 Scatter 製造爆炸性的律動效果。記得設定循環長度為 1/4 或 1/2 bar！"
  },
  "fx_mfx": { 
    def: "MFX (多重效果器)", 
    detail: "可載入 42 種專業級效果器（從 Reverb、Compressor 到 Vocoder、Granular），每個效果器都有多個可調參數。這是 SP-404MKII 音色設計的核心功能，幾乎無限的創作可能性。完整列表請查看右側說明區「MFX 效果器總覽」。(參見指南 p.29-38)", 
    shift: ["SHIFT + MFX: 進入 MFX 選擇選單，瀏覽並選擇 42 種效果器"],
    mfxList: mfxEffects,
    usage: [
      "按 MFX 鍵啟動效果器（預設為上次使用的效果）",
      "SHIFT + MFX 進入效果選單，用 VALUE 輪盤瀏覽 42 種效果器",
      "選擇效果器後，用 CTRL 1-3 調整關鍵參數（每個效果器映射不同）",
      "可將 MFX 分配到 Bus 1-4，對多個 Pad 同時施加效果（Bus FX 模式）",
      "錄製 Pattern 時可記錄 MFX 參數動態變化（Automation）",
      "使用 MARK 鍵儲存當前 MFX 設定到 Sample（長按 SHIFT + MARK 3 秒）"
    ], 
    tip: "💡 Tip: MFX 是 SP-404MKII 的靈魂！建議新手先從常用效果開始熟悉：REVERB（混響）、DELAY（延遲）、COMP（壓縮器）、LO-FI（Lo-Fi 效果）、SIDECHAIN（側鏈壓縮）。熟悉後再探索更實驗性的效果，例如 GRANULAR、VOCODER、GRAIN SHIFTER。"
  },
  "enc": { 
    def: "PUSH ENTER (VALUE 輪盤)", 
    detail: "核心導航控制器。轉動選擇參數或瀏覽選單，按下確認。用於調整 BPM、選擇 Sample 等。(參見指南 p.11)", 
    shift: ["VALUE + Pad: 選擇 Sample 而不播放 (Silent Select)"], 
    usage: [
      "在主畫面轉動 VALUE 調整全局 BPM",
      "在效果器或編輯選單中，轉動選擇項目或調整數值",
      "按下 VALUE 確認選擇或進入子選單",
      "長按 VALUE 可進入特定功能的詳細設定頁面",
      "按住 SHIFT + 轉動 VALUE 可以更細緻地調整參數（Fine Tuning）"
    ], 
    tip: "💡 Tip: VALUE 輪盤是 SP-404 最核心的控制器。記住一個技巧：按住 SHIFT 同時轉動 VALUE 可以進行精細調整（例如 BPM 以 0.1 為單位變化），非常適合需要精確設定的場合。"
  },
  "ptn_sel": { 
    def: "PATTERN SELECT (樂段選擇)", 
    detail: "選擇要播放或編輯的 Pattern（樂段）。每個 Bank 可包含多個 Pattern，用於儲存完整的表演動態和效果自動化。(參見指南 p.39)", 
    shift: ["SHIFT + PATTERN SELECT: 複製當前 Pattern"], 
    usage: [
      "按 PATTERN SELECT 進入 Pattern 選擇模式",
      "用 Pad 選擇不同的 Pattern（每個 Bank 最多 16 個 Pattern）",
      "表演時可即時切換 Pattern，製作不同段落（Intro / Verse / Chorus）",
      "SHIFT + PATTERN SELECT 可複製當前 Pattern 到其他位置，快速製作變化版本"
    ], 
    tip: "💡 Tip: Pattern 是 SP-404MKII 現場表演的核心！建議為一首歌製作多個 Pattern：Intro、Verse、Chorus、Bridge、Outro。表演時只需按 Pad 即可切換段落，非常流暢！"
  },
  "ptn_edit": { 
    def: "PATTERN EDIT (樂段編輯)", 
    detail: "編輯當前 Pattern 的長度、量化設定、Loop 模式等。也可在此清除 Pattern 中的錄音動態或重新開始。(參見指南 p.40)", 
    shift: ["SHIFT + PATTERN EDIT: 清除當前 Pattern 的所有動態"], 
    usage: [
      "按 PATTERN EDIT 進入編輯選單",
      "調整 Pattern 長度（例如 1 bar、2 bar、4 bar）",
      "設定量化強度（Quantize），讓錄製的觸發對齊節拍",
      "SHIFT + PATTERN EDIT 可清除當前 Pattern 的所有錄音動態（但保留 Sample）",
      "設定 Loop 模式（Loop / One Shot），決定 Pattern 是否循環播放"
    ], 
    tip: "💡 Tip: Pattern 錄音支援 Undo！如果你錄壞了，按 SHIFT + PATTERN SELECT 可以復原上一步操作。另外，設定量化（Quantize）為 1/16 音符可以讓你的演奏更準確對齊節拍。"
  },
  "rec_set": { 
    def: "RECORD SETTING (錄音設定)", 
    detail: "調整錄音相關設定，包括輸入源、錄音長度、自動觸發等。可設定從 LINE IN、MIC、或 RESAMPLE 錄音。(參見指南 p.15)", 
    shift: ["無"], 
    usage: [
      "按 RECORD SETTING 進入錄音設定選單",
      "選擇輸入源：LINE IN（外部音源）、MIC（麥克風）、RESAMPLE（內部重採樣）",
      "設定錄音長度（例如 2 秒、5 秒、自動偵測）",
      "開啟自動觸發（Auto Rec），當偵測到聲音時自動開始錄音",
      "設定錄音後的處理方式（例如自動 Normalize、自動分配到 Pad）"
    ], 
    tip: "💡 Tip: 使用 RESAMPLE 模式可以把當前播放的所有聲音（包括效果）錄製成新 Sample，這是 SP-404 最強大的功能之一！建議開啟自動 Normalize，確保錄音音量一致。"
  },
  "st_end": { 
    def: "START/END (起點終點編輯)", 
    detail: "調整 Sample 的起點（Start）和終點（End），讓你裁切不要的部分或製作循環片段。也可開啟 CHOP 自動切片功能。(參見指南 p.18)", 
    shift: ["SHIFT + START/END: CHOP (自動切片)"], 
    usage: [
      "按 START/END 進入編輯模式",
      "轉動 CTRL 1 調整 Start Point（起點），裁掉前面不要的部分",
      "轉動 CTRL 2 調整 End Point（終點），裁掉後面不要的部分",
      "SHIFT + START/END 開啟 CHOP 自動切片，將 Sample 自動切成多段分配到 Pad",
      "配合 LOOP 功能，可製作完美循環的 Loop Sample"
    ], 
    tip: "💡 Tip: CHOP 功能超級強大！導入一段 Drum Loop，按 SHIFT + START/END 開啟 CHOP，SP-404 會自動偵測 Transient 並切成多段，分配到 16 個 Pad。你就能即興重組鼓組，超級好玩！"
  },
  "pitch": { 
    def: "PITCH/SPEED (音高 / 速度編輯)", 
    detail: "調整 Sample 的音高和播放速度。支援獨立音高調整（不影響速度）或同步調整（類比磁帶效果）。也可開啟 Envelope (ADSR) 編輯。(參見指南 p.19)", 
    shift: ["SHIFT + PITCH/SPEED: ENVELOPE (ADSR 包絡編輯)"], 
    usage: [
      "按 PITCH/SPEED 進入音高編輯模式",
      "轉動 CTRL 1 調整音高（Pitch），不影響播放速度（數位變調）",
      "轉動 CTRL 2 調整播放速度（Speed），同時影響音高（類比磁帶效果）",
      "SHIFT + PITCH/SPEED 開啟 ENVELOPE 包絡編輯，調整 Attack、Decay、Sustain、Release",
      "調整音高可製作旋律變化，例如把 Kick 調成不同音階"
    ], 
    tip: "💡 Tip: 獨立音高調整（Pitch）適合製作旋律和和弦，速度調整（Speed）則能製造類比磁帶加速或減速的質感。SHIFT + PITCH 開啟 ADSR 包絡編輯，可以讓 Sample 變成類似合成器的音色！"
  },
  "mark": { 
    def: "MARK (標記 / 儲存效果)", 
    detail: "在 Pattern 錄音中標記特定時間點，或儲存當前效果設定到 Sample。長按 SHIFT + MARK 3 秒可將 MFX 效果永久儲存到 Sample。(參見指南 p.20)", 
    shift: ["SHIFT + MARK (3秒): 儲存當前 MFX 效果設定到 Sample"], 
    usage: [
      "在 Pattern 播放時按 MARK 可標記時間點，方便跳轉編輯",
      "長按 SHIFT + MARK 3 秒，將當前的 MFX 效果設定永久套用到 Sample（效果會被烘焙進去）",
      "儲存效果後，該 Sample 即使不開啟 MFX 也會保留效果音色",
      "適合將滿意的效果設定固化，節省 CPU 資源或避免現場調錯參數"
    ], 
    tip: "💡 Tip: 烘焙效果（Render Effect）是高級技巧！當你調整出完美的 Reverb 或 Lo-Fi 效果後，長按 SHIFT + MARK 3 秒儲存，Sample 就會永久保留該效果。這樣在表演時就不用擔心誤觸旋鈕了！"
  },
  "del": { 
    def: "DEL (刪除)", 
    detail: "刪除 Sample、Pattern 或整個 Bank。操作不可復原，請謹慎使用。可搭配 SHIFT 或 EXIT 執行不同刪除功能。(參見指南 p.16)", 
    shift: ["SHIFT + DEL + EXIT: 刪除整個 Bank（危險操作！）"], 
    usage: [
      "按 DEL + Pad 刪除單個 Sample",
      "DEL + Pattern 刪除指定 Pattern",
      "SHIFT + DEL + EXIT 刪除整個 Bank（16 個 Sample 全部消失，謹慎使用！）",
      "DEL + MARK 刪除 Sample 的效果動態（但保留 Sample 本身）",
      "在 Live Mode 下 DEL 會被鎖定，避免表演時誤刪"
    ], 
    tip: "💡 Tip: 刪除操作無法 Undo！建議在刪除前先用 COPY 功能備份重要 Sample。另外，開啟 Live Mode（長按 REMAIN 3 秒）可以鎖定 DEL 鍵，避免表演時誤觸。"
  },
  "rec": { 
    def: "REC (錄音)", 
    detail: "啟動錄音功能，可錄製外部音源（LINE IN / MIC）或內部 RESAMPLE。支援 Pattern 錄音（記錄演奏��態）和 Sample 錄音（錄製音頻）。(參見指南 p.14)", 
    shift: ["SHIFT + REC: TR-REC (步進式錄音 / Step Sequencer)"], 
    usage: [
      "按 REC 啟動 Sample 錄音，錄製外部音源或內部重採樣",
      "REC + Pad 將錄音分配到指定 Pad",
      "SHIFT + REC 進入 TR-REC 步進錄音模式，用 16 個 Pad 編程節奏",
      "在 Pattern 播放時按 REC 可進入 Pattern 錄音模式，記錄即時演奏動態",
      "錄音後可用 START/END 裁切，或用 PITCH 調整音高"
    ], 
    tip: "💡 Tip: SHIFT + REC 開啟的 TR-REC 是經典的 Roland TR 步進錄音模式，非常適合編程精確的鼓組 Pattern。16 個 Pad 代表 16 個步進，點亮即觸發，超級直覺！"
  },
  "res": { 
    def: "RESAMPLE (重採樣)", 
    detail: "將當前播放的所有聲音（包括 Pad、效果器、Bus FX）錄製成一個新的 Sample。這是 SP-404MKII 最核心的工作流程，可將複雜的多層聲音合併成單一 Sample。(參見指南 p.15)", 
    shift: ["無"], 
    usage: [
      "播放你想錄製的內容（可同時播放多個 Pad 和效果）",
      "按 RESAMPLE 開始錄音，所有正在播放的聲音（包括效果）都會被錄下來",
      "錄音結束後，新 Sample 會自動分配到空白 Pad",
      "可重複多次 RESAMPLE，將複雜編曲逐層疊加（Layering）",
      "RESAMPLE 後的 Sample 可再次編輯、加效果、再次 RESAMPLE（無限可能）"
    ], 
    tip: "💡 Tip: RESAMPLE 是 SP-404 的靈魂工作流！經典用法：播放 Kick + Snare + Hi-hat，加上 FILTER 和 REVERB，然後 RESAMPLE 成一個新的 Drum Loop。再把這個 Loop 加上 LO-FI 效果，再次 RESAMPLE...層層疊加製造獨特音色！"
  },
  "bpm": { 
    def: "BPM SYNC (節奏同步)", 
    detail: "開啟後，Sample 的播放速度會自動同步到全局 BPM。適合讓 Loop Sample 與節拍對齊，或製作同步的節奏效果。(參見指南 p.21)", 
    shift: ["SHIFT + BPM SYNC: Sync All（同步整個 Bank 的所有 Sample）"], 
    usage: [
      "按 BPM SYNC + Pad 讓該 Sample 同步到全局 BPM",
      "調整全局 BPM（轉動 VALUE），所有啟用 BPM SYNC 的 Sample 會同步變速",
      "SHIFT + BPM SYNC 可同步整個 Bank 的所有 Sample（批量操作）",
      "適合 Drum Loop、Melodic Loop 等需要對齊節拍的 Sample",
      "關閉 BPM SYNC 則 Sample 以原始速度播放（One Shot 模式）"
    ], 
    tip: "💡 Tip: BPM SYNC 是製作 Beat 的必備功能！導入 Drum Loop 後，啟用 BPM SYNC 讓它對齊你的 Project BPM。如果 Loop 長度不對（例如 2 bar 被誤判為 1 bar），可以在 Sample 設定中手動調整 Loop Length。"
  },
  "gate": { 
    def: "GATE (門限觸發)", 
    detail: "開啟後，Pad 需按住才會持續播放，放開即停止。適合演奏旋律、製作 Stutter 效果或即興控制聲音長度。(參見指南 p.22)", 
    shift: ["無"], 
    usage: [
      "按 GATE + Pad 啟用門限模式",
      "按住 Pad 播放 Sample，放開立即停止（類似鋼琴鍵）",
      "適合演奏旋律 Sample（例如和弦、Bass Line）",
      "配合 Chromatic Mode（SHIFT + Pad 4）可用 16 個 Pad 演奏半音階旋律",
      "製作 Stutter 或 Gating 效果，手動控制聲音的斷續"
    ], 
    tip: "💡 Tip: GATE 模式配合 Chromatic Mode（SHIFT + Pad 4）超級強大！你可以把一個 Sample 變成 16 個不同音高的鍵盤，演奏旋律和和弦。非常適合 Lo-Fi、Boom Bap、Jazz Hip Hop 等風格！"
  },
  "loop": { 
    def: "LOOP (循環播放)", 
    detail: "啟用後，Sample 會循環播放。可設定循環範圍（Loop Start / Loop End），製作完美的 Loop 素材。(參見指南 p.22)", 
    shift: ["無"], 
    usage: [
      "按 LOOP + Pad 啟用循環播放",
      "Sample 會從頭到尾重複播放，直到再次按 Pad 停止",
      "在 START/END 編輯模式中可設定循環的起點和終點",
      "適合 Drum Loop、Melodic Loop、Ambient Texture 等循環素材",
      "配合 BPM SYNC 使用，可製作完美對齊節拍的循環"
    ], 
    tip: "💡 Tip: 製作完美 Loop 的秘訣：先用 START/END 精確裁切循環範圍，確保起點和終點無縫銜接。然後啟用 LOOP + BPM SYNC，就能得到一個完美的循環 Loop！"
  },
  "rev": { 
    def: "REVERSE (反向播放)", 
    detail: "將 Sample 反向播放，製造倒帶效果或迷幻音色。可永久反轉 Sample 或僅在播放時反向。(參見指南 p.22)", 
    shift: ["無"], 
    usage: [
      "按 REVERSE + Pad 反向播放該 Sample",
      "製作經典的 Reverse Cymbal（反向鈸片）效果",
      "反轉人聲或旋律製造迷幻、神秘的音色",
      "可在 Sample 設定中永久反轉 Sample（不可復原，除非重新導入）",
      "配合 DELAY 或 REVERB 效果，製造更豐富的倒帶音效"
    ], 
    tip: "💡 Tip: Reverse Cymbal 是經典技巧！找一個 Crash Cymbal Sample，啟用 REVERSE，然後在 Drop 前觸發，製造強烈的上升能量感。也可以反轉 Vocal 製造詭異的氛圍！"
  },
  "roll": { 
    def: "ROLL (滾奏 / 快速重複)", 
    detail: "按住 Pad 時快速重複觸發，製造連續的滾奏效果。速度可同步 BPM（1/16、1/32、1/64）。(參見指南 p.23)", 
    shift: ["無"], 
    usage: [
      "按 ROLL + Pad，按住該 Pad 會快速重複觸發",
      "調整 ROLL 速度（1/8、1/16、1/32、1/64 音符）製造不同密度的滾奏",
      "適合製作 Snare Roll、Hi-hat Roll、Bass Roll 等經典效果",
      "在 Trap、Dubstep、Bass Music 中常用於 Fill 或 Build-Up",
      "配合 Pitch Bend 或 Filter Sweep 可製造更動態的滾奏效果"
    ], 
    tip: "💡 Tip: ROLL 是 Trap 和 Dubstep 的必備技巧！在 Build-Up 時用 1/32 或 1/64 Snare Roll，配合 FILTER 掃頻，在 Drop 前製造強烈的張力感。記得同步 BPM！"
  },
  "exit": { 
    def: "EXIT (退出 / 返回)", 
    detail: "退出當前選單或編輯模式，返回上一層或主畫面。也可用於停止播放或取消操作。(參見指南 p.11)", 
    shift: ["SHIFT + EXIT: Stop All（停止所有正在播放的聲音）"], 
    usage: [
      "按 EXIT 退出當前選單或編輯模式",
      "在效果器或 Sample 編輯中，按 EXIT 放棄修改並返回",
      "SHIFT + EXIT 立即停止所有正在播放的 Sample（緊急停止）",
      "在多層選單中，連續按 EXIT 可快速返回主畫面",
      "VALUE + EXIT 也可快速跳回主畫面"
    ], 
    tip: "💡 Tip: SHIFT + EXIT 是緊急停止鍵！在現場表演時，如果聲音失控或 Loop 太多層，按 SHIFT + EXIT 立即停止所有聲音，避免尷尬。記住這個救命組合鍵！"
  },
  "copy": { 
    def: "COPY (複製)", 
    detail: "複製 Sample、Pattern 或整個 Bank。可用於備份重要素材或快速製作變化版本。(參見指南 p.17)", 
    shift: ["無"], 
    usage: [
      "按 COPY + Pad → Pad 複製單個 Sample",
      "COPY + Pattern → Pattern 複製 Pattern",
      "COPY + EXIT 複製整個 Bank（16 個 Sample）",
      "跨 Bank 複製：COPY + Pad → 切換 Bank → Pad",
      "表演前備份重要 Kit，避免誤刪或誤改"
    ], 
    tip: "💡 Tip: 表演前一定要用 COPY + EXIT 把主要 Bank 複製到備份 Bank（例如 Bank J）！萬一表演中不小心刪除或改壞，可以快速切換到備份 Bank 救場。"
  },
  "remain": { 
    def: "REMAIN (Bus 路由 / 保持模式)", 
    detail: "設定 Pad 的 Bus 路由（將 Sample 發送到 Bus 1-4 進行群組效果處理）。長按 3 秒可開啟 Live Mode，鎖定編輯鍵避免表演誤觸。(參見指南 p.30)", 
    shift: ["REMAIN (長按3秒): Live Mode（鎖定編輯鍵，防止誤觸）"], 
    usage: [
      "按 REMAIN + Pad 設定該 Sample 的 Bus 路由（Bus 1 / 2 / 3 / 4）",
      "將多個 Sample 分配到同一個 Bus，可統一施加效果（例如 Bus 1 全部加 Reverb）",
      "長按 REMAIN 3 秒進入 Live Mode，鎖定 DEL、COPY、UTILITY 等編輯鍵",
      "Live Mode 下只保留播放和效果控制，避免表演時誤刪或誤改設定",
      "再次長按 REMAIN 3 秒退出 Live Mode"
    ], 
    tip: "💡 Tip: Bus 路由是 SP-404MKII 最強大的功能之一！把所有 Kick 和 Bass 設為橘色（Bus 1 加 Compressor），所有旋律 Sample 設為綠色（Bus 2 加 Reverb），可以大幅提升混音的層次感和一致性。"
  },
  "shift": { 
    def: "SHIFT (功能切換鍵)", 
    detail: "按住 SHIFT 同時按其他按鍵，可執行第二功能（副功能）。幾乎每個按鍵都有 SHIFT 組合功能，是解鎖 SP-404MKII 全部功能的鑰匙。機器上有橘色或黃色標示的都是 SHIFT 功能。(參見指南 p.12)", 
    shift: ["無（SHIFT 本身是功能鍵，不需要組合）"], 
    usage: [
      "按住 SHIFT + 其他按鍵執行副功能（參考機器上的橘色/黃色標示）",
      "SHIFT + Pad 1-16 執行各種功能（Utility、Chromatic Mode、Mute Groups 等）",
      "SHIFT + EXIT 停止所有聲音",
      "SHIFT + REC 進入 TR-REC 步進錄音",
      "SHIFT + MARK 儲存效果設定",
      "SHIFT + 任何效果鍵切換效果類型或進階設定"
    ], 
    tip: "💡 Tip: SHIFT 是 SP-404MKII 的靈魂鍵！建議把最常用的 SHIFT 組合記在腦海：SHIFT + Pad 13（Utility）、SHIFT + EXIT（Stop All）、SHIFT + REC（TR-REC）、SHIFT + Pad 4（Chromatic Mode）。熟悉後你會發現工作效率翻倍！"
  },
  "ba": { 
    def: "BANK A/F (切換 Bank A 或 F)", 
    detail: "切換到 Bank A（單按）或 Bank F（按住 SHIFT）。每個 Bank 包含 16 個 Pad，總共 10 個 Bank（A-J），可儲存 160 個 Sample。(參見指南 p.13)", 
    shift: ["SHIFT + BANK A/F: 切換到 Bank F"], 
    usage: [
      "單按切換到 Bank A",
      "SHIFT + 單按切換到 Bank F",
      "每個 Bank 獨立儲存 16 個 Sample 和效果設定",
      "可為不同歌曲或段落準備不同 Bank（例如 Bank A 是 Intro，Bank B 是 Verse）",
      "表演時可即時切換 Bank，製作豐富的音色變化"
    ], 
    tip: "💡 Tip: Bank 管理是組織 Sample 的關鍵！建議為每首歌準備 2-3 個 Bank：Bank A 放 Drums，Bank B 放 Melodic，Bank C 放 FX。表演時就能快速切換，不會手忙腳亂。"
  },
  "bb": { 
    def: "BANK B/G (切換 Bank B 或 G)", 
    detail: "切換到 Bank B（單按）或 Bank G（按住 SHIFT）。(參見指南 p.13)", 
    shift: ["SHIFT + BANK B/G: 切換到 Bank G"], 
    usage: [
      "單按切換到 Bank B",
      "SHIFT + 單按切換到 Bank G",
      "用於儲存不同類型的 Sample 或不同歌曲段落"
    ], 
    tip: "💡 Tip: 同上"
  },
  "bc": { 
    def: "BANK C/H (切換 Bank C 或 H)", 
    detail: "切換到 Bank C（單按）或 Bank H（按住 SHIFT）。(參見指南 p.13)", 
    shift: ["SHIFT + BANK C/H: 切換到 Bank H"], 
    usage: [
      "單按切換到 Bank C",
      "SHIFT + 單按切換到 Bank H"
    ], 
    tip: "💡 Tip: 同上"
  },
  "bd": { 
    def: "BANK D/I (切換 Bank D 或 I)", 
    detail: "切換到 Bank D（單按）或 Bank I（按住 SHIFT）。(參見指南 p.13)", 
    shift: ["SHIFT + BANK D/I: 切換到 Bank I"], 
    usage: [
      "單按切換到 Bank D",
      "SHIFT + 單按切換到 Bank I"
    ], 
    tip: "💡 Tip: 同上"
  },
  "be": { 
    def: "BANK E/J (切換 Bank E 或 J)", 
    detail: "切換到 Bank E（單按）或 Bank J（按住 SHIFT）。(參見指南 p.13)", 
    shift: ["SHIFT + BANK E/J: 切換到 Bank J"], 
    usage: [
      "單按切換到 Bank E",
      "SHIFT + 單按切換到 Bank J",
      "Bank J 常用作備份 Bank，儲存重要的 Sample Kit"
    ], 
    tip: "💡 Tip: 建議把 Bank J 當作備份專用！表演前把主要 Bank 複製到 Bank J，萬一出錯可以快速切換救場。"
  },
  "bus": { 
    def: "BUS FX (Bus 效果路由)", 
    detail: "設定和控制 Bus 1-4 的效果器路由。可將多個 Pad 發送到同一個 Bus，統一施加效果（例如 Reverb、Compressor）。(參見指南 p.31)", 
    shift: ["無"], 
    usage: [
      "按 BUS FX 進入 Bus 設定選單",
      "為 Bus 1-4 分別分配效果器（例如 Bus 1 = Reverb，Bus 2 = Compressor）",
      "用 REMAIN 鍵將 Pad 分配到不同 Bus",
      "調整每個 Bus 的 Send Level（發送量）和效果參數",
      "可製作分層混音架構，例如所有 Drum 走 Bus 1（加壓縮），所有 Melody 走 Bus 2（加混響）"
    ], 
    tip: "💡 Tip: Bus FX 是專業混音的關鍵！建議設定 Bus 1 為 Reverb（所有需要空間感的 Sample），Bus 2 為 Compressor（所有需要 Punch 的 Drum），Bus 3 和 Bus 4 用於創意效果（Delay、Lo-Fi 等）。"
  },
  "hold": { 
    def: "HOLD (保持模式)", 
    detail: "按下 Pad 後持續播放，不需按住。再次按 Pad 停止。適合疊加多層 Loop 或現場即興演奏。(參見指南 p.23)", 
    shift: ["無"], 
    usage: [
      "按 HOLD + Pad 啟用保持模式",
      "觸發 Pad 後聲音持續播放，不需按住",
      "再次按 Pad 停止播放",
      "適合疊加多層 Loop 或環境音效",
      "可同時播放多個 Pad，製作複雜的音景（Soundscape）"
    ], 
    tip: "💡 Tip: HOLD 模式非常適合 Live Looping！逐層疊加 Kick、Snare、Hi-hat、Bass、Melody，製作完整的 Live Set。配合 RESAMPLE 可將所有層次錄製成新 Sample。"
  },
  "ext": { 
    def: "EXT SOURCE (外部輸入源)", 
    detail: "啟用外部音源輸入（LINE IN 或 MIC），可即時監聽並加效果。適合 DJ Set、Live Jam 或錄製外部樂器。(參見指南 p.14)", 
    shift: ["無"], 
    usage: [
      "按 EXT SOURCE 啟用外部輸入監聽",
      "連接外部音源（合成器、鼓機、唱盤、麥克風）到 LINE IN 或 MIC",
      "可即時對外部輸入施加 SP-404 的效果器（FILTER、MFX、DELAY 等）",
      "調整輸入增益（Input Gain）避免過載或底噪",
      "按 REC 可錄製外部輸入成為 Sample"
    ], 
    tip: "💡 Tip: EXT SOURCE 是 Live Jam 的神器！連接合成器或吉他，即時加上 SP-404 的 Lo-Fi、Reverb、Delay 效果，然後 RESAMPLE 錄下來。你就能把外部樂器整合進 SP-404 的工作流！"
  },
  "sub": { 
    def: "SUB PAD (副打擊墊模式)", 
    detail: "開啟副打擊墊模式，16 個 Pad 可切換成不同功能（例如音高變化、效果觸發、Mute Groups）。(參見指南 p.24)", 
    shift: ["無"], 
    usage: [
      "按 SUB PAD 切換 Pad 的功能模式",
      "可將 Pad 設為音高變化模式（Chromatic）、靜音群組（Mute Groups）、效果觸發等",
      "適合現場即興演奏或創意表演",
      "退出 SUB PAD 模式返回正常 Sample 播放"
    ], 
    tip: "💡 Tip: SUB PAD 模式配合 Chromatic 可以把 16 個 Pad 變成鍵盤，演奏旋律！也可以設為 Mute Groups 模擬真實鼓組（Open Hi-hat 和 Closed Hi-hat 互斥）。"
  },
  "p1": { def: "打擊墊 1", detail: "可分配 Sample、調整效果、錄製動態。支援力度感應（Velocity Sensitive）。", shift: ["SHIFT + PAD 1: Fixed Velocity（固定力度模式）"], usage: ["按 Pad 觸發 Sample", "按住 Pad 可調整力度（如果啟用 Velocity）", "配合 SHIFT 執行副功能"], tip: "💡 Tip: 16 個 Pad 是 SP-404MKII 的核心！每個 Pad 都可獨立設定效果、音高、循環等參數。建議把最常用的 Drum 放在 Pad 1-8，旋律放在 Pad 9-16。" },
  "p2": { def: "打擊墊 2", detail: "同 Pad 1。", shift: ["SHIFT + PAD 2: 16 Velocity（16 段力度模���）"], usage: ["同上"], tip: "💡 Tip: 同上" },
  "p3": { def: "打擊墊 3", detail: "同 Pad 1。", shift: ["SHIFT + PAD 3: Cue 設��"], usage: ["同上"], tip: "💡 Tip: 同上" },
  "p4": { def: "打擊墊 4", detail: "同 Pad 1。", shift: ["SHIFT + PAD 4: Chromatic Mode（半音演奏模式）"], usage: ["同上"], tip: "💡 Tip: SHIFT + PAD 4 開啟 Chromatic Mode，16 個 Pad 變成鍵盤，可演奏旋律！" },
  "p5": { def: "打擊墊 5", detail: "同 Pad 1。", shift: ["SHIFT + PAD 5: Exchange（交換 Pad）"], usage: ["同上"], tip: "💡 Tip: 同上" },
  "p6": { def: "打擊墊 6", detail: "同 Pad 1。", shift: ["SHIFT + PAD 6: Init Param（重置參數）"], usage: ["同上"], tip: "💡 Tip: 同上" },
  "p7": { def: "打擊墊 7", detail: "同 Pad 1。", shift: ["SHIFT + PAD 7: Pad Link（群組觸發）"], usage: ["同上"], tip: "💡 Tip: 同上" },
  "p8": { def: "打擊墊 8", detail: "同 Pad 1。", shift: ["SHIFT + PAD 8: Mute Groups（互斥群組）"], usage: ["同上"], tip: "💡 Tip: SHIFT + PAD 8 設定 Mute Groups，可讓 Open Hi-hat 和 Closed Hi-hat 互斥，模擬真實鼓組！" },
  "p9": { def: "打擊墊 9", detail: "同 Pad 1。", shift: ["SHIFT + PAD 9: Metronome（節拍器）"], usage: ["同上"], tip: "💡 Tip: 同上" },
  "p10": { def: "打擊墊 10", detail: "同 Pad 1。", shift: ["SHIFT + PAD 10: Count-In（預備拍）"], usage: ["同上"], tip: "💡 Tip: 同上" },
  "p11": { def: "打擊墊 11", detail: "同 Pad 1。", shift: ["SHIFT + PAD 11: Tap Tempo（點擊設定速度）"], usage: ["同上"], tip: "💡 Tip: SHIFT + PAD 11 開啟 Tap Tempo，用手指點擊設定 BPM，超級方便！" },
  "p12": { def: "打擊墊 12", detail: "同 Pad 1。", shift: ["SHIFT + PAD 12: Gain 設定"], usage: ["同上"], tip: "💡 Tip: 同上" },
  "p13": { def: "打擊墊 13", detail: "同 Pad 1。", shift: ["SHIFT + PAD 13: Utility（系統設定）"], usage: ["同上"], tip: "💡 Tip: SHIFT + PAD 13 進入 Utility 系統設定，可調整全局參數、MIDI、USB 等進階功能。" },
  "p14": { def: "打擊墊 14", detail: "同 Pad 1。", shift: ["SHIFT + PAD 14: DJ Mode"], usage: ["同上"], tip: "💡 Tip: 同上" },
  "p15": { def: "打擊墊 15", detail: "同 Pad 1。", shift: ["SHIFT + PAD 15: Sample Chain（連續播放）"], usage: ["同上"], tip: "💡 Tip: 同上" },
  "p16": { def: "打擊墊 16", detail: "同 Pad 1。", shift: ["SHIFT + PAD 16: Looper 模式"], usage: ["同上"], tip: "💡 Tip: SHIFT + PAD 16 進入 Looper 模式，可即時錄製 Loop 並疊加，適合 Live Performance！" },
};
