# Blog Backend API (NestJS)

REST API для блог-платформи, побудований на NestJS, PostgreSQL та Prisma ORM.

## 🚀 Технології

- **NestJS** - прогресивний Node.js фреймворк
- **PostgreSQL** - реляційна база даних
- **Prisma ORM** - сучасна ORM для TypeScript
- **JWT** - JSON Web Tokens для авторизації
- **bcrypt** - хешування паролів
- **class-validator** - валідація DTO

## 📦 Встановлення

1. Встановіть залежності:

```bash
npm install
```

2. Створіть файл `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/blog_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

3. Запустіть PostgreSQL (Docker або локально):

```bash
# Якщо використовуєте Docker:
docker run --name blog-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=blog_db -p 5432:5432 -d postgres
```

4. Виконайте міграцію бази даних:

```bash
npx prisma migrate dev --name init
```

5. (Опціонально) Згенеруйте Prisma Client:

```bash
npx prisma generate
```

## 🏃‍♂️ Запуск

### Development режим:

```bash
npm run start:dev
```

### Production режим:

```bash
npm run build
npm run start:prod
```

Сервер буде доступний за адресою: `http://localhost:3001/api`

## 📚 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint         | Опис                   | Auth |
| ------ | ---------------- | ---------------------- | ---- |
| POST   | `/auth/register` | Реєстрація користувача | ❌   |
| POST   | `/auth/login`    | Вхід в систему         | ❌   |
| GET    | `/auth/me`       | Поточний користувач    | ✅   |

**Register/Login Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-02-04T...",
    "updatedAt": "2026-02-04T..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Posts (`/api/posts`)

| Method | Endpoint           | Опис                                    | Auth |
| ------ | ------------------ | --------------------------------------- | ---- |
| GET    | `/posts`           | Список постів (з пошуком і сортуванням) | ❌   |
| GET    | `/posts/:id`       | Один пост                               | ❌   |
| POST   | `/posts`           | Створити пост                           | ✅   |
| PATCH  | `/posts/:id`       | Оновити пост                            | ✅   |
| DELETE | `/posts/:id`       | Видалити пост                           | ✅   |
| POST   | `/posts/:id/like`  | Поставити/забрати лайк                  | ✅   |
| GET    | `/posts/:id/likes` | Список лайків                           | ❌   |

**Query параметри для GET /posts:**

- `search` - пошук за заголовком, контентом, автором, тегами
- `sortBy` - сортування: `newest` (за замовчуванням), `oldest`, `popular`

**Create/Update Post Request:**

```json
{
  "title": "My Blog Post",
  "content": "This is the content...",
  "tags": ["javascript", "nestjs"]
}
```

### Comments (`/api/comments`)

| Method | Endpoint               | Опис               | Auth |
| ------ | ---------------------- | ------------------ | ---- |
| GET    | `/comments?postId=xxx` | Коментарі до поста | ❌   |
| POST   | `/comments`            | Створити коментар  | ✅   |
| PATCH  | `/comments/:id`        | Оновити коментар   | ✅   |
| DELETE | `/comments/:id`        | Видалити коментар  | ✅   |

**Create Comment Request:**

```json
{
  "postId": "post-uuid",
  "content": "Great post!"
}
```

## 🔐 Авторизація

Для захищених endpoints потрібен JWT токен в заголовку:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🗄️ Database Schema

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts     Post[]
  comments  Comment[]
  likes     Like[]
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  tags      String[]
  authorId  String

  author    User     @relation(...)
  comments  Comment[]
  likes     Like[]
}

model Comment {
  id        String   @id @default(uuid())
  content   String
  authorId  String
  postId    String

  author    User     @relation(...)
  post      Post     @relation(...)
}

model Like {
  id        String   @id @default(uuid())
  userId    String
  postId    String

  user      User     @relation(...)
  post      Post     @relation(...)

  @@unique([userId, postId])
}
```

## 🛠️ Prisma Commands

```bash
# Створити міграцію
npx prisma migrate dev --name migration_name

# Застосувати міграції (production)
npx prisma migrate deploy

# Відкрити Prisma Studio (GUI для БД)
npx prisma studio

# Згенерувати Prisma Client
npx prisma generate

# Форматувати schema.prisma
npx prisma format
```

## 📝 Структура проекту

```
backend/
├── prisma/
│   └── schema.prisma        # Prisma схема БД
├── src/
│   ├── auth/                # Модуль авторизації
│   │   ├── dto/
│   │   ├── guards/
│   │   ├── strategies/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── posts/               # Модуль постів
│   │   ├── dto/
│   │   ├── posts.controller.ts
│   │   ├── posts.service.ts
│   │   └── posts.module.ts
│   ├── comments/            # Модуль коментарів
│   │   ├── dto/
│   │   ├── comments.controller.ts
│   │   ├── comments.service.ts
│   │   └── comments.module.ts
│   ├── prisma/              # Prisma сервіс
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── app.module.ts
│   └── main.ts
├── .env                     # Environment змінні
└── package.json
```

## 🔍 Приклади використання API

### Реєстрація та вхід:

```bash
# Реєстрація
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"password123"}'

# Вхід
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"password123"}'
```

### Робота з постами:

```bash
# Створити пост (потрібна авторизація)
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test Post","content":"Content here","tags":["test"]}'

# Отримати всі пости
curl http://localhost:3001/api/posts

# Пошук
curl "http://localhost:3001/api/posts?search=test&sortBy=popular"

# Лайкнути пост
curl -X POST http://localhost:3001/api/posts/POST_ID/like \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🐛 Troubleshooting

### Помилка підключення до БД:

- Переконайтесь, що PostgreSQL запущений
- Перевірте `DATABASE_URL` в `.env`

### Prisma Client помилки:

- Виконайте `npx prisma generate`

### TypeScript помилки:

- Переконайтесь, що всі залежності встановлені: `npm install`
