import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Створюємо тестових користувачів
  const password = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'Іван Петренко',
      password,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'mary@example.com' },
    update: {},
    create: {
      email: 'mary@example.com',
      name: 'Марія Коваленко',
      password,
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'alex@example.com' },
    update: {},
    create: {
      email: 'alex@example.com',
      name: 'Олександр Шевченко',
      password,
    },
  });

  console.log('✅ Created 3 users');

  // Створюємо тестові пости
  const post1 = await prisma.post.create({
    data: {
      title: 'Привіт, світ!',
      content:
        'Це мій перший пост у новому блозі. Дуже радий приєднатися до спільноти! Тут я ділитимусь своїми думками про технології, програмування та життя.',
      tags: ['привітання', 'перший пост', 'знайомство'],
      authorId: user1.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Топ 5 порад для початківців програмістів',
      content:
        '1. Практикуйтесь щодня - навіть 30 хвилин мають значення\n2. Читайте чужий код - це найкращий спосіб навчитися\n3. Не бійтеся помилятися - помилки це частина навчання\n4. Беріть участь у open source проектах\n5. Знайдіть ментора або спільноту однодумців',
      tags: ['програмування', 'поради', 'навчання', 'початківці'],
      authorId: user2.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: 'Чому я обрав TypeScript замість JavaScript',
      content:
        'TypeScript дає мені впевненість у коді. Автодоповнення, перевірка типів на етапі компіляції, краща підтримка IDE - все це робить розробку швидшою та безпечнішою. Так, є певна крива навчання, але воно того варте!',
      tags: ['typescript', 'javascript', 'веб-розробка'],
      authorId: user1.id,
    },
  });

  const post4 = await prisma.post.create({
    data: {
      title: 'Мій досвід з Next.js 14',
      content:
        'Server Components, Server Actions, покращена продуктивність - Next.js 14 це справжній game changer! Особливо подобається App Router та те, як легко тепер працювати з серверним кодом.',
      tags: ['nextjs', 'react', 'frontend'],
      authorId: user3.id,
    },
  });

  const post5 = await prisma.post.create({
    data: {
      title: 'Як я організовую свій робочий день',
      content:
        'Ранкова рутина: 07:00 - підйом, 07:30 - зарядка, 08:00 - сніданок та планування дня. Потім 4 години глибокої роботи з перервами по Pomodoro. Обід о 13:00, після - менш складні задачі та мітинги. Увечері - навчання та особисті проекти.',
      tags: ['продуктивність', 'life', 'поради'],
      authorId: user2.id,
    },
  });

  console.log('✅ Created 5 posts');

  // Додаємо лайки
  await prisma.like.createMany({
    data: [
      { userId: user1.id, postId: post2.id },
      { userId: user1.id, postId: post4.id },
      { userId: user2.id, postId: post1.id },
      { userId: user2.id, postId: post3.id },
      { userId: user3.id, postId: post1.id },
      { userId: user3.id, postId: post2.id },
      { userId: user3.id, postId: post5.id },
    ],
  });

  console.log('✅ Created 7 likes');

  // Додаємо коментарі
  await prisma.comment.createMany({
    data: [
      {
        content: 'Ласкаво просимо! 🎉',
        authorId: user2.id,
        postId: post1.id,
      },
      {
        content: 'Круто! Чекаємо на нові пости!',
        authorId: user3.id,
        postId: post1.id,
      },
      {
        content: 'Дуже корисні поради, дякую!',
        authorId: user1.id,
        postId: post2.id,
      },
      {
        content: 'Додав би ще: пишіть документацію до свого коду',
        authorId: user3.id,
        postId: post2.id,
      },
      {
        content: 'Повністю згоден! TypeScript рулить 💪',
        authorId: user2.id,
        postId: post3.id,
      },
      {
        content: 'А як щодо складності для новачків?',
        authorId: user3.id,
        postId: post3.id,
      },
      {
        content: 'Next.js 14 справді крутий! Server Actions спрощують життя',
        authorId: user1.id,
        postId: post4.id,
      },
      {
        content: 'Pomodoro техніка працює чудово! 🍅',
        authorId: user1.id,
        postId: post5.id,
      },
    ],
  });

  console.log('✅ Created 8 comments');

  console.log('🎉 Database seeded successfully!');
  console.log('\n📝 Test accounts:');
  console.log('   Email: john@example.com | Password: password123');
  console.log('   Email: mary@example.com | Password: password123');
  console.log('   Email: alex@example.com | Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
