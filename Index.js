const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const nodemailer = require('nodemailer');
const validator = require("validator")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb+srv://muhibawan:muhibraza@houseofprofessionals.q10d5wg.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB server');
});

// Schema and User Model declaration
const userSchema = new mongoose.Schema({
  Course: String,
  Skeme: String,
  CandidateName: String,
  FatherName: String,
  PermanentAddress: String,
  Email: {
    type:String,
    required:true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `${props.value} is not a valid email address!`,
    },
    trim:true,
    lowercase:true,
    unique:true,
  },  CandidateCNICNumber:{
    type:Number,
    unique:true,
    maxlength:13,
    minlength:13,
    required:true,
  },
  DateOfBirth: String,
  CandidateCellNumber:{
    type:  Number,
    maxlength: 11,
    minlength:11,
    required:true,
  },
  FatherCellNumber: {
    type:  Number,
    maxlength: 11,
    minlength:11,
    required:true,
  },
  Qualification: String,
  Gender: String,
  ApplicationID: String,
  PaymentSlipNumber: String,
  RegistrationDate: String,
  StartingDate: String,
  EndingDate: String,
  Duration: String,
  ClassDaysAWeek: String,
  TotalFees: String,
  PaymentTerms: String,
  FeesReceived: String,
  NumberOfInstallments: String,
  FeesRemaining: String,
  Remarks: String,
});

const User = mongoose.model("web", userSchema);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'muhibulmustafaawan@gmail.com',
    pass: 'kpnt mahr gswh oasq',
  },
});

// Serve index.html by default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
  const {
    Course,
    Skeme,
    CandidateName,
    FatherName,
    PermanentAddress,
    Email,
    CandidateCNICNumber,
    DateOfBirth,
    CandidateCellNumber,
    FatherCellNumber,
    Qualification,
    Gender,
    ApplicationID,
    PaymentSlipNumber,
    RegistrationDate,
    StartingDate,
    EndingDate,
    Duration,
    ClassDaysAWeek,
    TotalFees,
    PaymentTerms,
    FeesReceived,
    NumberOfInstallments,
    FeesRemaining,
    Remarks,
  } = req.body;

  const data = {
    Course,
    Skeme,
    CandidateName,
    FatherName,
    PermanentAddress,
    Email,
    CandidateCNICNumber,
    DateOfBirth,
    CandidateCellNumber,
    FatherCellNumber,
    Qualification,
    Gender,
    ApplicationID,
    PaymentSlipNumber,
    RegistrationDate,
    StartingDate,
    EndingDate,
    Duration,
    ClassDaysAWeek,
    TotalFees,
    PaymentTerms,
    FeesReceived,
    NumberOfInstallments,
    FeesRemaining,
    Remarks,
  };

  const newUser = new User(data);

  newUser.save()
    .then(() => {
      const mailOptions = {
        from: 'muhibulmustafaawan@gmail.com',
        to: Email,
        subject: ' Successful Registration at House Of Professionals',
        html: `
          <p>Dear ${CandidateName},</p>
          <p><b>Congratulations!</b> We are delighted to inform you that your registration at House Of Professionals has been successfully completed. Welcome to our academic community!<br>
            Your commitment to pursuing higher education is commendable, and we believe that your time with us will be both enriching and rewarding. As a registered student, you now have access to a wide array of resources, outstanding faculty, and a supportive environment that will aid you in achieving your academic and personal goals.<br>
          To help you get started, here are some essential details:<br>
          <b>Orientation Program:</b>
          We look forward to hosting an orientation program that will provide you with vital information about the institute, academic expectations, campus facilities, and more. Your attendance is encouraged to ensure a smooth transition into your academic journey.<br>
          <b>Application ID:</b>
Your unique Application ID is ${ApplicationID}. Please make a note of it, as it will serve as an important reference during your time with us.<br>
<b>Class Schedule:</b>
Access your class schedule for the upcoming semester through our user-friendly student portal. If you have any concerns about your schedule, our registrar's office is available to assist you.<br>
         We are excited to have you as part of House Of Professionals, and we are committed to supporting you throughout your educational journey. Should you have any questions or need assistance, feel free to reach out to our student services team.<br>
         Once again, congratulations on your successful registration! Wishing you a fulfilling and successful academic experience.</p>
         <p>Best Regards,<br>
         Management of House Of Professionals.
         </p>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send('Error sending email: ' + error.message);
        }
        console.log('Email sent:', info.response);
        res.send('User saved successfully! Email sent successfully! <br> <a href="/" style="color: black; text-decoration: none; font-weight: bold; margin-top:20px;">Back to Home</a>');
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Server error');
    });
});
console.log("muhib");
const port = process.env.PORT || https://form-hop.vercel.app/;
app.listen(port, () => console.log(`Server running on port ${port}`));
