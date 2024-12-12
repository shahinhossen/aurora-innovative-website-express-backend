// Course model structure

Thumbnail Image
Titile
Description
Price
Category
Discount price
classes/videos count
students count //depend on enrollment
course module // array of objects
why choose this course 
course benifit 
minmum requirement for course
course for who
assaigment
students review //array of objects
teachers says
teacher
faq // array of objects


// User Information
Full Name
uername
phone number
password
age
dp

const Course = [
  {
    title: "",
    des: "",
    image: "",
    price: "",
    discount: "",
    category: "',
    classes: "",
    enroll: "",
    module: [
      {title: "Html"},
      {title: "Css"},
      {title: "Javascript"},
      {title: "React"},
      {title: "Node Js"},
    ],
    teacher: {
      id: 2837563902,
      name: ""
    },
    reviews: []
  }
]



routes guide//

// add new skill
/api/v1/skills/add