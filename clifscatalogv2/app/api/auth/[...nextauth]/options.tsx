import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: {
              label: "Username",
              type: "text",
              placeholder: "JSmith@here.com",
            },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            //swap http://localhost:3000 with https://clifs-catalog-v2.vercel.app for production
            const res = await fetch("http://localhost:3000/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password,
              }),
            });
    
            const user = await res.json();
    
            if (user) {
              // Any object returned will be saved in `user` property of the JWT
              return user;
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null;
    
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          },
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID ?? "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code",
            },
          },
        })
      ],
      pages: {
        signIn: '/signin',
        error: '/auth/error'
      },
      session: {
        maxAge: 60*60*24 // 1day in seconds
      },
      callbacks: {
        async jwt({ token, user }) {
          return { ...token, ...user };
        },
    
        async session({ session, token }) {
          session.user = token as any;
          return session;
        },
        async redirect({ url, baseUrl }) {
          // Allows relative callback URLs
          if (url.startsWith("/")) return `${baseUrl}${url}`
          // Allows callback URLs on the same origin
          else if (new URL(url).origin === baseUrl) return url
          return baseUrl
        }
      }
}