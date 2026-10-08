#!/usr/bin/env node
// Проверяет согласованность шаблона, документации и сайта.
// Запуск: node scripts/check-consistency.mjs
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const template = join(root, "template");
const errors = [];
const fail = (message) => errors.push(message);
const read = (path) => readFileSync(path, "utf8");
const rel = (path) => relative(root, path);

function walk(dir, filter) {
  const skip = new Set(["node_modules", ".git", "out", ".next", ".wrangler", "Starter-kit-site-backups", "dist"]);
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return skip.has(entry.name) ? [] : walk(path, filter);
    return filter(path) ? [path] : [];
  });
}

// 1. Обязательные файлы шаблона.
const required = [
  "README.md", "AGENTS.md", "CLAUDE.md", ".gitignore", ".env.example",
  ".starter-kit/VERSION", ".starter-kit/config", ".starter-kit/preflight.sh", ".starter-kit/hooks/pre-commit", ".starter-kit/LICENSE",
  "docs/HOW_IT_WORKS.md", "docs/PROJECT_QUESTIONNAIRE.md", "docs/PROJECT_CONTEXT.md", "docs/PROJECT_POLICY.md",
  "docs/STATUS.md", "docs/GIT_POLICY.md", "docs/SECRETS.md", "docs/RECOVERY.md", "docs/INTEGRATIONS.md",
  "docs/INITIALIZATION_REPORT.md", "docs/CHANGELOG.md", "docs/decisions/README.md", "docs/decisions/DECISION_TEMPLATE.md",
  "logs/sessions/README.md", "logs/sessions/SESSION_TEMPLATE.md", "src/README.md", "outputs/README.md",
  "prompts/00-start.md", "prompts/01-initialize-project.md", "prompts/02-audit-project.md", "prompts/03-setup-git-github.md",
  "prompts/04-start-session.md", "prompts/05-work-session.md", "prompts/06-close-session.md", "prompts/07-recovery.md",
  "prompts/08-upgrade.md",
];
for (const file of required) {
  if (!existsSync(join(template, file))) fail(`template: нет обязательного файла ${file}`);
}

// 2. Исполняемые скрипты.
for (const file of [".starter-kit/preflight.sh", ".starter-kit/hooks/pre-commit"]) {
  const path = join(template, file);
  if (existsSync(path) && (statSync(path).mode & 0o111) === 0) fail(`template: ${file} должен быть исполняемым (chmod +x)`);
}

// 3. В шаблоне нет материалов разработки и мусора.
const templateFiles = walk(template, () => true).map((path) => relative(template, path));
for (const file of templateFiles) {
  if (/(^|\/)\.DS_Store$/.test(file)) fail(`template: системный файл ${file}`);
  if (/^docs\/decisions\/\d{4}-/.test(file)) fail(`template: решение разработки kit в шаблоне: ${file} (место — dev-docs/decisions/)`);
  if (/^logs\/sessions\/\d{4}-/.test(file)) fail(`template: session log в шаблоне: ${file}`);
}
if (existsSync(join(template, ".starter-kit-source"))) fail("template: маркер .starter-kit-source не должен попадать в шаблон");

// 4. Пути в обратных кавычках внутри шаблона существуют.
const pathRef = /`((?:docs|prompts|logs|src|outputs|\.starter-kit|\.claude)\/[^`\s]*|AGENTS\.md|README\.md|CLAUDE\.md|\.gitignore|\.env\.example)`/g;
// Шаблонные имена и пути, которые создаются позже или упоминаются как запрещённые.
const isPlaceholder = (path) => /[<>*]|YYYY|NNNN|0001-правила|^logs\/actions\.md$/.test(path);
for (const file of walk(template, (path) => path.endsWith(".md"))) {
  for (const [, path] of read(file).matchAll(pathRef)) {
    if (isPlaceholder(path)) continue;
    if (!existsSync(join(template, path))) fail(`${rel(file)}: ссылка на несуществующий путь \`${path}\``);
  }
}

// 5. Относительные Markdown-ссылки во всём репозитории.
const mdLink = /\]\((?!https?:|mailto:|#)([^)\s#]+)(?:#[^)]*)?\)/g;
for (const file of walk(root, (path) => path.endsWith(".md") && !path.includes(`${join("site", "node_modules")}`))) {
  for (const [, target] of read(file).matchAll(mdLink)) {
    if (!existsSync(resolve(dirname(file), decodeURIComponent(target)))) fail(`${rel(file)}: битая ссылка ${target}`);
  }
}

// 6. 13 блоков настройки.
const questionnaire = read(join(template, "docs/PROJECT_QUESTIONNAIRE.md"));
const blocks = [...questionnaire.matchAll(/^## Блок (\d+)\./gm)].map((match) => Number(match[1]));
if (blocks.length !== 13 || blocks.some((n, i) => n !== i + 1)) fail(`PROJECT_QUESTIONNAIRE.md: ожидалось 13 блоков подряд, найдено ${blocks.length}`);
const keyQuestions = (questionnaire.match(/^\d+\. ★/gm) ?? []).length;
if (keyQuestions !== 7) fail(`PROJECT_QUESTIONNAIRE.md: ожидалось 7 ключевых вопросов ★, найдено ${keyQuestions}`);

const textFiles = walk(root, (path) => /\.(md|tsx?|mjs)$/.test(path) && !path.includes("node_modules"));
for (const file of textFiles) {
  for (const [phrase, count] of read(file).matchAll(/(\d+) блок(?:ов|а)\b/g)) {
    if (count !== "13" && !rel(file).startsWith("dev-docs")) fail(`${rel(file)}: «${phrase}» — в шаблоне 13 блоков`);
  }
  for (const [phrase, count] of read(file).matchAll(/(\d+) (?:ключевых|главных) вопрос/g)) {
    if (count !== "7") fail(`${rel(file)}: «${phrase}» — ключевых вопросов 7`);
  }
}

// 7. Версия совпадает в VERSION, CHANGELOG.md и на сайте.
const version = read(join(template, ".starter-kit/VERSION")).trim();
if (!/^\d+\.\d+\.\d+$/.test(version)) fail(`VERSION: «${version}» не SemVer`);
const changelogVersion = read(join(root, "CHANGELOG.md")).match(/^## \[(\d+\.\d+\.\d+)\]/m)?.[1];
if (changelogVersion !== version) fail(`CHANGELOG.md: последняя версия ${changelogVersion}, VERSION — ${version}`);
const siteKit = join(root, "site/content/kit.ts");
if (existsSync(siteKit)) {
  const siteVersion = read(siteKit).match(/KIT_VERSION = "([^"]+)"/)?.[1];
  if (siteVersion !== version) fail(`site/content/kit.ts: KIT_VERSION ${siteVersion}, VERSION — ${version}`);
} else {
  fail("site/content/kit.ts не найден");
}

// 8. Пути шаблона, упомянутые на сайте, существуют.
const siteContent = join(root, "site/content");
if (existsSync(siteContent)) {
  const sitePath = /["'`]((?:docs|prompts|logs|src|outputs|\.starter-kit|\.claude)\/[^"'`\s]*|AGENTS\.md|CLAUDE\.md|\.gitignore|\.env\.example)["'`]/g;
  for (const file of walk(siteContent, (path) => /\.tsx?$/.test(path))) {
    for (const [, path] of read(file).matchAll(sitePath)) {
      if (isPlaceholder(path)) continue;
      if (!existsSync(join(template, path))) fail(`${rel(file)}: путь шаблона не существует: ${path}`);
    }
  }
  const siteText = walk(siteContent, (path) => /\.tsx?$/.test(path)).map(read).join("\n");
  for (const command of ["START", "ПРИМЕНИТЬ", "APPLY", "закрываем сессию", "CLOSE SESSION", "ВОССТАНОВИТЬ", "RECOVER", "ОБНОВИТЬ STARTER KIT"]) {
    if (!siteText.includes(command)) fail(`site/content: не упомянута команда ${command}`);
  }
}

// 9. Команды AGENTS.md описаны в README шаблона.
const agents = read(join(template, "AGENTS.md"));
const readme = read(join(template, "README.md"));
for (const [, command] of agents.matchAll(/^\| `([^`]+)` \|/gm)) {
  if (!readme.includes(`\`${command}\``)) fail(`template/README.md: нет команды ${command} из AGENTS.md`);
}
if (!agents.includes("<!-- PROJECT-RULES:BEGIN -->") || !agents.includes("<!-- PROJECT-RULES:END -->")) fail("template/AGENTS.md: нет маркеров PROJECT-RULES");

if (errors.length) {
  console.error(`Найдено проблем: ${errors.length}`);
  for (const error of errors) console.error(`  ✖ ${error}`);
  process.exit(1);
}
console.log(`Согласованность в порядке: шаблон ${version}, проверено файлов шаблона — ${templateFiles.length}.`);
