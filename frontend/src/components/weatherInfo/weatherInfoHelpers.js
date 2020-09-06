import dayjs from 'dayjs';

const HIGH_TEMP_LIMIT = 36;
const LOW_TEMP_LIMIT = -18;

export const findTemperatureColor = (temperature) => {
  const fullRangeSize = HIGH_TEMP_LIMIT - LOW_TEMP_LIMIT;
  const adjustedTemp = temperature + Math.abs(LOW_TEMP_LIMIT);
  const tempPerc = 1 - Math.min(Math.max(adjustedTemp / fullRangeSize, 0), 1);

  return `hsl(${Math.round(260 * tempPerc * 100) / 100}, 100%, 50%)`;
};

export const formatTime = (hour, minute) =>
  dayjs().hour(hour).minute(minute).format('HH:mm');
