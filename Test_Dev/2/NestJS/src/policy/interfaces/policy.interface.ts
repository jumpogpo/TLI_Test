export interface Policy {
  policyNo: string;
  status: string;
  agenID: string;
}

export interface Insured {
  insureName: string;
  policy: Policy[];
  policyNo: string;
  policyType?: string | null;
  status: string;
  agenID: string;
}

export interface InsuredResponse {
  policy: Policy[];
  policyNo: string;
  policyType?: string | null;
  status: string;
  agenID: string;
}
export interface PolicyData {
  insuredList: Insured[];
}
