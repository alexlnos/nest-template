FROM node:20-slim

# Создаем директорию для приложения и устанавливаем рабочую директорию
RUN mkdir -p /app
WORKDIR /app

# Копируем файлы приложения в контейнер
COPY . /app

# Устанавливаем зависимости
RUN npm install

# Запуск скрипта сборки
RUN npm run build

# Устанавливаем точку входа
ENTRYPOINT ["npm", "run", "start:prod"]
