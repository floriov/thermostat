const Thermostat = require('./thermostat');

describe('thermostat', () => {
  const thermostat = new Thermostat();
  it('returns temperature', () => {
    expect(thermostat.getTemperature()).toEqual(20);
  })
  it('starts with minimum temp of 10', () => {
    for (i = 0; i < 10; i++) {
      thermostat.down();
    }
    expect(thermostat.getTemperature()).toEqual(10)
  })  
});

describe('thermostat up', () => {
  const thermostat = new Thermostat();
  it('increases temperature', () => {
    thermostat.up(1)
    thermostat.up(1)
    expect(thermostat.getTemperature()).toEqual(22);
  })
  it('has PSM on as default', () => {
    expect(thermostat.isPowerSavingModeOn()).toBe(true)
  })
  it('it can switch PSM off', () => {
    thermostat.switchPowerSavingModeOff()
      expect(thermostat.isPowerSavingModeOn()).toBe(false)
  })
  it('it can switch PSM back on', () => {
    thermostat.switchPowerSavingModeOff()
      expect(thermostat.isPowerSavingModeOn()).toBe(false)
    thermostat.switchPowerSavingModeOn()
     expect(thermostat.isPowerSavingModeOn()).toBe(true)
  })
  it('when PSM off max temp is 32', () => {
    thermostat.switchPowerSavingModeOff();
    for (i = 0; i < 13; i++) {
    thermostat.up();
    }
    expect(thermostat.getTemperature()).toEqual(32) 
  })
})

describe('when PSM is on max temp', () => { 
  const thermostat = new Thermostat();
  it('when PSM on max temp is 25', () => {
      for (i = 0; i < 6; i++) {
      thermostat.up();
      }
      expect(thermostat.getTemperature()).toEqual(25);
  });
});
  



describe('thermostat down', () => {
  const thermostat = new Thermostat();

  it('decreases temperature', () => {
    thermostat.down(1)
    expect(thermostat.getTemperature()).toEqual(19);
  })
});


describe('reset', () => {
  const thermostat = new Thermostat();
  it('resets temperature', () => {
    for(i = 0; i < 0; i++) {
    thermostat.up();
    }
    thermostat.reset();
    expect(thermostat.getTemperature()).toEqual(20);
  }); 
})

describe('energy use', () => {
  describe('when temp is below 18 degrees', () => {
    const thermostat = new Thermostat();
    it('returns low-usage when temp is <18', () => {
      for(i = 0; i < 3; i++) {
        thermostat.down()
      }
      expect(thermostat.energyUsage()).toEqual('low-usage')
    })
  })
  
  describe('when the temperature is between 18 and 25 degrees', () => {
    const thermostat = new Thermostat();
    it('returns medium-usage when temp is 18+ but < 25', () => {
      expect(thermostat.energyUsage()).toEqual('medium-usage')
    })
  })

  describe('when the temperature is anything else', () => {
    const thermostat = new Thermostat();
    it('returns maximum-usage when temp is => 25', () => {
      thermostat.powerSavingMode = false;
      for(i = 0; i <=6; i++) {
      thermostat.up()
    }
    expect(thermostat.energyUsage()).toEqual('high-usage')
    })
  })
})
