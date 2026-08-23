import * as z from 'zod'

const emailSchema = z
.string()
.email('Invalid Email Address')

const usernameSchema = z
.string()
.regex(/[^A-Za-z0-9-_]/, {error: 'Username can only contain alphanumberic characters and underscores'})

const passwordSchema = z
.string()
.min(6)

export const signUpSchema = z.object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema
})

