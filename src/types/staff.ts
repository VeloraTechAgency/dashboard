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
    bio: 'Frontend engineer with 5+ years of experience building modern web applications using React, TypeScript, and Tailwind CSS. Passionate about creating pixel-perfect, accessible user interfaces.',
    vision: 'Menjadi pengembang frontend terdepan yang menghadirkan solusi digital inovatif dan aksesibel bagi masyarakat Indonesia.',
    mission: 'Terus mengembangkan keahlian di bidang frontend, berkontribusi dalam proyek open-source, dan membangun komunitas developer yang inklusif.',
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
    bio: 'Backend specialist focused on building scalable APIs and microservices. Experienced with Laravel, Node.js, and cloud infrastructure on AWS and GCP.',
    vision: 'Menciptakan arsitektur backend yang handal, scalable, dan aman untuk mendukung pertumbuhan ekosistem digital nasional.',
    mission: 'Mengimplementasikan praktik terbaik dalam pengembangan backend, melakukan riset teknologi terbaru, dan membangun API yang efisien.',
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
    bio: 'Creative designer who bridges the gap between aesthetics and functionality. Expert in Figma, user research, and crafting delightful digital experiences.',
    vision: 'Menjadi pionir dalam desain pengalaman pengguna yang memadukan keindahan visual dengan fungsionalitas tinggi.',
    mission: 'Menghadirkan desain yang berpusat pada pengguna, melakukan riset mendalam, dan menciptakan solusi desain yang berdampak positif.',
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
    bio: 'Digital marketing professional with a knack for brand strategy and growth. Manages campaigns, content strategy, and client relationships to drive business impact.',
    vision: 'Menjadi ahli strategi pemasaran digital yang mendorong pertumbuhan bisnis melalui pendekatan kreatif dan berbasis data.',
    mission: 'Mengembangkan strategi pemasaran yang terukur, membangun brand awareness, dan menciptakan hubungan yang kuat dengan klien dan audiens.',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Social Media', 'Analytics'],
    social: {
      linkedin: 'https://linkedin.com/in/fadlisuta',
      twitter: 'https://twitter.com/fadlisuta',
    },
  },
];
