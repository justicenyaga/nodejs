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

// QUERY FIRST
// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if (!course) return;

//   course.isPublished = true;
//   course.author = "Another Author";

//   const result = await course.save();
//   console.log(result);
// }

//UPDATE FIRST
async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Justice Kimemia",
        isPublished: true,
      },
    },
    { new: true }
  );

  console.log(course);
}

async function deleteCourse(id) {
  // const result = await Course.deleteOne({ _id: id });
  // const result = await Course.deleteMany({filterObject}) // filterObject => {isPublished: false}
  const course = await Course.findByIdAndDelete(id);
  // const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

deleteCourse("658c5d099974bec0ea15cb19");
