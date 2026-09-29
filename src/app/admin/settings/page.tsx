'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Globe, 
  Palette, 
  Bell,
  Shield,
  Database,
  Mail,
  Users,
  BarChart3
} from 'lucide-react'

export default function SiteSettings() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'DataHunter',
    siteDescription: 'Your ultimate destination for amazing apps and technology news',
    siteUrl: 'https://datahunter.example.com',
    maintenanceMode: false,
    registrationEnabled: true,
    
    // Appearance Settings
    theme: 'auto',
    primaryColor: 'blue',
    logoUrl: '/logo.svg',
    faviconUrl: '/favicon.ico',
    
    // Email Settings
    smtpEnabled: false,
    smtpHost: '',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    fromEmail: 'noreply@datahunter.example.com',
    
    // SEO Settings
    metaTitle: 'DataHunter - Discover Amazing Apps & Stay Updated',
    metaDescription: 'Your ultimate destination for the latest applications and technology news',
    keywords: 'app downloads, technology news, software, applications, tech news',
    
    // Analytics Settings
    googleAnalyticsId: '',
    hotjarId: '',
    
    // Performance Settings
    cacheEnabled: true,
    compressionEnabled: true,
    cdnEnabled: false,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 3600,
    maxLoginAttempts: 5,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    newsletter: true,
    securityAlerts: true,
    weeklyDigest: false,
  })

  const handleSaveSettings = () => {
    // Simulate saving settings
    alert('Settings saved successfully!')
  }

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default values
      setSettings({
        siteName: 'DataHunter',
        siteDescription: 'Your ultimate destination for amazing apps and technology news',
        siteUrl: 'https://datahunter.example.com',
        maintenanceMode: false,
        registrationEnabled: true,
        theme: 'auto',
        primaryColor: 'blue',
        logoUrl: '/logo.svg',
        faviconUrl: '/favicon.ico',
        smtpEnabled: false,
        smtpHost: '',
        smtpPort: 587,
        smtpUsername: '',
        smtpPassword: '',
        fromEmail: 'noreply@datahunter.example.com',
        metaTitle: 'DataHunter - Discover Amazing Apps & Stay Updated',
        metaDescription: 'Your ultimate destination for the latest applications and technology news',
        keywords: 'app downloads, technology news, software, applications, tech news',
        googleAnalyticsId: '',
        hotjarId: '',
        cacheEnabled: true,
        compressionEnabled: true,
        cdnEnabled: false,
        twoFactorAuth: false,
        sessionTimeout: 3600,
        maxLoginAttempts: 5,
      })
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Site Settings</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Configure website settings and preferences
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetSettings}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic website configuration and global settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Site Name
                  </label>
                  <Input
                    value={settings.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                    placeholder="Enter site name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Site URL
                  </label>
                  <Input
                    value={settings.siteUrl}
                    onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Site Description
                </label>
                <Textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  placeholder="Enter site description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Maintenance Mode</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Temporarily disable the website for maintenance
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">User Registration</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Allow new users to register accounts
                    </p>
                  </div>
                  <Switch
                    checked={settings.registrationEnabled}
                    onCheckedChange={(checked) => handleInputChange('registrationEnabled', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Theme
                  </label>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleInputChange('theme', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Primary Color
                  </label>
                  <select
                    value={settings.primaryColor}
                    onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                    <option value="red">Red</option>
                    <option value="indigo">Indigo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Logo URL
                  </label>
                  <Input
                    value={settings.logoUrl}
                    onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                    placeholder="/logo.svg"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Favicon URL
                  </label>
                  <Input
                    value={settings.faviconUrl}
                    onChange={(e) => handleInputChange('faviconUrl', e.target.value)}
                    placeholder="/favicon.ico"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Settings
              </CardTitle>
              <CardDescription>
                Configure email notifications and SMTP settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Enable SMTP</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enable email sending via SMTP server
                  </p>
                </div>
                <Switch
                  checked={settings.smtpEnabled}
                  onCheckedChange={(checked) => handleInputChange('smtpEnabled', checked)}
                />
              </div>

              {settings.smtpEnabled && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        SMTP Host
                      </label>
                      <Input
                        value={settings.smtpHost}
                        onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                        placeholder="smtp.gmail.com"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        SMTP Port
                      </label>
                      <Input
                        value={settings.smtpPort}
                        onChange={(e) => handleInputChange('smtpPort', parseInt(e.target.value))}
                        type="number"
                        placeholder="587"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        SMTP Username
                      </label>
                      <Input
                        value={settings.smtpUsername}
                        onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
                        placeholder="your-email@gmail.com"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        SMTP Password
                      </label>
                      <Input
                        value={settings.smtpPassword}
                        onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                        type="password"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      From Email
                    </label>
                    <Input
                      value={settings.fromEmail}
                      onChange={(e) => handleInputChange('fromEmail', e.target.value)}
                      placeholder="noreply@datahunter.example.com"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure user notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {key === 'emailNotifications' && 'Send email notifications to users'}
                      {key === 'pushNotifications' && 'Send push notifications to users'}
                      {key === 'newsletter' && 'Allow users to subscribe to newsletter'}
                      {key === 'securityAlerts' && 'Send security alerts to users'}
                      {key === 'weeklyDigest' && 'Send weekly digest emails'}
                    </p>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => handleNotificationChange(key, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                SEO Settings
              </CardTitle>
              <CardDescription>
                Optimize your website for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Meta Title
                </label>
                <Input
                  value={settings.metaTitle}
                  onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                  placeholder="Enter meta title"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Meta Description
                </label>
                <Textarea
                  value={settings.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  placeholder="Enter meta description"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Keywords
                </label>
                <Input
                  value={settings.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  placeholder="app downloads, technology news, software..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Google Analytics ID
                  </label>
                  <Input
                    value={settings.googleAnalyticsId}
                    onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Hotjar ID
                  </label>
                  <Input
                    value={settings.hotjarId}
                    onChange={(e) => handleInputChange('hotjarId', e.target.value)}
                    placeholder="1234567"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Settings */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Settings
              </CardTitle>
              <CardDescription>
                Optimize website performance and loading speed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Enable Cache</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Improve loading speed</p>
                  </div>
                  <Switch
                    checked={settings.cacheEnabled}
                    onCheckedChange={(checked) => handleInputChange('cacheEnabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Enable Compression</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Reduce file sizes</p>
                  </div>
                  <Switch
                    checked={settings.compressionEnabled}
                    onCheckedChange={(checked) => handleInputChange('compressionEnabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Enable CDN</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Global content delivery</p>
                  </div>
                  <Switch
                    checked={settings.cdnEnabled}
                    onCheckedChange={(checked) => handleInputChange('cdnEnabled', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}