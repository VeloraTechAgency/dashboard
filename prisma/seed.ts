import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Seed admin user
  const adminEmail = 'admin@velora.tech';
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('password123', 12);
    await prisma.user.create({
      data: {
        name: 'Velora Admin',
        email: adminEmail,
        password: hashedPassword,
        phone: '081234567890',
        email_verified_at: new Date(),
      },
    });
    console.log('Admin user created successfully (admin@velora.tech / password123)');
  } else {
    console.log('Admin user already exists');
  }

  // 2. Seed Services
  const servicesData = [
    {
      title: 'Custom Software Development',
      description: 'We build custom web, mobile, and desktop apps that fit your business needs and make your daily work easier.',
      icon: 'Code',
      price: 25000000,
      is_active: true,
    },
    {
      title: 'UI/UX Design & Brand Strategy',
      description: 'We design clean, user-friendly layouts for websites and apps. Everything is based on real research to make sure your customers love using it.',
      icon: 'Palette',
      price: 12000000,
      is_active: true,
    },
    {
      title: 'Cloud Solutions & DevOps Engineering',
      description: 'We set up secure cloud infrastructure on AWS, GCP, or Azure that grows with your traffic, along with automated pipelines for fast code deployments.',
      icon: 'Cloud',
      price: 18000000,
      is_active: true,
    },
    {
      title: 'Digital Marketing & SEO Optimization',
      description: 'We help grow your online presence using SEO, search engine marketing, and targeted ad campaigns to bring real customers to your site.',
      icon: 'Megaphone',
      price: 8500000,
      is_active: true,
    },
  ];

  for (const service of servicesData) {
    await prisma.service.upsert({
      where: { id: servicesData.indexOf(service) + 1 },
      update: {},
      create: service,
    });
  }
  console.log(`Seeded ${servicesData.length} services`);

  // 3. Seed Projects
  const projectsData = [
    {
      title: 'Velora E-Commerce Hub',
      description: 'An e-commerce platform with multi-vendor support, live inventory tracking, local payment gateway integrations, and a clean admin dashboard.',
      thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800',
      tech_stack: JSON.stringify(['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Tailwind CSS']),
      project_url: 'https://github.com/velora-agency/ecommerce-hub',
      is_featured: true,
      is_active: true,
    },
    {
      title: 'Real-time Financial Dashboard',
      description: 'A financial dashboard that tracks trading volumes and live currency conversions, updating in real time with automated reporting.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800',
      tech_stack: JSON.stringify(['Next.js', 'Tailwind CSS', 'Go', 'WebSockets', 'PostgreSQL', 'Redis', 'Docker']),
      project_url: 'https://github.com/velora-agency/finance-dashboard',
      is_featured: true,
      is_active: true,
    },
    {
      title: 'Enterprise Smart IoT Portal',
      description: 'A monitoring system that tracks temperature, pressure, and error logs from factory sensors, sending instant email and SMS alerts.',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800',
      tech_stack: JSON.stringify(['React', 'Vite', 'Python', 'FastAPI', 'MQTT', 'AWS IoT Core', 'DynamoDB']),
      project_url: 'https://github.com/velora-agency/iot-monitoring-portal',
      is_featured: false,
      is_active: true,
    },
  ];

  for (const project of projectsData) {
    await prisma.project.upsert({
      where: { id: projectsData.indexOf(project) + 1 },
      update: {},
      create: project,
    });
  }
  console.log(`Seeded ${projectsData.length} projects`);

  // 4. Seed Testimonials
  const testimonialsData = [
    {
      client_name: 'John Doe',
      client_company: 'CEO at FinTech Indo',
      message: 'VeloraTech finished our mobile banking app ahead of schedule. They did a fantastic job with the security features and UI design. We highly recommend them!',
      rating: 5,
      is_active: true,
    },
    {
      client_name: 'Sarah Jenkins',
      client_company: 'Co-Founder of CreativeHQ',
      message: 'They completely redesigned our web portal, making it much easier to use. Our user retention went up by 40% in the first month after launch.',
      rating: 5,
      is_active: true,
    },
    {
      client_name: 'Budi Santoso',
      client_company: 'CTO at Nusantara Logistics',
      message: "Great communication and solid technical skills. Their tracking system resolved our logistics bottlenecks. We'll definitely work with them again.",
      rating: 5,
      is_active: true,
    },
  ];

  for (const testimonial of testimonialsData) {
    await prisma.testimonial.upsert({
      where: { id: testimonialsData.indexOf(testimonial) + 1 },
      update: {},
      create: testimonial,
    });
  }
  console.log(`Seeded ${testimonialsData.length} testimonials`);

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
