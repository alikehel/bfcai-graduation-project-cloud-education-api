/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SECRET } from "../../config/config";
import { dspExam1, introToCSExam1, iotExam1, oopExam1 } from "./data/exams";

const prisma = new PrismaClient();

async function seed() {
    // Create organizations
    const bfcai = await prisma.organization.create({
        data: {
            name: "Benha University, Faculty of Computers & Artificial Intelligence",
            type: "University",
            emailDomain: "fci.bu.edu.eg",
            subdomain: "bfcai",
            officialPhoneNumber: "+201111111111",
            country: "Egypt",
            address: "Benha, Egypt"
        }
    });

    // const cfcai = await prisma.organization.create({
    //     data: {
    //         name: "Cairo University, Faculty of Computers & Artificial Intelligence",
    //         type: "University",
    //         emailDomain: "fci.cu.edu.eg",
    //         subdomain: "cfcai",
    //         officialPhoneNumber: "+201111111112",
    //         country: "Egypt",
    //         address: "Cairo, Egypt"
    //     }
    // });

    // Create users
    const bfcaiAdmin = await prisma.user.create({
        data: {
            id: "00ea6784-4626-4b49-aa88-02f46afd30d0",
            email: "admin@fci.bu.edu.eg",
            firstName: "Ali",
            lastName: "Kehel",
            phoneNumber: "+201111111119",
            password: bcrypt.hashSync("password" + (SECRET as string), 12),
            role: "ADMIN",
            organization: {
                connect: { subdomain: bfcai.subdomain }
            }
        }
    });

    const bfcaiStudent1 = await prisma.user.create({
        data: {
            id: "4dc8b81b-c33b-4d16-8c70-0a981c3c97f4",
            email: "student1@fci.bu.edu.eg",
            firstName: "Wagih",
            lastName: "Mohamed",
            phoneNumber: "+201212121212",
            password: bcrypt.hashSync("password" + (SECRET as string), 12),
            role: "STUDENT",
            organization: {
                connect: { subdomain: bfcai.subdomain }
            }
        }
    });

    const bfcaiStudent2 = await prisma.user.create({
        data: {
            id: "8a37bf2a-6f47-419f-b85d-de7c65b921e3",
            email: "student2@fci.bu.edu.eg",
            firstName: "Shawky",
            lastName: "Sobhy",
            phoneNumber: "+201313131313",
            password: bcrypt.hashSync("password" + (SECRET as string), 12),
            role: "STUDENT",
            organization: {
                connect: { subdomain: bfcai.subdomain }
            }
        }
    });

    const bfcaiTeacher1 = await prisma.user.create({
        data: {
            id: "e129249e-4ea3-426b-9a36-91de6811224b",
            email: "teacher1@fci.bu.edu.eg",
            firstName: "Dr. Ahmed",
            lastName: "Shalaby",
            phoneNumber: "+201414141414",
            password: bcrypt.hashSync("password" + (SECRET as string), 12),
            role: "TEACHER",
            organization: {
                connect: { subdomain: bfcai.subdomain }
            }
        }
    });

    const bfcaiTeacher2 = await prisma.user.create({
        data: {
            id: "7fcd59ce-6763-4a1e-b714-da4fc16a632c",
            email: "teacher2@fci.bu.edu.eg",
            firstName: "Dr. Ahmed",
            lastName: "Taha",
            phoneNumber: "+201515151515",
            password: bcrypt.hashSync("password" + (SECRET as string), 12),
            role: "TEACHER",
            organization: {
                connect: { subdomain: bfcai.subdomain }
            }
        }
    });

    // Create courses
    const bfcaiTeacher1Course1 = await prisma.course.create({
        data: {
            name: "Internet of Things",
            description: "This is a course about Internet of Things",
            code: "cs405",
            isActive: true,
            category: "Computer Science",
            organization: {
                connect: { subdomain: bfcai.subdomain }
            },
            users: {
                connect: { id: bfcaiStudent1.id }
            },
            owner: {
                connect: { id: bfcaiTeacher1.id }
            }
        }
    });

    const bfcaiTeacher1Course2 = await prisma.course.create({
        data: {
            name: "Digital Signal Processing",
            description: "This is a course about Digital Signal Processing",
            code: "cs406",
            isActive: true,
            category: "Computer Science",
            organization: {
                connect: { subdomain: bfcai.subdomain }
            },
            users: {
                connect: { id: bfcaiStudent2.id }
            },
            owner: {
                connect: { id: bfcaiTeacher1.id }
            }
        }
    });

    const bfcaiTeacher2Course1 = await prisma.course.create({
        data: {
            name: "Intoduction to Computer Science",
            description:
                "This is a course about Intoduction to Computer Science",
            code: "cs101",
            isActive: true,
            category: "Computer Science",
            organization: {
                connect: { subdomain: bfcai.subdomain }
            },
            users: {
                connect: { id: bfcaiStudent1.id }
            },
            owner: {
                connect: { id: bfcaiTeacher2.id }
            }
        }
    });

    const bfcaiTeacher2Course2 = await prisma.course.create({
        data: {
            name: "Object Oriented Programming",
            description: "This is a course about Object Oriented Programming",
            code: "cs102",
            isActive: true,
            category: "Computer Science",
            organization: {
                connect: { subdomain: bfcai.subdomain }
            },
            users: {
                connect: { id: bfcaiStudent2.id }
            },
            owner: {
                connect: { id: bfcaiTeacher2.id }
            }
        }
    });

    // Create exams
    const bfcaiTeacher1Course1Exam1 = await prisma.exam.create({
        data: {
            name: "Internet of Things Exam 1",
            description: "This is an exam about Internet of Things",
            duration: 60,
            startTime: "2023-01-01",
            endTime: "2023-12-31",
            course: {
                connect: { id: bfcaiTeacher1Course1.id }
            },
            questions: JSON.stringify(iotExam1)
        }
    });

    const bfcaiTeacher1Course1Exam2 = await prisma.exam.create({
        data: {
            name: "Internet of Things Exam 2",
            description: "This is an exam about Internet of Things",
            duration: 60,
            startTime: "2023-01-01",
            endTime: "2023-12-31",
            course: {
                connect: { id: bfcaiTeacher1Course1.id }
            },
            questions: JSON.stringify(iotExam1)
        }
    });

    const bfcaiTeacher1Course2Exam1 = await prisma.exam.create({
        data: {
            name: "Digital Signal Processing Exam 1",
            description: "This is an exam about Digital Signal Processing",
            duration: 60,
            startTime: "2023-01-01",
            endTime: "2023-12-31",
            course: {
                connect: { id: bfcaiTeacher1Course2.id }
            },
            questions: JSON.stringify(dspExam1)
        }
    });

    const bfcaiTeacher1Course2Exam2 = await prisma.exam.create({
        data: {
            name: "Digital Signal Processing Exam 2",
            description: "This is an exam about Digital Signal Processing",
            duration: 60,
            startTime: "2023-01-01",
            endTime: "2023-12-31",
            course: {
                connect: { id: bfcaiTeacher1Course2.id }
            },
            questions: JSON.stringify(dspExam1)
        }
    });

    const bfcaiTeacher2Course1Exam1 = await prisma.exam.create({
        data: {
            name: "Introduction to Computer Science Exam 1",
            description:
                "This is an exam about Introduction to Computer Science",
            duration: 60,
            startTime: "2023-01-01",
            endTime: "2023-12-31",
            course: {
                connect: { id: bfcaiTeacher2Course1.id }
            },
            questions: JSON.stringify(introToCSExam1)
        }
    });

    const bfcaiTeacher2Course1Exam2 = await prisma.exam.create({
        data: {
            name: "Introduction to Computer Science Exam 2",
            description:
                "This is an exam about Introduction to Computer Science",
            duration: 60,
            startTime: "2023-01-01",
            endTime: "2023-12-31",
            course: {
                connect: { id: bfcaiTeacher2Course1.id }
            },
            questions: JSON.stringify(introToCSExam1)
        }
    });

    const bfcaiTeacher2Course2Exam1 = await prisma.exam.create({
        data: {
            name: "Object Oriented Programming Exam 1",
            description: "This is an exam about Object Oriented Programming",
            duration: 60,
            startTime: "2023-01-01",
            endTime: "2023-12-31",
            course: {
                connect: { id: bfcaiTeacher2Course2.id }
            },
            questions: JSON.stringify(oopExam1)
        }
    });

    const bfcaiTeacher2Course2Exam2 = await prisma.exam.create({
        data: {
            name: "Object Oriented Programming Exam 2",
            description: "This is an exam about Object Oriented Programming",
            duration: 60,
            startTime: "2023-01-01",
            endTime: "2023-12-31",
            course: {
                connect: { id: bfcaiTeacher2Course2.id }
            },
            questions: JSON.stringify(oopExam1)
        }
    });

    console.log("Seed completed successfully");
}

seed()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
