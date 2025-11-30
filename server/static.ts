import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // In production, __dirname from the bundled cjs should work
  // In case it doesn't, we have multiple fallbacks
  let distPath: string;
  
  // Try relative to current working directory first (Vercel default)
  distPath = path.resolve(process.cwd(), "dist", "public");
  
  if (!fs.existsSync(distPath)) {
    // Fallback: try relative to the script directory
    distPath = path.resolve(__dirname || process.cwd(), "..", "public");
  }
  
  if (!fs.existsSync(distPath)) {
    // Last resort: just use dist/public
    distPath = "dist/public";
  }

  console.log(`[static] Looking for static files at: ${distPath}`);
  console.log(`[static] Directory exists: ${fs.existsSync(distPath)}`);
  console.log(`[static] CWD: ${process.cwd()}`);

  if (!fs.existsSync(distPath)) {
    console.warn(`Warning: Could not find public directory at ${distPath}`);
    try {
      const distContents = fs.readdirSync(path.resolve(process.cwd(), "dist"));
      console.warn(`dist/ contents:`, distContents);
    } catch (e) {
      console.warn("dist/ directory not found");
    }
  }

  // Set proper MIME type for HTML files
  app.use((req, res, next) => {
    if (req.path.endsWith(".html")) {
      res.type("text/html; charset=utf-8");
    }
    next();
  });

  app.use(express.static(distPath, {
    setHeaders: (res, filePath) => {
      // Ensure HTML files are served as HTML
      if (filePath.endsWith(".html")) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
      }
      // Set cache headers for static assets
      if (filePath.match(/\.(js|css|woff2?|ttf|eot|svg)$/i)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    },
  }));

  // fall through to index.html if the file doesn't exist (SPA routing)
  app.use("*", (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.type("text/html; charset=utf-8");
      res.sendFile(indexPath);
    } else {
      res.status(404).send("index.html not found");
    }
  });
}
