import { useState, useEffect, useCallback } from 'react';
import { QUIZ_CONFIG, TIMER_CONFIG } from '../constants';

export const useTimer = (onTimeUp, isActive = true) => {
  const [timeLeft, setTimeLeft] = useState(QUIZ_CONFIG.TIMER_DURATION);

  const resetTimer = useCallback(() => {
    setTimeLeft(QUIZ_CONFIG.TIMER_DURATION);
  }, []);

  const stopTimer = useCallback(() => {
    setTimeLeft(0);
  }, []);

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && onTimeUp) {
      onTimeUp();
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerStatus = () => {
    if (timeLeft <= TIMER_CONFIG.CRITICAL_THRESHOLD) {
      return 'critical';
    }
    if (timeLeft <= TIMER_CONFIG.WARNING_THRESHOLD) {
      return 'warning';
    }
    return 'normal';
  };

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    status: getTimerStatus(),
    resetTimer,
    stopTimer,
  };
};

