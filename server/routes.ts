import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFeedbackSchema } from "@shared/schema";
import { appendFeedbackToSheet } from "./utils/googleSheets";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Feedback API endpoint
  app.post("/api/feedback", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertFeedbackSchema.parse(req.body);
      
      // Save to storage
      const feedback = await storage.createFeedback(validatedData);
      
      // Save to Google Sheets
      try {
        await appendFeedbackToSheet(feedback);
      } catch (sheetsError) {
        console.error("Failed to save to Google Sheets:", sheetsError);
        // Continue anyway - don't fail the request if sheets fails
      }
      
      res.json({ 
        success: true, 
        message: "Feedback received successfully",
        data: feedback 
      });
    } catch (error) {
      console.error("Feedback submission error:", error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Invalid feedback data" 
      });
    }
  });

  // Get all feedback (for admin/testing)
  app.get("/api/feedback", async (req, res) => {
    try {
      const feedbacks = await storage.getAllFeedback();
      res.json(feedbacks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch feedback" });
    }
  });

  return httpServer;
}
