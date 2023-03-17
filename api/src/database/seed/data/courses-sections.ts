import { Prisma } from "@prisma/client";

export default [
    {
        id: "1",
        content: {
            time: 1622546605000,
            blocks: [
                {
                    type: "paragraph",
                    data: {
                        text: "This is the first paragraph"
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "This is the second paragraph"
                    }
                }
            ],
            version: "2.22.2"
        },
        course: {
            connect: { id: "1" }
        }
    },
    {
        id: "2",
        content: {
            time: 1622546605000,
            blocks: [
                {
                    type: "paragraph",
                    data: {
                        text: "This is the first paragraph"
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "This is the second paragraph"
                    }
                }
            ],
            version: "2.22.2"
        },
        course: {
            connect: { id: "2" }
        }
    },
    {
        id: "3",
        content: {
            time: 1622546605000,
            blocks: [
                {
                    type: "paragraph",
                    data: {
                        text: "This is the first paragraph"
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "This is the second paragraph"
                    }
                }
            ],
            version: "2.22.2"
        },
        course: {
            connect: { id: "3" }
        }
    },
    {
        id: "4",
        content: {
            time: 1622546605000,
            blocks: [
                {
                    type: "paragraph",
                    data: {
                        text: "This is the first paragraph"
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "This is the second paragraph"
                    }
                }
            ],
            version: "2.22.2"
        },
        course: {
            connect: { id: "4" }
        }
    },
    {
        id: "5",
        content: {
            time: 1622546605000,
            blocks: [
                {
                    type: "paragraph",
                    data: {
                        text: "This is the first paragraph"
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "This is the second paragraph"
                    }
                }
            ],
            version: "2.22.2"
        },
        course: {
            connect: { id: "5" }
        }
    },
    {
        id: "6",
        content: {
            time: 1622546605000,
            blocks: [
                {
                    type: "paragraph",
                    data: {
                        text: "This is the first paragraph"
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "This is the second paragraph"
                    }
                }
            ],
            version: "2.22.2"
        },
        course: {
            connect: { id: "6" }
        }
    },
    {
        id: "7",
        content: {
            time: 1622546605000,
            blocks: [
                {
                    type: "paragraph",
                    data: {
                        text: "This is the first paragraph"
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "This is the second paragraph"
                    }
                }
            ],
            version: "2.22.2"
        },
        course: {
            connect: { id: "7" }
        }
    },
    {
        id: "8",
        content: {
            time: 1622546605000,
            blocks: [
                {
                    type: "paragraph",
                    data: {
                        text: "This is the first paragraph"
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "This is the second paragraph"
                    }
                }
            ],
            version: "2.22.2"
        },
        course: {
            connect: { id: "8" }
        }
    }
] as Prisma.CourseSectionCreateInput[];
