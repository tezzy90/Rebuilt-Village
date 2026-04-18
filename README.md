# Claude Code Setup for Rebuilt Village

This directory tree contains the configuration that makes Claude Code effective on this project. Drop these files into the repo root, commit them, and every future Claude Code session starts with full project context.

## What gets installed

```
Rebuilt-Village/
├── CLAUDE.md                           # Project guidance read on every session
├── .claude/
│   ├── settings.json                   # Permissions allowlist and deny list
│   ├── agents/                         # Specialized subagents
│   │   ├── cms-migrator.md
│   │   ├── code-reviewer.md
│   │   ├── debloat-hunter.md
│   │   └── firecms-builder.md
│   ├── skills/                         # Invokable workflows and references
│   │   ├── firebase-deploy/SKILL.md
│   │   ├── firecms-schema/SKILL.md
│   │   └── givebutter-sync/SKILL.md
│   ├── plans/
│   │   └── active-plan.md              # Current phase, updated as you go
│   └── memory/
│       ├── decisions.md                # Architectural decision log
│       └── scratchpad.md               # Throwaway notes
└── .github/
    └── workflows/
        └── deploy.yml                  # GitHub Actions build + deploy workflow
```

## Installation

From the repo root:

```bash
# 1. Merge these files in (do not overwrite CLAUDE.md if it already exists without reviewing)
# 2. Commit
git add CLAUDE.md .claude .github
git commit -m "chore: scaffold Claude Code project configuration"

# 3. Create a gitignored file for personal overrides (optional)
echo "CLAUDE.local.md" >> .gitignore
touch CLAUDE.local.md
```

## Before first use

Before running Claude Code on this setup, do these once:

1. **Install gh CLI** and authenticate: `brew install gh && gh auth login`. Claude Code is dramatically more useful with `gh` available for PR and issue work.
2. **Install Firebase CLI**: `npm install -g firebase-tools` and run `firebase login`.
3. **Create GitHub Actions secret**: In repo Settings > Secrets > Actions, add `FIREBASE_SERVICE_ACCOUNT_REBUILT_VILLAGE_WEB` with a Firebase service account JSON. Generate via Firebase Console > Project Settings > Service Accounts > Generate new private key.
4. **Verify permissions**: Open Claude Code and run `/permissions` to review the allowlist/denylist. Tweak to your taste.

## How to use this setup

### Starting a phase

```bash
cd Rebuilt-Village
claude
```

In the session:

1. Update `.claude/plans/active-plan.md` with the current phase goals. Claude can do this: "Update the active plan to Phase 2 per PRD Section 8."
2. Enter Plan Mode (Shift+Tab until you see planning mode).
3. Give Claude the task: "Read the active plan and PRD Section 8 Phase 2. Draft an implementation plan."
4. Review the plan. Press Ctrl+G to open it in your editor if you want to revise.
5. Exit Plan Mode and execute.
6. After the work: "Use the code-reviewer subagent to review this diff before I commit."
7. Commit and PR.
8. Before starting the next phase, run `/clear`.

### Delegating to subagents

Four subagents are available. Tell Claude to use them explicitly:

- `cms-migrator` — "Use the cms-migrator subagent to move the hardcoded team array from About.tsx into Firestore."
- `code-reviewer` — "Use the code-reviewer subagent to review this diff."
- `debloat-hunter` — "Use the debloat-hunter subagent to find any dead code I have not already scheduled for removal."
- `firecms-builder` — "Use the firecms-builder subagent to define the events collection."

Subagents run in their own context window. They read files, do the work, and report back a summary without polluting your main context.

### Invoking skills

Three skills ship with this setup. Claude may auto-apply them based on the description, or you can reference them:

- `firebase-deploy` — invoked before any deploy.
- `firecms-schema` — invoked when creating or modifying a FireCMS collection.
- `givebutter-sync` — invoked when working on the Givebutter integration.

## Ongoing maintenance

- **CLAUDE.md is code.** Review it quarterly. Prune lines Claude already follows correctly. Add lines for mistakes Claude keeps making.
- **decisions.md is append-only.** Every architectural choice gets an ADR. Never edit past entries; write new ones that supersede.
- **scratchpad.md gets pruned.** If something sits there for two weeks and has not moved to active-plan.md or decisions.md, delete it.
- **active-plan.md gets archived per phase.** When finishing Phase N, move the active-plan.md to `.claude/plans/archive/phase-N.md` and write a fresh one for Phase N+1.

## Personal overrides

You can keep personal instructions that are not shared with the team by creating `CLAUDE.local.md` at the repo root. Add it to `.gitignore`. Claude reads it in addition to `CLAUDE.md`.

Example use cases:
- Personal workflow preferences that differ from the team norm.
- Local development environment quirks specific to your machine.
- Notes-to-self that you do not want in git history.

## When things go wrong

- **Claude keeps ignoring a rule in CLAUDE.md.** File is probably too long. Prune hard and retest. If still ignored, convert the rule to a hook in `.claude/settings.json`.
- **Claude burns through context too fast.** You are probably mid-phase and should not be. `/clear`, start fresh with a more specific prompt.
- **Claude produces plausible but wrong code.** You skipped verification. Always end tasks with "run the build and paste the exit code" or equivalent.
- **Subagent reports conflict with main session reasoning.** Trust the subagent. It ran in clean context specifically to avoid bias from the main session.

## References

- Claude Code docs: https://code.claude.com/docs/en/best-practices
- PRD: `/docs/PRD_v2.docx` in this repo
- FireCMS docs: https://firecms.co/docs/
