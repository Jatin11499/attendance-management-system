const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

const port = process.env.PORT || 3000;
const connection_url = `mongodb+srv://Jatin11499:a1b2c344@cluster0.jli1k.mongodb.net/oamDB?retryWrites=true&w=majority`;

mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const studentSchema = new mongoose.Schema({
    email: String,
    fullname: String,
    rollno: String,
    password: String,
    mobileno: String,
    branch: String,
    year: String,
    semester: String,
    group: String
});

const Student = new mongoose.model("student",studentSchema);

const teacherSchema = new mongoose.Schema({
    email: String,
    fullname: String,
    teacherid: String,
    password: String,
    mobileno: String,
    subjects: [String]
});

const Teacher = new mongoose.model("teacher",teacherSchema);

const attendanceSchema = new mongoose.Schema({
    rollno: String,
    studentname: String,
    attendancestatus: String,
    date: Date,
    periodtime: String,
    subjectname: String,
    branch: String
});

const Attendance = new mongoose.model("attendance",attendanceSchema);

const timeTableSchema = new mongoose.Schema({
    Branch: String,
    Semester: String,
    Group: String,
    PeriodTime: [String],
    Monday: [String],
    Tuesday: [String],
    Wednesday: [String],
    Thursday: [String],
    Friday: [String],
    Saturday: [String]
});

const TimeTable = new mongoose.model("timetable",timeTableSchema);

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Admin = new mongoose.model("admin",adminSchema);

const syllabusSchema = new mongoose.Schema({
    year: String,
    semester: String,
    branch: String,
    subjectname: String,
    done: [String],
    notdone: [String]
});

const Syllabus = new mongoose.model("syllabus",syllabusSchema);

let weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

app.get("/",function(req,res){
    res.render('Home');
});

app.get("/ChoiceA",function(req,res){
    res.render('ChoiceA');
});

app.get("/ChoiceT",function(req,res){
    res.render('ChoiceT');
});

app.get("/ChoiceS",function(req,res){
    res.render('ChoiceS');
});

app.get("/AdminLogin",function(req,res){
    res.render('AdminLogin');
});

app.post("/AdminLogin",function(req,res){
    const u = req.body.username;
    const p = req.body.password;
    Admin.findOne(function(err,data){
        if(!err){
            if(u==data.username && p==data.password){
                res.redirect("/AdminHome");
            }
            else{
                res.redirect("/AdminLogin");
            }
        }
    });
});

app.get("/TeacherLogin",function(req,res){
    res.render('TeacherLogin');
});

app.post("/TeacherLogin",function(req,res){
    Teacher.findOne(req.body, function(err,data){
        if(!err){
            if(data)
                res.redirect("/TeacherHome?teacherid="+data.teacherid);
            else
                res.redirect("/TeacherLogin");
        }
    })
});

app.get("/StudentLogin",function(req,res){
    res.render('StudentLogin');
});

app.post("/StudentLogin",function(req,res){
    Student.findOne(req.body, function(err,data){
        if(!err){
            if(data)
                res.redirect("/StudentHome?rollno="+data.rollno);
            else
                res.redirect("/StudentLogin");
                
        }
    });
});

app.get("/StudentRegister",function(req,res){
    res.render('StudentRegister');
});

app.post("/StudentRegister",function(req,res){
    Student.findOne({rollno: req.body.rollno}, function(err,data){
        if(!err){
            if(!data){
                Student.create(req.body,function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.redirect("/StudentHome?rollno="+req.body.rollno);
                    }
                });
            }
            else{
                res.redirect("/StudentLogin");
            }
        }
    });
});

app.get("/TeacherRegister",function(req,res){
    res.render('TeacherRegister');
});

app.post("/TeacherRegister",function(req,res){
    Teacher.findOne({teacherid: req.body.teacherid}, function(err,data){
        if(!err){
            if(!data){
                Teacher.create(req.body,function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.redirect("/TeacherHome?teacherid="+req.body.teacherid);
                    }
                });
            }
            else{
                res.redirect("/TeacherLogin");
            }
        }
    });
});

app.get("/StudentHome",function(req,res){
    const rn = req.query.rollno;
    Student.findOne({rollno : rn}, function(err, data){
        if(!err){
            res.render("StudentHome",{
                fullname: data.fullname,
                rollno: rn
            });
        }
    });
});

app.get("/TeacherHome",function(req,res){
    const ti = req.query.teacherid;
    Teacher.findOne({teacherid : ti}, function(err, data){
        if(!err){
            res.render("TeacherHome",{
                fullname: data.fullname,
                teacherid: ti
            });
        }
    });
});

app.get("/AdminHome",function(req,res){
    res.render("AdminHome");
});

app.get("/StudentSchedule",function(req,res){
    let b = "";
    let s = "";
    let g = "";
    const rn = req.query.rollno;

    Student.findOne({rollno : rn}, function(err,data){
        if(!err){
            b=data.branch;
            s=data.semester;
            g=data.group;

            TimeTable.findOne({Branch : b, Semester : s, Group : g}, function(err,data){
                if(!err){
                    let d = new Date();
                    let n = d.getDay();
                    let day = weekday[n];
                    let date = d.getDate();
                    let month = d.getMonth()+1;
                    let year = d.getFullYear();
                    let fullDate = date+"/"+month+"/"+year;
                    let classes = [];
                    if(n==1)
                        classes=data.Monday;
                    else if(n==2)
                        classes=data.Tuesday;
                    else if(n==3)
                        classes=data.Wednesday;
                    else if(n==4)
                        classes=data.Thursday;
                    else if(n==5)
                        classes=data.Friday;
                    else if(n==6)
                        classes=data.Saturday;

                    Attendance.find({rollno : rn},function(err,data1){
                        if(!err){
                            res.render("StudentSchedule",{
                                day: day,
                                PeriodTime: data.PeriodTime,
                                classes: classes,
                                date: fullDate,
                                rollno: rn,
                                attend: data1,
                                branch: b
                            });
                        }
                    });
                }
            }); 
        }
    });
});

app.post("/StudentSchedule",function(req,res){
    const rn = req.query.rollno;
    const pt = req.query.periodtime;
    const cn = req.query.classname;
    const b = req.query.branch;
    const d = new Date();
    const st = "pending";
    Student.findOne({rollno : rn}, function(err,data){
        if(!err){
            const fn = data.fullname;

            Attendance.create({
                rollno: rn,
                studentname: fn,
                attendancestatus: st,
                date: d,
                periodtime: pt,
                subjectname: cn,
                branch: b
            },function(err){
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect("/StudentSchedule?rollno="+rn);
                }
            });
        }
    });
});

app.get("/StudentViewAttendance",function(req,res){
    const rn = req.query.rollno;

    Student.findOne({rollno : rn}, function(err,data){
        if(!err){
            b=data.branch;
            s=data.semester;
            g=data.group;

            TimeTable.findOne({Branch : b, Semester : s, Group : g}, function(err,data1){
                if(!err){
                    Attendance.find({rollno : rn, attendancestatus : "confirmed"},function(err,data2){
                        if(!err){
                            for(let i=0;i<data2.length;i++){
                                if(data2[i].date.getMonth()!=6){
                                    data2.splice(i, 1);
                                }
                            }
                            
                            res.render("StudentViewAttendance",{
                                rollno: rn,
                                tt: data1,
                                att: data2
                            });
                        }
                    });
                }
            }); 
        }
    });
});

app.get("/StudentClass",function(req,res){
    const rn = req.query.rollno;

    Student.findOne({rollno : rn}, function(err1,data1){
        if(!err1){
            Student.find({branch: data1.branch, semester: data1.semester}, function(err2,data2){
                if(!err2){
                    data2.sort((a,b) => (a.rollno > b.rollno) ? 1 : ((b.rollno > a.rollno) ? -1 : 0))
                    res.render("StudentClass",{
                        rollno: rn,
                        semester: data1.semester,
                        year: data1.year,
                        branch: data1.branch,
                        classmates: data2
                    });
                } 
            });
        }
    });
});

app.get("/AdminAddStudent",function(req,res){
    res.render("AdminAddStudent");
});

app.post("/AdminAddStudent",function(req,res){
    Student.create(req.body,function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/AdminAddStudent");
        }
    });
});

app.get("/AdminAddTeacher",function(req,res){
    res.render("AdminAddTeacher");
});

app.post("/AdminAddTeacher",function(req,res){
    Teacher.create(req.body,function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/AdminAddTeacher");
        }
    });
});

app.get("/AdminAssignTeacher",function(req,res){
    Teacher.find(function(err,data){
        res.render("AdminAssignTeacher",{data : data});
    });
});

app.post("/AdminAssignTeacher",function(req,res){
    const tn = req.body.teacherName;
    const sn = req.body.subjectName;

    Teacher.findOne({fullname : tn}, function(err,data){
        if(!err){
            data.subjects.push(sn);
            data.save();
        }
    });

    res.redirect("/AdminAssignTeacher");
});

app.get("/AdminChangePass",function(req,res){
    Admin.findOne(function(err,data){
        if(!err){
            res.render("AdminChangePass",{
                oldpass : data.password
            });  
        }
    });
});

app.post("/AdminChangePass",function(req,res){
    const np = req.body.psw;
    
    Admin.findOne(function(err,data){
        if(!err){
            data.password=np;
            data.save();
            res.redirect("/AdminChangePass");
        }
    });
});

app.get("/AboutUsA",function(req,res){
    res.render("AboutUsA");
});

app.get("/AboutUsS",function(req,res){
    const rn = req.query.rollno;
    res.render("AboutUsS",{rollno : rn});
});

app.get("/AboutUsT",function(req,res){
    const ti = req.query.teacherid;
    res.render("AboutUsT",{teacherid : ti});
});

app.get("/ContactUsA",function(req,res){
    res.render("ContactUsA");
});

app.get("/ContactUsS",function(req,res){
    const rn = req.query.rollno;
    res.render("ContactUsS",{rollno : rn});
});

app.get("/ContactUsT",function(req,res){
    const ti = req.query.teacherid;
    res.render("ContactUsT",{teacherid : ti});
});

app.get("/Logout",function(req,res){
    res.redirect("/");
});

app.get("/TeacherSubjects",function(req,res){
    const ti = req.query.teacherid;

    Teacher.findOne({teacherid : ti}, function(err,data){
        if(!err){
            res.render("TeacherSubjects",{
                teacherid: ti,
                subs: data.subjects
            });
                
        }
    });
});

app.get("/TeacherTakeAttendance",function(req,res){
    const ti = req.query.teacherid;

    Teacher.findOne({teacherid : ti}, function(err,data){
        if(!err){
            let arr = data.subjects;
            Attendance.find({subjectname : arr, attendancestatus : "pending"}, function(err,data1){
                if(!err){
                    res.render("TeacherTakeAttendance",{
                        teacherid: ti,
                        attend: data1
                    });
                }
            });
        }
    });
});

app.post("/TeacherTakeAttendance",function(req,res){
    const ti = req.query.teacherid;
    const id = req.query._id;
    const status = req.query.status;

    Attendance.findOne({_id : id}, function(err,data){
        if(!err){
            data.attendancestatus=status;
            data.save();
            res.redirect("/TeacherTakeAttendance?teacherid="+ti);
        }
    });
});

app.get("/TeacherViewAttendance",function(req,res){
    const ti = req.query.teacherid;

    Teacher.findOne({teacherid : ti}, function(err,data){
        if(!err){
            let arr = data.subjects;
            Attendance.find({subjectname : arr, attendancestatus : "confirmed"}, function(err,data2){
                if(!err){
                    res.render("TeacherViewAttendance",{
                        teacherid: ti,
                        att: data2
                    });
                }
            });
        }
    });
});

app.get("/TeacherUpdateProfile",function(req,res){
    const ti = req.query.teacherid;

    Teacher.findOne({teacherid : ti}, function(err,data){
        if(!err){
            res.render("TeacherUpdateProfile",{
                email: data.email,
                fullname: data.fullname,
                teacherid: ti,
                mobileno: data.mobileno
            });
        }
    });
});

app.post("/TeacherUpdateProfile",function(req,res){
    const ti = req.query.teacherid;
    const nemail = req.body.email;
    const nfullname = req.body.fullname;
    const nteacherid = req.body.teacherid;
    const nmobileno = req.body.mobileno;

    Teacher.findOne({teacherid : ti}, function(err,data){
        if(!err){
            data.email=nemail;
            data.fullname=nfullname;
            data.teacherid=nteacherid;
            data.mobileno=nmobileno;
            data.save();
            res.redirect("/TeacherUpdateProfile?teacherid="+nteacherid);
        }
    });
});

app.get("/StudentChangePass",function(req,res){
    const rn = req.query.rollno;

    Student.findOne({rollno : rn}, function(err,data){
        if(!err){
            res.render("StudentChangePass",{
                rollno: rn,
                oldpass: data.password
            });
        }
    });
});

app.post("/StudentChangePass",function(req,res){
    const rn = req.query.rollno;
    const np = req.body.psw;

    Student.findOne({rollno : rn}, function(err,data){
        if(!err){
            data.password=np;
            data.save();
            res.redirect("/StudentChangePass?rollno="+rn);
        }
    });
});

app.get("/TeacherChangePass",function(req,res){
    const ti = req.query.teacherid;

    Teacher.findOne({teacherid : ti}, function(err,data){
        if(!err){
            res.render("TeacherChangePass",{
                teacherid: ti,
                oldpass: data.password
            });
        }
    });
});

app.post("/TeacherChangePass",function(req,res){
    const ti = req.query.teacherid;
    const np = req.body.psw;

    Teacher.findOne({teacherid : ti}, function(err,data){
        if(!err){
            data.password=np;
            data.save();
            res.redirect("/TeacherChangePass?teacherid="+ti);
        }
    });
});

app.get("/StudentUpdateProfile",function(req,res){
    const rn = req.query.rollno;

    Student.findOne({rollno : rn}, function(err,data){
        if(!err){
            res.render("StudentUpdateProfile",{
                email: data.email,
                fullname: data.fullname,
                rollno: rn,
                mobileno: data.mobileno
            });
        }
    });
});

app.post("/StudentUpdateProfile",function(req,res){
    const rn = req.query.rollno;
    const nemail = req.body.email;
    const nfullname = req.body.fullname;
    const nrollno = req.body.rollno;
    const nmobileno = req.body.mobileno;

    Student.findOne({rollno : rn}, function(err,data){
        if(!err){
            data.email=nemail;
            data.fullname=nfullname;
            data.rollno=nrollno;
            data.mobileno=nmobileno;
            data.save();
            res.redirect("/StudentUpdateProfile?rollno="+nrollno);
        }
    });
});

app.get("/TeacherSyllabus",function(req,res){
    const ti = req.query.teacherid;

    Teacher.findOne({teacherid : ti}, function(err,data){
        if(!err){
            Syllabus.find({subjectname: data.subjects}, function(err,data1){
                if(!err){
                    res.render("TeacherSyllabus",{
                        teacherid : ti,
                        syl : data1
                    });
                }
            });
        }
    });
});

app.post("/TeacherSyllabusDone",function(req,res){
    const ti = req.query.teacherid;
    const sub = req.query.subjectname;
    const topic = req.query.topicname;
    Syllabus.findOne({subjectname: sub}, function(err,data){
        if(!err){
            data.notdone.unshift(topic);
            const i = data.done.indexOf(topic);
            data.done.splice(i, 1);
            data.save();
            res.redirect("/TeacherSyllabus?teacherid="+ti);
        }
    });
});

app.post("/TeacherSyllabusNotDone",function(req,res){
    const ti = req.query.teacherid;
    const sub = req.query.subjectname;
    const topic = req.query.topicname;
    Syllabus.findOne({subjectname: sub}, function(err,data){
        if(!err){
            data.done.push(topic);
            const i = data.notdone.indexOf(topic);
            data.notdone.splice(i, 1);
            data.save();
            res.redirect("/TeacherSyllabus?teacherid="+ti);
        }
    });
});

app.get("/StudentSyllabus",function(req,res){
    const rn = req.query.rollno;
    let y="";
    let b="";
    let s="";

    Student.findOne({rollno : rn}, function(err,data){
        if(!err){
            y=data.year;
            b=data.branch;
            s=data.semester;
            Syllabus.find({year: y, semester: s, branch: ['both',b]}, function(err,data2){
                if(!err){
                    res.render("StudentSyllabus",{
                        rollno : rn,
                        syl : data2
                    });
                }
            });
        }
    });
});

app.get("/AdminUpdateSyllabus",function(req,res){
    res.render("AdminUpdateSyllabus");
});

app.post("/AdminUpdateSyllabus",function(req,res){
    const y = req.body.year;
    const sem = req.body.semester;
    const b = req.body.branch;
    const sub = req.body.subjectName;
    const t = req.body.topics;
    const tarr = t.split(";");

    Syllabus.findOne({year: y, semester: sem, branch: b, subjectname: sub}, function(err,data){
        if(!err){
            if(data){
                data.notdone=data.notdone.concat(tarr);
                data.save();
                res.redirect("/AdminUpdateSyllabus");
            }
            else{
                Syllabus.create({
                    year: y,
                    semester: sem,
                    branch: b,
                    subjectname: sub,
                    done: [],
                    notdone: tarr
                },function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.redirect("/AdminUpdateSyllabus");
                    }
                });
            }
        }
    });
});

app.listen(port,function(){
    console.log("Server has started successfully!");
});