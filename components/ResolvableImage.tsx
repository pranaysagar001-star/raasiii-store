'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getImageBlob, isIndexedDbImageRef, parseIndexedDbImageId } from '@/lib/clientImageStorage';
import { PLACEHOLDER_PRODUCT_IMAGE } from '@/lib/commerce';

function useResolvedDisplaySrc(src: string) {
  const [resolved, setResolved] = useState<string>(() => (isIndexedDbImageRef(src) ? '' : src));
  const [loading, setLoading] = useState(isIndexedDbImageRef(src));

  useEffect(() => {
    if (!isIndexedDbImageRef(src)) {
      setResolved(src);
      setLoading(false);
      return;
    }

    let cancelled = false;
    let objectUrl: string | undefined;

    setLoading(true);
    setResolved('');

    (async () => {
      const blob = await getImageBlob(parseIndexedDbImageId(src));
      if (cancelled) {
        return;
      }

      if (!blob) {
        setResolved(PLACEHOLDER_PRODUCT_IMAGE);
        setLoading(false);
        return;
      }

      objectUrl = URL.createObjectURL(blob);
      setResolved(objectUrl);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  return { resolved, loading };
}

type ResolvableImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function ResolvableImage({ src, alt, fill, className, sizes, priority }: ResolvableImageProps) {
  const { resolved, loading } = useResolvedDisplaySrc(src);

  if (loading || !resolved) {
    return (
      <div
        className={
          fill
            ? `absolute inset-0 animate-pulse bg-white/10 ${className ?? ''}`
            : `animate-pulse bg-white/10 ${className ?? ''}`
        }
        aria-hidden
      />
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={resolved.startsWith('blob:')}
    />
  );
}
