FROM node:20-slim

# Устанавливаем необходимые зависимости и Chrome
RUN apt-get update \
    && apt-get install -y wget gnupg ca-certificates --no-install-recommends \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-linux-signing-key.gpg \
    && sh -c 'echo "deb [signed-by=/usr/share/keyrings/google-linux-signing-key.gpg] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

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
