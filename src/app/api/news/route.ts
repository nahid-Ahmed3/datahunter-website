import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET all news items from Database safely (always returns array)
export async function GET() {
  try {
    const news = await db.news.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(Array.isArray(news) ? news : [])
  } catch (error) {
    return NextResponse.json([])
  }
}

// POST create new news item in Database
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      title, 
      content, 
      excerpt, 
      author, 
      category, 
      featuredImage, 
      published 
    } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    const newNews = await db.news.create({
      data: {
        title,
        content,
        excerpt: excerpt || title.substring(0, 150),
        author: author || 'Admin',
        category: category || 'General',
        featuredImage: featuredImage || null,
        published: published !== undefined ? Boolean(published) : true,
        publishedAt: new Date()
      }
    })

    return NextResponse.json(newNews, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 })
  }
}

// DELETE a news item from Database
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'News ID is required' }, { status: 400 })
    }

    await db.news.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, id })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 })
  }
}