import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // Dynamically import the bundled server
    const initServer = (await import("../dist/index.cjs")).default;
    
    // If it's an Express app, we need to handle it differently
    // Get the app from the module
    const module = await import("../dist/index.cjs");
    const app = module.app || module.default;
    
    if (!app) {
      return res.status(500).json({ error: "Server not initialized" });
    }

    // Handle the request
    app.handle(req, res);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error", message: String(error) });
  }
};

