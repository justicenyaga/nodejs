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

createCourse();
