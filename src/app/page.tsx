'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeToggle } from '@/components/theme-toggle'
import { Search, Download, Star, Clock, ExternalLink, TrendingUp, Calendar, User } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import AuthModal from '@/components/auth/auth-modal'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface App {
  id: string
  name: string
  description: string
  version: string
  size: string
  category: string
  platform: string
  downloadUrl: string
  iconUrl?: string
  screenshot1?: string
  screenshot2?: string
  screenshot3?: string
  screenshot4?: string
  rating: number
  downloadCount: number
  isFeatured: boolean
  isVerified: boolean
  createdAt: string
}

interface News {
  id: string
  title: string
  content: string
  excerpt?: string
  featuredImage?: string
  author: string
  category: string
  published: boolean
  publishedAt?: string
  createdAt: string
}

export default function Home() {
  const [apps, setApps] = useState<App[]>([])
  const [news, setNews] = useState<News[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { user, loading: authLoading, logout } = useAuth()

  useEffect(() => {
    fetchApps()
    fetchNews()
  }, [])

  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [])

  const fetchApps = async () => {
    try {
      const response = await fetch('/api/apps')
      const data = await response.json()
      setApps(data)
    } catch (error) {
      console.error('Failed to fetch apps:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news')
      const data = await response.json()
      setNews(data)
    } catch (error) {
      console.error('Failed to fetch news:', error)
    }
  }

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const featuredApps = apps.filter(app => app.isFeatured)
  const latestNews = news.filter(article => article.published).slice(0, 6)

  const formatSize = (size: string) => {
    return size.replace('MB', ' MB').replace('GB', ' GB')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/datahunter-icon.png" 
                alt="DataHunter Logo" 
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DataHunter</h1>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-8">
                <a href="#apps" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Apps</a>
                <a href="#news" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">News</a>
                <a href="#categories" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Categories</a>
              </nav>
              
              <div className="flex items-center space-x-2">
                {authLoading ? (
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                ) : user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {user.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          {user.displayName && (
                            <p className="font-medium">{user.displayName}</p>
                          )}
                          <p className="w-[200px] truncate text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button 
                    onClick={() => setAuthModalOpen(true)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    Sign In
                  </Button>
                )}
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Discover Amazing Apps & Stay Updated
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Your ultimate destination for the latest applications and technology news. 
            Download premium apps and read the most up-to-date articles in the tech world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search apps, news, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-96 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              Explore Now
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="apps">
        <Tabs defaultValue="apps" className="space-y-12">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="apps" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Apps & Downloads
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Latest News
            </TabsTrigger>
          </TabsList>

          {/* Apps Section */}
          <TabsContent value="apps" className="space-y-8" id="featured">
            {/* Featured Apps */}
            {featuredApps.length > 0 && (
              <section id="featured-section">
                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Apps</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredApps.map((app) => (
                    <Card key={app.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <Download className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{app.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>v{app.version}</span>
                                {app.isVerified && (
                                  <Badge variant="secondary" className="text-xs">
                                    Verified
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                          {app.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{app.rating.toFixed(1)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            <span>{app.downloadCount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatSize(app.size)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">{app.category}</Badge>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                            Download
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* All Apps */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Applications</h3>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <div className="p-6">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
                        <div className="flex gap-2 mb-4">
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        </div>
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredApps.map((app) => (
                    <Card key={app.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <Download className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{app.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>v{app.version}</span>
                                {app.isVerified && (
                                  <Badge variant="secondary" className="text-xs">
                                    Verified
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                          {app.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{app.rating.toFixed(1)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            <span>{app.downloadCount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatSize(app.size)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">{app.category}</Badge>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                            Download
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </TabsContent>

          {/* News Section */}
          <TabsContent value="news" className="space-y-8" id="news">
            <section id="latest-articles">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest Technology News</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestNews.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">{article.category}</Badge>
                        {article.publishedAt && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {article.title}
                      </h4>
                      {article.excerpt && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">By {article.author}</span>
                        <Button size="sm" variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>

      {/* Categories Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Browse Categories</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Discover apps by category</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="categories">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Productivity</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">25 apps</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Development</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">18 apps</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Design</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">12 apps</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Security</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">8 apps</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 mt-20" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Download className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold">DataHunter</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Your ultimate destination for amazing apps and technology news.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Apps</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#featured" className="hover:text-white">Featured Apps</a></li>
                <li><a href="#new-releases" className="hover:text-white">New Releases</a></li>
                <li><a href="#categories" className="hover:text-white">Categories</a></li>
                <li><a href="#top-downloads" className="hover:text-white">Top Downloads</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">News</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#latest-articles" className="hover:text-white">Latest Articles</a></li>
                <li><a href="#tech-reviews" className="hover:text-white">Tech Reviews</a></li>
                <li><a href="#industry-news" className="hover:text-white">Industry News</a></li>
                <li><a href="#developer-blog" className="hover:text-white">Developer Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
                <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 DataHunter. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </div>
  )
}