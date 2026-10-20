# Add Shanne's full portfolio to the MANDARAMBONG team website

Flow: team homepage (index.html) > Meet Our Team > Shanne's "View Portfolio" > shanne.html (full portfolio) > "Team Website" back link.

## Install
Copy these into the ROOT of your team website project (same folder as your index.html, style.css, script.js, images/):
- `shanne.html`  (your card already links to this file name)
- `shanne/`      (all of the portfolio's CSS, JS, images, video and CV)
- `index.html`   (OPTIONAL: your file with only Shanne's card changed: updated skills/projects text and the button now says "View Portfolio". Skip it if you prefer to keep yours.)

Nothing else in your team site is touched. The portfolio uses its own folder, so it cannot clash with your style.css, script.js or images/.

## Notes
- The team card photo still comes from `images/shanne.jpg` (yours).
- The portfolio's "Team Website" button (sidebar) and "<- Team" link (mobile menu) go back to `index.html#members`.
- Open the site through a local server (VS Code Live Server) so the background video and fonts load.
