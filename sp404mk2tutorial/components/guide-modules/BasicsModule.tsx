import React from 'react';

export const BasicsModule: React.FC = () => {
  return (
    <>
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

      <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3 text-xs">
        <strong className="text-yellow-400">⚠️ 重要提醒</strong>
        <ul className="mt-2 space-y-1 text-yellow-200/80">
          <li>• 機器使用SD卡儲存資料，無SD卡無法儲存Project</li>
          <li>• 音量從小調起，避免損壞耳朵或喇叭</li>
          <li>• 總是備份Project，使用Protect功能防止誤刪</li>
        </ul>
      </div>
    </>
  );
};
