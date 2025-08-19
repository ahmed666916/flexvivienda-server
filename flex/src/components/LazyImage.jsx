import { useEffect, useRef, useState } from 'react';

// Create responsive pair for muscache; otherwise return as-is
const toResponsive = (url) => {
  if (!url) return { src: '', srcSet: '' };
  const isMuscache = /(?:^|\/\/)a\d*\.muscache\.com\//.test(url);
  if (!isMuscache) return { src: url, srcSet: '' };
  const base = url.split('?')[0];
  const oneX = `${base}?im_w=720`;
  const twoX = `${base}?im_w=1440`;
  return { src: oneX, srcSet: `${oneX} 1x, ${twoX} 2x` };
};

export default function LazyImage({ urls = [], alt, className, root }) {
  const ref = useRef(null);
  const triedIdx = useRef(0);
  const [active, setActive] = useState(null);

  // Clean the list once (strip blanks/nulls)
  const cleanUrls = (Array.isArray(urls) ? urls : []).filter(Boolean);

  useEffect(() => {
    // If nothing to try, show fallback immediately
    if (!ref.current) return;
    if (cleanUrls.length === 0) {
      setActive({ src: '/Images/gallery1.jpg', srcSet: '' });
      return;
    }

    // If no IO support, load first immediately
    if (!('IntersectionObserver' in window)) {
      setActive(toResponsive(cleanUrls[0]));
      triedIdx.current = 1;
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(toResponsive(cleanUrls[0]));
            triedIdx.current = 1;
            io.disconnect();
            break;
          }
        }
      },
      {
        // Use viewport as root; big margin to pre-load
        root: root?.current ?? null,
        rootMargin: '800px 0px',
      }
    );

    io.observe(ref.current);
    return () => io.disconnect();
  }, [cleanUrls, root]);

  const onErr = (e) => {
    if (triedIdx.current < cleanUrls.length) {
      setActive(toResponsive(cleanUrls[triedIdx.current]));
      triedIdx.current += 1;
      return;
    }
    // final fallback
    e.currentTarget.src = '/Images/gallery1.jpg';
    e.currentTarget.removeAttribute('srcset');
  };

  const src = active?.src || '/Images/placeholder-1x1.png';
  const srcSet = active?.srcSet || '';

  return (
    <img
      ref={ref}
      src={src}
      srcSet={srcSet}
      alt={alt}
      className={className}
      decoding="async"
      referrerPolicy="no-referrer"
      width="800"
      height="600"
      style={{ background: '#f3f4f6' }}
      onError={onErr}
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
    />
  );
}
