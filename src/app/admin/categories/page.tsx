'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Folder,
  Settings,
  BarChart3,
  LayoutGrid,
  Newspaper
} from 'lucide-react'

interface Category {
  id: string
  name: string
  description: string
  type: 'app' | 'news'
  itemCount: number
  color: string
  isActive: boolean
  createdAt: string
}

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Productivity',
      description: 'Tools and applications to enhance productivity and workflow efficiency',
      type: 'app',
      itemCount: 8,
      color: 'blue',
      isActive: true,
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      name: 'balruti',
      description: 'Security applications and tools for data protection and privacy',
      type: 'app',
      itemCount: 5,
      color: 'red',
      isActive: true,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Technology',
      description: 'Latest technology news, trends, and innovations',
      type: 'news',
      itemCount: 12,
      color: 'purple',
      isActive: true,
      createdAt: '2024-01-10'
    },
    {
      id: '4',
      name: 'Development',
      description: 'Programming tools, IDEs, and development resources',
      type: 'app',
      itemCount: 6,
      color: 'green',
      isActive: true,
      createdAt: '2024-01-11'
    },
    {
      id: '5',
      name: 'Cloud Computing',
      description: 'Cloud services, infrastructure, and deployment tools',
      type: 'news',
      itemCount: 8,
      color: 'indigo',
      isActive: true,
      createdAt: '2024-01-12'
    }
  ])

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    type: 'app' as 'app' | 'news'
  })

  const [selectedType, setSelectedType] = useState<'all' | 'app' | 'news'>('all')

  const filteredCategories = categories.filter(category => {
    if (selectedType === 'all') return true
    return category.type === selectedType
  })

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return

    const colors = ['blue', 'red', 'green', 'purple', 'indigo', 'yellow', 'pink', 'gray']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name.trim(),
      description: newCategory.description.trim(),
      type: newCategory.type,
      itemCount: 0,
      color: randomColor,
      isActive: true,
      createdAt: new Date().toISOString()
    }

    setCategories([...categories, category])
    setNewCategory({ name: '', description: '', type: 'app' })
  }

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category? This will not affect existing items.')) {
      setCategories(categories.filter(category => category.id !== id))
    }
  }

  const handleToggleActive = (id: string) => {
    setCategories(categories.map(category => 
      category.id === id ? { ...category, isActive: !category.isActive } : category
    ))
  }

  const getCategoryIcon = (type: 'app' | 'news') => {
    return type === 'app' ? <LayoutGrid className="w-4 h-4" /> : <Newspaper className="w-4 h-4" />
  }

  const getCategoryColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-800',
      red: 'bg-red-100 text-red-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      indigo: 'bg-indigo-100 text-indigo-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      pink: 'bg-pink-100 text-pink-800',
      gray: 'bg-gray-100 text-gray-800'
    }
    return colorMap[color] || 'bg-gray-100 text-gray-800'
  }

  const stats = {
    totalCategories: categories.length,
    activeCategories: categories.filter(c => c.isActive).length,
    appCategories: categories.filter(c => c.type === 'app').length,
    newsCategories: categories.filter(c => c.type === 'news').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage categories for apps and news articles
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCategories}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">App Categories</CardTitle>
            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appCategories}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">News Categories</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newsCategories}</div>
          </CardContent>
        </Card>
      </div>

      {/* Add Category Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
          <CardDescription>Create a new category for organizing content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Category Name
              </label>
              <Input
                placeholder="Enter category name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Description
              </label>
              <Input
                placeholder="Enter description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Category Type
              </label>
              <select
                value={newCategory.type}
                onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value as 'app' | 'news' })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="app">App Category</option>
                <option value="news">News Category</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={handleAddCategory} disabled={!newCategory.name.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as any)}>
          <TabsList>
            <TabsTrigger value="all">All Categories</TabsTrigger>
            <TabsTrigger value="app">App Categories</TabsTrigger>
            <TabsTrigger value="news">News Categories</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    {getCategoryIcon(category.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                      <Badge className={getCategoryColor(category.color)}>
                        {category.type === 'app' ? 'App' : 'News'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{category.description}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleActive(category.id)}
                    className={category.isActive ? 'text-green-500' : 'text-gray-400'}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{category.itemCount} items</span>
                <span>{new Date(category.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant={category.isActive ? 'default' : 'secondary'}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </Badge>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteCategory(category.id)}
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

      {filteredCategories.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Folder className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No categories found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Create new categories to organize your content
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}