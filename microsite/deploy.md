# tokenX Microsite — Deploy & Serve

## Local preview
From the project root, run:

### Python 3
```bash
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
````

### Node (http-server)

```bash
npm install -g http-server
http-server -c-1
```

## GitHub Pages

1. Create a repo and push the files.
2. In GitHub repo settings → Pages → Source: `main` branch / `/ (root)`.
3. Wait a minute, then open `https://<your-username>.github.io/<repo>`.

## Netlify / Vercel

* Drag & drop the folder into Netlify Drop, or connect the GitHub repo to Vercel/Netlify and publish.

## Notes

* Place the 4 SVGs in `/assets` before publishing.
* Optional: add `charter.md`, `tokenomics.md`, `why.md` to the root for raw markdown links.
