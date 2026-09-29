import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Sample news data for demonstration
    // In a real app, you would fetch this from the database
    const news = [
      {
        id: '1',
        title: 'Revolutionary AI-Powered Data Analysis Tool Released',
        content: 'Tech giant today announced the launch of their groundbreaking AI-powered data analysis tool that promises to revolutionize how businesses handle big data. The new leverages advanced machine learning algorithms to provide real-time insights and predictive analytics.',
        excerpt: 'Revolutionary AI tool launched with advanced machine learning capabilities for real-time data analysis.',
        featuredImage: '/images/news1.jpg',
        author: 'Sarah Johnson',
        category: 'Technology',
        published: true,
        publishedAt: new Date('2024-01-15').toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Cybersecurity Threats Reach All-Time High in 2024',
        content: 'Recent reports indicate that cybersecurity threats have reached unprecedented levels in 2024, with ransomware attacks increasing by 300% compared to last year. Experts recommend enhanced security measures and regular software updates.',
        excerpt: 'Cybersecurity threats reach alarming levels with ransomware attacks surging 300% year-over-year.',
        featuredImage: '/images/news2.jpg',
        author: 'Michael Chen',
        category: 'Security',
        published: true,
        publishedAt: new Date('2024-01-14').toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Cloud Computing Market Expected to Double by 2026',
        content: 'The global cloud computing market is projected to reach $1 trillion by 2026, driven by increasing adoption of hybrid cloud solutions and edge computing technologies. Major providers are investing heavily in infrastructure expansion.',
        excerpt: 'Cloud computing market forecasted to double by 2026 with hybrid solutions leading growth.',
        featuredImage: '/images/news3.jpg',
        author: 'Emily Rodriguez',
        category: 'Cloud Computing',
        published: true,
        publishedAt: new Date('2024-01-13').toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'New Programming Language Gains Popularity Among Developers',
        content: 'A newly developed programming language designed for modern web development has been gaining significant traction in the developer community. The language promises improved performance and better developer experience.',
        excerpt: 'New programming language emerges as preferred choice for modern web development projects.',
        featuredImage: '/images/news4.jpg',
        author: 'David Kim',
        category: 'Development',
        published: true,
        publishedAt: new Date('2024-01-12').toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Mobile App Downloads Surpass Desktop for First Time',
        content: 'Historic milestone achieved as mobile app downloads officially surpassed desktop applications for the first time ever. This shift reflects changing user behavior and increased mobile device usage worldwide.',
        excerpt: 'Mobile app downloads exceed desktop for the first time, marking major industry shift.',
        featuredImage: '/images/news5.jpg',
        author: 'Lisa Thompson',
        category: 'Mobile',
        published: true,
        publishedAt: new Date('2024-01-11').toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: '6',
        title: 'Major Tech Companies Announce Sustainability Initiatives',
        content: 'Leading technology companies have unveiled ambitious sustainability goals, including carbon neutrality targets and renewable energy commitments. These initiatives aim to reduce environmental impact while maintaining growth.',
        excerpt: 'Tech industry commits to sustainability with major companies announcing carbon neutrality goals.',
        featuredImage: '/images/news6.jpg',
        author: 'Robert Martinez',
        category: 'Industry',
        published: true,
        publishedAt: new Date('2024-01-10').toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: '7',
        title: 'Quantum Computing Breakthrough Promises Faster Processing',
        content: 'Scientists achieve significant breakthrough in quantum computing, potentially leading to exponentially faster processing speeds. This advancement could revolutionize fields from cryptography to drug discovery.',
        excerpt: 'Quantum computing breakthrough promises revolutionary processing speeds for complex problems.',
        featuredImage: '/images/news7.jpg',
        author: 'Jennifer Wu',
        category: 'Research',
        published: true,
        publishedAt: new Date('2024-01-09').toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: '8',
        title: 'Augmented Reality Apps Transform Education Sector',
        content: 'Educational institutions are increasingly adopting augmented reality applications to enhance learning experiences. These immersive technologies are helping students better understand complex concepts through interactive experiences.',
        excerpt: 'AR applications revolutionizing education with immersive learning experiences for students.',
        featuredImage: '/images/news8.jpg',
        author: 'Alex Turner',
        category: 'Education',
        published: true,
        publishedAt: new Date('2024-01-08').toISOString(),
        createdAt: new Date().toISOString(),
      },
    ]

    return NextResponse.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}