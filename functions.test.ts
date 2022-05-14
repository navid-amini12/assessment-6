const {shuffleArray} = require('./utils')
// this test will make pass if we passed array length equal our returned array length 
describe('shuffleArray should', () => {
  it('should return the same length array as passed', () => {
    const a = [1,2,3,2];
    expect(shuffleArray(a)).toHaveLength(4)

})
});
describe('shuffleArray should', () => {
    // we are just making sure our shuffled array is not the same as our passed array
    // basically we want to get random values for the game each time.
    it('actually shuffle the array returning random values from the passed array', () => {
      const a = [2,3,4,5,6];
      expect(shuffleArray(a)).not.toBe([2,3,4,5,6])
  
  })
  });
  

  describe('shuffleArray should', () => {
    // we are just making shure our shuffled array is not the same as our passed array
    // basically we want to get random values for the game each time.
    it('should not be null', () => {
      const a = shuffleArray([7,6,5,4])
      
      expect(shuffleArray(a)).not.toBeNull()

  
  })
  });

