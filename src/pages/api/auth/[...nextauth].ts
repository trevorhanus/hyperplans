import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

export default NextAuth({
    adapter: PrismaAdapter(prisma),
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
                    type: 'password'
                }
            },
            async authorize(credentials, req) {
                // find the user?
                console.log(credentials);
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                });

                if (!user) {
                    return null;
                }

                return user;
            }
        }),
    ]
});
