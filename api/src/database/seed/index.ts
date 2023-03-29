import { PrismaClient } from "@prisma/client";
import Courses from "./data/courses";
import CoursesSections from "./data/courses-sections";
import Organizations from "./data/organizations";
import Users from "./data/users";

const prisma = new PrismaClient();

async function runSeeders() {
    await Promise.all(
        Organizations.map(async (organization) =>
            prisma.organization.upsert({
                where: { subdomain: organization.subdomain },
                update: {},
                create: organization
            })
        )
    );
    // await prisma.organization.createMany({ data: Organizations });
    console.log(`------------------`);
    console.log("Created the organizations");
    console.log(`------------------`);

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
    console.log(`------------------`);
    console.log("Created the users");
    console.log(`------------------`);

    // Courses
    await Promise.all(
        Courses.map(async (course) =>
            prisma.course.upsert({
                where: { id: course.id },
                update: {},
                create: course
            })
        )
    );
    console.log(`------------------`);
    console.log("Created the courses");
    console.log(`------------------`);

    // Courses.forEach(async (course) => {
    //     const result = await prisma.course.upsert({
    //         where: { id: course.id },
    //         update: {},
    //         create: course
    //     });
    //     console.log(`------------------`);
    //     console.log(`Created course: ${result.name}`);
    //     console.log(`------------------`);
    // });

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
    console.log(`------------------`);
    console.log("Created the courses sections");
    console.log(`------------------`);

    // CoursesSections.forEach(async (courseSection) => {
    //     const result = await prisma.courseSection.upsert({
    //         where: { id: courseSection.id },
    //         update: {},
    //         create: courseSection
    //     });
    //     console.log(`------------------`);
    //     console.log(
    //         `Created course section for the course id: ${result.courseId}`
    //     );
    //     console.log(`------------------`);
    // });
}

runSeeders()
    .then(async () => {
        console.log("Successfully seeded database. Closing connection.");
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(`There was an error while seeding: ${e}`);
        await prisma.$disconnect();
        process.exit(1);
    });
