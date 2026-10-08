#!/usr/bin/env node
// Сверяет русскую (main) и английскую (en) версии Starter Kit: одинаковые файлы продукта,
// версия, 13 блоков, 7 ключевых вопросов, команды и идентификаторы правил.
// Текущая версия — рабочее дерево, другая — ветка origin/<main|en>.
// Запуск: node .github/scripts/check-parity.mjs (нужен git fetch origin main en).
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const git = (...args) => execFileSync("git", ["-C", root, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

const language = readFileSync(join(root, ".starter-kit/LANGUAGE"), "utf8").trim();
const otherBranch = language === "ru" ? "en" : "main";
const otherRef = `origin/${otherBranch}`;

try {
  git("rev-parse", "--verify", "--quiet", otherRef);
} catch {
  console.error(`Нет ветки ${otherRef}. Выполните: git fetch origin ${otherBranch}`);
  process.exit(1);
}

const serviceOnly = [".github", ".gitattributes", ".starter-kit-source", "LICENSE", "CHANGELOG.md"];
const isService = (path) => serviceOnly.some((item) => path === item || path.startsWith(`${item}/`));
const productFiles = (ref) =>
  git("ls-tree", "-r", "--name-only", ref).split("\n").filter(Boolean).filter((path) => !isService(path)).sort();

// Здесь — рабочее дерево: отслеживаемые и новые файлы, которые реально существуют.
const here = {
  files: git("ls-files", "--cached", "--others", "--exclude-standard")
    .split("\n")
    .filter((path) => path && !isService(path) && existsSync(join(root, path)))
    .sort(),
  read: (path) => readFileSync(join(root, path), "utf8"),
};
const there = {
  files: productFiles(otherRef),
  read: (path) => git("show", `${otherRef}:${path}`),
};

const errors = [];
const fail = (message) => errors.push(message);

// 1. Одинаковый набор файлов продукта.
const missingThere = here.files.filter((file) => !there.files.includes(file));
const missingHere = there.files.filter((file) => !here.files.includes(file));
for (const file of missingThere) fail(`файл есть здесь, но нет в ${otherBranch}: ${file}`);
for (const file of missingHere) fail(`файл есть в ${otherBranch}, но нет здесь: ${file}`);

// 2. Метрики, не зависящие от языка.
const metrics = (side) => {
  const agents = side.read("AGENTS.md");
  const questionnaire = side.read("docs/PROJECT_QUESTIONNAIRE.md");
  const policy = side.read("docs/PROJECT_POLICY.md");
  return {
    "версия": side.read(".starter-kit/VERSION").trim(),
    "блоков настройки": (questionnaire.match(/^## (?:Блок|Block) \d+\./gm) ?? []).length,
    "ключевых вопросов ★": (questionnaire.match(/^\d+\. ★/gm) ?? []).length,
    "команд в AGENTS.md": (agents.match(/^\| `[^`]+` \|/gm) ?? []).length,
    "разделов AGENTS.md": (agents.match(/^## \d+\./gm) ?? []).length,
    "маркеров PROJECT-RULES": (agents.match(/<!-- PROJECT-RULES:(?:BEGIN|END) -->/g) ?? []).length,
    "правил (ID)": [...policy.matchAll(/^\| ([A-Z]+-\d{2}) \|/gm)].map((m) => m[1]).join(","),
    "команд /kit-*": here.files.filter((f) => f.startsWith(".claude/commands/")).length,
  };
};
const a = metrics(here);
const b = metrics(there);
for (const key of Object.keys(a)) {
  if (String(a[key]) !== String(b[key])) fail(`${key}: здесь «${a[key]}», в ${otherBranch} «${b[key]}»`);
}

// 3. Язык версий различается.
const otherLanguage = there.read(".starter-kit/LANGUAGE").trim();
if (otherLanguage === language) fail(`.starter-kit/LANGUAGE одинаковый в обеих версиях: ${language}`);

if (errors.length) {
  console.error(`Версии ${language} и ${otherLanguage} расходятся: ${errors.length}`);
  for (const error of errors) console.error(`  ✖ ${error}`);
  process.exit(1);
}
console.log(`Версии ${language} и ${otherLanguage} совпадают: ${a["версия"]}, файлов продукта — ${here.files.length}.`);
