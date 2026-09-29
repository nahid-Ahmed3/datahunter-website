'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Plus, 
  Search, 
  Trash2, 
  Filter,
  Grid,
  List,
  RefreshCw,
  Newspaper
} from 'lucide-react'

interface NewsItem {
  id: string
  title: string
  content: string
  excerpt?: string
  author: string
  category: string
  published: boolean
  publishedAt?: string
  createdAt: string
}

export default function NewsManagement() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Add News Modal State
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newsTitle, setNewsTitle] = useState('')
  const [newsContent, setNewsContent] = useState('')
  const [newsExcerpt, setNewsExcerpt] = useState('')
  const [newsAuthor, setNewsAuthor] = useState('Admin')
  const [newsCategory, setNewsCategory] = useState('Technology')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = ['all', 'Technology', 'Security', 'Cloud Computing', 'Development', 'Mobile', 'AI & Data']

  const fetchNews = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/news')
      if (res.ok) {
        const data = await res.json()
        setNews(data)
      }
    } catch (err) {
      console.error('Failed to fetch news:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsTitle || !newsContent) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newsTitle,
          content: newsContent,
          excerpt: newsExcerpt || newsTitle.substring(0, 150),
          author: newsAuthor,
          category: newsCategory,
          published: true
        })
      })

      if (res.ok) {
        setIsAddOpen(false)
        setNewsTitle('')
        setNewsContent('')
        setNewsExcerpt('')
        fetchNews()
      }
    } catch (err) {
      console.error('Error adding news:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteNews = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this news post from database?')) return

    try {
      const res = await fetch(`/api/news?id=${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setNews(news.filter(item => item.id !== id))
      }
    } catch (err) {
      console.error('Error deleting news:', err)
    }
  }

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">News Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Real-time Database News & Announcements Management
          </p>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              Add News Article
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] bg-gray-900 text-white border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">Publish News Article</DialogTitle>
              <DialogDescription className="text-gray-400">
                Post new announcements and news updates directly to the site.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateNews} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="newsTitle">Article Title</Label>
                <Input
                  id="newsTitle"
                  placeholder="e.g. Revolutionary AI-Powered Tool Released"
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newsExcerpt">Short Summary (Excerpt)</Label>
                <Input
                  id="newsExcerpt"
                  placeholder="Brief 1-sentence summary..."
                  value={newsExcerpt}
                  onChange={(e) => setNewsExcerpt(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newsContent">Full Article Content</Label>
                <Textarea
                  id="newsContent"
                  rows={5}
                  placeholder="Write full article body here..."
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newsAuthor">Author Name</Label>
                  <Input
                    id="newsAuthor"
                    value={newsAuthor}
                    onChange={(e) => setNewsAuthor(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newsCategory">Category</Label>
                  <select
                    id="newsCategory"
                    value={newsCategory}
                    onChange={(e) => setNewsCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  >
                    {categories.filter(c => c !== 'all').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="ghost" onClick={() => setIsAddOpen(false)} className="text-gray-400">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-500 text-white">
                  {isSubmitting ? 'Publishing...' : 'Publish Article'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <Button variant="outline" size="sm" onClick={fetchNews}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4 mr-2" />
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4 mr-2" />
            List
          </Button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredNews.length} articles
        </p>
      </div>

      {/* News Grid/List */}
      {loading ? (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading articles from database...</p>
        </div>
      ) : filteredNews.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <Newspaper className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <p className="text-gray-500 text-lg font-medium">No news articles found in the database.</p>
            <p className="text-gray-400 text-sm mt-1">Click "Add News Article" above to publish your first post.</p>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNews.map((item) => (
            <Card key={item.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white leading-snug">
                    {item.title}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {item.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {item.excerpt || item.content}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                  <span>Author: {item.author}</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-end space-x-2 pt-2 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => handleDeleteNews(item.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredNews.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-center space-x-4">
                    <Newspaper className="w-8 h-8 text-blue-500 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.category} • By {item.author}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteNews(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}