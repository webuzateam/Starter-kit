#!/usr/bin/env node
// Проверяет согласованность Starter Kit: обязательные файлы, ссылки, версии,
// исключения из архива установки. Запуск: node .github/scripts/check-consistency.mjs
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const errors = [];
const fail = (message) => errors.push(message);
const read = (path) => readFileSync(join(root, path), "utf8");
const rel = (path) => relative(root, path);

function walk(dir, filter) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return [".git", "node_modules"].includes(entry.name) ? [] : walk(path, filter);
    return filter(path) ? [path] : [];
  });
}

// Служебные пути репозитория, которые не попадают пользователю (.gitattributes export-ignore).
const serviceOnly = [".github", ".gitattributes", ".starter-kit-source", "LICENSE", "CHANGELOG.md"];
const isService = (path) => serviceOnly.some((item) => path === item || path.startsWith(`${item}/`));

// 1. Обязательные файлы продукта.
const required = [
  "README.md", "AGENTS.md", "CLAUDE.md", ".gitignore", ".env.example",
  ".starter-kit/VERSION", ".starter-kit/LANGUAGE", ".starter-kit/config", ".starter-kit/preflight.sh", ".starter-kit/hooks/pre-commit", ".starter-kit/LICENSE",
  "docs/HOW_IT_WORKS.md", "docs/PROJECT_QUESTIONNAIRE.md", "docs/PROJECT_CONTEXT.md", "docs/PROJECT_POLICY.md",
  "docs/STATUS.md", "docs/GIT_POLICY.md", "docs/SECRETS.md", "docs/RECOVERY.md", "docs/INTEGRATIONS.md",
  "docs/INITIALIZATION_REPORT.md", "docs/CHANGELOG.md", "docs/decisions/README.md", "docs/decisions/DECISION_TEMPLATE.md",
  "logs/sessions/README.md", "logs/sessions/SESSION_TEMPLATE.md", "src/README.md", "outputs/README.md",
  "prompts/00-start.md", "prompts/01-initialize-project.md", "prompts/02-audit-project.md", "prompts/03-setup-git-github.md",
  "prompts/04-start-session.md", "prompts/05-work-session.md", "prompts/06-close-session.md", "prompts/07-recovery.md",
  "prompts/08-upgrade.md",
];
for (const file of required) {
  if (!existsSync(join(root, file))) fail(`нет обязательного файла ${file}`);
}

// 2. Исполняемые скрипты.
for (const file of [".starter-kit/preflight.sh", ".starter-kit/hooks/pre-commit"]) {
  const path = join(root, file);
  if (existsSync(path) && (statSync(path).mode & 0o111) === 0) fail(`${file} должен быть исполняемым (chmod +x)`);
}

// 3. Служебные файлы исключены из архива установки.
const attributes = existsSync(join(root, ".gitattributes")) ? read(".gitattributes") : "";
for (const item of serviceOnly) {
  if (!new RegExp(`^/${item.replace(/\./g, "\\.")}\\s+export-ignore`, "m").test(attributes)) fail(`.gitattributes: /${item} должен быть export-ignore`);
}

// 4. В продукте нет материалов разработки и мусора.
const productFiles = walk(root, () => true).map(rel).filter((path) => !isService(path));
for (const file of productFiles) {
  if (/(^|\/)\.DS_Store$/.test(file)) fail(`системный файл ${file}`);
  if (/^docs\/decisions\/\d{4}-/.test(file)) fail(`решение разработки kit в шаблоне: ${file} (место — .github/decisions/)`);
  if (/^logs\/sessions\/\d{4}-/.test(file)) fail(`session log в шаблоне: ${file}`);
}

// 5. Пути в обратных кавычках внутри продукта существуют.
const pathRef = /`((?:docs|prompts|logs|src|outputs|\.starter-kit|\.claude)\/[^`\s]*|AGENTS\.md|README\.md|CLAUDE\.md|\.gitignore|\.env\.example)`/g;
// Шаблонные имена и пути, которые создаются позже или упоминаются как запрещённые.
const isPlaceholder = (path) => /[<>*]|YYYY|NNNN|0001-правила|0001-project-rules|^logs\/actions\.md$/.test(path);
for (const file of productFiles.filter((path) => path.endsWith(".md"))) {
  for (const [, path] of read(file).matchAll(pathRef)) {
    if (isPlaceholder(path)) continue;
    if (!existsSync(join(root, path))) fail(`${file}: ссылка на несуществующий путь \`${path}\``);
  }
}

// 6. Относительные Markdown-ссылки. Из файлов продукта нельзя ссылаться на служебные файлы:
//    у пользователя их не будет — нужна абсолютная ссылка на GitHub.
const mdLink = /\]\((?!https?:|mailto:|#)([^)\s#]+)(?:#[^)]*)?\)/g;
for (const file of walk(root, (path) => path.endsWith(".md")).map(rel)) {
  for (const [, target] of read(file).matchAll(mdLink)) {
    const resolved = resolve(dirname(join(root, file)), decodeURIComponent(target));
    if (!existsSync(resolved)) fail(`${file}: битая ссылка ${target}`);
    else if (!isService(file) && isService(rel(resolved))) fail(`${file}: ссылка ${target} не будет работать у пользователя — используйте URL GitHub`);
  }
}

// 7. 13 блоков настройки и 7 ключевых вопросов (русская и английская версии).
const language = read(".starter-kit/LANGUAGE").trim();
if (!["ru", "en"].includes(language)) fail(`.starter-kit/LANGUAGE: «${language}», ожидается ru или en`);
const questionnaire = read("docs/PROJECT_QUESTIONNAIRE.md");
const blocks = [...questionnaire.matchAll(/^## (?:Блок|Block) (\d+)\./gm)].map((match) => Number(match[1]));
if (blocks.length !== 13 || blocks.some((n, i) => n !== i + 1)) fail(`PROJECT_QUESTIONNAIRE.md: ожидалось 13 блоков подряд, найдено ${blocks.length}`);
const keyQuestions = (questionnaire.match(/^\d+\. ★/gm) ?? []).length;
if (keyQuestions !== 7) fail(`PROJECT_QUESTIONNAIRE.md: ожидалось 7 ключевых вопросов ★, найдено ${keyQuestions}`);
for (const file of productFiles.filter((path) => path.endsWith(".md"))) {
  const text = read(file);
  for (const [phrase, count] of text.matchAll(/(\d+) (?:блок(?:ов|а)|setup blocks|blocks)\b/g)) {
    if (count !== "13") fail(`${file}: «${phrase}» — в шаблоне 13 блоков`);
  }
  for (const [phrase, count] of text.matchAll(/(\d+) (?:ключевых|главных) вопрос|(\d+) key questions/g)) {
    if ((count ?? phrase.match(/\d+/)[0]) !== "7") fail(`${file}: «${phrase}» — ключевых вопросов 7`);
  }
}

// 8. Версия: VERSION совпадает с последней версией в CHANGELOG.md.
const version = read(".starter-kit/VERSION").trim();
if (!/^\d+\.\d+\.\d+$/.test(version)) fail(`VERSION: «${version}» не SemVer`);
const changelogVersion = read("CHANGELOG.md").match(/^## \[(\d+\.\d+\.\d+)\]/m)?.[1];
if (changelogVersion !== version) fail(`CHANGELOG.md: последняя версия ${changelogVersion}, VERSION — ${version}`);

// 9. Команды из AGENTS.md описаны в README, маркеры PROJECT-RULES на месте.
const agents = read("AGENTS.md");
const readme = read("README.md");
for (const [, command] of agents.matchAll(/^\| `([^`]+)` \|/gm)) {
  if (!readme.includes(`\`${command}\``)) fail(`README.md: нет команды ${command} из AGENTS.md`);
}
if (!agents.includes("<!-- PROJECT-RULES:BEGIN -->") || !agents.includes("<!-- PROJECT-RULES:END -->")) fail("AGENTS.md: нет маркеров PROJECT-RULES");

if (errors.length) {
  console.error(`Найдено проблем: ${errors.length}`);
  for (const error of errors) console.error(`  ✖ ${error}`);
  process.exit(1);
}
console.log(`Согласованность в порядке: Starter Kit ${version} (${language}), файлов продукта — ${productFiles.length}.`);
