import {
    IsNotEmpty,
    IsString,
    IsEmail,
    IsPhoneNumber,
    Length
} from 'class-validator';





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



