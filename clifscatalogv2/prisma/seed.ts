import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      password: "123456",
      favorites: {
        create: {
          title: 'Check out Prisma with Next.js',
          image: 'https://www.prisma.io/nextjs',
          mealId: 123123
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      password: "tester",
      favorites: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            image: 'https://twitter.com/prisma',
            mealId: 9422,
          },
          {
            title: 'Follow Nexus on Twitter',
            image: 'https://twitter.com/nexusgql',
            mealId: 1033,
          },
        ],
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })