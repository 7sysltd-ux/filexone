import { useEffect } from 'react';

const BASE_URL = 'https://filexone.com';

export default function SEOHead({ title, description, path = '/', jsonLd = null }) {
  const canonical = `${BASE_URL}${path}`;

  useEffect(() => {
    document.title = title;

    const setMeta = (name, content, prop = false) => {
      const attr = prop ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMeta('description', description);
    setMeta('robots', 'index, follow');

    // Open Graph
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonical, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', 'FileXone', true);
    setMeta('og:image', 'https://filexone.com/og-image.png', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    // Canonical
    setLink('canonical', canonical);

    // JSON-LD
    const existingLd = document.querySelector('script[data-jsonld]');
    if (existingLd) existingLd.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-jsonld', 'true');
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, jsonLd]);

  return null;
}