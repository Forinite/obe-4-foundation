// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { client } from '@/lib/sanity';
import bcrypt from 'bcrypt';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const admin = await client.fetch(
                    `*[_type == "adminUser" && email == $email][0]`,
                    { email: credentials.email }
                );

                if (!admin || !admin.password) return null;

                const isValid = await bcrypt.compare(credentials.password, admin.password);
                if (!isValid) return null;

                return { id: admin._id, name: admin.name, email: admin.email };
            },
        }),
    ],
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 8, // 8 hours
    },
    callbacks: {
        async jwt({ token }) {
            // Don't store id in token
            return token;
        },
        async session({ session }) {
            // Return session as-is, no id
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };




// app/api/auth/[...nextauth]/route.ts

