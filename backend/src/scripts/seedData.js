const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Activity = require('../models/Activity');
const Job = require('../models/Job');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Activity.deleteMany({});
    await Job.deleteMany({});
    console.log('Cleared existing data');

    const hashedPassword = await bcrypt.hash('password123', 10);

    const student = await User.create({
      name: 'John Student',
      email: 'student@test.com',
      password: hashedPassword,
      role: 'student',
      rollNumber: '2024001',
      department: 'Computer Science',
      year: 3,
      cgpa: 8.5
    });

    const faculty = await User.create({
      name: 'Jane Faculty',
      email: 'faculty@test.com',
      password: hashedPassword,
      role: 'faculty',
      department: 'Computer Science'
    });

    const recruiter = await User.create({
      name: 'Tech Recruiter',
      email: 'recruiter@test.com',
      password: hashedPassword,
      role: 'recruiter',
      company: 'Tech Corp'
    });

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('✅ Users created');

    await Activity.create([
      {
        student: student._id,
        title: 'AWS Cloud Practitioner Certification',
        category: 'Certification',
        date: new Date('2024-01-15'),
        level: 'International',
        description: 'Completed AWS Cloud Practitioner certification',
        certificateUrl: 'aws_cert.pdf',
        status: 'Pending'
      },
      {
        student: student._id,
        title: 'Hackathon Winner',
        category: 'Competition',
        date: new Date('2024-02-01'),
        level: 'National',
        description: 'Won first prize in national hackathon',
        certificateUrl: 'hackathon.pdf',
        status: 'Pending'
      }
    ]);

    console.log('✅ Activities created');

    await Job.create([
      {
        recruiter: recruiter._id,
        title: 'Software Engineer Intern',
        company: 'Tech Corp',
        location: 'Bangalore',
        type: 'Internship',
        description: 'Looking for talented interns',
        requirements: ['JavaScript', 'React', 'Node.js'],
        salary: '30000-40000',
        deadline: new Date('2024-12-31')
      }
    ]);

    console.log('✅ Jobs created');
    console.log('\n========================================');
    console.log('✅ Database seeded successfully!');
    console.log('========================================');
    console.log('\nTest Credentials:');
    console.log('Student:   student@test.com / password123');
    console.log('Faculty:   faculty@test.com / password123');
    console.log('Recruiter: recruiter@test.com / password123');
    console.log('Admin:     admin@test.com / password123');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
