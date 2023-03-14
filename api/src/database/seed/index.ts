import { PrismaClient } from "@prisma/client";
import Courses from "./data/courses";
import CoursesSections from "./data/courses-sections";
import Organizations from "./data/organizations";
import Users from "./data/users";

const prisma = new PrismaClient();

async function runSeeders() {
    // Users
    await Promise.all(
        Users.map(async (user) =>
            prisma.user.upsert({
                where: { id: user.id },
                update: {},
                create: user
            })
        )
    );

    // Organizations
    await Promise.all(
        Organizations.map(async (organization) =>
            prisma.organization.upsert({
                where: { id: organization.id },
                update: {},
                create: organization
            })
        )
    );

    // Courses
    // await Promise.all(
    //     Courses.map(async (course) =>
    //         prisma.course.upsert({
    //             where: { id: course.id },
    //             update: {},
    //             create: course
    //         })
    //     )
    // );
    Courses.forEach(async (course) => {
        await prisma.course.upsert({
            where: { id: course.id },
            update: {},
            create: course
        });
    });

    // CoursesSections
    await Promise.all(
        CoursesSections.map(async (courseSection) =>
            prisma.courseSection.upsert({
                where: { id: courseSection.id },
                update: {},
                create: courseSection
            })
        )
    );
}

runSeeders()
    .catch((e) => {
        console.error(`There was an error while seeding: ${e}`);
        process.exit(1);
    })
    .finally(async () => {
        console.log("Successfully seeded database. Closing connection.");
        await prisma.$disconnect();
    });
