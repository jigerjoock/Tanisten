# CodeLab LMS v0.2 integration point

The CodeLab v0.2 archive was not available in the repository during implementation. Extract its UI components, exercise renderer, and bundled assets into this directory, then connect its submission events to `POST /api/exercises/:id`.

The route API already supports the required contracts:

- automatic exercises: `{ intent: "check", answer }`
- teacher-reviewed exercises: `{ intent: "submit", answer }`

Do not move CodeLab code into the root Vite application; this directory is deliberately isolated under `apps/learn`.
