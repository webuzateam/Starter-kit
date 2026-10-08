# Сайт AI Project Starter Kit

Статический сайт на Next.js (`output: "export"`), публикуется на Cloudflare Pages: [webuza-ai-starter-kit.pages.dev](https://webuza-ai-starter-kit.pages.dev/).

- `/` — презентация: простое объяснение, жизненный цикл, карта файлов, безопасность, установка.
- `/guide/` — полная инструкция.

## Запуск

Требуется Node.js 22.13+ (рекомендуется версия из `.nvmrc`).

```bash
npm ci
npm run dev
```

## Проверки

```bash
npm run check
```

`check` = `lint` + `typecheck` + `build` + `test`. Тесты (`tests/*.test.mjs`) проверяют собранный `out/`: язык страницы, SEO-теги, sitemap, robots, заголовки безопасности, размеры изображений и бюджет JavaScript.

Локальный просмотр production-сборки с заголовками из `public/_headers`:

```bash
npm run build && npm start
```

## Публикация

Основной путь — автоматически через GitHub Actions (`.github/workflows/deploy-site.yml`) при изменениях в `site/` на ветке `main`. Нужны секреты репозитория `CLOUDFLARE_API_TOKEN` (права: Cloudflare Pages — Edit) и `CLOUDFLARE_ACCOUNT_ID`.

Ручная публикация (после `wrangler login`):

```bash
npm run deploy
```

## Структура

| Путь | Назначение |
|---|---|
| `content/kit.ts` | Версия kit, URL, команды установки, список команд |
| `content/home.ts`, `content/guide.ts` | Тексты страниц. Пути шаблона сверяются `scripts/check-consistency.mjs` |
| `app/page.tsx`, `app/guide/page.tsx` | Страницы (серверные компоненты) |
| `components/` | Клиентские части: карусель, копирование, индикатор прокрутки |
| `app/globals.css` | Дизайн, адаптивность, анимации |
| `app/icon.svg`, `app/apple-icon.png` | Иконки сайта |
| `app/sitemap.ts`, `app/robots.ts` | SEO |
| `public/_headers` | Заголовки безопасности и кэширования Cloudflare Pages |
| `public/hero.webp`, `public/og.jpg` | Сжатые изображения; исходник — `assets/og-source.png` |

Адрес сайта можно переопределить переменной `NEXT_PUBLIC_SITE_URL` (например, при подключении своего домена).

Сайт не собирает данные, не использует cookies и внешние запросы: шрифты встраиваются при сборке.
