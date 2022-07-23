import {
  isRepeatPassword,
  validateEmail,
  validateMinLength,
  validateRequeired,
} from "./validations";

test("Should return is email valid", () => {
  expect(validateEmail("qwe@mail.com")).toBe(true);
  expect(validateEmail("qwemail.com")).toBe(false);
  expect(validateEmail("@mail.com")).toBe(false);
  expect(validateEmail("q,w,e@mai,l.com")).toBe(false);
  expect(validateEmail("qwem@ailcom")).toBe(false);
  expect(validateEmail("qwe@mail.m")).toBe(false);
  expect(validateEmail("qwe@mail.cm")).toBe(true);
});

test("Should return is lenght less than min lenght", () => {
  expect(validateMinLength("qweqweqw", 8)).toBe(true);
  expect(validateMinLength("", 1)).toBe(false);
  expect(validateMinLength(" ", 1)).toBe(false);
  expect(validateMinLength("0", 0)).toBe(true);
  expect(validateMinLength("qweqwqw", 8)).toBe(false);
});

test("Should return true if string is not empty", () => {
  expect(validateRequeired("        ")).toBe(false);
  expect(validateRequeired("   q     ")).toBe(true);
  expect(validateRequeired("")).toBe(false);
  expect(validateRequeired("qwer")).toBe(true);
});

test("Should return is the params are equal", () => {
  expect(isRepeatPassword("qweqwe", "qweqwe")).toBe(true);
  expect(isRepeatPassword("qweqweq", "qweqwe")).toBe(false);
  expect(isRepeatPassword("QWEQWE", "qweqwe")).toBe(false);
});
