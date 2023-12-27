const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log("Could not connect to MongoDB...", error));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  try {
    const course = new Course({
      name: "Angular Course",
      author: "Justice Nyaga",
      tags: ["angular", "frontend"],
      isPublished: true,
    });

    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

async function getCourses() {
  try {
    const result = await Course.find({
      author: "Justice Nyaga",
      isPublished: true,
    })
      .limit(10)
      .sort({ name: 1 })
      .select({ name: 1, tags: 1 });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "Another Author";

  const result = await course.save();
  console.log(result);
}

updateCourse("658c23cc0f0d5507e5723b9b");
