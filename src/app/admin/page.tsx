'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import AppsManagement from '@/app/admin/apps/page'
import NewsManagement from '@/app/admin/news/page'
import CategoriesManagement from '@/app/admin/categories/page'
import SettingsManagement from '@/app/admin/settings/page'
import { 
  LayoutDashboard,
  LayoutGrid, 
  Newspaper, 
  Settings, 
  Folder,
  BarChart3,
  Plus,
  Search,
  Download,
  LogOut,
  ShieldCheck
} from 'lucide-react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    totalApps: 0,
    totalNews: 0,
    totalDownloads: 0
  })

  const fetchStats = async () => {
    try {
      const [appsRes, newsRes] = await Promise.all([
        fetch('/api/apps'),
        fetch('/api/news')
      ])
      const apps = appsRes.ok ? await appsRes.json() : []
      const news = newsRes.ok ? await newsRes.json() : []
      
      const totalDownloads = apps.reduce((acc: number, item: any) => acc + (item.downloadCount || 0), 0)

      setStats({
        totalApps: apps.length,
        totalNews: news.length,
        totalDownloads
      })
    } catch (err) {
      // quiet error handling
    }
  }

  useEffect(() => {
    fetchStats()
  }, [activeTab])

  const handleLogout = () => {
    sessionStorage.removeItem('dh_admin_session')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-950 border-r border-gray-800 flex flex-col shrink-0">
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <img 
              src="/datahunter-icon.png" 
              alt="DataHunter Logo" 
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-lg font-bold text-white tracking-wide">DataHunter Admin</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-sm font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('apps')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-sm font-semibold transition-all ${
              activeTab === 'apps'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span>Apps Management</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-sm font-semibold transition-all ${
              activeTab === 'news'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <Newspaper className="w-5 h-5" />
            <span>News & Articles</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-sm font-semibold transition-all ${
              activeTab === 'categories'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <Folder className="w-5 h-5" />
            <span>Categories</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-sm font-semibold transition-all ${
              activeTab === 'settings'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Site Settings</span>
          </button>
        </nav>

        {/* User Info & Exit */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-semibold text-gray-300">Admin Mode</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-950/40">
              <LogOut className="w-4 h-4 mr-1" />
              Exit
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-900 min-h-screen">
        {/* Top Header Bar */}
        <div className="h-16 border-b border-gray-800 bg-gray-950/50 backdrop-blur px-8 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white capitalize">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'apps' && 'Apps Management'}
            {activeTab === 'news' && 'News & Articles'}
            {activeTab === 'categories' && 'Categories'}
            {activeTab === 'settings' && 'Site Settings'}
          </h2>
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-400 px-3 py-1">
            Live Database Connected
          </Badge>
        </div>

        {/* Tab Views */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gray-950 border-gray-800 text-white">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-semibold text-gray-400">Total Live Apps</CardTitle>
                    <LayoutGrid className="h-5 w-5 text-cyan-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-extrabold text-white">{stats.totalApps}</div>
                    <p className="text-xs text-gray-500 mt-1">Stored in Database</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-950 border-gray-800 text-white">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-semibold text-gray-400">Total Published News</CardTitle>
                    <Newspaper className="h-5 w-5 text-cyan-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-extrabold text-white">{stats.totalNews}</div>
                    <p className="text-xs text-gray-500 mt-1">Stored in Database</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-950 border-gray-800 text-white">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-semibold text-gray-400">Total Downloads</CardTitle>
                    <Download className="h-5 w-5 text-cyan-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-extrabold text-white">{stats.totalDownloads}</div>
                    <p className="text-xs text-gray-500 mt-1">Across all applications</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="bg-gray-950 border-gray-800 text-white">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Quick Management Actions</CardTitle>
                  <CardDescription className="text-gray-400">Manage all content directly from the tabs below</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                  <Button onClick={() => setActiveTab('apps')} className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold">
                    <Plus className="w-4 h-4 mr-2" />
                    Manage Apps & Downloads
                  </Button>
                  <Button onClick={() => setActiveTab('news')} className="bg-blue-600 hover:bg-blue-500 text-white font-bold">
                    <Plus className="w-4 h-4 mr-2" />
                    Manage News & Articles
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'apps' && <AppsManagement />}
          {activeTab === 'news' && <NewsManagement />}
          {activeTab === 'categories' && <CategoriesManagement />}
          {activeTab === 'settings' && <SettingsManagement />}
        </div>
      </div>
    </div>
  )
}