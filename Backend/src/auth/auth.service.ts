import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { PrismaService } from '../prisma/prisma.service'
import { hash } from 'argon2'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './interfaces/jwt.interface'
import { LoginAuthDto } from './dto/login-auth.dto'
import { verify } from 'argon2'
import { Request, Response } from 'express'
import { isDev } from 'src/utils/is-dev.utils'

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService
	) {}

	async register(res: Response, dto: CreateAuthDto) {
		const { email, password, name } = dto

		const existUser = await this.prisma.user.findUnique({
			where: {
				email
			}
		})

		if (existUser) {
			throw new ConflictException('Пользователь с такой почтой уже существует!')
		}

		const user = await this.prisma.user.create({
			data: { name, email, password: await hash(password) }
		})
		
		await this.prisma.finance.create({
			data: {userId: user.id}
		})

		return this.auth(res, user.id)
	}

	async login(res: Response, dto: LoginAuthDto) {
		const { email, password } = dto

		const user = await this.prisma.user.findUnique({
			where: {
				email
			},
			select: {
				id: true,
				password: true
			}
		})

		if (!user) {
			throw new NotFoundException('Поьльзоватль не найден!')
		}

		const isValidPassword = await verify(user.password, password)

		if (!isValidPassword) {
			throw new NotFoundException('Поьльзоватль не найден!')
		}

		return this.auth(res, user.id)
	}

	async refresh(req: Request, res: Response) {
		if (!req.cookies['refreshToken']) {
			throw new UnauthorizedException('Недействительный refreh токен')
		}

		const refreshToken = req.cookies['refreshToken'] as string

		const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken)

		if (payload) {
			const user = await this.prisma.user.findUnique({
				where: {
					id: payload.id
				},
				select: {
					id: true
				}
			})

			if (!user) {
				throw new NotFoundException('Пользователь не найден')
			}

			return this.auth(res, user.id)
		}
	}

	async validate(id: string) {
		const user = await this.prisma.user.findUnique({ where: { id } })
   
    if (!user) {
			throw new NotFoundException('Поьльзоватль не найден!')
		}

    return user;
	}

	logout(res: Response) {
		this.setCookie(res, 'refreshToken', new Date(0))
		return true
	}

	private auth(res: Response, id: string) {
		const { accessToken, refreshToken } = this.generateTokens(id)

		this.setCookie(
			res,
			refreshToken,
			new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
		)

		return { accessToken }
	}

	private generateTokens(id: string) {
		const payload: JwtPayload = { id }

		const accessToken = this.jwtService.sign(payload)
		const refreshToken = this.jwtService.sign(payload)

		return {
			accessToken,
			refreshToken
		}
	}

	private setCookie(res: Response, value: string, expires: Date) {
		res.cookie('refreshToken', value, {
			httpOnly: true,
			domain: this.configService.getOrThrow<string>('COOKIE_DOMAIN'),
			expires,
			secure: !isDev(this.configService),
			sameSite: isDev(this.configService) ? 'none' : 'lax'
		})
	}
}
