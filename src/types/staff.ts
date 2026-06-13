export interface Staff {
  id: number;
  name: string;
  role: string;
  department: string;
  avatar: string;
  initials: string;
  email: string;
  phone: string;
  bio: string;
  vision: string;
  mission: string;
  skills: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface StaffPayload {
  name: string;
  role: string;
  department: string;
  avatar: string;
  initials: string;
  email: string;
  phone: string;
  bio: string;
  vision: string;
  mission: string;
  skills: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const staffData: Staff[] = [
  {
    id: 1,
    name: 'Bagus Rizky Lazuardi',
    role: 'Frontend Developer',
    department: 'Engineering',
    avatar: '',
    initials: 'BR',
    email: 'bagus@veloratech.com',
    phone: '+62 812 3456 7891',
    bio: 'Frontend engineer with over 5 years of experience coding web apps in React and TypeScript. I focus on building clean, accessible layouts that work well for everyone.',
    vision: 'Membuat tampilan web yang mudah diakses dan nyaman digunakan oleh semua orang di Indonesia.',
    mission: 'Belajar teknologi terbaru, ikut berkontribusi di proyek open-source, dan aktif berbagi ilmu di komunitas developer.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion'],
    social: {
      github: 'https://github.com/bagusrizky',
      linkedin: 'https://linkedin.com/in/bagusrizky',
    },
  },
  {
    id: 2,
    name: 'Renaldi Zaki Hardiansyah',
    role: 'Backend Developer',
    department: 'Engineering',
    avatar: '',
    initials: 'RH',
    email: 'renaldi@veloratech.com',
    phone: '+62 812 3456 7892',
    bio: 'Backend developer specializing in building APIs and microservices. I write backend code using Node.js and Laravel, and set up cloud environments on AWS or Google Cloud.',
    vision: 'Membangun sistem backend yang stabil, cepat, dan aman untuk mendukung kebutuhan aplikasi skala besar.',
    mission: 'Menulis kode backend yang bersih, merancang database dengan efisien, dan terus mengeksplorasi teknologi baru.',
    skills: ['Laravel', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    social: {
      github: 'https://github.com/renaldizaki',
      linkedin: 'https://linkedin.com/in/renaldizaki',
    },
  },
  {
    id: 3,
    name: 'Virmanza Hadinata Prasetyo',
    role: 'Creative UI/UX',
    department: 'Design',
    avatar: '',
    initials: 'VP',
    email: 'virmanza@veloratech.com',
    phone: '+62 812 3456 7893',
    bio: 'Designer who makes sure apps look great and are easy to use. I spend my time in Figma, testing designs with real users, and building design systems.',
    vision: 'Menciptakan desain UI/UX yang tidak cuma cantik dilihat, tapi juga sangat mudah dipahami oleh pengguna.',
    mission: 'Merancang antarmuka berdasarkan feedback asli pengguna, melakukan riset sebelum mendesain, dan mempermudah interaksi pengguna dengan produk.',
    skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Design Systems'],
    social: {
      linkedin: 'https://linkedin.com/in/virmanzahadinata',
      twitter: 'https://twitter.com/virmanza',
    },
  },
  {
    id: 4,
    name: 'Fadli Suta Wijaya',
    role: 'Admin Marketing',
    department: 'Marketing',
    avatar: '',
    initials: 'FW',
    email: 'fadli@veloratech.com',
    phone: '+62 812 3456 7894',
    bio: 'Digital marketer focused on growth and brand awareness. I manage ad campaigns, plan content strategies, and communicate with clients.',
    vision: 'Membantu bisnis berkembang lewat strategi pemasaran digital yang tepat sasaran dan terukur.',
    mission: 'Menyusun kampanye iklan yang efektif, memperluas jangkauan brand, dan membangun komunikasi yang baik dengan audiens.',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Social Media', 'Analytics'],
    social: {
      linkedin: 'https://linkedin.com/in/fadlisuta',
      twitter: 'https://twitter.com/fadlisuta',
    },
  },
];
