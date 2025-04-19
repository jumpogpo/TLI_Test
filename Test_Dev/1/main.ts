import BenefitRate, { type PaymentType } from "./BenefitRate";

// Example Usage
const age: number = 25;
const year: number = 1;
const paymentType: PaymentType = "Annual";

const commissionRate: number = BenefitRate.CommissionRate(age, year);
const overridingRate: number = BenefitRate.OverridingRate(age, paymentType);

console.log(`Commission Rate: ${commissionRate}%`);
console.log(`Overriding Rate: ${overridingRate}%`);
