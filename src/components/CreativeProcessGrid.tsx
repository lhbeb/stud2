import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const IMAGE_NUMBERS = Array.from({ length: 24 }, (_, i) => i + 1).filter(n => n !== 9 && n !== 23);

function splitImages(images: string[], numCols: number): string[][] {
  const perCol = Math.ceil(images.length / numCols);
  return Array.from({ length: numCols }, (_, colIdx) =>
    images.slice(colIdx * perCol, (colIdx + 1) * perCol)
  );
}

const CreativeProcessGrid: React.FC = () => {
  const [numCols, setNumCols] = useState<number>(window.innerWidth < 768 ? 3 : 6);
  const [imagesPerCol, setImagesPerCol] = useState<number>(window.innerWidth < 768 ? 8 : 6);
  const [cellHeight, setCellHeight] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gsapTweens = useRef<gsap.core.Tween[]>([]);
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Responsive column count and images per column
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        const mobile = window.innerWidth < 768;
        setNumCols(mobile ? 3 : 6);
        setImagesPerCol(mobile ? 8 : 6);
        setIsMobile(mobile);
      }, 100);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Measure cell height on mount and when column count changes
  useEffect(() => {
    const measureAndSet = () => {
      const firstCell = document.querySelector('.creative-grid-cell');
      if (firstCell) {
        setCellHeight(firstCell.getBoundingClientRect().height);
      }
    };
    
    const handleResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(measureAndSet, 100);
    };
    
    measureAndSet();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
    };
  }, [numCols]);

  // Split images into columns
  const images = IMAGE_NUMBERS.map(n => `/process${n}.jpg`);
  const colImageSets = splitImages(images, numCols);

  useEffect(() => {
    // Kill all previous tweens before starting new ones
    gsapTweens.current.forEach(tween => tween && tween.kill());
    gsapTweens.current = [];
    if (!cellHeight) return;
    colRefs.current.forEach((col, idx) => {
      if (!col) return;
      const isReverse = idx % 2 === 1;
      const sectionHeight = window.innerHeight;
      const imagesNeeded = Math.ceil(sectionHeight / cellHeight);
      const imagesInCol = colImageSets[idx]?.length || imagesPerCol;
      const loopHeight = imagesInCol * cellHeight;
      const visibleHeight = sectionHeight;
      const fromY = 0;
      const toY = isReverse ? loopHeight - visibleHeight : -(loopHeight - visibleHeight);
      // Animate from y: 0 to y: toY, then reverse (yoyo)
      const tween = gsap.fromTo(
        col,
        { y: fromY },
        {
          y: toY,
          duration: 24,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        }
      );
      gsapTweens.current[idx] = tween;
    });
    return () => {
      gsapTweens.current.forEach(tween => tween && tween.kill());
    };
  }, [cellHeight, numCols, imagesPerCol, colImageSets]);

  // Hide parent div if image fails to load
  function handleImgError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const parent = e.currentTarget.parentElement;
    if (parent) parent.style.display = 'none';
  }

  // Responsive column width
  const colWidthClass = numCols === 3 ? 'w-1/3' : 'w-1/6';
  const minColWidth = numCols === 3 ? '120px' : '150px';
  const sectionHeightClass = isMobile ? 'h-[60vh]' : 'h-screen';

  return (
    <section className={`w-screen ${sectionHeightClass} flex flex-col items-center justify-center bg-white relative overflow-hidden`}>
      <div className="w-full h-full flex flex-row gap-4 items-center justify-center overflow-hidden">
        {colImageSets.map((colImages, colIdx) => {
          // How many images to fill the section?
          const imagesNeeded = cellHeight ? Math.ceil(window.innerHeight / cellHeight) : imagesPerCol;
          // Repeat the images just enough times to fill the section and allow for seamless looping
          const repeatCount = Math.ceil(imagesNeeded / colImages.length) + 1;
          const imagesForCol = Array(repeatCount).fill(colImages).flat().slice(0, imagesNeeded + colImages.length);
          return (
            <div
              key={colIdx}
              ref={el => (colRefs.current[colIdx] = el)}
              className={`flex flex-col ${colWidthClass} h-full items-center justify-center`}
              style={{ minWidth: minColWidth, maxWidth: '1fr' }}
            >
              {imagesForCol.map((img, i) => (
                <div
                  key={i}
                  className="creative-grid-cell aspect-square w-full mb-4 overflow-hidden shadow bg-gray-100 flex-shrink-0"
                  style={{ margin: 0, padding: 0, borderRadius: 0 }}
                >
                  <img
                    src={img}
                    alt="Creative Process"
                    className="w-full h-full object-cover object-center grayscale"
                    draggable={false}
                    loading="lazy"
                    onError={handleImgError}
                    style={{ borderRadius: 0 }}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {/* 20% opacity white overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-white/20" />
    </section>
  );
};

export default CreativeProcessGrid;