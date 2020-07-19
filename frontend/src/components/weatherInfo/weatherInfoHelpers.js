import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const highTempLimit = 36;
const lowTempLimit = -18;

export const findTemperatureColor = (temperature) => {
  const fullRangeSize = Math.abs(highTempLimit - lowTempLimit);
  const adjustedTemp = temperature + Math.abs(lowTempLimit);
  const tempPerc = 1 - Math.min(Math.max(adjustedTemp / fullRangeSize, 0), 1);

  return `hsl(${260 * tempPerc}, 100%, 50%)`;
};

export const resolveDayText = (datetime) =>
  `${dayjs().to(datetime)} (${dayjs(datetime).format('D.M.')})`;
