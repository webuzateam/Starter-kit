# AI Project Starter Kit

**Проект помнит, даже если чат — нет.** Бесплатная система памяти для проектов с AI-помощниками: цель, правила, решения и текущее состояние хранятся в файлах проекта, а не в истории чата. Любой агент — Claude Code, Codex, Cursor, Copilot, Gemini CLI — открывает папку и продолжает работу с того места, где вы остановились.

[Сайт](https://webuza-ai-starter-kit.pages.dev/) · [Полная инструкция](https://webuza-ai-starter-kit.pages.dev/guide/) · [Пример заполненного проекта](https://webuza-ai-starter-kit.pages.dev/example/) · [Как это работает — для новичков](docs/HOW_IT_WORKS.md) · [English edition](https://github.com/webuzateam/Starter-kit/tree/en)

## Установка

**Новый проект** (нужен Node.js):

```bash
npx degit webuzateam/Starter-kit my-project
```

**Существующий проект** — внутри его папки:

```bash
npx degit webuzateam/Starter-kit . --force
```

`--force` разрешает запись в непустую папку: файлы с совпадающими именами, например `README.md`, будут заменены, поэтому сначала сохраните их.

**Без терминала** — скачайте `starter-kit-vX.Y.Z.zip` со страницы [Releases](https://github.com/webuzateam/Starter-kit/releases/latest) и распакуйте содержимое прямо в корень проекта.

Устанавливайте именно так, а не через `git clone`: в архив попадает только Starter Kit, без служебных файлов этого репозитория.

## Быстрый старт

1. Откройте папку проекта в AI-помощнике.
2. Отправьте отдельное сообщение `START` и выберите режим: **с сопровождением**, **быстрый** или **без брифа**.
3. Проверьте итоговую сводку и отправьте `ПРИМЕНИТЬ`. Этот README будет заменён описанием вашего проекта.
4. Работайте. В конце — отдельное сообщение `ЗАКРЫВАЕМ СЕССИЮ`.
5. Новый чат или другой агент? Отправьте `ВОССТАНОВИТЬ`.

## Команды

| Команда | Что делает |
|---|---|
| `START` | Первый запуск или краткий статус |
| `ПРИМЕНИТЬ` / `APPLY` | Записать сводку настройки в файлы |
| `ЗАКРЫВАЕМ СЕССИЮ` / `CLOSE SESSION` | Обновить память, проверить, commit и push |
| `ВОССТАНОВИТЬ` / `RECOVER` | Восстановить контекст в новом чате или у нового агента |
| `ИЗМЕНИТЬ ПРАВИЛА ПРОЕКТА` / `CHANGE RULES` | Пересмотреть настройки |
| `ОБНОВИТЬ STARTER KIT` / `UPGRADE KIT` | Обновить Starter Kit без потери данных проекта |

Команда срабатывает только отдельным сообщением. В Claude Code те же сценарии доступны как `/kit-start`, `/kit-apply`, `/kit-close`, `/kit-recover`, `/kit-audit`, `/kit-upgrade`.

## Карта файлов

| Путь | Назначение |
|---|---|
| `AGENTS.md` | Единые правила для AI: команды, порядок чтения, границы автономности |
| `CLAUDE.md` | Подключает `AGENTS.md` для Claude Code |
| `.gitignore`, `.env.example` | Исключение секретов из Git; имена переменных без значений |
| `.starter-kit/` | Версия, язык, настройки и скрипт проверки `preflight.sh` перед commit и push |
| `.claude/commands/` | Команды `/kit-*` для Claude Code |
| `docs/HOW_IT_WORKS.md` | Объяснение для новичка |
| `docs/PROJECT_QUESTIONNAIRE.md` | Опрос первого запуска и его ответы |
| `docs/PROJECT_CONTEXT.md` | Паспорт проекта: цель, аудитория, границы, команды |
| `docs/PROJECT_POLICY.md` | Принятые правила и словарь статусов |
| `docs/STATUS.md` | Где проект сейчас и что дальше |
| `docs/GIT_POLICY.md` | Правила Git и GitHub |
| `docs/SECRETS.md` | Карта секретов — без значений |
| `docs/RECOVERY.md` | Что сохраняет Git и как восстановить работу |
| `docs/INTEGRATIONS.md` | Skills, плагины и MCP: источники и восстановление |
| `docs/INITIALIZATION_REPORT.md` | Отчёт первого запуска |
| `docs/CHANGELOG.md` | Изменения проекта, заметные пользователю |
| `docs/decisions/` | Важные решения и их причины |
| `logs/sessions/` | Краткий дневник рабочих сессий |
| `prompts/` | Сценарии: старт, применение, аудит, Git, работа, закрытие, восстановление, обновление |
| `src/`, `outputs/` | Рабочие материалы и готовые результаты |

## Безопасность по умолчанию

- Удаление, публикация, deploy, смена remote или видимости, force push — только с вашего явного разрешения.
- Секреты не попадают в Git: `.gitignore` защищает по пути, `.starter-kit/preflight.sh` — по содержимому.
- Репозиторий проекта по умолчанию приватный; публичный — только по вашему выбору.
- AI не выдаёт догадки за факты: у каждого значимого значения указан источник.

## Участие и лицензия

Предложения и исправления приветствуются — см. [CONTRIBUTING](https://github.com/webuzateam/Starter-kit/blob/main/.github/CONTRIBUTING.md). Уязвимости сообщайте приватно по [SECURITY](https://github.com/webuzateam/Starter-kit/blob/main/.github/SECURITY.md).

Лицензия [MIT](https://github.com/webuzateam/Starter-kit/blob/main/LICENSE) (копия — `.starter-kit/LICENSE`): используйте бесплатно, в том числе в коммерческих проектах. Версия — `.starter-kit/VERSION`.

---

## English

**AI Project Starter Kit** keeps your AI project's memory in plain files — goals, rules, decisions and current status — instead of a chat history. Any coding agent that reads `AGENTS.md` (Claude Code, Codex, Cursor, Copilot, Gemini CLI…) can pick up exactly where you left off.

This is the Russian edition. **The English edition lives in the [`en` branch](https://github.com/webuzateam/Starter-kit/tree/en):**

```bash
npx degit webuzateam/Starter-kit#en my-project
```

Open the folder in your AI assistant and send `START`. Website in English: [webuza-ai-starter-kit.pages.dev/en/](https://webuza-ai-starter-kit.pages.dev/en/).

Safe by default: deletion, publishing, remote changes and force pushes always require your explicit approval; `.starter-kit/preflight.sh` blocks commits that contain secrets or oversized files. Licensed under MIT.
