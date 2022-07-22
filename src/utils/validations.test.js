import { validateEmail } from './validations';

test('Should return is email valid', () => {
  expect(validateEmail('qwe@mail.com')).toBe(true);
  expect(validateEmail('qwemail.com')).toBe(false);
  expect(validateEmail('@mail.com')).toBe(false);
  expect(validateEmail('q,w,e@mai,l.com')).toBe(false);
  expect(validateEmail('qwem@ailcom')).toBe(false);
  expect(validateEmail('qwe@mail.m')).toBe(false);
  expect(validateEmail('qwe@mail.cm')).toBe(true);
});
