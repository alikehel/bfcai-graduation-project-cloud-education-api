import { Prisma } from "@prisma/client";

// enum role {
//     "LEARNER",
//     "TEACHER",
//     "ADMIN"
// }

export default [
    // Benha University
    {
        id: "1",
        email: "admin@fci.bu.edu.eg",
        firstName: "Admin",
        lastName: "BFCAI",
        phoneNumber: "+201044260000",
        password: "AdminBFCAI*",
        // passwordConfirm: "AdminBFCAI*",
        role: "ADMIN",
        organization: {
            connect: { id: "1" }
        }
    },
    {
        id: "2",
        email: "ali.kehel@fci.bu.edu.eg",
        firstName: "Ali",
        lastName: "Kehel",
        phoneNumber: "+201066260001",
        password: "AliKehel*",
        // passwordConfirm: "AliKehel*",
        role: "LEARNER",
        organization: {
            connect: { id: "1" }
        }
    },
    {
        id: "3",
        email: "dr.ahmed.shalaby@fci.bu.edu.eg",
        firstName: "Dr Ahmed",
        lastName: "Shalaby",
        phoneNumber: "+201064004000",
        password: "DrAhmedShalaby*",
        // passwordConfirm: "DrAhmedShalaby*",
        role: "TEACHER",
        organization: {
            connect: { id: "1" }
        }
    },
    // Cairo University
    {
        id: "4",
        email: "admin@fci.cu.edu.eg",
        firstName: "Admin",
        lastName: "BFCAI",
        phoneNumber: "+201044260000",
        password: "AdminBFCAI*",
        // passwordConfirm: "AdminBFCAI*",
        role: "ADMIN",
        organization: {
            connect: { id: "2" }
        }
    },
    {
        id: "5",
        email: "ali.kehel@fci.cu.edu.eg",
        firstName: "Ali",
        lastName: "Kehel",
        phoneNumber: "+201066260001",
        password: "AliKehel*",
        // passwordConfirm: "AliKehel*",
        role: "LEARNER",
        organization: {
            connect: { id: "2" }
        }
    },
    {
        id: "6",
        email: "dr.ahmed.shalaby@fci.cu.edu.eg",
        firstName: "Dr Ahmed",
        lastName: "Shalaby",
        phoneNumber: "+201064004000",
        password: "DrAhmedShalaby*",
        // passwordConfirm: "DrAhmedShalaby*",
        role: "TEACHER",
        organization: {
            connect: { id: "2" }
        }
    },
    // STEM October
    {
        id: "7",
        email: "admin@stemoctober.moe.edu.eg",
        firstName: "Admin",
        lastName: "BFCAI",
        phoneNumber: "+201044260000",
        password: "AdminBFCAI*",
        // passwordConfirm: "AdminBFCAI*",
        role: "ADMIN",
        organization: {
            connect: { id: "3" }
        }
    },
    {
        id: "8",
        email: "ali.kehel@stemoctober.moe.edu.eg",
        firstName: "Ali",
        lastName: "Kehel",
        phoneNumber: "+201066260001",
        password: "AliKehel*",
        // passwordConfirm: "AliKehel*",
        role: "LEARNER",
        organization: {
            connect: { id: "3" }
        }
    },
    {
        id: "9",
        email: "dr.ahmed.shalaby@stemoctober.moe.edu.eg",
        firstName: "Dr Ahmed",
        lastName: "Shalaby",
        phoneNumber: "+201064004000",
        password: "DrAhmedShalaby*",
        // passwordConfirm: "DrAhmedShalaby*",
        role: "TEACHER",
        organization: {
            connect: { id: "3" }
        }
    },
    // FreeCodeCamp
    {
        id: "10",
        email: "admin@fcc.com",
        firstName: "Admin",
        lastName: "BFCAI",
        phoneNumber: "+201044260000",
        password: "AdminBFCAI*",
        // passwordConfirm: "AdminBFCAI*",
        role: "ADMIN",
        organization: {
            connect: { id: "4" }
        }
    },
    {
        id: "11",
        email: "ali.kehel@fcc.com",
        firstName: "Ali",
        lastName: "Kehel",
        phoneNumber: "+201066260001",
        password: "AliKehel*",
        // passwordConfirm: "AliKehel*",
        role: "LEARNER",
        organization: {
            connect: { id: "4" }
        }
    },
    {
        id: "12",
        email: "dr.ahmed.shalaby@fcc.com",
        firstName: "Dr Ahmed",
        lastName: "Shalaby",
        phoneNumber: "+201064004000",
        password: "DrAhmedShalaby*",
        // passwordConfirm: "DrAhmedShalaby*",
        role: "TEACHER",
        organization: {
            connect: { id: "4" }
        }
    }
] as Prisma.UserCreateInput[];
