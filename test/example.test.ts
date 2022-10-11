import { example } from '../src/example';

describe('test example', () => {
  it('should return example message', () => {
    expect(example()).toEqual('test');
  });
});
