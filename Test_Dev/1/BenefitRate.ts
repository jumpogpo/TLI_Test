export type PaymentType = "Annual" | "Non-Annual";

class BenefitRate {
  static CommissionRate(age: number, year: number): number {
    if (age < 0 || age > 60) throw new Error("Age must be between 0 and 60");
    if (year < 1 || year > 3) throw new Error("Year must be between 1 and 3");

    if (age >= 0 && age <= 50) {
      return year == 1 ? 2 : 1;
    } else {
      return year == 3 ? 1 : 2;
    }
  }

  static OverridingRate(age: number, paymentType: PaymentType): number {
    if (age < 0 || age > 60) throw new Error("Age must be between 0 and 60");
    if (paymentType !== "Annual" && paymentType !== "Non-Annual")
      throw new Error("Invalid payment type");

    if (age >= 0 && age <= 50) {
      return paymentType == "Annual" ? 20 : 16;
    } else {
      return 13;
    }
  }
}

export default BenefitRate;
