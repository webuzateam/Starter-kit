# How it works — an explanation for beginners

This document explains AI Project Starter Kit in plain words. No programming knowledge is needed.

## The problem it solves

When you work on a project with an AI assistant (ChatGPT, Claude, Codex, Cursor and others), every agreement lives **in the chat window**: what we are building, which decisions were made, what is done, what comes next.

And a chat is an unreliable place:

- it ends, or "forgets" the beginning when it gets too long;
- it can be closed or lost by accident;
- a new chat, another AI or another account knows nothing about the project;
- a month later you won't remember why you did things a certain way.

So you have to explain everything again and again, and the AI sometimes "fills in" things that never happened.

## The idea in one sentence

**The project's memory lives not in the chat but in ordinary files inside the project folder.** Any AI assistant reads these files and immediately understands where you stopped.

## An analogy: the ship's log

Picture a ship whose captains keep changing. Each new captain knows nothing of what happened before. But on the bridge lies a **ship's log**: the course, the rules, important events, where the ship is now and where it is going next. The new captain opens the log and five minutes later is steering the ship onward.

Starter Kit is that ship's log for your project, and AI assistants are the changing captains.

## What's in the folder

```text
my-project/
├── README.md        ← the "cover": what this project is (for people)
├── AGENTS.md        ← rules for the AI: what is allowed, what is not
├── docs/            ← the project's memory
│   ├── PROJECT_CONTEXT.md   goal, audience, boundaries — the "passport"
│   ├── STATUS.md            where we are and what's next — the "bookmark"
│   ├── PROJECT_POLICY.md    agreed working rules
│   ├── decisions/           why important decisions were made
│   └── …                    Git, secrets, recovery
├── logs/sessions/   ← a short diary of work sessions
├── prompts/         ← ready-made flows for the AI (start, close, recover)
├── src/             ← your main work: code, texts, data
└── outputs/         ← finished results: documents, images, builds
```

The most important files are just three:

| File | Answers the question |
|---|---|
| `AGENTS.md` | "How do we work here and what is forbidden?" |
| `docs/PROJECT_CONTEXT.md` | "What are we building and why?" |
| `docs/STATUS.md` | "Where did we stop and what's next?" |

## How to use it: five steps

### 1. Copy Starter Kit into your project folder

The files must sit directly in the folder's root, without an extra nested folder.

### 2. Open the folder in your AI assistant and type `START`

One word, as a separate message. The AI briefly explains the system and offers a setup mode:

- **Guided** (recommended) — the AI asks clear questions with answer options, like a quiz. You can answer any question with "don't know, decide later".
- **Quick** — only 7 key questions; the rest is filled with safe settings.
- **No brief** — the AI studies the folder itself and proposes settings. Handy if the project already exists.

### 3. Check the summary and type `APPLY`

The AI shows the result: what it understood about the project and which rules it proposes. Nothing changes until you type `APPLY`. After that, the AI fills the memory files and the project is ready to work.

### 4. Work as usual

Just give the AI tasks. It reads the memory files before working and adds the important things to them: new decisions, agreements, changes.

### 5. At the end, type `CLOSE SESSION`

The AI updates the "bookmark" (`STATUS.md`), writes a short entry in the diary, checks that no passwords or oversized files slipped into the save, and saves everything to Git (if it is set up).

Next time — even in a new chat or with another AI — work continues from the same place.

## The main commands

| Command | When to type it | What happens |
|---|---|---|
| `START` | The first time, or to see the status | Setup or a short project summary |
| `APPLY` | After the setup summary | The AI writes the settings into the files |
| `CLOSE SESSION` | At the end of work | Memory update, checks and saving to Git |
| `RECOVER` | New chat, another AI, a long break | The AI reads the files and tells you where the project stopped |

A command fires only when written **as a separate message**.

## What Git is and why it's here

**Git** is a "time machine" for a folder: it remembers every saved version of the files. **GitHub** is a website where that history is stored online. If your computer breaks, you can download the project back with its full history.

Starter Kit sets Git up so that:

- everything important is saved: texts, code, documents, results;
- **passwords and keys are never saved** — they stay only with you;
- the repository is **private** by default, i.e. visible only to you. You can make it public, but only by your explicit decision.

If you don't need Git yet, that's fine: memory in files works without it.

## How the AI is protected from mistakes

The AI can do a lot on its own, but some actions **always** require your "yes":

- deleting files;
- publishing anything or sending data outside;
- changing where the project is stored on GitHub or making it public;
- rewriting the history of changes.

Before every save to Git, an automatic check runs (`.starter-kit/preflight.sh`). It looks for passwords and keys and for oversized files, and checks that the save goes where you agreed. If something is wrong, the save stops and the AI asks you.

When the AI doesn't know something, it doesn't make it up but marks it: "I inferred this", "this is a default value" or "this is deferred until you decide".

## FAQ

**Do I need to know how to code?** No. Starter Kit works for any project: code, texts, research, design, business tasks.

**Which AI does it work with?** Any assistant that can read files in the project folder: Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI and others. `AGENTS.md` is the common file name for AI instructions.

**What if the chat is gone?** Open the folder in a new chat (or another AI) and type `RECOVER`.

**Can I change the rules later?** Yes: the `CHANGE RULES` command.

**How do I update Starter Kit when a new version comes out?** The `UPGRADE KIT` command. Your project data is not overwritten.

**Where can I see a filled example?** On the website: https://webuza-ai-starter-kit.pages.dev/en/example/ — the full guide is at https://webuza-ai-starter-kit.pages.dev/en/guide/
