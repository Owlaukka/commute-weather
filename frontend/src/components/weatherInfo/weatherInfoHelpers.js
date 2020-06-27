const highTempLimit = 36;
const lowTempLimit = -18;

export const findTemperatureColor = (temperature) => {
  const fullRangeSize = Math.abs(highTempLimit - lowTempLimit);
  const adjustedTemp = temperature + Math.abs(lowTempLimit);
  const tempPerc = 1 - Math.min(Math.max(adjustedTemp / fullRangeSize, 0), 1);

  return `hsl(${260 * tempPerc}, 100%, 50%)`;
};

export const resolveDayText = (daysIntoFuture) => {
  if (daysIntoFuture === 0) {
    return 'Today';
  }
  if (daysIntoFuture === 1) {
    return 'Tomorrow';
  }
  const today = new Date();
  return new Date(
    today.setDate(today.getDate() + daysIntoFuture)
  ).toLocaleDateString();
};
