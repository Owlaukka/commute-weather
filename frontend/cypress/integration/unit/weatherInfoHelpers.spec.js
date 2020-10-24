import {
  findTemperatureColor,
  calculateWeatherSuitability,
} from '../../../src/components/WeatherInfo/weatherInfoHelpers';

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

  describe('calculateWeatherSuitability', () => {
    it('should work for one-to-one suitability', () => {
      const weather = {
        temperature: { isDaily: false, temp: 15 },
        humidity: 60,
      };
      const preferences = {
        idealTemperature: { value: '15', priority: 100 },
        idealHumidity: { value: '60', priority: 100 },
      };

      expect(calculateWeatherSuitability(weather, preferences)).to.equal(1);
    });

    it('should return 1 when no preferences are given', () => {
      const weather = {
        temperature: { isDaily: false, temp: 15 },
        humidity: 60,
      };
      const preferences = {};

      expect(calculateWeatherSuitability(weather, preferences)).to.equal(1);
    });

    it('should return 1 when given bad values as preferences', () => {
      const weather = {
        temperature: { isDaily: false, temp: -20 },
        humidity: 100,
      };
      const preferences = {
        idealTemperature: { value: 'dafaq', priority: 100 },
        idealHumidity: { value: 'am i doing', priority: 100 },
      };

      expect(calculateWeatherSuitability(weather, preferences)).to.equal(1);
    });

    it('should work for temp that is far from ideal', () => {
      const weather = {
        temperature: { isDaily: false, temp: -20 },
        humidity: 100,
      };
      const preferences = {
        idealTemperature: { value: '15', priority: 100 },
        idealHumidity: { value: '60', priority: 100 },
      };

      expect(calculateWeatherSuitability(weather, preferences)).to.equal(0);
    });

    it('should work for humidity that is far from ideal', () => {
      const weather = {
        temperature: { isDaily: false, temp: 15 },
        humidity: 0,
      };
      const preferences = {
        idealTemperature: { value: '15', priority: 100 },
        idealHumidity: { value: '100', priority: 100 },
      };

      expect(calculateWeatherSuitability(weather, preferences)).to.equal(0);
    });

    it('should work when humidity is perfect and temp is a little less than ideal', () => {
      const weather = {
        temperature: { isDaily: false, temp: 15 },
        humidity: 70,
      };
      const preferences = {
        idealTemperature: { value: '21', priority: 100 },
        idealHumidity: { value: '70', priority: 100 },
      };

      expect(calculateWeatherSuitability(weather, preferences)).to.equal(0.7);
    });

    it('should work when humidity is perfect and temp is a little more than ideal', () => {
      const weather = {
        temperature: { isDaily: false, temp: 27 },
        humidity: 70,
      };
      const preferences = {
        idealTemperature: { value: '21', priority: 100 },
        idealHumidity: { value: '70', priority: 100 },
      };

      expect(calculateWeatherSuitability(weather, preferences)).to.equal(0.7);
    });

    it('should work when humidity is 0 priority and temp is a little more than ideal', () => {
      const weather = {
        temperature: { isDaily: false, temp: 27 },
        humidity: 30,
      };
      const preferences = {
        idealTemperature: { value: '21', priority: 100 },
        idealHumidity: { value: '70', priority: 0 },
      };

      expect(calculateWeatherSuitability(weather, preferences)).to.equal(0.7);
    });

    it('should work when temp is perfect and humidity is less than ideal', () => {
      const weather = {
        temperature: { isDaily: false, temp: 21 },
        humidity: 50,
      };
      const preferences = {
        idealTemperature: { value: '21', priority: 100 },
        idealHumidity: { value: '70', priority: 100 },
      };

      expect(calculateWeatherSuitability(weather, preferences)).to.equal(0.8);
    });

    it('should work when temp is perfect and humidity is more than ideal', () => {
      const weather = {
        temperature: { isDaily: false, temp: 21 },
        humidity: 90,
      };
      const preferences = {
        idealTemperature: { value: '21', priority: 100 },
        idealHumidity: { value: '70', priority: 100 },
      };

      expect(calculateWeatherSuitability(weather, preferences)).to.equal(0.8);
    });

    it('should work when temp is 0 priority and humidity is more than ideal', () => {
      const weather = {
        temperature: { isDaily: false, temp: -21 },
        humidity: 90,
      };
      const preferences = {
        idealTemperature: { value: '21', priority: 0 },
        idealHumidity: { value: '70', priority: 100 },
      };

      expect(calculateWeatherSuitability(weather, preferences)).to.equal(0.8);
    });

    it('should work when priority is lowered by 50%', () => {
      const weather = {
        temperature: { isDaily: false, temp: 21 },
        humidity: 90,
      };
      const preferences = {
        idealTemperature: { value: '21', priority: 0 },
        idealHumidity: { value: '70', priority: 50 },
      };

      expect(calculateWeatherSuitability(weather, preferences)).to.equal(0.9);
    });

    it('should combine suitability values for temp and humidity when both are valid', () => {
      const weather = {
        temperature: { isDaily: false, temp: 15 },
        humidity: 90,
      };
      const preferences = {
        idealTemperature: { value: '21', priority: 100 },
        idealHumidity: { value: '70', priority: 100 },
      };

      expect(calculateWeatherSuitability(weather, preferences)).to.equal(
        0.8 * 0.7 // ~0.56
      );
    });

    it('should return value based only on temp when no humidity preference is given', () => {
      const weather = {
        temperature: { isDaily: false, temp: 15 },
        humidity: 90,
      };
      const preferences = {
        idealTemperature: { value: '21', priority: 100 },
      };

      expect(calculateWeatherSuitability(weather, preferences)).to.equal(0.7);
    });

    it('should return value based only on humidity when no temp preference is given', () => {
      const weather = {
        temperature: { isDaily: false, temp: 15 },
        humidity: 90,
      };
      const preferences = {
        idealHumidity: { value: '70', priority: 100 },
      };

      expect(calculateWeatherSuitability(weather, preferences)).to.equal(0.8);
    });

    it('should work for daily temperature forecasts as well', () => {
      const weather = {
        temperature: { isDaily: true, min: 8, max: 14, temp: 15 },
        humidity: 90,
      };
      const preferences = {
        idealTemperature: { value: '21', priority: 100 },
      };

      expect(calculateWeatherSuitability(weather, preferences)).to.equal(0.5);
    });
  });
});
