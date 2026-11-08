# CORTEX-RAN

Project overview of **CORTEX-RAN** (Cognitive Orchestration, Reasoning & Telemetry-driven
EXecution for AI-native RAN), ICS Lab, Yonsei University.

A static page: `index.html` renders the platform description from `platform.json` and the
project cards from `projects.json`. To add or edit a project, change `projects.json`
(`name`, `title`, `org`, `summary`, `platform`, optional `video` / `paper` links).

Published with GitHub Pages (Settings → Pages → Deploy from a branch → `main` / `/ (root)`).
To preview locally: `python3 -m http.server 8000` in this folder, then open port 8000 in a browser.

This site is generated from the lab copy of CORTEX-RAN (`showcase/build.py`); edit the project
content there and rebuild rather than editing these files by hand.
