const mongoose = require("mongoose");

const enrolledCourseSchema = new mongoose.Schema({
  courseCode: String,
  courseName: String,
  grade: String,
  status: {
    type: String,
    enum: ["active", "completed", "dropped"],
    default: "active",
  },
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  cgpa: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  contactInfo: {
    phone: String,
    address: String,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  enrolledCourses: [enrolledCourseSchema],
});

module.exports = mongoose.model("Student", studentSchema);
