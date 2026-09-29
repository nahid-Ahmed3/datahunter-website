import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET all apps from Database
export async function GET() {
  try {
    const apps = await db.app.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(apps)
  } catch (error) {
    console.error('Error fetching apps:', error)
    return NextResponse.json({ error: 'Failed to fetch apps' }, { status: 500 })
  }
}

// POST create new app in Database
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      name, 
      description, 
      version, 
      size, 
      category, 
      platform, 
      downloadUrl, 
      iconUrl, 
      isFeatured, 
      isVerified 
    } = body

    if (!name || !description || !downloadUrl) {
      return NextResponse.json({ error: 'Name, description and download URL are required' }, { status: 400 })
    }

    const newApp = await db.app.create({
      data: {
        name,
        description,
        version: version || '1.0.0',
        size: size || '10 MB',
        category: category || 'General',
        platform: platform || 'multi',
        downloadUrl,
        iconUrl: iconUrl || '/datahunter-icon.png',
        rating: 5.0,
        downloadCount: 0,
        isFeatured: Boolean(isFeatured),
        isVerified: Boolean(isVerified)
      }
    })

    return NextResponse.json(newApp, { status: 201 })
  } catch (error) {
    console.error('Error creating app:', error)
    return NextResponse.json({ error: 'Failed to create app' }, { status: 500 })
  }
}

// DELETE an app from Database
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'App ID is required' }, { status: 400 })
    }

    await db.app.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error('Error deleting app:', error)
    return NextResponse.json({ error: 'Failed to delete app' }, { status: 500 })
  }
}