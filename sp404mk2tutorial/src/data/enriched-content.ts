// SP-404MKII 豐富內容擴展
// 這個文件包含從右側教學模組整合的詳細資訊

import { ContentData } from './database';

type EnrichedContent = Partial<ContentData>;

export const enrichedContentDB: Record<string, EnrichedContent> = {
  "rec": {
    category: "錄音",
    relatedButtons: ["rec_set", "res", "ext", "p9", "p10"],
    workflow: [
      {
        title: "基本錄音流程",
        steps: [
          "按 REC 鍵（紅燈閃爍）",
          "再按一次 REC 開始錄音（紅燈恆亮）",
          "按任意 Pad（1-16）結束錄音並指定到該 Pad",
          "Sample 自動儲存並可立即播放"
        ]
      },
      {
        title: "Pattern 即時錄音",
        steps: [
          "進入 Pattern 模式（PATTERN SELECT）",
          "按 REC 進入錄音待機",
          "開始按 Pad 演奏",
          "再按 REC 結束，你的演奏被記錄成 Pattern"
        ]
      },
      {
        title: "TR-REC 步進錄音",
        steps: [
          "按 SHIFT + REC 進入 TR-REC 模式",
          "選擇要編輯的 Pad（如 Kick）",
          "按對應的 Step 格（Pad 1-16）輸入音符",
          "切換到下一個 Pad（如 Snare）繼續編輯",
          "按 REC 或 EXIT 退出"
        ]
      }
    ],
    combinations: [
      { keys: "REC → REC → Pad", desc: "最快速的錄音方式" },
      { keys: "SHIFT + REC", desc: "進入 TR-REC 步進錄音" },
      { keys: "REC + CTRL旋鈕", desc: "TR-REC 模式下錄製參數動態" },
      { keys: "SHIFT + P9", desc: "開啟節拍器輔助錄音" },
      { keys: "SHIFT + P10", desc: "設定 Count-In 預備拍" }
    ],
    examples: [
      {
        title: "Lo-Fi Beat 製作",
        desc: "先錄 Kick，再錄 Snare，用 TR-REC 編排節奏，最後用 RESAMPLE 固化成 Loop",
        genre: "Lo-Fi Hip Hop"
      },
      {
        title: "Live Jam 錄音",
        desc: "開啟 Count-In Wait 模式，自動偵測輸入開始錄音，適合錄製外部樂器即興演奏",
        genre: "Experimental / Jazz"
      },
      {
        title: "Vocal Chop 製作",
        desc: "錄製一段人聲，用 CHOP 功能自動切成 16 片，即時演奏 Vocal Chop",
        genre: "Future Bass / Trap"
      }
    ],
    warnings: [
      "錄音會覆蓋目標 Pad 原有的 Sample，請先確認或備份",
      "長時間錄音會消耗較多 SD 卡空間，建議定期整理",
      "錄音時如果 Input Gain 過大會導致破音（Clipping），請調整 SHIFT + P12"
    ],
    proTips: [
      "錄音前先按 RECORD SETTING 確認 BPM 和節拍器設定",
      "使用 Count-In Wait 模式可以自動偵測聲音開始錄音，適合從黑膠或卡帶取樣",
      "TR-REC 模式下可以邊聽邊編輯，不用停止播放",
      "Motion Recording（參數動態）可以在 TR-REC 模式下錄製 CTRL 旋鈕的即時變化",
      "Pattern 錄音支援 Overdub（疊錄），可以一層一層疊加樂器"
    ]
  },
  
  "res": {
    category: "錄音",
    relatedButtons: ["rec", "fx_mfx", "bus", "loop"],
    workflow: [
      {
        title: "基本 Resample 流程",
        steps: [
          "播放想要錄製的內容（可以是 Sample、Pattern、或即時演奏）",
          "按 RESAMPLE 鍵",
          "再按一次 RESAMPLE 開始錄製機器的輸出",
          "按任意 Pad 結束並儲存"
        ]
      },
      {
        title: "效果器固化工作流",
        steps: [
          "選擇一個 Sample 並套用想要的 MFX 效果",
          "調整效果參數到滿意的狀態",
          "按 RESAMPLE 將「Sample + 效果」錄成新 Sample",
          "原 Sample 保持不變，新 Sample 已包含效果",
          "原效果器槽位被釋放，可用於其他 Sample"
        ]
      },
      {
        title: "多層疊加創意工作流",
        steps: [
          "播放第一個 Sample 並加效果",
          "Resample 成新 Sample",
          "播放新 Sample 並加第二層效果",
          "再次 Resample",
          "重複這個過程製作越來越複雜的音色"
        ]
      }
    ],
    combinations: [
      { keys: "RESAMPLE → RESAMPLE → Pad", desc: "快速錄製當前播放內容" },
      { keys: "播放 + MFX + RESAMPLE", desc: "將效果器固化到 Sample" },
      { keys: "Pattern + RESAMPLE", desc: "將整首歌 Bounce 成一個 Audio Loop" },
      { keys: "多個Pad同時播放 + RESAMPLE", desc: "混音多軌為單一 Sample" }
    ],
    examples: [
      {
        title: "Lo-Fi Drum Kit 製作",
        desc: "錄製乾淨的鼓聲 → 套用 Vinyl Sim + Cassette → Resample 固化 → 得到復古質感鼓組",
        genre: "Lo-Fi Hip Hop / Boom Bap"
      },
      {
        title: "Ambient Texture 設計",
        desc: "簡單的 Pad 音色 → 加 Reverb 和 Granular → Resample → 再加 Delay → 再 Resample → 創造複雜的音景",
        genre: "Ambient / Experimental"
      },
      {
        title: "Pattern 轉 Loop",
        desc: "製作完整的 8 小節 Pattern → Resample 成一個 Loop → 方便現場演出時一鍵播放",
        genre: "所有風格"
      }
    ],
    warnings: [
      "Resample 是破壞性編輯，建議先用 COPY 備份原始 Sample",
      "多次 Resample 會累積數位失真（雖然有時這正是你想要的 Lo-Fi 效果）",
      "Resample 錄製的是機器輸出，不包含未播放的 Sample"
    ],
    proTips: [
      "Resample 是 SP-404 最核心的工作流程，幾乎所有專業製作人都依賴這個功能",
      "可以 Resample 自己的演奏，製作獨特的 One-Shot 音效",
      "用 Resample 可以突破 8 個同時發聲的限制（把多個聲音混成一個）",
      "Resample 時可以包含 Bus 效果器，這樣可以疊加 4 個效果器（Pad FX + Bus 1 + Bus 2 + Bus 3/4）",
      "經典技巧：Sample → 加效果 → Resample → 反轉 (REVERSE) → 再加效果 → 再 Resample",
      "Resample 可以用來「凍結」參數動態，例如你用 CTRL 旋鈕做的 Filter Sweep"
    ]
  },

  "fx_mfx": {
    category: "效果器",
    relatedButtons: ["bus", "res", "fx_filt", "fx_delay", "fx_djfx"],
    workflow: [
      {
        title: "套用 MFX 效果",
        steps: [
          "選擇一個 Pad 並播放",
          "按 MFX 鍵（或 SHIFT + MFX 進入選單）",
          "轉動 VALUE 輪盤瀏覽 42 種效果",
          "按 VALUE 確認選擇",
          "用 CTRL 1/2/3 旋鈕調整參數"
        ]
      },
      {
        title: "Effect Grab 即時特效",
        steps: [
          "設定好想要的 MFX 效果和參數",
          "表演時按住 MFX 鍵",
          "效果暫時套用",
          "放開 MFX 鍵效果消失",
          "適合做瞬間特效或 Build-up"
        ]
      },
      {
        title: "快速跳轉效果列表",
        steps: [
          "按住 MFX + DJFX LOOPER → 跳到效果列表中段（#17 開始）",
          "按住 MFX + ISOLATOR → 跳到效果列表後段（#33 開始）",
          "加快選擇效果的速度"
        ]
      }
    ],
    combinations: [
      { keys: "SHIFT + MFX", desc: "進入 MFX 選單" },
      { keys: "按住 MFX", desc: "Effect Grab（暫時套用）" },
      { keys: "VALUE + MFX", desc: "鎖定 Effect Grab 模式" },
      { keys: "MFX + DJFX LOOPER", desc: "跳到效果 #17" },
      { keys: "MFX + ISOLATOR", desc: "跳到效果 #33" },
      { keys: "SHIFT + MARK (3秒)", desc: "儲存當前效果設定" }
    ],
    examples: [
      {
        title: "Vinyl Simulation",
        desc: "在乾淨的 Sample 上套用 Vinyl Sim，調整 Crackle 和 Age 參數，瞬間變成復古黑膠質感",
        genre: "Lo-Fi Hip Hop / Jazz"
      },
      {
        title: "Vocoder Robot Voice",
        desc: "錄製人聲後套用 Vocoder 效果，用合成器 Pad 當 Carrier，創造 Daft Punk 風格的機器人聲",
        genre: "Electro / Future Funk"
      },
      {
        title: "Scatter Glitch Effect",
        desc: "在鼓 Loop 上使用 Scatter，設定 Intensity 70%，製作隨機切片的 Glitch 效果",
        genre: "Glitch Hop / IDM"
      },
      {
        title: "Reverb Space Design",
        desc: "在 Vocal 或樂器上套用 Reverb，Pre-Delay 30ms，Time 2 秒，製造寬廣的空間感",
        genre: "所有風格"
      }
    ],
    warnings: [
      "同一時間每個 Sample 只能套用一個 MFX 效果",
      "MFX 會消耗 CPU 資源，過多效果可能導致延遲增加",
      "某些效果（如 Vocoder）需要外部音訊輸入才能正常工作"
    ],
    proTips: [
      "最常用的 5 個效果：Vinyl Sim、Reverb、Delay、Compressor、Lo-Fi",
      "用 SHIFT + MARK 長按 3 秒可以儲存效果設定，方便快速切換",
      "Effect Grab 配合 VALUE 輪盤可以鎖定，按住時效果持續",
      "可以用 Bus 效果器疊加更多效果（Pad MFX → Bus 1 → Bus 2 → Bus 3/4）",
      "Cassette Sim 的 Wow & Flutter 可以製造 Lofi 的音高飄移感",
      "Sidechain Compressor 是做 EDM Pumping 效果的關鍵",
      "Tape Stop 效果適合用在歌曲段落轉換或 Drop 之前",
      "Grain Shifter 和 Granular 效果可以製造實驗性的顆粒質感"
    ]
  },

  "roll": {
    category: "播放",
    relatedButtons: ["gate", "loop", "fx_djfx", "p4"],
    combinations: [
      { keys: "按住 ROLL + Pad", desc: "該 Pad 以設定間隔連續觸發" },
      { keys: "SHIFT + ROLL", desc: "進入 ROLL SETTING 設定間隔" },
      { keys: "ROLL + Chromatic Mode", desc: "可以彈奏旋律性的 Roll" }
    ],
    examples: [
      {
        title: "Trap Hi-hat Roll",
        desc: "設定 Roll 為 1/32，按住 Hi-hat Pad 製作快速連續的 Hi-hat，經典 Trap 手法",
        genre: "Trap / Hip Hop"
      },
      {
        title: "Snare Rush",
        desc: "用 1/16 或 1/32 的 Roll 在 Snare 上，製作 Drum Fill 過門效果",
        genre: "Drum & Bass / Breakbeat"
      },
      {
        title: "Melodic Roll",
        desc: "在 Chromatic 模式下使用 Roll，配合不同音高的 Pad，製作快速的琶音或顫音",
        genre: "Trance / Psytrance"
      }
    ],
    proTips: [
      "Roll 設定可以在 1/4、1/8、1/16、1/32 之間選擇",
      "1/32 Roll 可以製造幾乎像顫音一樣的效果",
      "在 DJ 模式下，Roll 可以作用在整個音軌上，製作 Stutter 過場",
      "Roll + Gate 模式組合，可以精準控制 Roll 的長度"
    ]
  },

  "st_end": {
    category: "取樣編輯",
    relatedButtons: ["mark", "pitch", "rec", "res"],
    workflow: [
      {
        title: "修剪 Sample 範圍",
        steps: [
          "選擇要編輯的 Pad",
          "按 START/END 進入編輯畫面",
          "轉動 VALUE 輪盤調整 Start 點",
          "再轉動調整 End 點",
          "按 VALUE 或 EXIT 確認"
        ]
      },
      {
        title: "CHOP 自動切片",
        steps: [
          "選擇一個長 Sample（如音樂片段）",
          "按 SHIFT + START/END 進入 CHOP",
          "選擇切片模式（GATE / EQUAL / MANUAL）",
          "機器自動分析並切成 16 片",
          "16 片分配到 16 個 Pad，可立即演奏"
        ]
      }
    ],
    combinations: [
      { keys: "START/END", desc: "編輯 Sample 起訖點" },
      { keys: "SHIFT + START/END", desc: "CHOP 自動切片功能" },
      { keys: "CTRL 旋鈕", desc: "在編輯畫面精細調整位置" },
      { keys: "MARK", desc: "標記重要位置輔助切片" }
    ],
    examples: [
      {
        title: "去除錄音雜音",
        desc: "錄音時前後有雜音，用 START/END 精確修剪掉不需要的部分，只留有用的聲音",
        genre: "所有風格"
      },
      {
        title: "Hip Hop Chop 採樣",
        desc: "從 Jazz 唱片錄一段 4 小節，用 CHOP 切成 16 片，即時演奏製作 Boom Bap Beat",
        genre: "Hip Hop / Lo-Fi"
      },
      {
        title: "Breakbeat 切片",
        desc: "錄製經典的 Amen Break，用 CHOP 切成單個鼓聲，重新編排製作 Jungle Beat",
        genre: "Drum & Bass / Jungle"
      }
    ],
    warnings: [
      "CHOP 是破壞性編輯，會覆蓋當前 Bank 的 16 個 Pad",
      "切片前建議先複製 Sample 到其他 Bank 備份"
    ],
    proTips: [
      "CHOP 的 GATE 模式會根據音量偵測自動切片，適合鼓組",
      "EQUAL 模式平均切割，適合旋律性的 Sample",
      "MANUAL 模式配合 MARK 標記點，可以精準切在你想要的位置",
      "切片後可以調整每個 Pad 的 Pitch 和效果，製作變化豐富的演奏",
      "經典 SP-404 工作流：取樣 → Chop → 重組 → Resample"
    ]
  },

  "bpm": {
    category: "播放",
    relatedButtons: ["loop", "p11", "rec_set"],
    workflow: [
      {
        title: "開啟 BPM Sync",
        steps: [
          "選擇一個 Loop Sample",
          "按 BPM SYNC 鍵（燈亮起）",
          "Sample 速度自動配合 Project BPM",
          "改變 Project BPM 時，Sample 會自動跟著變化"
        ]
      },
      {
        title: "批次同步整個 Bank",
        steps: [
          "按 SHIFT + BPM SYNC",
          "選擇 SYNC ALL ON",
          "整個 Bank 的所有 Sample 都開啟同步"
        ]
      }
    ],
    combinations: [
      { keys: "BPM SYNC", desc: "開啟/關閉單個 Sample 的 BPM 同步" },
      { keys: "SHIFT + BPM SYNC", desc: "批次開啟/關閉整個 Bank" },
      { keys: "SHIFT + Tap Tempo", desc: "調整 Project BPM" }
    ],
    examples: [
      {
        title: "DJ 混音對拍",
        desc: "兩首不同 BPM 的歌，開啟 BPM Sync 後自動對齊速度，無縫混音",
        genre: "DJ Sets / House"
      },
      {
        title: "實驗性速度變化",
        desc: "整首歌的 Loop 都開 Sync，即時改變 Project BPM，所有元素同步變快或變慢",
        genre: "Experimental / Techno"
      }
    ],
    proTips: [
      "BPM Sync 使用 Time Stretch 演算法，可能會產生一些音質變化",
      "速度差異太大（如從 70 BPM 拉到 140 BPM）會比較明顯失真",
      "對於打擊樂 Loop，BPM Sync 通常效果很好",
      "旋律性 Sample 速度變化太大時可能會產生不自然的音調"
    ]
  },

  "p16": {
    category: "表演",
    relatedButtons: ["rec", "loop", "hold", "res"],
    workflow: [
      {
        title: "Looper 即時循環錄音",
        steps: [
          "按 SHIFT + Pad 16 進入 Looper 模式",
          "按 REC 開始錄製第一層 Loop",
          "Loop 長度自動偵測（通常是 1 或 2 小節）",
          "再按 REC 開始疊錄（Overdub）第二層",
          "持續疊加更多層次",
          "按 SHIFT + Pad 16 退出 Looper"
        ]
      }
    ],
    combinations: [
      { keys: "SHIFT + P16", desc: "進入/退出 Looper 模式" },
      { keys: "REC", desc: "在 Looper 中開始錄音/疊錄" },
      { keys: "Pad 1-16", desc: "切換不同 Loop 軌道" }
    ],
    examples: [
      {
        title: "Live Looping 表演",
        desc: "吉他手即興演奏：錄第一層節奏 → 疊錄第二層旋律 → 疊錄第三層 Solo，建立完整樂曲",
        genre: "Live Performance / Experimental"
      },
      {
        title: "Beatbox Loop Station",
        desc: "用麥克風錄製 Beatbox：Kick → Snare → Hi-hat → 人聲，即時疊加完整 Beat",
        genre: "Beatbox / Hip Hop"
      }
    ],
    proTips: [
      "Looper 支援最多 16 層疊錄",
      "每層可以獨立靜音或刪除",
      "Looper 錄製的內容可以 Resample 成 Sample 儲存",
      "適合現場即興創作和表演"
    ]
  },

  "remain": {
    category: "功能",
    relatedButtons: ["bus", "fx_mfx", "shift"],
    workflow: [
      {
        title: "設定 Bus 路由",
        steps: [
          "按住 REMAIN 鍵",
          "按 Pad（Sample 所在的 Pad）",
          "觀察 Pad 顏色：",
          "  - 橘色 = Bus 1（通常用於旋律）",
          "  - 綠色 = Bus 2（通常用於鼓組）",
          "  - 白色 = Dry（不經過 Bus 1/2）",
          "重複按可以切換三種狀態"
        ]
      },
      {
        title: "啟用 Live Mode",
        steps: [
          "按住 REMAIN 3 秒",
          "進入 Live Mode",
          "不常用的按鍵被鎖定，防止誤觸",
          "適合現場表演"
        ]
      }
    ],
    combinations: [
      { keys: "REMAIN + Pad", desc: "設定 Sample 的 Bus 路由" },
      { keys: "REMAIN (3秒)", desc: "開啟/關閉 Live Mode" },
      { keys: "REMAIN + BUS FX", desc: "交換 Bus 1 和 Bus 2 的效果" },
      { keys: "REMAIN + 編輯畫面", desc: "同時編多個 Sample" }
    ],
    examples: [
      {
        title: "分離混音架構",
        desc: "把所有旋律 Sample 設為橘色（Bus 1 加 Reverb），鼓組設為綠色（Bus 2 加 Compressor）",
        genre: "所有風格"
      },
      {
        title: "現場防誤觸",
        desc: "表演前開啟 Live Mode，鎖定 DEL、COPY、UTILITY 等編輯鍵，避免意外操作",
        genre: "Live Performance"
      }
    ],
    proTips: [
      "Bus 路由是 SP-404MKII 最強大的功能之一",
      "合理分配 Bus 可以大幅提升音樂的層次感和空間感",
      "通常 Bus 1 用於空間效果（Reverb、Delay），Bus 2 用於節奏效果（Compressor、EQ）",
      "Bus 3 和 Bus 4 用於母帶處理（Mastering），可以在 SHIFT + P16 設定",
      "Live Mode 鎖定的按鍵可以在 Utility 中自訂"
    ]
  },

  "copy": {
    category: "編輯",
    relatedButtons: ["del", "shift", "exit"],
    workflow: [
      {
        title: "複製單個 Sample",
        steps: [
          "按 COPY 鍵",
          "按要複製的源 Pad（例如 Pad 1）",
          "按目標 Pad（例如 Pad 5）",
          "Sample 成功複製到新位置"
        ]
      },
      {
        title: "複製整個 Bank",
        steps: [
          "按住 COPY",
          "按 EXIT 鍵",
          "轉動 VALUE 選擇目標 Bank（A-J）",
          "按 VALUE 確認，整個 Bank 被複製"
        ]
      },
      {
        title: "跨 Bank 複製",
        steps: [
          "按 COPY",
          "按源 Pad（當前 Bank 的 Sample）",
          "切換到目標 Bank（按 BANK 鍵）",
          "按目標 Pad，Sample 被複製過來"
        ]
      }
    ],
    combinations: [
      { keys: "COPY + Pad → Pad", desc: "複製單個 Sample" },
      { keys: "COPY + EXIT", desc: "複製整個 Bank（16 個 Sample）" },
      { keys: "COPY + Pattern", desc: "複製 Pattern 樂段" }
    ],
    examples: [
      {
        title: "備份重要 Kit",
        desc: "表演前把 Bank A 完整複製到 Bank J 做備份，避免意外誤刪",
        genre: "Live Performance"
      },
      {
        title: "快速製作變化",
        desc: "複製 Kick Sample 到多個 Pad，然後個別調整音高和效果做出不同變化",
        genre: "Hip Hop"
      }
    ],
    proTips: [
      "複製不會刪除原本的 Sample，可以放心使用",
      "如果目標 Pad 已有 Sample，會被覆蓋（注意！）",
      "複製 Pattern 時，所有效果動態和自動化也會一起被複製",
      "可以在複製前先用 DEL 清空目標位置",
      "Bank 複製非常適合製作不同版本的 Set（例如 Intro、Verse、Chorus）"
    ]
  },

  "enc": {
    category: "導航",
    relatedButtons: ["shift", "exit"],
    workflow: [
      {
        title: "瀏覽和選擇參數",
        steps: [
          "轉動輪盤瀏覽選項或調整數值",
          "按下輪盤確認選擇",
          "適用於所有選單和設定"
        ]
      },
      {
        title: "靜默選擇 Sample",
        steps: [
          "按住 VALUE 輪盤",
          "按 Pad（不會觸發聲音）",
          "可以在不打斷播放的情況下切換編輯對象"
        ]
      },
      {
        title: "精準編輯波形",
        steps: [
          "進入 START/END 編輯畫面",
          "轉動 VALUE 微調起訖點位置",
          "按 VALUE 確認",
          "精確度可達 Sample 等級"
        ]
      }
    ],
    combinations: [
      { keys: "轉動 VALUE", desc: "瀏覽選項、調整數值" },
      { keys: "按下 VALUE", desc: "確認選擇、進入次選單" },
      { keys: "VALUE + Pad", desc: "Silent Select（靜默選擇）" },
      { keys: "SHIFT + 轉 VALUE", desc: "在某些模式下微調參數" }
    ],
    examples: [
      {
        title: "現場快速切換",
        desc: "按住 VALUE 再按不同 Pad，可以預覽和準備下一個要播放的 Sample 而不發出聲音",
        genre: "Live Performance"
      },
      {
        title: "精準 BPM 設定",
        desc: "轉動 VALUE 輪盤可以 0.1 BPM 為單位調整速度，適合對拍或配合其他樂器",
        genre: "所有風格"
      }
    ],
    proTips: [
      "VALUE 輪盤是 SP-404MKII 最常用的控制器之一",
      "Silent Select（VALUE + Pad）對於 Pattern 編輯非常實用",
      "在 MFX 選單中轉動 VALUE 可以即時預覽每種效果",
      "編輯 CHOP 切片時，VALUE 輪盤用來調整切片靈敏度（Sensitivity）",
      "長按 VALUE 進入特殊功能（視當前模式而定）"
    ]
  },

  "shift": {
    category: "功能",
    relatedButtons: ["remain", "copy", "del", "exit"],
    workflow: [
      {
        title: "基本 SHIFT 操作",
        steps: [
          "按住 SHIFT 鍵",
          "同時按其他按鍵（橘色/黃色標示）",
          "執行第二功能",
          "放開 SHIFT 返回主功能"
        ]
      },
      {
        title: "快速存取 Utility",
        steps: [
          "按住 SHIFT",
          "按 Pad 13",
          "進入系統設定選單",
          "可調整全局參數"
        ]
      }
    ],
    combinations: [
      { keys: "SHIFT + Pad 1", desc: "Fixed Velocity（固定力度）" },
      { keys: "SHIFT + Pad 2", desc: "16 Velocity（16 段力度）" },
      { keys: "SHIFT + Pad 3", desc: "Cue 設定" },
      { keys: "SHIFT + Pad 4", desc: "Chromatic Mode（半音演奏）" },
      { keys: "SHIFT + Pad 5", desc: "Exchange（交換 Pad）" },
      { keys: "SHIFT + Pad 6", desc: "Init Param（重置參數）" },
      { keys: "SHIFT + Pad 7", desc: "Pad Link（群組觸發）" },
      { keys: "SHIFT + Pad 8", desc: "Mute Groups（互斥群組）" },
      { keys: "SHIFT + Pad 9", desc: "Metronome（節拍器）" },
      { keys: "SHIFT + Pad 10", desc: "Count-In（預備拍）" },
      { keys: "SHIFT + Pad 11", desc: "Tap Tempo（點擊設定速度）" },
      { keys: "SHIFT + Pad 12", desc: "Gain 設定" },
      { keys: "SHIFT + Pad 13", desc: "Utility（系統設定）" },
      { keys: "SHIFT + Pad 14", desc: "DJ Mode" },
      { keys: "SHIFT + Pad 15", desc: "Sample Chain（連續播放）" },
      { keys: "SHIFT + Pad 16", desc: "Looper 模式" },
      { keys: "SHIFT + EXIT", desc: "Stop All（停止所有聲音）" },
      { keys: "SHIFT + REC", desc: "TR-REC（步進錄音）" },
      { keys: "SHIFT + START/END", desc: "CHOP（自動切片）" },
      { keys: "SHIFT + PITCH/SPEED", desc: "Envelope（ADSR 設定）" },
      { keys: "SHIFT + MARK (3秒)", desc: "儲存效果設定" },
      { keys: "SHIFT + BPM SYNC", desc: "Sync All（全 Bank 同步）" }
    ],
    examples: [
      {
        title: "Chromatic 演奏旋律",
        desc: "SHIFT + Pad 4 開啟半音模式，16 個 Pad 變成鋼琴鍵，可以演奏旋律和和弦",
        genre: "所有風格"
      },
      {
        title: "Mute Group 設定 Hi-hat",
        desc: "SHIFT + Pad 8 設定 Open Hi-hat 和 Closed Hi-hat 互斥，模擬真實鼓組",
        genre: "Drum Programming"
      },
      {
        title: "緊急停止所有聲音",
        desc: "表演時按 SHIFT + EXIT 立即停止所有播放中的 Sample，避免失控",
        genre: "Live Performance"
      }
    ],
    warnings: [
      "SHIFT + DEL + EXIT 會刪除整個 Bank，操作前請三思！",
      "某些 SHIFT 功能會改變全局設定，影響所有 Bank",
      "SHIFT + MARK 長按 3 秒才會儲存效果設定，短按無效"
    ],
    proTips: [
      "SHIFT 是解鎖 SP-404MKII 全部功能的鑰匙，幾乎每個按鍵都有 SHIFT 組合功能",
      "最常用的 SHIFT 組合：SHIFT + Pad 13（Utility）、SHIFT + EXIT（Stop All）、SHIFT + REC（TR-REC）",
      "SHIFT + Pad 4 的 Chromatic Mode 可以把 Pad 變成鍵盤，演奏旋律",
      "SHIFT + Pad 8 的 Mute Groups 用來設定 Open/Closed Hi-hat 的互斥",
      "記住 SHIFT + 各個 Pad 的功能可以大幅提升工作效率",
      "可以在 Utility 中查看完整的 SHIFT 組合列表"
    ]
  },

  "exit": {
    category: "導航",
    relatedButtons: ["del", "copy", "shift"],
    workflow: [
      {
        title: "基本退出操作",
        steps: [
          "在任何選單或編輯畫面按 EXIT",
          "返回上一層選單",
          "連續按可以返回主畫面"
        ]
      },
      {
        title: "取消操作",
        steps: [
          "在確認畫面按 EXIT",
          "取消當前操作",
          "不儲存變更"
        ]
      }
    ],
    combinations: [
      { keys: "EXIT", desc: "退出當前選單或編輯模式" },
      { keys: "SHIFT + EXIT", desc: "Stop All（緊急停止所有聲音）" },
      { keys: "DEL + EXIT", desc: "刪除整個 Bank（危險！）" },
      { keys: "COPY + EXIT", desc: "複製整個 Bank" },
      { keys: "REVERSE + EXIT", desc: "靜音所有 Pad（Pad Mute）" },
      { keys: "VALUE + EXIT", desc: "快速返回主畫面" }
    ],
    examples: [
      {
        title: "緊急停止",
        desc: "表演時出錯，按 SHIFT + EXIT 立即停止所有聲音，避免尷尬",
        genre: "Live Performance"
      },
      {
        title: "取消錯誤操作",
        desc: "不小心進入刪除確認畫面，按 EXIT 取消操作",
        genre: "所有風格"
      }
    ],
    warnings: [
      "DEL + EXIT 會刪除整個 Bank，操作前請再三確認！",
      "SHIFT + EXIT 會停止所有聲音，包括正在播放的 Pattern",
      "在某些深層選單中需要多次按 EXIT 才能返回主畫面"
    ],
    proTips: [
      "EXIT 是你的救命鍵，遇到任何問題都可以按它",
      "SHIFT + EXIT 是表演時的 Panic Button（緊急停止鍵）",
      "在編輯畫面按 EXIT 通常不會儲存變更，請注意",
      "VALUE + EXIT 可以快速跳回主畫面，不用一層一層按",
      "記住 EXIT 的所有組合鍵可以大幅提升操作效率"
    ]
  },

  "del": {
    category: "編輯",
    relatedButtons: ["copy", "exit", "shift"],
    workflow: [
      {
        title: "刪除單個 Sample",
        steps: [
          "按 DEL 鍵",
          "按要刪除的 Pad",
          "確認刪除",
          "Sample 被移除"
        ]
      },
      {
        title: "刪除整個 Bank",
        steps: [
          "按住 DEL",
          "按 EXIT",
          "確認操作",
          "整個 Bank（16 個 Sample）被清空"
        ]
      },
      {
        title: "刪除效果動態",
        steps: [
          "按 DEL + MARK",
          "選擇要刪除的 Motion 資料",
          "確認刪除",
          "效果動態被移除，Sample 保留"
        ]
      }
    ],
    combinations: [
      { keys: "DEL + Pad", desc: "刪除單個 Sample" },
      { keys: "DEL + EXIT", desc: "刪除整個 Bank（危險！）" },
      { keys: "DEL + MARK", desc: "刪除效果動態（Motion）" },
      { keys: "DEL + Pattern", desc: "刪除 Pattern 樂段" }
    ],
    examples: [
      {
        title: "清理錄壞的 Sample",
        desc: "錄音失敗，按 DEL + Pad 刪除錄壞的 Sample 重新錄",
        genre: "所有風格"
      },
      {
        title: "重置 Bank 重新開始",
        desc: "想從頭製作新 Kit，按 DEL + EXIT 清空整個 Bank",
        genre: "Beat Making"
      },
      {
        title: "移除不要的效果動態",
        desc: "錄製了效果動態但不滿意，用 DEL + MARK 刪除，Sample 本身不受影響",
        genre: "所有風格"
      }
    ],
    warnings: [
      "刪除操作無法復原（除非 Pattern 錄音有 Undo）！",
      "DEL + EXIT 會刪除整個 Bank，請三思而後行",
      "刪除 Sample 會同時刪除該 Sample 的所有設定和效果",
      "在 SD 卡上的檔案會被永久刪除，無法救回"
    ],
    proTips: [
      "刪除前先用 COPY 備份重要的 Sample",
      "DEL + MARK 只刪除效果動態，不刪除 Sample 本身",
      "Pattern 錄音支援 Undo（SHIFT + PATTERN SELECT），但 Sample 編輯不支援",
      "定期把重要的 Project 匯出到電腦備份",
      "在 Live Mode 下 DEL 鍵會被鎖定，避免表演時誤刪"
    ]
  }
};

// 工具函數：合併基礎資料和豐富資料
export function mergeEnrichedContent(baseContent: ContentData, enrichedData?: EnrichedContent): ContentData {
  if (!enrichedData) return baseContent;
  
  // 正確的合併方式：先展開 baseContent，再有選擇性地覆蓋
  return {
    ...baseContent,
    // 從 enrichedData 中添加新欄位（只在 enrichedData 有值時才覆蓋）
    ...(enrichedData.category && { category: enrichedData.category }),
    ...(enrichedData.relatedButtons && { relatedButtons: enrichedData.relatedButtons }),
    ...(enrichedData.workflow && { workflow: enrichedData.workflow }),
    ...(enrichedData.combinations && { combinations: enrichedData.combinations }),
    ...(enrichedData.examples && { examples: enrichedData.examples }),
    ...(enrichedData.warnings && { warnings: enrichedData.warnings }),
    ...(enrichedData.proTips && { proTips: enrichedData.proTips })
  };
}