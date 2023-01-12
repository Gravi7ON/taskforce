import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.category.upsert({
    where: { id: 40 },
    update: {},
    create: {
      title: 'Грузоперевозки',
      tasks: {
        create: [
          {
            title: 'Перевоз вещей',
            userId: '13',
            description: 'Необходимо перевести в новую квартиру всю мебель в центр города'
          },
        ]
      },
    }
  });
  await prisma.category.upsert({
    where: { id: 41 },
    update: {},
    create: {
      title: 'Клининг',
      tasks: {
        create: [
          {
            title: 'Уборка квартиры перед тем как перевозить вещи)))',
            userId: '13',
            description: 'Reprehenderit ea exercitation Lorem aute elit culpa non nisi velit reprehenderit est non.',
            comments: {
              create: [
                {
                  text: 'Eu nisi aliquip quis nostrud sint veniam consectetur.',
                  userId: '14',
                }
              ]
            }
          },
          {
            title: 'Lorem duis ut ut aute ex enim.',
            userId: '13',
            description: 'Id officia sint velit amet cupidatat in quis cillum adipisicing.',
            performers: {
              create: [
                {
                  userId: '15',
                  ready: true
                }
              ]
            }
          }
        ]
      }
    }
  });
  console.info('Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
