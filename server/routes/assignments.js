const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");
const auth = require("../middleware/auth");

// Get all assignments for a faculty member
router.get("/", auth, async (req, res) => {
  try {
    const assignments = await Assignment.find({ facultyId: req.user.id });
    res.json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ message: "Error fetching assignments" });
  }
});

// Create a new assignment
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, dueDate, totalMarks, courseId } = req.body;
    const assignment = new Assignment({
      title,
      description,
      dueDate,
      totalMarks,
      courseId,
      facultyId: req.user.id,
    });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    console.error("Error creating assignment:", error);
    res.status(500).json({ message: "Error creating assignment" });
  }
});

// Update an assignment
router.put("/:id", auth, async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.params.id, facultyId: req.user.id },
      req.body,
      { new: true }
    );
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json(assignment);
  } catch (error) {
    console.error("Error updating assignment:", error);
    res.status(500).json({ message: "Error updating assignment" });
  }
});

// Delete an assignment
router.delete("/:id", auth, async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndDelete({
      _id: req.params.id,
      facultyId: req.user.id,
    });
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    console.error("Error deleting assignment:", error);
    res.status(500).json({ message: "Error deleting assignment" });
  }
});

module.exports = router;
