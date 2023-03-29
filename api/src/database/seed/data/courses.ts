import { Prisma } from "@prisma/client";

export default [
    {
        id: "1",
        name: "Introduction to Computer Science",
        description: "An introductory course on computer science.",
        code: "CS101",
        isActive: true,
        category: "CS",
        organization: {
            // Benha University
            connect: { subdomain: "bfcai" }
        },
        users: {
            connect: { id: "1" }
        }
    },
    {
        id: "2",
        name: "Internet Of Things",
        description: "An introductory course on IOT.",
        code: "CS401",
        isActive: true,
        category: "CS",
        organization: {
            // Benha University
            connect: { subdomain: "bfcai" }
        }
    },
    {
        id: "3",
        name: "Introduction to Databases",
        description: "An introductory course on databases.",
        code: "IS201",
        isActive: true,
        category: "IS",
        organization: {
            // Cairo University
            connect: { subdomain: "cfcai" }
        }
    },
    {
        id: "4",
        name: "Digital Signal Processing",
        description: "An introductory course on DSP.",
        code: "CS403",
        isActive: true,
        category: "CS",
        organization: {
            // Cairo University
            connect: { subdomain: "cfcai" }
        }
    },
    {
        id: "5",
        name: "Math",
        description: "A course on math.",
        code: "MATH101",
        isActive: true,
        category: "MATH",
        organization: {
            // STEM October
            connect: { subdomain: "stem-october" }
        }
    },
    {
        id: "6",
        name: "Physics",
        description: "A course on physics.",
        code: "PHY101",
        isActive: true,
        category: "MATH",
        organization: {
            // STEM October
            connect: { subdomain: "stem-october" }
        }
    },
    {
        id: "7",
        name: "HTML",
        description: "A course on HTML.",
        code: "WEB101",
        isActive: true,
        category: "WEB",
        organization: {
            // FreeCodeCamb
            connect: { subdomain: "fcc" }
        }
    },
    {
        id: "8",
        name: "JavaScript",
        description: "A course on JS.",
        code: "WEB103",
        isActive: true,
        category: "WEB",
        organization: {
            // FreeCodeCamb
            connect: { subdomain: "fcc" }
        }
    }
] as Prisma.CourseCreateInput[];
