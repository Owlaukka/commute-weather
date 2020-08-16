import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const highTempLimit = 36;
const lowTempLimit = -18;

export const findTemperatureColor = (temperature) => {
  const fullRangeSize = Math.abs(highTempLimit - lowTempLimit);
  const adjustedTemp = temperature + Math.abs(lowTempLimit);
  const tempPerc = 1 - Math.min(Math.max(adjustedTemp / fullRangeSize, 0), 1);

  return `hsl(${Math.round(260 * tempPerc * 100) / 100}, 100%, 50%)`;
};

export const formatTime = (hour, minute) =>
  dayjs().hour(hour).minute(minute).format('HH:mm');
