'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Calendar,
  Filter,
  Grid,
  List,
  Eye,
  EyeOff
} from 'lucide-react'

interface News {
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
  const [news, setNews] = useState<News[]>([
    {
      id: '1',
      title: 'Revolutionary AI-Powered Data Analysis Tool Released',
      content: 'Tech giant today announced the launch of their groundbreaking AI-powered data analysis tool that promises to revolutionize how businesses handle big data. The new leverages advanced machine learning algorithms to provide real-time insights and predictive analytics.',
      excerpt: 'Revolutionary AI tool launched with advanced machine learning capabilities for real-time data analysis.',
      author: 'Sarah Johnson',
      category: 'Technology',
      published: true,
      publishedAt: '2024-01-15',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Cybersecurity Threats Reach All-Time High in 2024',
      content: 'Recent reports indicate that cybersecurity threats have reached unprecedented levels in 2024, with ransomware attacks increasing by 300% compared to last year. Experts recommend enhanced security measures and regular software updates.',
      excerpt: 'Cybersecurity threats reach alarming levels with ransomware attacks surging 300% year-over-year.',
      author: 'Michael Chen',
      category: 'Security',
      published: true,
      publishedAt: '2024-01-14',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      title: 'Cloud Computing Market Expected to Double by 2026',
      content: 'The global cloud computing market is projected to reach $1 trillion by 2026, driven by increasing adoption of hybrid cloud solutions and edge computing technologies. Major providers are investing heavily in infrastructure expansion.',
      excerpt: 'Cloud computing market forecasted to double by 2026 with hybrid solutions leading growth.',
      author: 'Emily Rodriguez',
      category: 'Cloud Computing',
      published: false,
      createdAt: '2024-01-13'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const categories = ['all', 'Technology', 'Security', 'Cloud Computing', 'Development', 'Mobile', 'Industry', 'Research', 'Education']
  const statuses = ['all', 'published', 'draft']

  const filteredNews = news.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'published' && article.published) ||
                         (selectedStatus === 'draft' && !article.published)
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleDeleteNews = (id: string) => {
    if (confirm('Are you sure you want to delete this news article?')) {
      setNews(news.filter(article => article.id !== id))
    }
  }

  const handleTogglePublish = (id: string) => {
    setNews(news.map(article => 
      article.id === id ? { 
        ...article, 
        published: !article.published,
        publishedAt: !article.published ? new Date().toISOString() : undefined
      } : article
    ))
  }

  const getStatusBadge = (published: boolean) => {
    if (published) {
      return <Badge className="bg-green-100 text-green-800">Published</Badge>
    } else {
      return <Badge variant="secondary">Draft</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">News Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage all news articles and blog posts
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New Article
        </Button>
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
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status === 'published' ? 'Published' : 'Draft'}
                  </option>
                ))}
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
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
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredNews.length} of {news.length} articles
        </p>
      </div>

      {/* News Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-100 text-blue-800">{article.category}</Badge>
                      {getStatusBadge(article.published)}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTogglePublish(article.id)}
                      className={article.published ? 'text-green-500' : 'text-gray-400'}
                    >
                      {article.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {article.excerpt && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {article.excerpt}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>By {article.author}</span>
                  {article.publishedAt && (
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteNews(article.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNews.map((article) => (
            <Card key={article.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-100 text-blue-800">{article.category}</Badge>
                      {getStatusBadge(article.published)}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                      {article.excerpt || article.content.substring(0, 150) + '...'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>By {article.author}</span>
                      {article.publishedAt && (
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      )}
                      <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTogglePublish(article.id)}
                      className={article.published ? 'text-green-500' : 'text-gray-400'}
                    >
                      {article.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteNews(article.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredNews.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No articles found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}