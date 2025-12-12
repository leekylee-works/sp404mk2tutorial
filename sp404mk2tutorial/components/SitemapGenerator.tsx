import { hotspots } from '../data/database';

/**
 * Sitemap 生成器 - SEO 優化
 * 生成網站地圖資料供搜尋引擎爬蟲使用
 */
export const generateSitemap = () => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    {
      loc: baseUrl,
      lastmod: today,
      changefreq: 'weekly',
      priority: 1.0,
      title: 'SP-404MKII 操作懶人包',
    },
    // 為每個按鈕創建頁面入口
    ...hotspots.map(hotspot => ({
      loc: `${baseUrl}?button=${hotspot.id}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8,
      title: `${hotspot.name} - ${hotspot.cat}`,
    })),
  ];

  return urls;
};

/**
 * 生成 XML Sitemap 格式
 */
export const generateSitemapXML = (): string => {
  const urls = generateSitemap();
  
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xmlContent;
};

/**
 * 生成 JSON 格式的 sitemap（用於前端展示或 API）
 */
export const generateSitemapJSON = (): object => {
  return {
    version: '1.0',
    generatedAt: new Date().toISOString(),
    urls: generateSitemap(),
  };
};

/**
 * 控制台輸出 sitemap（開發用）
 */
export const logSitemap = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('📍 SEO Sitemap Generated:');
    console.log(generateSitemapJSON());
    console.log('\n📄 XML Sitemap:');
    console.log(generateSitemapXML());
  }
};
