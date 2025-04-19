import { expect, test, describe } from "bun:test";
import BenefitRate, { type PaymentType } from "./BenefitRate";

describe("BenefitRate Class", () => {
  test("can create instance", () => {
    const benefitRate = new BenefitRate();
    expect(benefitRate).toBeInstanceOf(BenefitRate);
  });
});

describe("CommissionRate", () => {
  // Result Test
  test.each([
    [25, 1, 2],
    [60, 2, 2],
    [0, 3, 1],
  ])(
    "Age: %p, Year: %p should be %p%",
    (age: number, year: number, expected) => {
      expect(BenefitRate.CommissionRate(age, year)).toBe(expected);
    }
  );

  // Error Test
  test.each([
    [-1, 3, "Age must be between 0 and 60"],
    [61, 3, "Age must be between 0 and 60"],
    [25, 4, "Year must be between 1 and 3"],
    [25, 0, "Year must be between 1 and 3"],
  ])(
    "Age: %p, Year: %p should throw %p",
    (age: number, year: number, expected) => {
      expect(() => BenefitRate.CommissionRate(age, year)).toThrow(expected);
    }
  );
});

describe("OverridingRate", () => {
  // Result Test
  test.each<[number, PaymentType, number]>([
    [0, "Annual", 20],
    [50, "Annual", 20],
    [51, "Annual", 13],
    [60, "Annual", 13],
    [25, "Non-Annual", 16],
    [51, "Non-Annual", 13],
  ])("Age: %p, PaymentType: %p should be %p", (age, paymentType, expected) => {
    expect(BenefitRate.OverridingRate(age, paymentType)).toBe(expected);
  });

  // Error Test
  test.each<[number, PaymentType, string]>([
    [-1, "Annual", "Age must be between 0 and 60"],
    [61, "Annual", "Age must be between 0 and 60"],
    [25, "Hello" as unknown as PaymentType, "Invalid payment type"],
  ])(
    "Age: %p, PaymentType: %p should throw %p",
    (age, paymentType, expected) => {
      expect(() => BenefitRate.OverridingRate(age, paymentType)).toThrow(
        expected
      );
    }
  );
});
