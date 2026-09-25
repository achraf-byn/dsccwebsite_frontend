Place member photos in this directory (for example, `haytham-rafai.jpg`).
Set the member's `image` in `src/data/team.json` to `/images/team/haytham-rafai.jpg`.
Use `null` for an initial avatar. Unavailable images also fall back to initials.

Edit names, roles, LinkedIn URLs and display order only in `src/data/team.json`.
Keep each member's `id` unique and stable. Lower `order` values appear first.
Use `null` for a missing LinkedIn URL; no link will be rendered.
Both Home and About use this file. Rebuild/redeploy after editing a production site.
