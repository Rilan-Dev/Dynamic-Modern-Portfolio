import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  Plus, 
  Trash2, 
  Edit2, 
  LogOut, 
  User, 
  Briefcase, 
  Code2, 
  BookOpen, 
  GraduationCap, 
  Quote,
  Check,
  X,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { 
  defaultPortfolioData, 
  loadPortfolioData, 
  savePortfolioData,
  type ProfileData,
  type Project,
  type Experience,
  type Education,
  type BlogPost,
  type Testimonial
} from '@/data/portfolio-data';

interface AdminPanelProps {
  onLogout: () => void;
}

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const [data, setData] = useState(() => loadPortfolioData());
  const [activeTab, setActiveTab] = useState('profile');
  const [saveMessage, setSaveMessage] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Auto-save message timeout
  useEffect(() => {
    if (saveMessage) {
      const timer = setTimeout(() => setSaveMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveMessage]);

  const handleSave = () => {
    savePortfolioData(data);
    setSaveMessage('Changes saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      setData(defaultPortfolioData);
      savePortfolioData(defaultPortfolioData);
      setSaveMessage('Data reset to defaults!');
    }
  };

  // Profile handlers
  const updateProfile = (field: keyof ProfileData, value: any) => {
    setData((prev: any) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value }
    }));
  };

  const updateSocial = (field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      profile: { 
        ...prev.profile, 
        social: { ...prev.profile.social, [field]: value }
      }
    }));
  };

  // CRUD handlers for arrays
  const addItem = (section: string, newItem: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: [...prev[section], { ...newItem, id: Date.now().toString() }]
    }));
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const updateItem = (section: string, id: string, updatedItem: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: prev[section].map((item: any) => 
        item.id === id ? { ...updatedItem, id } : item
      )
    }));
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const deleteItem = (section: string, id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setData((prev: any) => ({
        ...prev,
        [section]: prev[section].filter((item: any) => item.id !== id)
      }));
    }
  };

  const openEditDialog = (item: any) => {
    setEditingItem({ ...item });
    setIsDialogOpen(true);
  };

  const openAddDialog = (template: any) => {
    setEditingItem({ ...template });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">Portfolio Admin</h1>
              <Badge variant="secondary">v2.0</Badge>
            </div>
            <div className="flex items-center gap-3">
              {saveMessage && (
                <Alert className="py-2 px-3 w-auto">
                  <Check className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-sm">{saveMessage}</AlertDescription>
                </Alert>
              )}
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 w-full max-w-4xl mx-auto mb-8">
            <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" />Profile</TabsTrigger>
            <TabsTrigger value="projects"><Code2 className="h-4 w-4 mr-2" />Projects</TabsTrigger>
            <TabsTrigger value="experience"><Briefcase className="h-4 w-4 mr-2" />Experience</TabsTrigger>
            <TabsTrigger value="education"><GraduationCap className="h-4 w-4 mr-2" />Education</TabsTrigger>
            <TabsTrigger value="blog"><BookOpen className="h-4 w-4 mr-2" />Blog</TabsTrigger>
            <TabsTrigger value="testimonials"><Quote className="h-4 w-4 mr-2" />Testimonials</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and bio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input 
                      value={data.profile.name} 
                      onChange={(e) => updateProfile('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input 
                      value={data.profile.title} 
                      onChange={(e) => updateProfile('title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      type="email"
                      value={data.profile.email} 
                      onChange={(e) => updateProfile('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input 
                      value={data.profile.phone} 
                      onChange={(e) => updateProfile('phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input 
                      value={data.profile.location} 
                      onChange={(e) => updateProfile('location', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Website</Label>
                    <Input 
                      value={data.profile.website} 
                      onChange={(e) => updateProfile('website', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Birthday</Label>
                    <Input 
                      value={data.profile.birthday} 
                      onChange={(e) => updateProfile('birthday', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tagline</Label>
                    <Input 
                      value={data.profile.tagline} 
                      onChange={(e) => updateProfile('tagline', e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea 
                    value={data.profile.bio} 
                    onChange={(e) => updateProfile('bio', e.target.value)}
                    rows={6}
                  />
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Social Links</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(data.profile.social).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <Label className="capitalize">{key}</Label>
                        <Input 
                          value={value as string} 
                          onChange={(e) => updateSocial(key, e.target.value)}
                          placeholder={`https://${key}.com/...`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Manage your portfolio projects</CardDescription>
                </div>
                <Button onClick={() => openAddDialog({
                  title: '',
                  description: '',
                  image: '/images/project-placeholder.jpg',
                  category: 'web-development',
                  tags: [],
                  demoUrl: '',
                  repoUrl: '',
                  featured: false,
                  date: new Date().toISOString().slice(0, 7),
                })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {data.projects.map((project: Project) => (
                      <Card key={project.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{project.title}</h3>
                                {project.featured && <Badge>Featured</Badge>}
                                <Badge variant="outline">{project.category}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {project.tags.map((tag, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                                ))}
                              </div>
                              <div className="flex gap-2 text-sm">
                                {project.demoUrl && (
                                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" 
                                     className="text-primary hover:underline flex items-center gap-1">
                                    <ExternalLink className="h-3 w-3" /> Demo
                                  </a>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button variant="ghost" size="sm" onClick={() => openEditDialog(project)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => deleteItem('projects', project.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>Manage your professional experience</CardDescription>
                </div>
                <Button onClick={() => openAddDialog({
                  company: '',
                  position: '',
                  location: '',
                  startDate: '',
                  endDate: '',
                  current: false,
                  description: [''],
                  technologies: [],
                })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {data.experience.map((exp: Experience) => (
                      <Card key={exp.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{exp.position}</h3>
                                {exp.current && <Badge variant="default">Current</Badge>}
                              </div>
                              <p className="text-sm font-medium">{exp.company}</p>
                              <p className="text-sm text-muted-foreground mb-2">
                                {exp.location} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </p>
                              <ul className="text-sm text-muted-foreground list-disc list-inside mb-2">
                                {exp.description.map((desc, i) => (
                                  <li key={i}>{desc}</li>
                                ))}
                              </ul>
                              <div className="flex flex-wrap gap-1">
                                {exp.technologies.map((tech, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">{tech}</Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button variant="ghost" size="sm" onClick={() => openEditDialog(exp)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => deleteItem('experience', exp.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>Manage your educational background</CardDescription>
                </div>
                <Button onClick={() => openAddDialog({
                  school: '',
                  degree: '',
                  field: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {data.education.map((edu: Education) => (
                      <Card key={edu.id} className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold">{edu.school}</h3>
                              <p className="text-sm font-medium">{edu.degree} in {edu.field}</p>
                              <p className="text-sm text-muted-foreground mb-1">
                                {edu.startDate} - {edu.endDate}
                              </p>
                              {edu.description && (
                                <p className="text-sm text-muted-foreground">{edu.description}</p>
                              )}
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button variant="ghost" size="sm" onClick={() => openEditDialog(edu)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => deleteItem('education', edu.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Blog Posts</CardTitle>
                  <CardDescription>Manage your blog articles</CardDescription>
                </div>
                <Button onClick={() => openAddDialog({
                  title: '',
                  excerpt: '',
                  content: '',
                  image: '/images/blog-placeholder.jpg',
                  category: 'Technology',
                  date: new Date().toISOString().slice(0, 10),
                  readTime: '5 min read',
                  slug: '',
                })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Post
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {data.blogPosts.map((post: BlogPost) => (
                      <Card key={post.id} className="border-l-4 border-l-purple-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{post.title}</h3>
                                <Badge variant="outline">{post.category}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {post.date} • {post.readTime}
                              </p>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {post.excerpt}
                              </p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button variant="ghost" size="sm" onClick={() => openEditDialog(post)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => deleteItem('blogPosts', post.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Testimonials</CardTitle>
                  <CardDescription>Manage client testimonials</CardDescription>
                </div>
                <Button onClick={() => openAddDialog({
                  name: '',
                  role: '',
                  content: '',
                })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Testimonial
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {data.testimonials.map((testimonial: Testimonial) => (
                      <Card key={testimonial.id} className="border-l-4 border-l-yellow-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold">{testimonial.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{testimonial.role}</p>
                              <p className="text-sm italic">"{testimonial.content}"</p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button variant="ghost" size="sm" onClick={() => openEditDialog(testimonial)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => deleteItem('testimonials', testimonial.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem?.id ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}</DialogTitle>
            <DialogDescription>
              Make changes and click save when done.
            </DialogDescription>
          </DialogHeader>
          
          {editingItem && (
            <div className="space-y-4 py-4">
              {/* Dynamic form fields based on active tab */}
              {activeTab === 'projects' && (
                <>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input 
                      value={editingItem.title} 
                      onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea 
                      value={editingItem.description} 
                      onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select 
                      value={editingItem.category} 
                      onValueChange={(value) => setEditingItem({...editingItem, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-design">Web Design</SelectItem>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="applications">Applications</SelectItem>
                        <SelectItem value="ai-ml">AI / ML</SelectItem>
                        <SelectItem value="all">All</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tags (comma separated)</Label>
                    <Input 
                      value={Array.isArray(editingItem.tags) ? editingItem.tags.join(', ') : editingItem.tags}
                      onChange={(e) => setEditingItem({...editingItem, tags: e.target.value.split(',').map((t: string) => t.trim())})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Demo URL</Label>
                    <Input 
                      value={editingItem.demoUrl || ''} 
                      onChange={(e) => setEditingItem({...editingItem, demoUrl: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Repository URL</Label>
                    <Input 
                      value={editingItem.repoUrl || ''} 
                      onChange={(e) => setEditingItem({...editingItem, repoUrl: e.target.value})}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={editingItem.featured} 
                      onCheckedChange={(checked) => setEditingItem({...editingItem, featured: checked})}
                    />
                    <Label>Featured Project</Label>
                  </div>
                </>
              )}

              {activeTab === 'experience' && (
                <>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input 
                      value={editingItem.company} 
                      onChange={(e) => setEditingItem({...editingItem, company: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input 
                      value={editingItem.position} 
                      onChange={(e) => setEditingItem({...editingItem, position: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input 
                      value={editingItem.location} 
                      onChange={(e) => setEditingItem({...editingItem, location: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input 
                        value={editingItem.startDate} 
                        onChange={(e) => setEditingItem({...editingItem, startDate: e.target.value})}
                        placeholder="April 2023"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input 
                        value={editingItem.endDate} 
                        onChange={(e) => setEditingItem({...editingItem, endDate: e.target.value})}
                        placeholder="Present"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={editingItem.current} 
                      onCheckedChange={(checked) => setEditingItem({...editingItem, current: checked})}
                    />
                    <Label>Current Position</Label>
                  </div>
                  <div className="space-y-2">
                    <Label>Description (one per line)</Label>
                    <Textarea 
                      value={Array.isArray(editingItem.description) ? editingItem.description.join('\n') : editingItem.description}
                      onChange={(e) => setEditingItem({...editingItem, description: e.target.value.split('\n').filter((l: string) => l.trim())})}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Technologies (comma separated)</Label>
                    <Input 
                      value={Array.isArray(editingItem.technologies) ? editingItem.technologies.join(', ') : editingItem.technologies}
                      onChange={(e) => setEditingItem({...editingItem, technologies: e.target.value.split(',').map((t: string) => t.trim())})}
                    />
                  </div>
                </>
              )}

              {activeTab === 'education' && (
                <>
                  <div className="space-y-2">
                    <Label>School/Institution</Label>
                    <Input 
                      value={editingItem.school} 
                      onChange={(e) => setEditingItem({...editingItem, school: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input 
                      value={editingItem.degree} 
                      onChange={(e) => setEditingItem({...editingItem, degree: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Field of Study</Label>
                    <Input 
                      value={editingItem.field} 
                      onChange={(e) => setEditingItem({...editingItem, field: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Year</Label>
                      <Input 
                        value={editingItem.startDate} 
                        onChange={(e) => setEditingItem({...editingItem, startDate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Year</Label>
                      <Input 
                        value={editingItem.endDate} 
                        onChange={(e) => setEditingItem({...editingItem, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea 
                      value={editingItem.description || ''} 
                      onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                </>
              )}

              {activeTab === 'blog' && (
                <>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input 
                      value={editingItem.title} 
                      onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Excerpt</Label>
                    <Textarea 
                      value={editingItem.excerpt} 
                      onChange={(e) => setEditingItem({...editingItem, excerpt: e.target.value})}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea 
                      value={editingItem.content} 
                      onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                      rows={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input 
                      value={editingItem.category} 
                      onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input 
                        type="date"
                        value={editingItem.date} 
                        onChange={(e) => setEditingItem({...editingItem, date: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Read Time</Label>
                      <Input 
                        value={editingItem.readTime} 
                        onChange={(e) => setEditingItem({...editingItem, readTime: e.target.value})}
                        placeholder="5 min read"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input 
                      value={editingItem.slug} 
                      onChange={(e) => setEditingItem({...editingItem, slug: e.target.value})}
                      placeholder="my-blog-post"
                    />
                  </div>
                </>
              )}

              {activeTab === 'testimonials' && (
                <>
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input 
                      value={editingItem.name} 
                      onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input 
                      value={editingItem.role} 
                      onChange={(e) => setEditingItem({...editingItem, role: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea 
                      value={editingItem.content} 
                      onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                      rows={4}
                    />
                  </div>
                </>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={() => {
              if (editingItem.id) {
                updateItem(activeTab, editingItem.id, editingItem);
              } else {
                addItem(activeTab, editingItem);
              }
            }}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
