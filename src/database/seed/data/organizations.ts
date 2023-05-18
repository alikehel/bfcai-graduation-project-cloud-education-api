import { Prisma } from "@prisma/client";

export default [
    {
        name: "Benha University",
        type: "University",
        emailDomain: "fci.bu.edu.eg",
        subdomain: "bfcai",
        officialPhoneNumber: "+1234567890",
        country: "Egypt",
        address: "Benha, Qalubia"
    },
    {
        name: "Cairo University",
        type: "University",
        emailDomain: "fci.cu.edu.eg",
        subdomain: "cfcai",
        officialPhoneNumber: "+1239997890",
        country: "Egypt",
        address: "Cairo"
    },
    {
        name: "STEM October",
        type: "School",
        emailDomain: "stemoctober.moe.edu.eg",
        subdomain: "stem-october",
        officialPhoneNumber: "+1239887890",
        country: "Egypt",
        address: "Giza"
    },
    {
        name: "FreeCodeCamb",
        type: "Independent",
        emailDomain: "fcc.com",
        subdomain: "fcc",
        officialPhoneNumber: "+1239997230",
        country: "USA",
        address: "Newyork"
    }
] as Prisma.OrganizationCreateInput[];
