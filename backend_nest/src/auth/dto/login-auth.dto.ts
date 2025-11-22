import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class LoginAuthDto {
	@IsNotEmpty({ message: 'Обязательно для заполнения' })
	@IsEmail({}, { message: 'Не корректный адрес электронной почты' })
	email: string

	@IsNotEmpty({ message: 'Обязательно для заполнения' })
	@MinLength(6, { message: 'Пароль должен быть не меньше 6 символов' })
	password: string
}
