import { Injectable, NotFoundException } from '@nestjs/common';
import { GetPolicyDto } from './dto/get-policy.dto';
import {
  Insured,
  InsuredResponse,
  PolicyData,
} from './interfaces/policy.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PolicyService {
  private getPolicyData(): PolicyData {
    const filePath = path.join(process.cwd(), 'src/database/policy.json');
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContent) as PolicyData;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error reading policy file: ${errorMessage}`);
      throw error;
    }
  }

  private getPolicyDataByInsureName(insureName: string): Insured | undefined {
    const policyData = this.getPolicyData();
    return policyData.insuredList.find(
      (insured) => insured.insureName === insureName,
    );
  }

  getPolicy(getPolicyDto: GetPolicyDto): InsuredResponse {
    const name: string = getPolicyDto.insureName;
    const insureData = this.getPolicyDataByInsureName(name);
    if (!insureData)
      throw new NotFoundException(`Insured with name ${name} not found`);

    const { insureName: _, ...insureDataWithoutName } = insureData;
    return insureDataWithoutName;
  }
}
