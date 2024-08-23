



# Good Deeds App

Good Deeds App - это платформа для отслеживания и обмена добрыми делами. Приложение позволяет пользователям регистрироваться, создавать список своих добрых дел, добавлять друзей и просматривать их добрые дела.
<img src="https://github.com/GrafDev/ezrababait/blob/master/screen.png" alt="ezrababait good-deeds">
## Технологии

### Backend
- TypeScript
- NestJS
- PostgreSQL
- Docker

### Frontend
- TypeScript
- React
- NextJS
- Redux
- Tailwind CSS

## Функциональность

- Регистрация и авторизация пользователей
- Создание, просмотр, обновление и удаление добрых дел
- Добавление друзей по уникальному идентификатору
- Просмотр списка добрых дел друзей

## Установка и запуск

### Предварительные требования

- Docker и Docker Compose
- Node.js (версия 14 или выше)
- npm (версия 6 или выше)

### Шаги по установке

1. Клонируйте репозиторий:
   ```
   git clone https://github.com/your-username/good-deeds-app.git
   cd good-deeds-app
   ```

2. Создайте файл `.env` в корневой директории проекта и добавьте следующие переменные окружения:
   ```
   DATABASE_HOST=postgres
   DATABASE_PORT=5432
   DATABASE_USERNAME=grafdev
   DATABASE_PASSWORD=grafpass
   DATABASE_NAME=gooddeeds
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRATION_TIME=1h
   ```

3. Запустите приложение с помощью Docker Compose:
   ```
   docker-compose up --build
   ```

4. После успешного запуска, приложение будет доступно по следующим адресам:
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000
   - Swagger документация API: http://localhost:3000/api

## Разработка

Для локальной разработки вы можете запустить backend и frontend отдельно:

### Backend

1. Перейдите в директорию backend:
   ```
   cd backend
   ```

2. Установите зависимости:
   ```
   npm install
   ```

3. Запустите сервер разработки:
   ```
   npm run start:dev
   ```

### Frontend

1. Перейдите в директорию frontend:
   ```
   cd frontend
   ```

2. Установите зависимости:
   ```
   npm install
   ```

3. Запустите сервер разработки:
   ```
   npm run dev
   ```

## Вклад в проект

Мы приветствуем вклад в развитие проекта! Пожалуйста, ознакомьтесь с нашим руководством по внесению изменений перед тем, как отправлять pull request.

## Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для подробностей.


**Автор:** Gregory Iakovlev
