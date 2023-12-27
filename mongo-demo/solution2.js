const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log("Could not connect to MongoDB...", error));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  tags: [String],
  data: Date,
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({
    isPublished: true,
    // tags: { $in: ["backend", "frontend"] },  // Or alternative
  })
    .or([{ tags: "backend" }, { tags: "frontend" }]) // In alternative
    .sort("-price")
    .select("name author");
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
