"use client";

import { useEffect, useRef, useState } from "react";

type ProductVideo = {
  id: string;
  title: string;
};

export function ProductVideoCarousel({
  videos,
  label,
}: {
  videos: ProductVideo[];
  label: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px" },
    );

    observer.observe(stage);

    return () => observer.disconnect();
  }, []);

  if (!videos.length) {
    return null;
  }

  const firstVideo = videos[0];

  return (
    <div
      className="product-carousel product-video-carousel"
      aria-label={`${label} video`}
    >
      <div className="video-carousel-stage" ref={stageRef}>
        {shouldLoad ? (
          <iframe
            src={`https://player.vimeo.com/video/${firstVideo.id}`}
            title={firstVideo.title || `${label} video`}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : null}
      </div>
    </div>
  );
}
