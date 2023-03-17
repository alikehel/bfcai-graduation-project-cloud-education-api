import { Prisma } from "@prisma/client";

export default [
    {
        id: "1",
        name: "Benha University",
        type: "University",
        emailDomain: "fci.bu.edu.eg",
        subdomain: "bfcai",
        officialPhoneNumber: "+1234567890",
        country: "Egypt",
        address: "Benha, Qalubia"
    },
    {
        id: "2",
        name: "Cairo University",
        type: "University",
        emailDomain: "fci.cu.edu.eg",
        subdomain: "cfcai",
        officialPhoneNumber: "+1239997890",
        country: "Egypt",
        address: "Cairo"
    },
    {
        id: "3",
        name: "STEM October",
        type: "School",
        emailDomain: "stemoctober.moe.edu.eg",
        subdomain: "stem-october",
        officialPhoneNumber: "+1239887890",
        country: "Egypt",
        address: "Giza"
    },
    {
        id: "4",
        name: "FreeCodeCamb",
        type: "Independent",
        emailDomain: "fcc.com",
        subdomain: "fcc",
        officialPhoneNumber: "+1239997230",
        country: "USA",
        address: "Newyork"
    }
] as Prisma.OrganizationCreateInput[];
