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
  Edit, 
  Trash2, 
  Star, 
  Download, 
  Clock,
  Filter,
  Grid,
  List,
  RefreshCw
} from 'lucide-react'

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
  rating: number
  downloadCount: number
  isFeatured: boolean
  isVerified: boolean
  createdAt: string
}

export default function AppsManagement() {
  const [apps, setApps] = useState<App[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Add App Modal State
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newAppName, setNewAppName] = useState('')
  const [newAppDesc, setNewAppDesc] = useState('')
  const [newAppVersion, setNewAppVersion] = useState('1.0.0')
  const [newAppSize, setNewAppSize] = useState('15 MB')
  const [newAppCategory, setNewAppCategory] = useState('Productivity')
  const [newAppDownloadUrl, setNewAppDownloadUrl] = useState('')
  const [newAppIconUrl, setNewAppIconUrl] = useState('')
  const [newAppIsFeatured, setNewAppIsFeatured] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = ['all', 'Productivity', 'Security', 'Utilities', 'Multimedia', 'Development', 'Design', 'Gaming', 'Finance']

  const fetchApps = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/apps')
      if (res.ok) {
        const data = await res.json()
        setApps(data)
      }
    } catch (err) {
      console.error('Failed to fetch apps:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApps()
  }, [])

  const handleCreateApp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAppName || !newAppDesc || !newAppDownloadUrl) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/apps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newAppName,
          description: newAppDesc,
          version: newAppVersion,
          size: newAppSize,
          category: newAppCategory,
          downloadUrl: newAppDownloadUrl,
          iconUrl: newAppIconUrl || '/datahunter-icon.png',
          isFeatured: newAppIsFeatured,
          isVerified: true
        })
      })

      if (res.ok) {
        setIsAddOpen(false)
        setNewAppName('')
        setNewAppDesc('')
        setNewAppDownloadUrl('')
        setNewAppIconUrl('')
        fetchApps()
      }
    } catch (err) {
      console.error('Error adding app:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteApp = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this app from database?')) return

    try {
      const res = await fetch(`/api/apps?id=${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setApps(apps.filter(app => app.id !== id))
      }
    } catch (err) {
      console.error('Error deleting app:', err)
    }
  }

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Apps Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Real-time Database Apps Management
          </p>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              Add New App
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-gray-900 text-white border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">Add New Application</DialogTitle>
              <DialogDescription className="text-gray-400">
                Create a new app entry in the DataHunter database.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateApp} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="appName">App Name</Label>
                <Input
                  id="appName"
                  placeholder="e.g. Data Pro Analyzer"
                  value={newAppName}
                  onChange={(e) => setNewAppName(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="appDesc">Description</Label>
                <Textarea
                  id="appDesc"
                  placeholder="Brief description of the app..."
                  value={newAppDesc}
                  onChange={(e) => setNewAppDesc(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appVersion">Version</Label>
                  <Input
                    id="appVersion"
                    value={newAppVersion}
                    onChange={(e) => setNewAppVersion(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appSize">File Size</Label>
                  <Input
                    id="appSize"
                    value={newAppSize}
                    onChange={(e) => setNewAppSize(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appCategory">Category</Label>
                  <select
                    id="appCategory"
                    value={newAppCategory}
                    onChange={(e) => setNewAppCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  >
                    {categories.filter(c => c !== 'all').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appFeatured">Featured App?</Label>
                  <select
                    id="appFeatured"
                    value={newAppIsFeatured ? 'true' : 'false'}
                    onChange={(e) => setNewAppIsFeatured(e.target.value === 'true')}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes (Featured)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="downloadUrl">Download URL</Label>
                <Input
                  id="downloadUrl"
                  placeholder="https://example.com/download/app.exe"
                  value={newAppDownloadUrl}
                  onChange={(e) => setNewAppDownloadUrl(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="ghost" onClick={() => setIsAddOpen(false)} className="text-gray-400">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-500 text-white">
                  {isSubmitting ? 'Saving...' : 'Publish App'}
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
                  placeholder="Search apps..."
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
              <Button variant="outline" size="sm" onClick={fetchApps}>
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
          Showing {filteredApps.length} apps
        </p>
      </div>

      {/* Apps Grid/List */}
      {loading ? (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading database apps...</p>
        </div>
      ) : filteredApps.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <p className="text-gray-500 text-lg font-medium">No apps found in the database.</p>
            <p className="text-gray-400 text-sm mt-1">Click "Add New App" above to publish your first application.</p>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <Card key={app.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={app.iconUrl || "/datahunter-icon.png"}
                      alt={app.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        {app.name}
                      </CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {app.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {app.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                  <span>Size: {app.size}</span>
                  <span>v{app.version}</span>
                </div>
                <div className="flex justify-end space-x-2 pt-2 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => handleDeleteApp(app.id)}
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
              {filteredApps.map((app) => (
                <div key={app.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-center space-x-4">
                    <img
                      src={app.iconUrl || "/datahunter-icon.png"}
                      alt={app.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{app.name}</h3>
                      <p className="text-sm text-gray-500">{app.category} • v{app.version} • {app.size}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteApp(app.id)}
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