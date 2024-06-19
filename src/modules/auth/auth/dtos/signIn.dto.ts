import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  password: string;
}
