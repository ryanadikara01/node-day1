var router = require("express").Router();


const classes = [
	{
		id: 1,
		name: "X",
		students: [{ name: "Ujang" }, { name: "Dadang" }, { name: "Maman" }],
	},
	{
		id: 2,
		name: "XI",
		students: [{ name: "Dian" }, { name: "Andre" }, { name: "Lukas" }],
	},
	{
		id: 3,
		name: "XII",
		students: [{ name: "Ardhi" }, { name: "Aji" }, { name: "Lanang" }],
	},
];

router.get("/classes/:classId/students/:studentId", (req, res) => {

   let classId = req.params.classId;
   let studentId = req.params.studentId;
   
   let classRoom = classes[classId];
   let student = classRoom.students[studentId];
   
   res.send({name:student.name, class: classRoom.name});
	// res.send(req.params);
});

//Add Student
router.get("/classes/:classId/students", (req, res) => {

	 let classId = req.params.classId;

	 let classRoom = classes[classId];
	 let students = classRoom.students;

	 res.send(students);
	
});

router.post("/classes/:classId/students", (req, res) => {

	let classId = req.params.classId;
	let student = req.body;
	let classRoom = classes[classId];
	
	classRoom.students.push(student);

	res.send(student);
	
   
});

//--
// Add Class
/*
app.get("/classes", (req, res) => {

	res.send(classes);
});
*/
router.post("/classes",(req, res, next)=>{
	let newClassRoom = req.body;
	let className = newClassRoom.name;
	let classId = newClassRoom.id;

	res.send({className});
}); 

module.exports = router;