import React, { useState, useRef } from 'react';

const partnerLogos = [
  'partner1.svg',
  'partner2.svg',
  'partner3.svg',
  'partner 4.svg',
  'partner 5.svg',
  'partner 6.svg',
  'partner 7.svg',
];

const PartnersSection: React.FC = () => {
  // Duplicate the logos for seamless infinite scroll
  const allLogos = [...partnerLogos, ...partnerLogos];
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  // Mouse/touch handlers for swiping/draggable scroll
  const handleDragStart = (clientX: number) => {
    setPaused(true);
    setIsDragging(true);
    dragStartX.current = clientX;
    scrollStartX.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || !scrollRef.current) return;
    const deltaX = clientX - dragStartX.current;
    scrollRef.current.scrollLeft = scrollStartX.current - deltaX;
  };

  const handleDragEnd = () => {
    setPaused(false);
    setIsDragging(false);
  };

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = handleDragEnd;

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleDragMove(e.clientX);
    }
  };
  const onMouseUp = handleDragEnd;
  const onMouseLeave = () => {
    if (isDragging) handleDragEnd();
  };

  return (
    <section className="pt-32 pb-12 md:py-20 bg-white">
      <div className="container-custom text-center">
        <div className="relative w-full overflow-hidden">
          {/* Left Gradient Overlay */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-8 md:w-16 z-10" style={{background: 'linear-gradient(to right, white 80%, transparent)'}} />
          {/* Right Gradient Overlay */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 md:w-16 z-10" style={{background: 'linear-gradient(to left, white 80%, transparent)'}} />
          {/* Scrolling Logos with swipe/click-drag support */}
          <div
            ref={scrollRef}
            className={`flex items-center gap-6 md:gap-20 overflow-x-auto scrollbar-hide touch-pan-x select-none`}
            style={{width: '100%', WebkitOverflowScrolling: 'touch', cursor: isDragging ? 'grabbing' : 'grab'}}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
          >
            <div
              className={`flex items-center gap-6 md:gap-20 animate-partners-scroll${paused ? ' partners-scroll-paused' : ''}`}
              style={{width: 'max-content', willChange: 'transform'}}
            >
              {allLogos.map((logo, idx) => (
                <img
                  key={logo + idx}
                  src={`/${logo}`}
                  alt={`Partner ${((idx % partnerLogos.length) + 1)}`}
                  className="h-16 xs:h-18 sm:h-20 md:h-16 lg:h-20 partners-logo cursor-pointer flex-shrink-0"
                  loading="lazy"
                  draggable={false}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-12">
          <div className="w-24 h-px bg-gray-200 mb-6" />
          <p className="text-base md:text-lg text-gray-600 font-light tracking-wide max-w-xl mx-auto">
            Partner brands crafted by us.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;