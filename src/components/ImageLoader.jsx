import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export const ImageLoader = ({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  style = {},
  imgStyle = {},
  showLabel = true,
  label = 'Loading image...',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // If the browser already has the image cached
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`} style={style}>
      {/* Clear, Pretty Loading Skeleton Placeholder */}
      <div 
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50/60 to-slate-200/80 transition-opacity duration-500 pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-100 animate-pulse'
        }`}
      >
        <div className="w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-sm flex items-center justify-center text-[#0A3E88] mb-2">
          <Loader2 className="w-5 h-5 animate-spin text-[#0A3E88]" />
        </div>
        {showLabel && (
          <span className="text-[11px] font-black uppercase tracking-wider text-[#0A3E88] bg-white/90 px-3 py-1 rounded-full border border-blue-100 shadow-xs">
            {label}
          </span>
        )}
      </div>

      {/* Actual Image with Smooth Fade-in */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={imgStyle}
        {...props}
      />
    </div>
  );
};
