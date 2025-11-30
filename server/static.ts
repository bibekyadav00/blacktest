import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function serveStatic(app: Express) {
  // Try multiple possible paths for dist/public
  let distPath = path.resolve(__dirname, "../public");
  
  // Fallback for Vercel and other serverless environments
  if (!fs.existsSync(distPath)) {
    distPath = path.resolve(__dirname, "./public");
  }
  
  // Fallback if running from different directory structure
  if (!fs.existsSync(distPath)) {
    distPath = path.resolve(process.cwd(), "dist", "public");
  }

  console.log(`[static] Looking for static files at: ${distPath}`);
  console.log(`[static] Directory exists: ${fs.existsSync(distPath)}`);

  if (!fs.existsSync(distPath)) {
    console.warn(
      `Warning: Could not find the build directory: ${distPath}, static files may not be served. Available files:`,
    );
    console.warn(`CWD: ${process.cwd()}`);
    console.warn(`__dirname: ${__dirname}`);
    try {
      console.warn(`dist/ contents:`, fs.readdirSync(path.resolve(process.cwd(), "dist")));
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
