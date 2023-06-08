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
            officialPhoneNumber: "+111111111111",
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
    //         officialPhoneNumber: "+111111111112",
    //         country: "Egypt",
    //         address: "Cairo, Egypt"
    //     }
    // });

    // Create users
    const bfcaiAdmin = await prisma.user.create({
        data: {
            email: "admin@fci.bu.edu.eg",
            firstName: "Ali",
            lastName: "Kehel",
            phoneNumber: "+111111111119",
            password: bcrypt.hashSync("password" + (SECRET as string), 12),
            role: "ADMIN",
            organization: {
                connect: { subdomain: bfcai.subdomain }
            }
        }
    });

    const bfcaiStudent1 = await prisma.user.create({
        data: {
            email: "student1@fci.bu.edu.eg",
            firstName: "Wagih",
            lastName: "Mohamed",
            phoneNumber: "+121212121212",
            password: bcrypt.hashSync("password" + (SECRET as string), 12),
            role: "STUDENT",
            organization: {
                connect: { subdomain: bfcai.subdomain }
            }
        }
    });

    const bfcaiStudent2 = await prisma.user.create({
        data: {
            email: "student2@fci.bu.edu.eg",
            firstName: "Shawky",
            lastName: "Sobhy",
            phoneNumber: "+131313131313",
            password: bcrypt.hashSync("password" + (SECRET as string), 12),
            role: "STUDENT",
            organization: {
                connect: { subdomain: bfcai.subdomain }
            }
        }
    });

    const bfcaiTeacher1 = await prisma.user.create({
        data: {
            email: "teacher1@fci.bu.edu.eg",
            firstName: "Dr, Ahmed",
            lastName: "Shalaby",
            phoneNumber: "+141414141414",
            password: bcrypt.hashSync("password" + (SECRET as string), 12),
            role: "TEACHER",
            organization: {
                connect: { subdomain: bfcai.subdomain }
            }
        }
    });

    const bfcaiTeacher2 = await prisma.user.create({
        data: {
            email: "teacher2@fci.bu.edu.eg",
            firstName: "Dr, Ahmed",
            lastName: "Taha",
            phoneNumber: "+151515151515",
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
            startTime: "2023-02-12T09:00:00Z",
            endTime: "2023-02-12T10:00:00Z",
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
            startTime: "2023-02-12T09:00:00Z",
            endTime: "2023-02-12T10:00:00Z",
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
            startTime: "2023-02-12T09:00:00Z",
            endTime: "2023-02-12T10:00:00Z",
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
            startTime: "2023-02-12T09:00:00Z",
            endTime: "2023-02-12T10:00:00Z",
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
            startTime: "2023-02-12T09:00:00Z",
            endTime: "2023-02-12T10:00:00Z",
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
            startTime: "2023-02-12T09:00:00Z",
            endTime: "2023-02-12T10:00:00Z",
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
            startTime: "2023-02-12T09:00:00Z",
            endTime: "2023-02-12T10:00:00Z",
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
            startTime: "2023-02-12T09:00:00Z",
            endTime: "2023-02-12T10:00:00Z",
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
