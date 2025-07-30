import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create categories first
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Laptops' },
      update: {},
      create: { 
        id: 'cat-laptops-001',
        name: 'Laptops' 
      }
    }),
    prisma.category.upsert({
      where: { name: 'Smartphones' },
      update: {},
      create: { 
        id: 'cat-smartphones-001',
        name: 'Smartphones' 
      }
    }),
    prisma.category.upsert({
      where: { name: 'Headphones' },
      update: {},
      create: { 
        id: 'cat-headphones-001',
        name: 'Headphones' 
      }
    }),
    prisma.category.upsert({
      where: { name: 'Cameras' },
      update: {},
      create: { 
        id: 'cat-cameras-001',
        name: 'Cameras' 
      }
    }),
    prisma.category.upsert({
      where: { name: 'Gaming' },
      update: {},
      create: { 
        id: 'cat-gaming-001',
        name: 'Gaming' 
      }
    })
  ])

  console.log('✅ Categories created')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ecommerce.com' },
    update: {},
    create: {
      id: 'user-admin-001',
      email: 'admin@ecommerce.com',
      password: hashedPassword,
      role: 'admin'
    }
  })

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10)
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      id: 'user-regular-001',
      email: 'user@example.com',
      password: userPassword,
      role: 'user'
    }
  })

  console.log('✅ Users created')

  // Create products
  const products = [
    {
      id: 'prod-macbook-001',
      slug: 'macbook-pro-14',
      title: 'MacBook Pro 14" M3',
      mainImage: '/laptop 1.webp',
      price: 199999, // $1999.99 in cents
      rating: 5,
      description: 'The most advanced MacBook Pro ever. With the M3 chip, incredible performance, and all-day battery life.',
      manufacturer: 'Apple',
      inStock: 15,
      categoryId: categories[0].id // Laptops
    },
    {
      id: 'prod-iphone-001',
      slug: 'iphone-15-pro',
      title: 'iPhone 15 Pro',
      mainImage: '/camera 1.png',
      price: 99999, // $999.99 in cents
      rating: 5,
      description: 'The ultimate iPhone. Featuring the A17 Pro chip, titanium design, and advanced camera system.',
      manufacturer: 'Apple',
      inStock: 25,
      categoryId: categories[1].id // Smartphones
    },
    {
      id: 'prod-airpods-001',
      slug: 'airpods-pro-2',
      title: 'AirPods Pro (2nd Gen)',
      mainImage: '/earbuds 1.png',
      price: 24999, // $249.99 in cents
      rating: 4,
      description: 'Next-level AirPods Pro with adaptive transparency, personalized spatial audio, and all-day battery life.',
      manufacturer: 'Apple',
      inStock: 30,
      categoryId: categories[2].id // Headphones
    },
    {
      id: 'prod-sony-001',
      slug: 'sony-a7r5',
      title: 'Sony Alpha 7R V',
      mainImage: '/camera 2.png',
      price: 399999, // $3999.99 in cents
      rating: 5,
      description: 'Professional full-frame mirrorless camera with 61MP sensor and advanced AI processing.',
      manufacturer: 'Sony',
      inStock: 8,
      categoryId: categories[3].id // Cameras
    },
    {
      id: 'prod-mouse-001',
      slug: 'gaming-mouse-pro',
      title: 'Gaming Mouse Pro RGB',
      mainImage: '/mouse 1.png',
      price: 7999, // $79.99 in cents
      rating: 4,
      description: 'High-precision gaming mouse with customizable RGB lighting and 20,000 DPI sensor.',
      manufacturer: 'Razer',
      inStock: 50,
      categoryId: categories[4].id // Gaming
    },
    {
      id: 'prod-headphones-001',
      slug: 'wireless-headphones',
      title: 'Premium Wireless Headphones',
      mainImage: '/headphones 1.png',
      price: 29999, // $299.99 in cents
      rating: 4,
      description: 'Studio-quality wireless headphones with active noise cancellation and 30-hour battery life.',
      manufacturer: 'Sony',
      inStock: 20,
      categoryId: categories[2].id // Headphones
    },
    {
      id: 'prod-gaming-laptop-001',
      slug: 'gaming-laptop',
      title: 'Gaming Laptop RTX 4080',
      mainImage: '/laptop 2.webp',
      price: 249999, // $2499.99 in cents
      rating: 5,
      description: 'High-performance gaming laptop with RTX 4080, 32GB RAM, and 144Hz display.',
      manufacturer: 'ASUS',
      inStock: 12,
      categoryId: categories[0].id // Laptops
    },
    {
      id: 'prod-drone-001',
      slug: 'drone-4k-pro',
      title: '4K Professional Drone',
      mainImage: '/drone.png',
      price: 149999, // $1499.99 in cents
      rating: 4,
      description: 'Professional 4K drone with gimbal stabilization, obstacle avoidance, and 45-minute flight time.',
      manufacturer: 'DJI',
      inStock: 6,
      categoryId: categories[3].id // Cameras
    }
  ]

  for (const productData of products) {
    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData
    })
  }

  console.log('✅ Products created')

  console.log('🎉 Database seeding completed successfully!')
  console.log('')
  console.log('👤 Admin credentials:')
  console.log('   Email: admin@ecommerce.com')
  console.log('   Password: admin123')
  console.log('')
  console.log('👤 User credentials:')
  console.log('   Email: user@example.com')
  console.log('   Password: user123')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
