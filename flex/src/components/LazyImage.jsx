import { useEffect, useRef, useState } from 'react';

/**
 * Lazy image that works inside a custom scroll container.
 * Pass the scroll container ref in `root`.
 */
export default function LazyImage({ src, srcSet, alt, className, root }) {
  const ref = useRef(null);
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [loadedSet, setLoadedSet] = useState(null);

  useEffect(() => {
    if (!ref.current) return;

    // Fallback: no IO support → load immediately
    if (!('IntersectionObserver' in window)) {
      setLoadedSrc(src);
      setLoadedSet(srcSet);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setLoadedSrc(src);
            setLoadedSet(srcSet);
            io.disconnect();
            break;
          }
        }
      },
      { root: root?.current ?? null, rootMargin: '200px 0px' } // pre-load a bit early
    );

    io.observe(ref.current);
    return () => io.disconnect();
  }, [src, srcSet, root]);

  return (
    <img
      ref={ref}
      src={loadedSrc || '/Images/placeholder-1x1.png'}
      srcSet={loadedSet || ''}
      alt={alt}
      className={className}
      decoding="async"
      referrerPolicy="no-referrer"
      width="800"
      height="600"
      style={{ background: '#f3f4f6' }}
      onError={(e) => {
        e.currentTarget.src = '/Images/gallery1.jpg';
        e.currentTarget.removeAttribute('srcset');
      }}
    />
  );
}
