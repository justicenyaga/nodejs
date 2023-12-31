const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log("Could not connect to MongoDB...", error));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    // uppercase: true,
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (value) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Do some async work
            resolve(value && value.length > 0);
          }, 1000);
        });
      },
      message: "A course should have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    min: 15,
    max: 200,
    required: function () {
      return this.isPublished;
    },
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    category: "Web",
    author: "Justice Nyaga",
    tags: ["frontend"],
    isPublished: true,
    price: 15.8,
  });

  try {
    // await course.validate();
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
}

async function getCourses() {
  try {
    const result = await Course.find({
      _id: "658d5366fbe35e58269bfd08",
    })
      .limit(10)
      .sort({ name: 1 })
      .select({ name: 1, tags: 1, price: 1 });
    console.log(result[0].price);
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

// deleteCourse("658c5d099974bec0ea15cb19");

getCourses();
