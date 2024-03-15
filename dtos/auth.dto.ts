import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  Length,
  Validate,
  Matches,
} from "class-validator";
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

// Custom validator function
@ValidatorConstraint({ name: "PasswordMatches", async: false })
class PasswordMatches implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const password = (args.object as any).password;
    return confirmPassword === password;
  }

  defaultMessage(args: ValidationArguments) {
    return "confirmPassword must match password";
  }
}
export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 15, { message: "password must be from 6-15 char" })
  password: string;
  @IsNotEmpty()
  @IsString()
  @Validate(PasswordMatches, { message: "confirmPassword must match password" })
  confirmPassword: string;
}
export class LogInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 15, { message: "incorrect password syntax" })
  password: string;
}

export class ForgetPasswordDto {
  @IsNotEmpty({ message: "email field is required" })
  @IsEmail({}, { message: "invalid email address" })
  email: string;
}

export class EmailOptionsDto {
  to: string;
  from?: string;
  subject?: string;
  message: string;
}

export class VerifyCodeDto {
  @IsNotEmpty({ message: "please provide resetCode" })
  @IsString({ message: "reset must be a string" })
  @Matches(/^\d{6}$/, {
    message: "Reset code must be a string of 6 digits",
  })
  code: string;
}


export class ResetPasswordDto extends ForgetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 15, { message: "password must be from 6-15 char" })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Validate(PasswordMatches, { message: "confirmPassword must match password" })
  confirmPassword: string;

}
