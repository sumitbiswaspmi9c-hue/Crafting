import React, { useEffect, useRef } from 'react';

interface Track {
  title: string;
  artist: string;
  image: string;
  spotifyUrl: string;
}

export const MusicMarquee: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRowRef = useRef<HTMLDivElement | null>(null);

  const tracks: Track[] = [
    {
      title: 'Black To Back',
      artist: 'Amy Winehouse',
      image: '/portfolio/black-to-back.png',
      spotifyUrl: 'https://open.spotify.com/track/30FURVTCpbKyykjSEQzGkH?si=6b015774817e4aba',
    },
    {
      title: 'Beanie Song',
      artist: 'Chezile',
      image: '/portfolio/beanie-song.png',
      spotifyUrl: 'https://open.spotify.com/track/5e0b9LgOfi3aJSKXFcOWRe?si=f23f412b55964817',
    },
    {
      title: 'Feel It Still',
      artist: 'The Man',
      image: '/portfolio/feel-it-still.png',
      spotifyUrl: 'https://open.spotify.com/track/6QgjcU0zLnzq5OrUoSZ3OK?si=a6596d67e17449f7',
    },
    {
      title: 'Feel Me',
      artist: 'Selena Gomez',
      image: '/portfolio/feel-me.png',
      spotifyUrl: 'https://open.spotify.com/track/4mt7C6wYeTUWDDk7xKym9w?si=e446e64e4d014705',
    },
    {
      title: 'I Was Never There',
      artist: 'The Weeknd',
      image: '/portfolio/I-was-never-there.png',
      spotifyUrl: 'https://open.spotify.com/track/1cKHdTo9u0ZymJdPGSh6nq?si=301d50ce8a1e4078',
    },
    {
      title: 'Not Like Us',
      artist: 'Kendrick Lamar',
      image: '/portfolio/not-like-us.png',
      spotifyUrl: 'https://open.spotify.com/track/6AI3ezQ4o3HUoP6Dhudph3?si=9e1dfe490fc34949',
    },
    {
      title: 'When I Grow Up',
      artist: 'NF',
      image: '/portfolio/when-i-grow-up.png',
      spotifyUrl: 'https://open.spotify.com/track/5rLyYxZNzca00ENADO9m54?si=f0bd3f4b3cb34974',
    },
    {
      title: 'Hold On',
      artist: 'Chord Overstreet',
      image: '/portfolio/hold.jpg',
      spotifyUrl: 'https://open.spotify.com/track/5vjLSffimiIP26QG5WcN2K?si=788fbefa5b724986',
    },
    {
      title: 'Easy On Me',
      artist: 'Adele',
      image: '/portfolio/easy-on-me.jpg',
      spotifyUrl: 'https://open.spotify.com/track/46IZ0fSY2mpAiktS3KOqds?si=f9955af7e8aa4f4b',
    },
  ];

  // Repeat sequence for seamless width
  const loopTracks = [...tracks, ...tracks];

  useEffect(() => {
    let animId: number;
    let currentX = 0;
    let targetX = 0;
    let isVisible = false;
    let lastTime = performance.now();

    const section = sectionRef.current;
    const trackRow = trackRowRef.current;
    if (!section || !trackRow) return;

    let maxScroll = 0;
    let sectionTop = 0;
    let sectionHeight = 0;
    let winHeight = window.innerHeight;

    const measure = () => {
      if (trackRow && section) {
        maxScroll = trackRow.scrollWidth - window.innerWidth + 250;
        sectionTop = section.offsetTop;
        sectionHeight = section.offsetHeight;
        winHeight = window.innerHeight;
      }
    };

    const updateTarget = () => {
      if (!isVisible) return;
      const scrollY = window.scrollY || window.pageYOffset;
      const totalDistance = sectionHeight + winHeight;
      if (totalDistance <= 0) return;
      const progress = (scrollY + winHeight - sectionTop) / totalDistance;
      const clamped = Math.max(0, Math.min(1, progress));
      targetX = -clamped * maxScroll;
    };

    measure();

    const handleScroll = () => {
      if (isVisible) updateTarget();
    };

    const handleResize = () => {
      measure();
      updateTarget();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // IntersectionObserver to only animate when in/near viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          measure();
          updateTarget();
          lastTime = performance.now();
        }
      },
      { rootMargin: '100px 0px 100px 0px' }
    );
    observer.observe(section);

    // Delta-time smoothed rendering loop
    const render = (now: number) => {
      const deltaMs = Math.min(now - lastTime, 40);
      lastTime = now;
      const dt = deltaMs / 16.667;

      if (isVisible && trackRow) {
        // Exponential smoothing independent of framerate
        const factor = 1 - Math.pow(1 - 0.09, dt);
        currentX += (targetX - currentX) * factor;

        // Apply direct subpixel transform without string truncation
        trackRow.style.transform = `translate3d(${currentX}px, 0, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 bg-black overflow-hidden select-none"
    >
      {/* Side Vignette Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-28 sm:w-52 bg-gradient-to-r from-black via-black/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 sm:w-52 bg-gradient-to-l from-black via-black/90 to-transparent z-20 pointer-events-none" />

      {/* Smooth Scrub Track Row */}
      <div className="w-full overflow-visible py-4">
        <div
          ref={trackRowRef}
          className="flex items-center gap-6 sm:gap-8 px-8 sm:px-16 w-max will-change-transform transform-gpu"
          style={{
            transform: 'translate3d(0, 0, 0)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {loopTracks.map((track, index) => (
            <a
              key={`${track.title}-${index}`}
              href={track.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="music-card relative flex-shrink-0 w-64 sm:w-72 md:w-80 aspect-[16/10] rounded-2xl overflow-hidden bg-[#161616] border border-white/10 shadow-xl hover:border-white/30 transition-colors duration-300 cursor-pointer transform-gpu"
              style={{
                transform: 'translateZ(0)',
                contain: 'strict',
              }}
            >
              <img
                src={track.image}
                alt={track.title}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover rounded-2xl pointer-events-none select-none"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Spotify Caption from Screenshot */}
      <div className="text-center mt-12 px-4">
        <p
          className="text-xs sm:text-sm font-bold tracking-[0.22em] text-[#EAE6E1] uppercase"
          style={{ fontFamily: "'Josefin Sans', sans-serif" }}
        >
          A FEW SONGS I CAN RECOMMEND IF YOU'RE LOOKING FOR SOME FRESH TUNES :)
        </p>
      </div>
    </section>
  );
};

export default MusicMarquee;
