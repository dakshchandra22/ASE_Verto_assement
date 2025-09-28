import React from 'react';

const Timer = ({ timeLeft, formattedTime, status }) => {
  const getTimerClass = () => {
    switch (status) {
      case 'critical':
        return 'timer critical';
      case 'warning':
        return 'timer warning';
      default:
        return 'timer';
    }
  };

  return (
    <div className={getTimerClass()}>
      ⏱️ Time Remaining: {formattedTime}
    </div>
  );
};

export default Timer;