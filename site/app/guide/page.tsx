import type { Metadata } from "next";
import Link from "next/link";
import { extensionRows, faq, lifecycle, memoryFiles, modes, quickStart, rootFiles, workAreas } from "@/content/guide";
import { HOW_IT_WORKS_URL, INSTALL_COMMAND, INSTALL_EXISTING_COMMAND, KIT_VERSION, LICENSE_URL, RELEASES_URL, REPO_URL, commands } from "@/content/kit";

const title = "Полная инструкция — AI Project Starter Kit";
const description = "Установка, три режима START, карта файлов, команды, Git и проверка секретов, восстановление, обновление и перенос расширений.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/guide/" },
  openGraph: { title, description, url: "/guide/", type: "article" },
  twitter: { title, description },
};

function FileGroup({ title, label, items }: { title: string; label: string; items: readonly (readonly [string, string, string])[] }) {
  return (
    <section className="guide-file-group">
      <div className="guide-group-head"><span>{label}</span><h3>{title}</h3></div>
      <div className="guide-file-list">
        {items.map(([name, role, text]) => (
          <article key={name} className="guide-file-item">
            <code>{name}</code><strong>{role}</strong><p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function GuidePage() {
  return (
    <>
      <a className="skip-link" href="#guide-content">К содержанию</a>
      <header className="guide-header">
        <Link className="brand" href="/" aria-label="На главную страницу"><span className="brand-mark">A·I</span><span>PROJECT<br />STARTER KIT</span></Link>
        <nav aria-label="Навигация инструкции">
          <a href="#idea">Что это</a><a href="#quick-start">Старт</a><a href="#map">Файлы</a><a href="#git-guide">Git</a><a href="#recovery">Восстановление</a>
        </nav>
        <Link className="guide-home-link" href="/">← Презентация</Link>
      </header>

      <main className="guide-page" id="top">
        <section className="guide-hero">
          <div className="guide-hero-grid" aria-hidden="true" />
          <div className="guide-hero-copy">
            <span className="guide-label">ПОЛНАЯ ИНСТРУКЦИЯ / v{KIT_VERSION}</span>
            <h1>Карта проекта,<br /><em>которая не даст запутаться.</em></h1>
            <p>Для владельца проекта: как установить Starter Kit, что делает каждый файл, в каком порядке работает система, что сохраняет Git и как продолжить работу с другим агентом.</p>
            <div className="guide-hero-actions"><a href="#quick-start">Начать за 7 шагов ↓</a><a href="#idea">Простое объяснение</a></div>
          </div>
          <nav className="guide-hero-index" aria-label="Содержание">
            <span>СОДЕРЖАНИЕ</span>
            <a href="#idea"><b>01</b> Что это</a><a href="#quick-start"><b>02</b> Быстрый старт</a><a href="#map"><b>03</b> Карта файлов</a><a href="#lifecycle"><b>04</b> Жизненный цикл</a><a href="#commands-guide"><b>05</b> Команды</a><a href="#extensions"><b>06</b> Расширения</a><a href="#git-guide"><b>07</b> Git и секреты</a><a href="#recovery"><b>08</b> Восстановление</a><a href="#faq"><b>09</b> Вопросы</a>
          </nav>
        </section>

        <div className="guide-layout" id="guide-content">
          <nav className="guide-aside" aria-label="На этой странице">
            <span>НА ЭТОЙ СТРАНИЦЕ</span>
            <a href="#idea">Назначение</a><a href="#quick-start">Быстрый старт</a><a href="#map">Карта файлов</a><a href="#lifecycle">Жизненный цикл</a><a href="#commands-guide">Команды</a><a href="#extensions">Skills / Plugins / MCP</a><a href="#git-guide">Git и безопасность</a><a href="#recovery">Восстановление</a><a href="#faq">Вопросы</a>
          </nav>

          <div className="guide-content">
            <section className="guide-section guide-intro" id="idea">
              <div className="guide-kicker">01 — НАЗНАЧЕНИЕ</div>
              <h2>Это файловая память проекта,<br />а не ещё один фреймворк.</h2>
              <div className="guide-two-col">
                <p>Когда проект ведётся с AI-помощником, договорённости живут в чате. Но чат забывает начало, теряется, а новый чат или другой AI ничего не знает. Starter Kit раскладывает цель, правила, текущее состояние и решения по небольшому набору Markdown-файлов — и любой агент продолжает работу с того же места.</p>
                <div className="guide-note"><b>Аналогия</b><span>Бортовой журнал на корабле, где меняются капитаны. Капитаны — AI-помощники, журнал — файлы проекта. Подробно и без терминов — <a href={HOW_IT_WORKS_URL} target="_blank" rel="noopener noreferrer">HOW_IT_WORKS.md ↗</a></span></div>
              </div>
              <div className="guide-mode-grid">
                <article><span>ШАБЛОН</span><h3>Чистый Starter Kit</h3><p>Распространяемая копия не содержит данных реальных проектов и материалов разработки самого шаблона.</p></article>
                <article><span>ПРОЕКТ</span><h3>Рабочая копия</h3><p>После START и ПРИМЕНИТЬ плейсхолдеры становятся проверяемой памятью с указанием источника каждого значения.</p></article>
              </div>
            </section>

            <section className="guide-section" id="quick-start">
              <div className="guide-kicker">02 — БЫСТРЫЙ СТАРТ</div>
              <h2>Семь шагов до готового проекта.</h2>
              <div className="guide-install">
                <div><span>Новый проект</span><code>{INSTALL_COMMAND}</code></div>
                <div><span>Существующий проект (совпадающие файлы будут заменены)</span><code>{INSTALL_EXISTING_COMMAND}</code></div>
                <p>Без Node.js — скачайте архив со страницы <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer">GitHub Releases ↗</a> и распакуйте содержимое в корень проекта.</p>
              </div>
              <div className="guide-steps">{quickStart.map(([n, heading, text]) => <article key={n}><span>{n}</span><div><h3>{heading}</h3><p>{text}</p></div></article>)}</div>
              <div className="guide-rule-grid">
                {modes.map(([n, heading, text]) => <article key={n}><b>{n}</b><h3>{heading}</h3><p>{text}</p></article>)}
              </div>
              <div className="guide-warning"><strong>Важно</strong><p>Агент отличает ваш ответ от вывода из файлов и значения по умолчанию — у каждого значения указан источник. Неизвестное разрешение на рискованное действие всегда означает запрет.</p></div>
            </section>

            <section className="guide-section" id="map">
              <div className="guide-kicker">03 — КАРТА ФАЙЛОВ</div>
              <h2>У каждого знания — один адрес.</h2>
              <p className="guide-lead">Стабильное лежит в контексте, текущее — в статусе, причины — в решениях, история — в дневнике и Git. Каждое правило записано в одном месте, поэтому документы не противоречат друг другу.</p>
              <FileGroup label="ROOT" title="Файлы управления" items={rootFiles} />
              <FileGroup label="DOCS" title="Память проекта" items={memoryFiles} />
              <FileGroup label="WORK" title="Работа и сценарии" items={workAreas} />
              <div className="guide-read-order"><span>AI ЧИТАЕТ</span><b>AGENTS</b><i>→</i><b>POLICY</b><i>→</i><b>CONTEXT</b><i>→</i><b>STATUS</b><i>→</i><b>ЗАДАЧА</b></div>
            </section>

            <section className="guide-section" id="lifecycle">
              <div className="guide-kicker">04 — ЖИЗНЕННЫЙ ЦИКЛ</div>
              <h2>От первого START до нового агента.</h2>
              <div className="guide-timeline">{lifecycle.map(([name, heading, text], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><code>{name}</code><div><h3>{heading}</h3><p>{text}</p></div></article>)}</div>
            </section>

            <section className="guide-section" id="commands-guide">
              <div className="guide-kicker">05 — КОМАНДЫ</div>
              <h2>Три главные команды<br />и три вспомогательные.</h2>
              <div className="guide-command-grid">
                {commands.map((item) => (
                  <article key={item.command}><code>{item.command}</code>{item.alias ? <small>{item.alias}</small> : null}<h3>{item.title}</h3><p>{item.text}</p></article>
                ))}
              </div>
              <p className="guide-caption">Команда срабатывает только отдельным сообщением, регистр не важен. В Claude Code те же сценарии доступны как /kit-start, /kit-apply, /kit-close, /kit-recover, /kit-audit и /kit-upgrade.</p>
            </section>

            <section className="guide-section" id="extensions">
              <div className="guide-kicker">06 — ПЕРЕНОСИМОСТЬ</div>
              <h2>Skills, плагины и MCP:<br />код переносится, доступы — нет.</h2>
              <p className="guide-lead">Реестр <code>docs/INTEGRATIONS.md</code> отвечает на четыре вопроса: что нужно проекту, где источник, какая версия и как проверить работу после clone.</p>
              <div className="guide-table-wrap">
                <table>
                  <thead><tr><th scope="col">Тип</th><th scope="col">Где лежит</th><th scope="col">Что хранит Git</th><th scope="col">Что восстановить отдельно</th></tr></thead>
                  <tbody>{extensionRows.map(([type, path, kept, restore]) => <tr key={type}><th scope="row">{type}</th><td><code>{path}</code></td><td>{kept}</td><td>{restore}</td></tr>)}</tbody>
                </table>
              </div>
              <div className="guide-rule-grid">
                <article><b>1</b><h3>Только нужное</h3><p>По умолчанию обязательных расширений нет. Каталоги создаются только для выбранных Skills, плагинов и MCP.</p></article>
                <article><b>2</b><h3>Без credentials</h3><p>Секретные значения передаются через переменные окружения. В Git — только имена переменных.</p></article>
                <article><b>3</b><h3>Доверие после проверки</h3><p>Проектную MCP-конфигурацию включайте только после просмотра её содержимого.</p></article>
                <article><b>4</b><h3>Health check</h3><p>Для каждого обязательного расширения — короткая проверка. «Файл существует» не значит «сервис работает».</p></article>
              </div>
            </section>

            <section className="guide-section" id="git-guide">
              <div className="guide-kicker">07 — GIT И СЕКРЕТЫ</div>
              <h2>Git хранит историю смысла,<br />а не секреты и случайный кэш.</h2>
              <div className="guide-git-grid">
                <article className="keep"><span>В GIT</span><ul><li>исходники и документы;</li><li>невоспроизводимые данные и результаты;</li><li>проектные Skills и безопасные конфигурации;</li><li>решения, статусы и дневник сессий.</li></ul></article>
                <article className="exclude"><span>ВНЕ GIT</span><ul><li>токены, пароли и закрытые ключи;</li><li>OAuth-сессии и credentials;</li><li>системные файлы;</li><li>согласованный кэш и воспроизводимые зависимости.</li></ul></article>
              </div>
              <p className="guide-lead">Видимость репозитория выбираете вы: по умолчанию рекомендуется приватный, публичный — по явному решению и после проверки всей истории. Перед каждым commit и push скрипт <code>.starter-kit/preflight.sh</code> ищет секреты по содержимому, опасные имена файлов и файлы от 50 MiB, сверяет ветку, origin и видимость. Результат STOP останавливает сохранение до вашего решения.</p>
            </section>

            <section className="guide-section" id="recovery">
              <div className="guide-kicker">08 — ВОССТАНОВЛЕНИЕ И ОБНОВЛЕНИЕ</div>
              <h2>Новый clone. Новый агент.<br />Тот же понятный проект.</h2>
              <ol className="guide-recovery-list">
                <li><span>01</span><p>Клонируйте репозиторий проекта и откройте папку в AI-агенте.</p></li>
                <li><span>02</span><p>Отправьте <code>ВОССТАНОВИТЬ</code>. До отчёта реконструкции агент ничего не изменяет.</p></li>
                <li><span>03</span><p>Восстановите секреты из защищённого хранилища по карте <code>docs/SECRETS.md</code>.</p></li>
                <li><span>04</span><p>Восстановите обязательные Skills, плагины и MCP по <code>docs/INTEGRATIONS.md</code> и выполните проверки.</p></li>
                <li><span>05</span><p>Сверьте цель, границы, последнее состояние, риски и первый безопасный следующий шаг.</p></li>
              </ol>
              <p className="guide-lead">Вышла новая версия Starter Kit? Отправьте <code>ОБНОВИТЬ STARTER KIT</code>: агент покажет, какие файлы kit изменятся, и обновит их только после вашего подтверждения. README, документы памяти, дневник и код проекта не перезаписываются.</p>
            </section>

            <section className="guide-section" id="faq">
              <div className="guide-kicker">09 — ВОПРОСЫ</div>
              <h2>Что чаще всего вызывает путаницу.</h2>
              <div className="guide-faq">{faq.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>
            </section>

            <section className="guide-cta">
              <span>ГОТОВЫ НАЧАТЬ?</span><h2>Установите Starter Kit.<br />Напишите <em>START</em>.</h2><p>Пройдите пошаговый опрос, ответьте на 7 быстрых вопросов или доверьте настройку агенту.</p><div><a href={REPO_URL} target="_blank" rel="noopener noreferrer">Открыть GitHub ↗</a><Link href="/">Вернуться к презентации</Link></div>
            </section>
          </div>
        </div>
      </main>

      <footer className="guide-footer"><div className="brand footer-brand"><span className="brand-mark">A·I</span><span>PROJECT<br />STARTER KIT</span></div><p>Полная инструкция · v{KIT_VERSION} · <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer">MIT</a></p><a href="#top">Наверх ↑</a></footer>
    </>
  );
}
