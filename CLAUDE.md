# You are riffing on someone else's prototype

This repo is a copy of [`comp4020-ass2-baishi`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi) at
`658d6af9` --- baishi's crit agent's shipped prototype for `06-a2-retro`.
The copy is yours; their repo is untouched and off limits.

**The brief is to take this somewhere it hasn't been.** Not to restart it, not
to polish it, and not to finish the agent's to-do list. Read how they directed
the agent, find the thing the prototype implies but doesn't do, and build
that. You have the session's half-hour, so pick something you can get live.

**Nothing here is marked.** No cutoff, no reflection, no `PROCESS.md` entry,
no crit sweep, no repo of your own on the line. That is the point --- the
interesting move is the one you wouldn't risk in your own graded repo.

**What you show at the share-back** is the live site plus
`git diff riff-start`. Push early and keep `main` green.

**The agent's own spec tests are `spec/course-content.test.ts` and `spec/data-integrity.test.ts`.** They encode the crit brief,
not yours, and they gate the deploy --- a red check means no live site to show
at the share-back. If your riff moves past that brief, change them or delete
them; keep `spec/invariants.test.ts` green, since that one is true of any good
site.

Everything below this line was written for that crit submission. The marks,
the cutoff, the private-repo phase, the weekly `start` skill and the
reflection are all done, and none of it governs what you do here. Read it for
how they worked, not for what you owe.

---

## The course

SLOP2474, The Forger's Craft — forgery and convincing imitation across paint,
prose, currency and code, one semester, one throughline. Petra Voss convenes,
Anselm Rook tutors the material studios, Naledi Osei guests weeks 9–10 on
synthetic media. Full content lives in `src/content/`; don't restate it here.

## Content-graph rules for this course

- Every `related:` ref is a graph edge and the build fails hard on a dangling
  one — when renaming or removing a `people`/`sessions`/`lectures`/`assessments`
  entry, grep every other collection for a reference to its old slug before
  building, not after.
- `course-config.ts`'s `startDate`/`endDate` window is enforced by
  `spec/data-integrity.test.ts` against every `date`/`due` in the API output —
  a new week's content needs a date inside that window, checked against
  `dist/api/index.json`, not eyeballed from the frontmatter.
- Assessment weights (`the-convincing-copy` 30, `the-tell` 30, `provenance`
  40) must sum to 100; `spec/course-content.test.ts` asserts this from the
  built API, not from reading the three files side by side.
- A person entry can be deleted outright when the cast changes — a design
  decision, not something `check:evidence` penalises — but deleting one
  orphans every `teachers:`/`related:` ref that named them; fix those in the
  same pass, not as a follow-up.

## Course-specific integrity policy

This course's own subject matter (forgery, authorship, authenticity) makes
generic AI-use language inadequate — see the
[policies page](src/pages/policies/index.mdx) for the actual distinction
drawn: a declared, in-hand copy of a technique is the assignment; an
undeclared copy of someone else's labour is still the thing integrity policy
means. Keep that distinction, not a boilerplate AI clause, if the policies
page is ever revised.

## Checks

`pnpm check` runs typecheck, build (which also runs the theme's own
accessibility/broken-link/API-generation checks) and the `spec/` suite.
`spec/course-content.test.ts` is this course's own — course-agnostic
concerns (dates, collection-graph soundness) are already the platform's job;
this file only asserts promises specific to this course's content (assessment
weights, week coverage, teacher assignment, the deck requirement).
