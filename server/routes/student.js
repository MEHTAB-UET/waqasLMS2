const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const auth = require("../middleware/auth");

// Get student profile
router.get("/:id", auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Error fetching student data" });
  }
});

// Update student profile
router.put("/:id", auth, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Error updating student data" });
  }
});

// Get enrolled courses
router.get("/:id/courses", auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student.enrolledCourses);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ message: "Error fetching enrolled courses" });
  }
});

module.exports = router;
