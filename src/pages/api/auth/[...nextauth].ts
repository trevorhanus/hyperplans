import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import prisma from 'conn/prisma';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
        } & DefaultSession['user'];
    }
}

const SALT_ROUNDS = 10;

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: 'w8sbUqkhE9l1Ae6IrYLm4x1p+QjvQKfZzZX+bEeNMq0=',
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days,
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {},
    pages: {
        signIn: '/auth/signin'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;

                let user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });

                if (!user) {
                    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

                    user = await prisma.user.create({
                        data: {
                            email,
                            password: passwordHash,
                            image: getProfileImage(),
                        },
                    });
                }

                const passwordsMatch = await bcrypt.compare(password, user.password);

                if (!passwordsMatch) {
                    throw new Error('Invalid password');
                }

                return user;
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
});

function getProfileImage(): string {
    const rando = Math.floor(Math.random() * 9);
    return `https://randomuser.me/api/portraits/lego/${rando}.jpg`;
}
