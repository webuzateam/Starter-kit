# Безопасность / Security

*English version below.*

## Как сообщить об уязвимости

Не создавайте публичный issue. Используйте приватный канал GitHub: вкладка **Security** → **Report a vulnerability** ([прямая ссылка](https://github.com/webuzateam/Starter-kit/security/advisories/new)).

Опишите проблему, шаги воспроизведения и возможные последствия. Мы ответим в течение 7 дней и сообщим о плане исправления.

## Что считается уязвимостью

- Правило или сценарий шаблона, из-за которых агент может без разрешения пользователя удалить данные, опубликовать проект, сменить remote или видимость, выполнить force push.
- Обход `.starter-kit/preflight.sh`, при котором секрет или опасный файл попадает в commit без предупреждения.
- Инструкции, побуждающие агента раскрывать значения секретов.
- Уязвимости сайта и его конфигурации.

## Поддерживаемые версии

Исправления выпускаются для последней версии Starter Kit (русской и английской). Обновить проект можно командой `ОБНОВИТЬ STARTER KIT` / `UPGRADE KIT`.

---

## English

**Reporting:** do not open a public issue. Use GitHub's private channel: **Security** → **Report a vulnerability** ([direct link](https://github.com/webuzateam/Starter-kit/security/advisories/new)). Describe the problem, steps to reproduce and possible impact. We reply within 7 days.

**In scope:** template rules or prompts that let an agent delete data, publish a project, change a remote or visibility, or force push without the user's permission; bypasses of `.starter-kit/preflight.sh` that let a secret or dangerous file into a commit without warning; instructions that make an agent reveal secret values; vulnerabilities of the website and its configuration.

**Supported versions:** fixes are released for the latest version of both editions. Update a project with `UPGRADE KIT`.
