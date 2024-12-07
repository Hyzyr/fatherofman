import Popup from '@/components/Popup';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { videosData } from './constants';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimation,
} from 'framer-motion';

import gsap from 'gsap';

const imgURL = '/images/components/nyc/';

const getBgMusic = () => {
  if (typeof window === 'undefined') return;
  return document.querySelector('.muteButton audio');
};

const PopupNYC = ({ close, ...props }) => {
  const [loadedVideos, setLoadedVideos] = useState({});
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isForYou, setIsForYou] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRefs = useRef([]);
  const backgroundVideoRef = useRef(null);
  const tabletRef = useRef(null);
  const controls = useAnimation();
  const y = useMotionValue(0);
  // const { playMusic, pauseMusic } = useMusic();

  const handleDragEnd = async (e, info) => {
    handleSwipe(info.offset.y);
    setIsPaused(false);
    await controls.start({ y: 0 });
  };

  useEffect(() => {
    setIsPaused(!props.active);
    if (props.active) {
      let height = tabletRef.current.clientHeight;
      tabletRef.current.style.width = `${height * 0.69}px`;
    }
    const audioBg = getBgMusic();
    if (audioBg)
      gsap.to(audioBg, {
        volume: props.active ? 0 : 1,
        duration: 0.25,
        onComplete: () => {
          if (sound?.start) sound.start();
        },
      });
  }, [props.active]);

  useEffect(() => {
    const shuffledVideos = [...videosData].sort(() => Math.random() - 0.5);
    setVideos(shuffledVideos);
  }, []);

  useEffect(() => {
    const currentVideoElement = videoRefs.current[currentIndex];
    if (currentVideoElement) {
      videoRefs.current.forEach((video, index) => {
        if (index !== currentIndex && video) video.pause();
      });

      currentVideoElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      currentVideoElement.muted = false;
      currentVideoElement.play();
    }
  }, [currentIndex]);

  useEffect(() => {
    const backgroundVideo = backgroundVideoRef.current;
    const currentVideo = videoRefs.current[currentIndex];
    if (backgroundVideo) {
      if (isPaused) {
        backgroundVideo.pause();
        currentVideo?.pause();
      } else {
        backgroundVideo.play();
        currentVideo?.play();
      }
    }
  }, [isPaused, currentIndex]);

  const onClose = () => {
    setIsPaused(true);
    if (close) close();
  };
  const handleSwipe = (offsetY) => {
    if (offsetY > 50) {
      setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    } else if (offsetY < -50) {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }
  };

  const togglePlayPause = useCallback(() => {
    const video = videoRefs.current[currentIndex];
    if (video) {
      if (isPaused) {
        video.play();
      } else {
        video.pause();
      }
      setIsPaused(!isPaused);
    }
  }, [currentIndex, isPaused]);

  const toggleLike = (index) => {
    setVideos((prevVideos) =>
      prevVideos.map((video, i) =>
        i === index ? { ...video, bLiked: !video.bLiked } : video
      )
    );
  };

  const setVideoRef = useCallback((el, index) => {
    videoRefs.current[index] = el;
  }, []);

  const handleVideoLoaded = (index) => {
    setLoadedVideos((prev) => ({ ...prev, [index]: true }));
    setIsLoading(false);
  };

  const handleVideoLoading = (index) => {
    if (loadedVideos[index]) {
      return;
    }
    setIsLoading(true);
  };
  return (
    <Popup {...props} close={onClose}>
      <div className="popupTablet">
        <img
          src="/images/components/nyc/ipad_1.webp"
          alt="ipad_1"
          ref={tabletRef}
        />
        <div className="popupTablet__bg">
          {isLoading && (
            <img
              src={'/videos/thumb/' + videos[currentIndex]?.thumb}
              alt="thumb"
            />
          )}
          <video
            ref={backgroundVideoRef}
            src={'/videos/' + videos[currentIndex]?.src}
            style={{ pointerEvents: 'none' }} // Prevent interaction
            loop
            autoPlay
            muted
          />
        </div>
        {/* Top Navigation */}
        <div className="popupTablet__top">
          <button
            className={`${!isForYou ? 'active' : ''}`}
            onClick={() => setIsForYou(false)}>
            Following
          </button>
          <span>|</span>
          <button
            className={`${isForYou ? 'active' : ''}`}
            onClick={() => setIsForYou(true)}>
            For You
          </button>
        </div>

        {/* Video Feed */}
        <motion.div
          className="popupTablet__player"
          drag="y"
          style={{ y }}
          dragConstraints={{ yPercent: -100, bottom: 100 }}
          onDragEnd={handleDragEnd}
          animate={controls}>
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="popupTablet__player-video"
              onClick={togglePlayPause}>
              {/* Main Video */}
              <video
                ref={(el) => setVideoRef(el, currentIndex)}
                src={'/videos/' + videos[currentIndex]?.src}
                loop
                onLoadedData={() => handleVideoLoaded(currentIndex)}
                onWaiting={() => handleVideoLoading(currentIndex)}
              />

              {/* Loading Indicator */}
              {isLoading && (
                <div className="popupTablet__player-spinner">
                  <img
                    src={'/videos/thumb/' + videos[currentIndex]?.thumb}
                    alt="thumb"
                  />
                  <span>
                    <span></span>
                  </span>
                </div>
              )}

              {/* Pause Indicator */}
              {isPaused && !isLoading && (
                <div className="popupTablet__player-play">
                  <img src={imgURL + 'play.webp'} alt="Pause" />
                </div>
              )}

              {/* Video Info */}
              <div className="popupTablet__player-info">
                <div>
                  <h2>{videos[currentIndex]?.username}</h2>
                  <img
                    src={imgURL + 'verified_round.webp'}
                    alt="Pause"
                    width={18}
                    height={18}
                  />
                </div>
                <p>{videos[currentIndex]?.caption}</p>
              </div>

              {/* Right Sidebar */}
              <div className="popupTablet__player-actions">
                <div className="avatar">
                  <img
                    src={imgURL + 'avatar.webp'}
                    alt="User avatar"
                    width={40}
                    height={40}
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(currentIndex);
                  }}>
                  <img
                    src={
                      imgURL +
                      (videos[currentIndex]?.bLiked
                        ? 'liked.webp'
                        : 'like.webp')
                    }
                    alt="Like"
                    width={32}
                    height={32}
                  />
                  <span>{videos[currentIndex]?.likes}</span>
                </button>
                <button onClick={(e) => e.stopPropagation()}>
                  <img src={imgURL + 'comment.webp'} alt="Comment" />
                  <span>{videos[currentIndex]?.comments}</span>
                </button>
                <button onClick={(e) => e.stopPropagation()}>
                  <img
                    src={imgURL + 'share.webp'}
                    alt="Share"
                    width={32}
                    height={32}
                  />
                  <span>{videos[currentIndex]?.shares}</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </Popup>
  );
};

export default PopupNYC;
