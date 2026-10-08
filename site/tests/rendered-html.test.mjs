// Проверки собранного статического сайта (out/). Запуск после `npm run build`.
import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const out = new URL("../out/", import.meta.url);
const read = (path) => readFile(new URL(path, out), "utf8");

test("главная: язык, ключевые разделы и команды", async () => {
  const html = await read("index.html");
  assert.match(html, /<html lang="ru"/);
  assert.match(html, /AI Project Starter Kit/);
  assert.match(html, /Контекст проекта/);
  assert.match(html, /id="simple"/, "есть блок «Простыми словами»");
  assert.match(html, /id="install"/, "есть блок установки");
  assert.match(html, /npx degit webuzateam\/Starter-kit\/template/);
  assert.match(html, /закрываем сессию/);
  assert.match(html, /13 блоков|3 режима \/ 13 блоков/);
  assert.match(html, /без брифа/i);
  assert.match(html, /href="\/guide\/"/);
  assert.doesNotMatch(html, /приватный репозиторий<\/strong>/i, "ссылка на репозиторий не называет его приватным");
});

test("главная: SEO и social preview", async () => {
  const html = await read("index.html");
  assert.match(html, /<link rel="canonical" href="https:\/\/[^"]+\/"/);
  assert.match(html, /property="og:image" content="https:\/\/[^"]+\/og\.jpg"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /rel="icon"[^>]+icon\.svg/);
  assert.match(html, /rel="apple-touch-icon"/);
});

test("инструкция: структура и актуальные файлы шаблона", async () => {
  const html = await read("guide/index.html");
  assert.match(html, /<html lang="ru"/);
  assert.match(html, /Полная инструкция/);
  for (const text of ["docs/INTEGRATIONS.md", "docs/HOW_IT_WORKS.md", ".starter-kit/", "preflight.sh", "ВОССТАНОВИТЬ", "ОБНОВИТЬ STARTER KIT", "С сопровождением", "Без брифа", "APPLY"]) {
    assert.ok(html.includes(text), `нет «${text}»`);
  }
  assert.doesNotMatch(html, /docs\/BACKUP\.md/, "BACKUP.md объединён с RECOVERY.md");
  assert.match(html, /<link rel="canonical" href="https:\/\/[^"]+\/guide\/"/);
});

test("служебные файлы: sitemap, robots, заголовки безопасности", async () => {
  const sitemap = await read("sitemap.xml");
  assert.match(sitemap, /\/guide\/<\/loc>/);
  const robots = await read("robots.txt");
  assert.match(robots, /Sitemap: https:\/\/[^\s]+\/sitemap\.xml/);
  const headers = await read("_headers");
  assert.match(headers, /Content-Security-Policy:/);
  assert.match(headers, /X-Content-Type-Options: nosniff/);
});

test("изображения сжаты, тяжёлого og.png в сборке нет", async () => {
  await assert.rejects(access(new URL("og.png", out)));
  for (const file of ["hero.webp", "og.jpg"]) {
    const { size } = await stat(new URL(file, out));
    assert.ok(size < 200 * 1024, `${file}: ${Math.round(size / 1024)} КБ — больше 200 КБ`);
  }
});

test("бюджет JavaScript главной страницы", async () => {
  const html = await read("index.html");
  const scripts = [...html.matchAll(/<script src="([^"]+\.js)"/g)].map((match) => match[1]);
  let total = 0;
  for (const src of scripts) total += (await stat(new URL(`.${src}`, out))).size;
  assert.ok(total < 700 * 1024, `JS главной: ${Math.round(total / 1024)} КБ (несжатый)`);
});

test("в сборке нет лишних каталогов", async () => {
  const entries = await readdir(out);
  assert.ok(!entries.includes("_sites-preview"));
});
