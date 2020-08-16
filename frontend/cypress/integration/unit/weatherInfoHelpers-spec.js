import { findTemperatureColor } from '../../../src/components/weatherInfo/weatherInfoHelpers';

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
});
