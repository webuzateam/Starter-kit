import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CopyButton, CopyProvider } from "@/components/CopyProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SlideDeck } from "@/components/SlideDeck";
import { explainer, fileCards, flow, slides } from "@/content/home";
import { HOW_IT_WORKS_URL, INSTALL_COMMAND, INSTALL_EXISTING_COMMAND, KIT_VERSION, LICENSE_URL, RELEASES_URL, REPO_URL, commands, type Command } from "@/content/kit";

function caption(item: Command) {
  return item.alias ? `${item.title} · ${item.alias}` : item.title;
}

function CommandCardBody({ index, command, caption, mark }: { index: number; command: string; caption: string; mark: string }) {
  return (
    <>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <div><strong>{command}</strong><p>{caption}</p></div>
      <i aria-hidden="true">{mark}</i>
    </>
  );
}

export default function Home() {
  const mainCommands = commands.slice(0, 3);

  return (
    <CopyProvider>
      <ScrollProgress />
      <a className="skip-link" href="#main">К содержанию</a>

      <header className="site-header">
        <Link className="brand" href="/" aria-label="AI Project Starter Kit — главная">
          <span className="brand-mark">A·I</span>
          <span>PROJECT<br />STARTER KIT</span>
        </Link>
        <nav aria-label="Основная навигация">
          <a href="#simple">Как это работает</a>
          <a href="#system">Система</a>
          <a href="#files">Файлы</a>
          <a href="#git">Git</a>
          <a href="#install">Установка</a>
        </nav>
        <Link className="header-cta" href="/guide/">Инструкция <span aria-hidden="true">↗</span></Link>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy reveal">
            <div className="eyebrow"><span>OPEN SOURCE · MIT</span><i /> СИСТЕМА ПАМЯТИ AI-ПРОЕКТА</div>
            <h1>Контекст проекта<br /><em>живёт в файлах.</em></h1>
            <p className="hero-lead">Бесплатная система правил, решений и Git-истории для проектов с AI-помощниками. Новый чат или другой агент видит не обрывки переписки, а готовую карту работы.</p>
            <div className="hero-actions">
              <a className="button primary" href="#install">Установить <span aria-hidden="true">→</span></a>
              <a className="button ghost" href="#simple">Как это работает</a>
              <CopyButton className="button ghost" text="START" copiedChildren="Скопировано">Скопировать START</CopyButton>
            </div>
            <div className="hero-stats" aria-label="Ключевые характеристики">
              <div><strong>13</strong><span>блоков<br />настройки</span></div>
              <div><strong>3</strong><span>режима<br />START</span></div>
              <div><strong>0</strong><span>зависимости<br />от чата</span></div>
            </div>
          </div>

          <div className="hero-art reveal delay-1">
            <Image src="/hero.webp" alt="Папка с документами проекта рядом с защищённым хранилищем" width={1400} height={788} priority sizes="(max-width: 1100px) 92vw, 48vw" />
            <div className="hero-art-glass" aria-hidden="true">
              <span className="signal"><i /> SYSTEM READY</span>
              <span>PROJECT MEMORY / v{KIT_VERSION}</span>
            </div>
            <div className="floating-note note-one" aria-hidden="true">DECISIONS<br /><b>Сохранены</b></div>
            <div className="floating-note note-two" aria-hidden="true">NEXT STEP<br /><b>Определён</b></div>
          </div>
        </section>

        <section className="manifesto-band" aria-label="Главный принцип">
          <div className="marquee-track" aria-hidden="true">
            <span>ПРОЕКТ ПОМНИТ</span><i>✦</i><span>АГЕНТ МОЖЕТ МЕНЯТЬСЯ</span><i>✦</i><span>ФАЙЛЫ ОСТАЮТСЯ</span><i>✦</i><span>ПРОЕКТ ПОМНИТ</span><i>✦</i><span>АГЕНТ МОЖЕТ МЕНЯТЬСЯ</span><i>✦</i><span>ФАЙЛЫ ОСТАЮТСЯ</span><i>✦</i>
          </div>
          <span className="visually-hidden">Проект помнит. Агент может меняться. Файлы остаются.</span>
        </section>

        <section className="simple-section section-pad" id="simple">
          <div className="section-kicker">00 — ПРОСТЫМИ СЛОВАМИ</div>
          <div className="section-heading">
            <h2>Бортовой журнал<br />для вашего проекта.</h2>
            <p>На корабле меняются капитаны, но журнал остаётся на мостике. Здесь капитаны — AI-помощники, а журнал — несколько файлов в папке проекта.</p>
          </div>
          <div className="simple-grid">
            {explainer.map((item, index) => (
              <article key={item.label} className="simple-card">
                <span>{String(index + 1).padStart(2, "0")} / {item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <ol className="simple-steps">
            <li><b>Скопируйте</b> Starter Kit в папку проекта.</li>
            <li><b>Напишите</b> <code>START</code> и ответьте на вопросы — или доверьте настройку агенту.</li>
            <li><b>Работайте</b> как обычно, а в конце пишите <code>закрываем сессию</code>.</li>
          </ol>
          <a className="text-link" href={HOW_IT_WORKS_URL} target="_blank" rel="noopener noreferrer">Подробное объяснение для новичка ↗</a>
        </section>

        <section className="system-section section-pad" id="system">
          <div className="section-kicker">01 — СИСТЕМА</div>
          <div className="section-heading">
            <h2>Один проект.<br />Пять уровней устойчивости.</h2>
            <p>Пролистайте презентацию. Стрелки клавиатуры тоже работают.</p>
          </div>
          <SlideDeck slides={slides} />
        </section>

        <section className="flow-section section-pad">
          <div className="section-kicker light">02 — ЖИЗНЕННЫЙ ЦИКЛ</div>
          <div className="flow-header">
            <h2>От пустой папки<br />до переносимого проекта.</h2>
            <p>Каждый этап оставляет понятный локальный след. Никакой магической памяти — только проверяемые файлы.</p>
          </div>
          <ol className="flow-line">
            {flow.map(([number, title, caption], index) => (
              <li className="flow-step" key={number} style={{ "--delay": `${index * 0.14}s` } as CSSProperties}>
                <span>{number}</span><i /><strong>{title}</strong><small>{caption}</small>
              </li>
            ))}
          </ol>
        </section>

        <section className="files-section section-pad" id="files">
          <div className="section-kicker">03 — КАРТА ФАЙЛОВ</div>
          <div className="files-intro">
            <h2>У каждого знания<br />есть свой адрес.</h2>
            <p>Новый агент не читает всё подряд. Он идёт по короткому маршруту от правил к текущему состоянию.</p>
          </div>
          <div className="file-grid">
            {fileCards.map(([name, description, type], index) => (
              <article className={`file-card type-${type}`} key={name}>
                <div className="file-top"><span>{String(index + 1).padStart(2, "0")}</span><i /></div>
                <h3>{name}</h3>
                <p>{description}</p>
                <div className="file-line" aria-hidden="true"><i /><i /><i /></div>
              </article>
            ))}
          </div>
          <div className="read-order">
            <span>ПОРЯДОК ЧТЕНИЯ</span>
            <div><b>RULES</b><i>→</i><b>POLICY</b><i>→</i><b>CONTEXT</b><i>→</i><b>STATUS</b><i>→</i><b>NEXT STEP</b></div>
          </div>
        </section>

        <section className="git-section section-pad" id="git">
          <div className="git-copy">
            <div className="section-kicker light">04 — НАДЁЖНОЕ СОХРАНЕНИЕ</div>
            <h2>В Git — смысл проекта.<br /><em>Без секретов и мусора.</em></h2>
            <p>При закрытии сессии агент запускает <code>preflight.sh</code>: ищет секреты по содержимому, проверяет размеры, ветку, origin и видимость репозитория. Только потом — commit и обычный push.</p>
            <ul>
              <li><span>01</span> Все значимые данные проекта</li>
              <li><span>02</span> Проверка секретов скриптом, а не на глаз</li>
              <li><span>03</span> Приватный репозиторий по умолчанию</li>
              <li><span>04</span> Никакого force push без вашего решения</li>
            </ul>
            <a className="repo-link" href={REPO_URL} target="_blank" rel="noopener noreferrer">
              <span>GitHub</span>
              <strong>Исходный код Starter Kit</strong>
              <i aria-hidden="true">↗</i>
            </a>
            <small className="repo-access-note">Открытый код · лицензия MIT · версия {KIT_VERSION}</small>
          </div>
          <div className="git-console" role="img" aria-label="Схема закрытия сессии: статус, память, секреты, размеры, commit, push">
            <div className="console-head" aria-hidden="true"><span><i /><i /><i /></span><b>SESSION / CLOSE</b><small>PREFLIGHT</small></div>
            <div className="console-body" aria-hidden="true">
              <p><span>›</span> проверяем статус проекта</p>
              <p><span>›</span> обновляем память <i>OK</i></p>
              <p><span>›</span> ищем секреты <i>SAFE</i></p>
              <p><span>›</span> проверяем размеры <i>OK</i></p>
              <p><span>›</span> origin и видимость <i>OK</i></p>
              <p className="console-push"><span>›</span> commit → push origin <i>DONE</i></p>
            </div>
            <div className="console-orbit orbit-one" /><div className="console-orbit orbit-two" />
          </div>
        </section>

        <section className="safety-section section-pad">
          <div className="section-kicker">05 — ПРЕДСКАЗУЕМАЯ АВТОНОМНОСТЬ</div>
          <div className="safety-grid">
            <article className="safety-main">
              <span>АВТОМАТИЧЕСКИ</span>
              <h2>Рутинное — агенту.<br />Рискованное — владельцу.</h2>
              <div className="auto-list"><i>STATUS</i><i>LOG</i><i>CHECKS</i><i>COMMIT</i><i>PUSH</i></div>
            </article>
            <article className="safety-card coral">
              <span>СТОП-СИГНАЛ</span><strong>Секрет</strong><p>Значение не выводится. Commit останавливается.</p>
            </article>
            <article className="safety-card cyan">
              <span>РЕШЕНИЕ</span><strong>50+ MiB</strong><p>Путь, размер и варианты — до commit.</p>
            </article>
            <article className="safety-card lime">
              <span>ЗАПРЕТ</span><strong>Force push</strong><p>История не переписывается автоматически.</p>
            </article>
          </div>
        </section>

        <section className="commands-section section-pad" id="commands">
          <div className="command-title">
            <div className="section-kicker light">06 — ТРИ ГЛАВНЫЕ КОМАНДЫ</div>
            <h2>Сложная система.<br />Простой интерфейс.</h2>
          </div>
          <div className="command-cards">
            {mainCommands.map((item, index) => (
              <CopyButton
                key={item.command}
                className="command-card"
                text={item.command}
                copiedChildren={<CommandCardBody index={index} command={item.command} caption={caption(item)} mark="✓" />}
              >
                <CommandCardBody index={index} command={item.command} caption={caption(item)} mark="↗" />
              </CopyButton>
            ))}
          </div>
          <div className="command-footnote"><i /> Команда срабатывает только отдельным сообщением. Ещё есть ВОССТАНОВИТЬ, ИЗМЕНИТЬ ПРАВИЛА ПРОЕКТА и ОБНОВИТЬ STARTER KIT — <Link href="/guide/#commands-guide">все команды</Link>.</div>
        </section>

        <section className="install-section section-pad" id="install">
          <div className="section-kicker">07 — УСТАНОВКА</div>
          <div className="section-heading">
            <h2>Одна команда.<br />Бесплатно навсегда.</h2>
            <p>Нужен только Node.js. Без Node.js — скачайте архив и распакуйте его в корень проекта.</p>
          </div>
          <div className="install-grid">
            <article className="install-card">
              <span>НОВЫЙ ПРОЕКТ</span>
              <code>{INSTALL_COMMAND}</code>
              <CopyButton className="install-copy" text={INSTALL_COMMAND} copiedChildren="Скопировано ✓">Скопировать</CopyButton>
            </article>
            <article className="install-card">
              <span>СУЩЕСТВУЮЩИЙ ПРОЕКТ</span>
              <code>{INSTALL_EXISTING_COMMAND}</code>
              <CopyButton className="install-copy" text={INSTALL_EXISTING_COMMAND} copiedChildren="Скопировано ✓">Скопировать</CopyButton>
              <small>Совпадающие файлы, например README.md, будут заменены — сохраните их заранее.</small>
            </article>
            <article className="install-card">
              <span>БЕЗ ТЕРМИНАЛА</span>
              <a className="install-download" href={RELEASES_URL} target="_blank" rel="noopener noreferrer">Скачать архив с GitHub ↗</a>
              <small>Распакуйте содержимое прямо в корень проекта, без вложенной папки.</small>
            </article>
          </div>
        </section>

        <section className="final-section">
          <div className="final-noise" aria-hidden="true" />
          <span className="final-label">AI PROJECT STARTER KIT</span>
          <h2>Проект помнит.<br /><em>Даже если чат — нет.</em></h2>
          <p>Установите Starter Kit в корень проекта. Откройте папку с любым AI-агентом, который читает файлы. Напишите одно слово.</p>
          <CopyButton className="final-command" text="START" copiedChildren={<><span aria-hidden="true">›</span> START СКОПИРОВАН<i aria-hidden="true">✓</i></>}><span aria-hidden="true">›</span> START<i aria-hidden="true">→</i></CopyButton>
          <Link className="final-guide-link" href="/guide/">Сначала прочитать полную инструкцию →</Link>
          <div className="final-meta"><span>LOCAL MEMORY</span><span>SAFE GIT</span><span>PORTABLE CONTEXT</span></div>
        </section>
      </main>

      <footer>
        <div className="brand footer-brand"><span className="brand-mark">A·I</span><span>PROJECT<br />STARTER KIT</span></div>
        <p>Система устойчивого контекста AI-проектов · v{KIT_VERSION}</p>
        <div className="footer-links">
          <Link href="/guide/">Инструкция</Link>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer">MIT</a>
          <a href="#top">Наверх ↑</a>
        </div>
      </footer>
    </CopyProvider>
  );
}
