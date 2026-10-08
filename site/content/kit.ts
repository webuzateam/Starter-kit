// Общие данные о Starter Kit. Версия проверяется scripts/check-consistency.mjs.
export const KIT_VERSION = "1.0.0";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://webuza-ai-starter-kit.pages.dev").replace(/\/$/, "");
export const REPO_URL = "https://github.com/webuzateam/Starter-kit";
export const RELEASES_URL = `${REPO_URL}/releases/latest`;
export const HOW_IT_WORKS_URL = `${REPO_URL}/blob/main/template/docs/HOW_IT_WORKS.md`;
export const LICENSE_URL = `${REPO_URL}/blob/main/LICENSE`;

export const INSTALL_COMMAND = "npx degit webuzateam/Starter-kit/template my-project";
export const INSTALL_EXISTING_COMMAND = "npx degit webuzateam/Starter-kit/template . --force";

export type Command = { command: string; alias?: string; title: string; text: string };

export const commands: Command[] = [
  { command: "START", title: "Начать", text: "Первый запуск: короткое знакомство и выбор режима настройки. Повторно — краткий статус проекта." },
  { command: "ПРИМЕНИТЬ", alias: "APPLY", title: "Записать настройки", text: "Записывает итоговую сводку в файлы памяти и проводит аудит. Не создаёт репозиторий и ничего не публикует." },
  { command: "закрываем сессию", alias: "CLOSE SESSION", title: "Сохранить работу", text: "Обновляет память, запускает проверки и preflight, создаёт commit и делает обычный push." },
  { command: "ВОССТАНОВИТЬ", alias: "RECOVER", title: "Продолжить в новом чате", text: "Новый агент читает файлы и рассказывает, где проект остановился, — ничего не меняя." },
  { command: "ИЗМЕНИТЬ ПРАВИЛА ПРОЕКТА", alias: "CHANGE RULES", title: "Пересмотреть правила", text: "Повторная настройка с выбором режима. Прежние решения не удаляются молча." },
  { command: "ОБНОВИТЬ STARTER KIT", alias: "UPGRADE KIT", title: "Обновить kit", text: "Подтягивает новую версию правил и сценариев. Данные проекта не перезаписываются." },
];
