import dayjs from 'dayjs';

import { resolveDayTextTest as resolveDayText } from '../../../src/components/weatherInfo/WeatherInfo/WeatherInfoCard';

describe('resolveDayText', () => {
  it("should return correct string for datetime that's 2 days into the future", () => {
    expect(resolveDayText(dayjs().add(2, 'day').format())).to.equal(
      `in 2 days (${dayjs().add(2, 'day').format('D.M.')})`
    );
  });

  it("should return correct string for datetime that's in 12 hours ", () => {
    expect(resolveDayText(dayjs().add(12, 'hour').format())).to.equal(
      `in 12 hours (${dayjs().add(12, 'hour').format('D.M.')})`
    );
  });
});
