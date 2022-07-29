import {joinCls, validateYouTubeUrl} from './index';

describe('Test utilities: joinCls', () => {
  it('joinCls (1)', () => {
    const url = ['abc', 'def'];
    expect(joinCls(url)).toEqual('abc def');
  });

  it('joinCls (2)', () => {
    const url = ['abc', 'def', false];
    expect(joinCls(url)).toEqual('abc def');
  });

  it('joinCls (3)', () => {
    const url = ['abc', 'def', ''];
    expect(joinCls(url)).toEqual('abc def');
  });
});

describe('Test utilities: validateYouTubeUrl', () => {
  it('validateYouTubeUrl is valid (1)', () => {
    const url = 'https://www.youtube.com/watch?v=_0BKXxIyXm0';
    expect(validateYouTubeUrl(url)).toEqual('_0BKXxIyXm0');
  });

  it('validateYouTubeUrl is valid (2)', () => {
    const url = 'https://www.youtube.com/watch?v=_0BKXxIyXm0abc';
    expect(validateYouTubeUrl(url)).toEqual('_0BKXxIyXm0');
  });

  it('validateYouTubeUrl is invalid (2)', () => {
    const url = '://www.youtube.com/watch?v=_0BKXxIyXm0';
    expect(validateYouTubeUrl(url)).toEqual(false);
  });

  it('validateYouTubeUrl is invalid (3)', () => {
    const url = 'https://watch?v=_0BKXxIyXm0';
    expect(validateYouTubeUrl(url)).toEqual(false);
  });
});
