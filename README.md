# AI Project Starter Kit

**Проект помнит, даже если чат — нет.** Бесплатная система памяти для проектов, которые ведутся с AI-помощниками: цель, правила, решения и текущее состояние хранятся в файлах проекта, а не в истории чата. Любой агент — Claude Code, Codex, Cursor, Copilot, Gemini CLI — открывает папку и продолжает работу с того места, где вы остановились.

[Сайт](https://webuza-ai-starter-kit.pages.dev/) · [Полная инструкция](https://webuza-ai-starter-kit.pages.dev/guide/) · [Как это работает (для новичков)](template/docs/HOW_IT_WORKS.md) · [English](#english)

## Установка

**Вариант 1 — одна команда** (нужен Node.js):

```bash
npx degit webuzateam/Starter-kit/template my-project
```

Для уже существующего проекта выполните внутри его папки:

```bash
npx degit webuzateam/Starter-kit/template . --force
```

`--force` разрешает запись в непустую папку: файлы с совпадающими именами (например, `README.md`) будут заменены, поэтому сначала сохраните их.

**Вариант 2 — архив.** Скачайте `starter-kit-vX.Y.Z.zip` со страницы [Releases](https://github.com/webuzateam/Starter-kit/releases/latest) и распакуйте содержимое прямо в корень проекта.

Не клонируйте этот репозиторий целиком в качестве проекта: в нём лежат исходники Starter Kit и сайта, а сам шаблон — только папка [`template/`](template/).

## Как начать

1. Откройте папку проекта в AI-помощнике.
2. Отправьте отдельное сообщение `START` и выберите режим: **с сопровождением**, **быстрый** или **без брифа**.
3. Проверьте сводку и отправьте `ПРИМЕНИТЬ`.
4. Работайте как обычно. В конце — `закрываем сессию`.
5. Новый чат или другой агент? Отправьте `ВОССТАНОВИТЬ`.

Подробно и простыми словами — [template/docs/HOW_IT_WORKS.md](template/docs/HOW_IT_WORKS.md).

## Что внутри

- **Память в файлах:** паспорт проекта, текущий статус, правила, журнал решений и сессий.
- **Три режима настройки:** пошаговый опрос, 7 быстрых вопросов или автоматический анализ папки.
- **Безопасность по умолчанию:** удаление, публикация, смена remote и force push — только с вашего разрешения; агент не выдаёт догадки за факты.
- **Проверка перед commit:** скрипт `.starter-kit/preflight.sh` ищет секреты по содержимому, опасные файлы и крупные файлы, сверяет ветку, `origin` и видимость репозитория.
- **Переносимость:** работает с любым агентом, который читает `AGENTS.md`; для Claude Code есть команды `/kit-*`.
- **Обновление без потерь:** команда `ОБНОВИТЬ STARTER KIT` обновляет файлы kit и не трогает данные проекта.

## Структура репозитория

| Путь | Что это |
|---|---|
| [`template/`](template/) | Сам Starter Kit — то, что копируется в проект |
| [`site/`](site/) | Сайт-презентация и инструкция (Next.js, Cloudflare Pages) |
| [`scripts/`](scripts/) | Проверки репозитория: согласованность документов, тесты `preflight.sh`, сборка релиза |
| [`dev-docs/`](dev-docs/) | Решения, roadmap и процесс релиза самого Starter Kit |
| [`.github/`](.github/) | CI, деплой сайта, релизы, шаблоны issues и PR |

## Участие

Предложения и исправления приветствуются — см. [CONTRIBUTING.md](CONTRIBUTING.md). Уязвимости сообщайте приватно по [SECURITY.md](SECURITY.md).

## Лицензия

[MIT](LICENSE). Используйте бесплатно, в том числе в коммерческих проектах.

---

## English

**AI Project Starter Kit** keeps your AI project's memory in plain files — goals, rules, decisions and current status — instead of a chat history. Any coding agent that reads `AGENTS.md` (Claude Code, Codex, Cursor, Copilot, Gemini CLI…) can pick up exactly where you left off.

```bash
npx degit webuzateam/Starter-kit/template my-project
```

Open the folder in your AI assistant and send `START`. The kit's documents are written in Russian, but the agent answers in your language and accepts English commands: `APPLY`, `CLOSE SESSION`, `RECOVER`, `CHANGE RULES`, `UPGRADE KIT`.

Safe by default: deletion, publishing, remote changes and force pushes always require your explicit approval; `.starter-kit/preflight.sh` blocks commits that contain secrets or oversized files. Licensed under [MIT](LICENSE).
