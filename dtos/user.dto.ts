import {
    IsNotEmpty,
    IsString,
    IsEmail,
    IsPhoneNumber,
    Length
    , Validate
} from 'class-validator';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';



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
    @Length(6,15,{message:"password must be from 6-15 char"})
    password: string;
    @IsNotEmpty()
    @IsString()
    @Validate(PasswordMatches,{ message: "confirmPassword must match password" })
    confirmPassword:string
}

export class CreateUserDto {
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
    @Length(6,15,{message:"password must be from 6-15 char"})
    password: string;
}



