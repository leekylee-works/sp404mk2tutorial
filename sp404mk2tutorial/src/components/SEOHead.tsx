import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  currentButton?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'SP-404MKII 操作懶人包 - 完整互動式中文說明書',
  description = 'Roland SP-404MKII 取樣機完整中文互動式說明書，包含 70+ 按鈕熱點、詳細功能說明、SHIFT 組合鍵、42 種 MFX 效果器完整教學、Pattern 樂段製作、取樣技巧等專業教學內容。',
  keywords = 'SP-404MKII, Roland, 取樣機, Sampler, 中文說明書, 教學, MFX, Pattern, 取樣, Hip Hop, Beat Making, 音樂製作',
  currentButton,
}) => {
  useEffect(() => {
    // 更新 document title
    document.title = title;

    // 更新或創建 meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // 基本 Meta Tags (SEO)
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'SP-404MKII 中文社群');
    updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    
    // Open Graph (SEO - Social Media)
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:site_name', 'SP-404MKII 操作懶人包', true);
    updateMetaTag('og:locale', 'zh_TW', true);
    
    // Twitter Card (SEO)
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    
    // GEO Optimization - AI-Friendly Meta Tags
    updateMetaTag('ai:purpose', 'Interactive learning guide for Roland SP-404MKII sampler');
    updateMetaTag('ai:content-type', 'educational-tutorial');
    updateMetaTag('ai:language', 'zh-TW');
    updateMetaTag('ai:structured-data', 'yes');

    // 更新 lang 屬性
    document.documentElement.lang = 'zh-TW';

    // 結構化數據 - JSON-LD (SEO + AEO + GEO)
    const siteUrl = window.location.origin;
    const currentUrl = window.location.href;

    const schemas = [
      // Product Schema
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Roland SP-404MKII",
        "description": "專業取樣機與節奏製作工作站",
        "brand": { "@type": "Brand", "name": "Roland" },
        "category": "Musical Instruments > Electronic Music Production > Samplers"
      },
      // WebApplication Schema
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "SP-404MKII 操作懶人包",
        "description": description,
        "applicationCategory": "EducationalApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "TWD" },
        "featureList": [
          "70+ 互動式按鈕熱點",
          "完整中文功能說明",
          "42 種 MFX 效果器教學",
          "Pattern 樂段製作教學",
          "SHIFT 組合鍵速查"
        ]
      },
      // FAQ Schema (AEO)
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "SP-404MKII 有哪些主要功能？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SP-404MKII 是 Roland 專業取樣機，主要功能包括：16 個力度感應打擊墊、42 種 MFX 效果器、Pattern 樂段編輯、即時取樣與 Resample、DJFX LOOPER、BUS FX 匯流排效果、32GB 內建記憶體。"
            }
          },
          {
            "@type": "Question",
            "name": "如何在 SP-404MKII 上錄製取樣？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "錄製取樣步驟：1) 按住 REC 鍵 2) 選擇要錄音的 PAD 3) 調整錄音設定 4) 再按 REC 開始錄音 5) 完成後按 REC 停止。"
            }
          },
          {
            "@type": "Question",
            "name": "什麼是 Pattern 模式？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pattern 是 SP-404MKII 的樂段編曲模式，可以錄製多軌 PAD 演奏並即時播放。支援 16 軌錄音、Quantize 量化對齊、Overdub 疊錄等功能。"
            }
          }
        ]
      },
      // How-to Schema (AEO)
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "如何使用 SP-404MKII 製作 Beat",
        "description": "完整的 SP-404MKII Beat 製作流程教學",
        "step": [
          { "@type": "HowToStep", "name": "準備取樣素材", "text": "透過 REC 鍵錄製外部音源" },
          { "@type": "HowToStep", "name": "編輯取樣", "text": "使用 START/END 設定取樣起始點" },
          { "@type": "HowToStep", "name": "配置 PAD", "text": "將不同取樣分配到 16 個 PAD" },
          { "@type": "HowToStep", "name": "加入效果器", "text": "選擇 MFX 效果器，調整參數" },
          { "@type": "HowToStep", "name": "錄製 Pattern", "text": "進入 PATTERN EDIT 模式錄製樂段" }
        ]
      },
      // Breadcrumb Schema (SEO)
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "首頁", "item": siteUrl },
          { "@type": "ListItem", "position": 2, "name": "SP-404MKII 操作懶人包", "item": currentUrl }
        ]
      }
    ];

    // 清除舊的 JSON-LD scripts
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());

    // 插入新的 JSON-LD scripts
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

  }, [title, description, keywords, currentButton]);

  return null; // 這個組件不渲染任何視覺內容
};
