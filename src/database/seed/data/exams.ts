export const iotExam1 = [
    {
        questionText: "Explain the concept of Internet of Things (IoT).",
        questionType: "essay",
        questionAnswer:
            "The Internet of Things (IoT) refers to the network of physical objects, devices, vehicles, buildings, and other items embedded with sensors, software, and connectivity, enabling them to collect and exchange data. It allows these objects to be remotely monitored, controlled, and managed."
    },
    {
        questionText: "Discuss the main applications of IoT in today's world.",
        questionType: "essay",
        questionAnswer:
            "IoT has numerous applications across various industries. Some common examples include smart homes, industrial automation, healthcare monitoring, agriculture monitoring, and smart cities. In smart homes, IoT enables the control and automation of devices such as lighting, security systems, and appliances. Industrial automation uses IoT to optimize processes, monitor equipment health, and improve efficiency. Healthcare monitoring involves wearable devices and sensors that collect vital data for remote patient monitoring. Agriculture monitoring utilizes IoT for precision farming, irrigation control, and livestock management. Smart cities use IoT for efficient energy management, traffic control, waste management, and public safety."
    },
    {
        questionText:
            "Discuss the security and privacy challenges associated with IoT.",
        questionType: "essay",
        questionAnswer:
            "IoT introduces new security and privacy challenges due to the large-scale deployment of connected devices. Some challenges include data breaches, unauthorized access, device hijacking, and privacy concerns. With a vast number of connected devices, each device becomes a potential entry point for attackers. Weak security measures and lack of regular updates make IoT devices vulnerable to hacking. Privacy concerns arise from the collection and storage of personal data by IoT devices. Additionally, the massive amount of data generated by IoT devices raises issues related to data protection, data ownership, and consent for data usage."
    },
    {
        questionText:
            "Which of the following communication protocols is commonly used in IoT?",
        questionType: "mcq",
        questionChoices: [
            {
                choiceText: "Bluetooth",
                isCorrect: false
            },
            {
                choiceText: "Zigbee",
                isCorrect: true
            },
            {
                choiceText: "Wi-Fi",
                isCorrect: false
            }
        ]
    },
    {
        questionText: "What is the purpose of IoT gateways?",
        questionType: "mcq",
        questionChoices: [
            {
                choiceText: "To connect IoT devices to the cloud",
                isCorrect: true
            },
            {
                choiceText: "To provide power to IoT devices",
                isCorrect: false
            },
            {
                choiceText: "To store data generated by IoT devices",
                isCorrect: false
            }
        ]
    },
    {
        questionText:
            "Which of the following is an example of an IoT application?",
        questionType: "mcq",
        questionChoices: [
            {
                choiceText: "Online shopping",
                isCorrect: false
            },
            {
                choiceText: "Smart home automation",
                isCorrect: true
            },
            {
                choiceText: "Social media",
                isCorrect: false
            }
        ]
    }
];

export const dspExam1 = [
    {
        questionText:
            "Explain the concept of sampling in digital signal processing.",
        questionType: "essay",
        questionAnswer:
            "Sampling is the process of converting a continuous-time signal into a discrete-time signal by taking samples at specific time intervals. In digital signal processing, sampling is performed by measuring the amplitude of the continuous signal at regular intervals. The samples obtained represent the value of the original signal at those specific time points. The sampling rate determines the number of samples taken per unit of time and affects the accuracy of the reconstructed signal."
    },
    {
        questionText:
            "Discuss the importance of the Fourier transform in signal analysis.",
        questionType: "essay",
        questionAnswer:
            "The Fourier transform is a mathematical technique used to decompose a complex signal into its constituent frequency components. It allows us to analyze the frequency content of a signal and extract useful information. The Fourier transform provides a representation of a signal in the frequency domain, where the amplitudes and phases of different frequency components are revealed. This is valuable in various applications such as audio processing, image processing, communication systems, and filtering. The Fourier transform helps in identifying specific frequencies, detecting patterns, removing noise, and designing filters."
    },
    {
        questionText:
            "Describe the process of filtering in digital signal processing.",
        questionType: "essay",
        questionAnswer:
            "Filtering is a fundamental operation in digital signal processing used to modify or extract specific components from a signal. The process involves applying a filter to the input signal, which alters the amplitude and/or phase characteristics of different frequency components. There are two main types of filters: finite impulse response (FIR) filters and infinite impulse response (IIR) filters. FIR filters have a finite duration impulse response, while IIR filters have an infinite duration impulse response. Filters can be designed to pass certain frequencies (low-pass, high-pass, band-pass) or attenuate certain frequencies (band-reject). Common filtering techniques include convolution, Fourier analysis, and digital filter design algorithms."
    },
    {
        questionText:
            "Which of the following techniques is commonly used for image compression?",
        questionType: "mcq",
        questionChoices: [
            {
                choiceText: "Discrete Cosine Transform (DCT)",
                isCorrect: true
            },
            {
                choiceText: "Fast Fourier Transform (FFT)",
                isCorrect: false
            },
            {
                choiceText: "Wavelet Transform",
                isCorrect: false
            }
        ]
    },
    {
        questionText:
            "What is the purpose of the Nyquist-Shannon sampling theorem?",
        questionType: "mcq",
        questionChoices: [
            {
                choiceText:
                    "To ensure accurate reconstruction of a continuous signal from its samples",
                isCorrect: true
            },
            {
                choiceText:
                    "To reduce the size of digital signals for storage purposes",
                isCorrect: false
            },
            {
                choiceText: "To analyze the frequency spectrum of a signal",
                isCorrect: false
            }
        ]
    },
    {
        questionText:
            "Which programming paradigm emphasizes the use of objects and classes?",
        questionType: "mcq",
        questionChoices: [
            {
                choiceText: "Functional programming",
                isCorrect: false
            },
            {
                choiceText: "Procedural programming",
                isCorrect: false
            },
            {
                choiceText: "Object-oriented programming",
                isCorrect: true
            }
        ]
    }
];

export const introToCSExam1 = [
    {
        questionText:
            "Define computer science and explain its importance in today's world.",
        questionType: "essay",
        questionAnswer:
            "Computer science is the study of computers and computing technologies. It encompasses various areas such as algorithms, programming languages, data structures, and computer systems. Computer science plays a crucial role in modern society as it enables advancements in technology, drives innovation, and facilitates problem-solving in various fields."
    },
    {
        questionText: "Discuss the major components of a computer system.",
        questionType: "essay",
        questionAnswer:
            "A computer system consists of several components, including the central processing unit (CPU), memory (RAM), storage devices (hard disk drive, solid-state drive), input devices (keyboard, mouse), output devices (monitor, printer), and various peripheral devices. The CPU is responsible for executing instructions and performing calculations, while memory stores data and instructions temporarily. Storage devices store data in a non-volatile manner."
    },
    {
        questionText:
            "Explain the concept of an algorithm and provide an example.",
        questionType: "essay",
        questionAnswer:
            "An algorithm is a step-by-step procedure or set of rules for solving a specific problem. It is a precise and unambiguous description of a solution. For example, the algorithm for finding the maximum element in an array involves comparing each element to the current maximum and updating it if a larger element is found."
    },
    {
        questionText: "Which of the following is not a programming language?",
        questionType: "mcq",
        questionChoices: [
            {
                choiceText: "Java",
                isCorrect: false
            },
            {
                choiceText: "Python",
                isCorrect: false
            },
            {
                choiceText: "HTML",
                isCorrect: true
            }
        ]
    },
    {
        questionText:
            "What is the output of the following code snippet? \n\nint x = 5;\nint y = 2;\nint z = x % y;\nSystem.out.println(z);",
        questionType: "mcq",
        questionChoices: [
            {
                choiceText: "2",
                isCorrect: false
            },
            {
                choiceText: "1",
                isCorrect: true
            },
            {
                choiceText: "0",
                isCorrect: false
            }
        ]
    },
    {
        questionText:
            "Which of the following data structures uses First-In-First-Out (FIFO) order?",
        questionType: "mcq",
        questionChoices: [
            {
                choiceText: "Stack",
                isCorrect: false
            },
            {
                choiceText: "Queue",
                isCorrect: true
            },
            {
                choiceText: "Set",
                isCorrect: false
            }
        ]
    }
];

export const oopExam1 = [
    {
        questionText:
            "Explain the concept of object-oriented programming (OOP).",
        questionType: "essay",
        questionAnswer:
            "Object-oriented programming (OOP) is a programming paradigm that organizes code into objects, which are instances of classes. It focuses on the concept of encapsulation, where data and methods are bundled together within objects. OOP also includes features like inheritance, polymorphism, and abstraction, which allow for code reuse, modularity, and efficient problem-solving."
    },
    {
        questionText:
            "Discuss the benefits of using inheritance in object-oriented programming.",
        questionType: "essay",
        questionAnswer:
            "Inheritance allows for code reuse and promotes the creation of hierarchies of related classes. Benefits of using inheritance include: (1) Code reusability, as subclasses can inherit the properties and methods of a superclass. (2) Modularity, as classes can be organized into hierarchies, making the code easier to manage. (3) Polymorphism, where objects of different classes can be treated as instances of a common superclass, enabling flexibility and extensibility in the code."
    },
    {
        questionText:
            "Explain the concept of polymorphism in object-oriented programming.",
        questionType: "essay",
        questionAnswer:
            "Polymorphism is the ability of an object to take on many forms. In object-oriented programming, it allows objects of different classes to be treated as instances of a common superclass. Polymorphism enables code flexibility and extensibility, as the same methods can be used to perform different actions depending on the actual object type. It allows for code reuse and promotes modularity and scalability."
    },
    {
        questionText:
            "Which of the following is an example of an object-oriented programming language?",
        questionType: "mcq",
        questionChoices: [
            {
                choiceText: "C",
                isCorrect: false
            },
            {
                choiceText: "Java",
                isCorrect: true
            },
            {
                choiceText: "Assembly",
                isCorrect: false
            }
        ]
    },
    {
        questionText:
            "What is the output of the following code snippet? \n\nclass A {\n    int x;\n    public A(int x) {\n        this.x = x;\n    }\n}\n\nA obj = new A(5);\nSystem.out.println(obj.x);",
        questionType: "mcq",
        questionChoices: [
            {
                choiceText: "0",
                isCorrect: false
            },
            {
                choiceText: "5",
                isCorrect: true
            },
            {
                choiceText: "null",
                isCorrect: false
            }
        ]
    },
    {
        questionText:
            "Which of the following best represents the concept of encapsulation?",
        questionType: "mcq",
        questionChoices: [
            {
                choiceText: "Inheritance",
                isCorrect: false
            },
            {
                choiceText: "Data hiding",
                isCorrect: true
            },
            {
                choiceText: "Polymorphism",
                isCorrect: false
            }
        ]
    }
];
