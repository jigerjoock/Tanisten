# Tanisten Learn – source research bundle

This ZIP is a **download kit**, not copies of all external course content. Direct bulk download was unavailable from the assistant runtime. The included downloader fetches public GitHub archive ZIPs on your computer/Codex machine and records SHA256 and source license notes.

## Run (Windows PowerShell)

Extract this ZIP outside the deployed website, then:

```powershell
python download_sources.py
```

To fetch only Python-related repositories:

```powershell
python download_sources.py --only python
```

Results: `downloaded/*.zip`, `downloaded/download_report.json`.

## Next steps in Codex

1. Extract the source archives outside `apps/learn/public` and outside production builds.
2. Check LICENSE/LICENCE/README of each archive, and individual embedded assets. In particular, `catch-the-dots` has inconsistent CC BY vs CC BY-SA wording in its license file; **do not assume CC BY alone**.
3. Catalogue exercises, formats, German translations, sample project `.sb3` files, expected output, difficulty, and applicability.
4. Produce original German curriculum data in the existing LMS schema with attribution where reusing licensed content.
5. Do not upload third-party content or publish until license eligibility is established. Never commit source archives or secrets accidentally.

Sources: https://github.com/exercism/python and https://github.com/raspberrypilearning . See `sources.json` for direct repository URLs and license flags.
