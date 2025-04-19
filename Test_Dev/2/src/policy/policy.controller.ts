import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { GetPolicyDto } from './dto/get-policy.dto';
import { ApiTags, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { RequestHeader } from 'src/common/decorators/headers.decorator';
import { HeadersDto } from './dto/headers-policy.dto';
import {
  PolicyNotFoundResponseDto,
  PolicyResponseDto,
} from './dto/policy-response.dto';
import {
  InternalErrorResponseDto,
  ValidationErrorResponseDto,
} from 'src/common/dto/error-responses.dto';
import { ApiStandardHeaders } from 'src/common/decorators/api-headers.decorator';

@ApiTags('Policy')
@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiStandardHeaders()
  @ApiOkResponse({
    description: 'The policy information has been successfully retrieved',
    type: PolicyResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Insured with the given name not found',
    type: PolicyNotFoundResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
    type: ValidationErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: InternalErrorResponseDto,
  })
  get(
    @RequestHeader() headers: HeadersDto,
    @Body() getPolicyDto: GetPolicyDto,
  ) {
    return this.policyService.getPolicy(getPolicyDto);
  }
}
