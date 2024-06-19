import { PublicAPI } from "@/bases/decorators";
import { Controller, Post, HttpCode, HttpStatus, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SignInDTO } from "./dtos/signIn.dto";
import { SignInResult } from "./dtos/signIn.result";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @PublicAPI()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: SignInDTO): Promise<SignInResult> {
    return await this.authService.signIn(body);
  }
}
