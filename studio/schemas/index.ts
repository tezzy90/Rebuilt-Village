import boardMember from './boardMember';
import donorProject from './donorProject';
import event from './event';
import post from './post';
import program from './program';
import sponsor from './sponsor';
import teamMember from './teamMember';

export const schemaTypes = [
    // ── High priority — unlocks Jess/Amanda content management ──────────────
    event,
    teamMember,
    post,
    // ── Donor infrastructure ─────────────────────────────────────────────────
    donorProject,
    // ── Programs & governance ────────────────────────────────────────────────
    program,
    boardMember,
    // ── Partners & sponsors ──────────────────────────────────────────────────
    sponsor,
];
