import {
  findTemperatureColor,
  resolveDayText,
} from '../../../src/components/weatherInfo/weatherInfoHelpers';
import dayjs from 'dayjs';

describe('weatherInfoHelpers', () => {
  describe('findTemperatureColor', () => {
    it('should return correct color for +20 degrees', () => {
      expect(findTemperatureColor(20)).to.eq('hsl(77.04, 100%, 50%)');
    });

    it('should return correct color for 2 degrees', () => {
      expect(findTemperatureColor(2)).to.eq('hsl(163.7, 100%, 50%)');
    });

    it('should return correct color for -21 degrees', () => {
      expect(findTemperatureColor(-21)).to.eq('hsl(260, 100%, 50%)');
    });

    it('should return correct color for a very cold temp', () => {
      expect(findTemperatureColor(-212)).to.eq('hsl(260, 100%, 50%)');
    });

    it('should return correct color for a hot cold temp', () => {
      expect(findTemperatureColor(212)).to.eq('hsl(0, 100%, 50%)');
    });
  });

  describe('resolveDayText', () => {
    it("should return correct string for datetime that's 2 days into the future", () => {
      expect(
        resolveDayText(
          dayjs()
            .add(2, 'day')
            .format()
        )
      ).to.equal(
        `in 2 days (${dayjs()
          .add(2, 'day')
          .format('D.M.')})`
      );
    });

    it("should return correct string for datetime that's in 12 hours ", () => {
      expect(
        resolveDayText(
          dayjs()
            .add(12, 'hour')
            .format()
        )
      ).to.equal(
        `in 12 hours (${dayjs()
          .add(12, 'hour')
          .format('D.M.')})`
      );
    });
  });
});
