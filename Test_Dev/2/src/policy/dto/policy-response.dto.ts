import { ApiProperty } from '@nestjs/swagger';

class PolicyDto {
  @ApiProperty({
    description: 'Policy number',
    example: 'P001',
  })
  policyNo: string;

  @ApiProperty({
    description: 'Policy status',
    example: 'Active',
  })
  status: string;

  @ApiProperty({
    description: 'Agent ID',
    example: 'AG123',
  })
  agenID: string;
}

export class PolicyNotFoundResponseDto {
  @ApiProperty({ example: 'Insured with the given name not found' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}

export class PolicyResponseDto {
  @ApiProperty({
    description: 'List of policies',
    type: [PolicyDto],
  })
  policy: PolicyDto[];

  @ApiProperty({
    description: 'Policy number',
    example: 'P001',
  })
  policyNo: string;

  @ApiProperty({
    description: 'Policy type',
    example: 'Life Insurance',
  })
  policyType: string | null;

  @ApiProperty({
    description: 'Policy status',
    example: 'Active',
  })
  status: string;

  @ApiProperty({
    description: 'Agent ID',
    example: 'AG123',
  })
  agenID: string;
}
