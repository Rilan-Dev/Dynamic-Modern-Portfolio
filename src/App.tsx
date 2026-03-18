import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { 
  Github, Linkedin, Twitter, Mail, Phone, MapPin, Globe, 
  ExternalLink, Code2, BookOpen, User,
  Calendar, Clock, ArrowUp, Instagram, Quote,
  Star, Briefcase, Sparkles, Cpu,
  Database, Cloud, Send, Rocket, Users, Edit3, FolderOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatedNav } from '@/components/AnimatedNav';
import { ParticleBackground } from '@/components/animations/ParticleBackground';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { InteractiveCard, GlowCard, MagneticButton } from '@/components/animations/InteractiveCard';
import { AnimatedSkillBar, CircularProgress } from '@/components/animations/AnimatedSkillBar';
import { FloatingElement, GradientOrbs, PulsingDot } from '@/components/animations/FloatingElements';
import { EditModeProvider, useEditMode } from '@/components/cms/EditModeProvider';
import { EditableText } from '@/components/cms/EditableText';
import { ImageUpload } from '@/components/cms/ImageUpload';
import { MarkdownEditor } from '@/components/cms/MarkdownEditor';
import { EditModeBar } from '@/components/cms/EditModeBar';
import { ContentWorkspace } from '@/components/cms/ContentWorkspace';
import { ThemeSelector } from '@/components/cms/ThemeSelector';
import { AdminLogin } from '@/admin/AdminLogin';
import { AdminPanel } from '@/admin/AdminPanel';
import { loadPortfolioData, savePortfolioData, type Project, type Experience, type BlogPost, type Testimonial } from '@/data/portfolio-data';
import './App.css';

const isAdminAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('adminAuthenticated') === 'true';
};

function AppContent() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [data, setData] = useState(() => loadPortfolioData());
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(data.theme || 'cyberpunk');
  const { isEditMode, setHasChanges } = useEditMode();

  const { scrollYProgress } = useScroll();

  // Listen for save event from EditModeBar
  useEffect(() => {
    const handleSave = () => {
      savePortfolioData(data);
    };
    window.addEventListener('portfolio-save', handleSave);
    return () => window.removeEventListener('portfolio-save', handleSave);
  }, [data]);

  useEffect(() => {
    if (isAdminAuthenticated()) setIsAdmin(true);
  }, []);

  useEffect(() => {
    const handleStorage = () => setData(loadPortfolioData());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { profile, projects, experience, blogPosts, testimonials, stats } = data;

  const handleLogin = () => { setIsAdmin(true); setShowAdmin(true); };
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAdmin(false);
    setShowAdmin(false);
    setData(loadPortfolioData());
  };

  // Update functions
  const updateProfile = useCallback((field: string, value: any) => {
    setData((prev: any) => ({ ...prev, profile: { ...prev.profile, [field]: value } }));
    setHasChanges(true);
  }, [setHasChanges]);

  const updateStats = useCallback((field: string, value: any) => {
    setData((prev: any) => ({ ...prev, stats: { ...prev.stats, [field]: value } }));
    setHasChanges(true);
  }, [setHasChanges]);

  const updateData = useCallback((newData: any) => {
    setData(newData);
    setHasChanges(true);
  }, [setHasChanges]);

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    setData((prev: any) => ({ ...prev, theme: themeId }));
    setHasChanges(true);
  };

  if (showAdmin && isAdmin) return <AdminPanel onLogout={handleLogout} />;
  if (showAdmin && !isAdmin) return <AdminLogin onLogin={handleLogin} />;

  const featuredProjects = projects.filter((p: Project) => p.featured);

  return (
    <div className="min-h-screen bg-[#0b0e18] text-white relative overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Background Effects */}
      <ParticleBackground />
      <GradientOrbs />
      <div className="noise-overlay" />

      {/* Navigation */}
      <AnimatedNav 
        onAdminClick={() => setShowAdmin(true)} 
        isEditMode={isEditMode}
        logo={data.logo}
        onLogoChange={(logo) => updateData({ ...data, logo })}
        brandName={data.brandName || 'Rilan'}
        onBrandNameChange={(name) => updateData({ ...data, brandName: name })}
      />

      {/* Theme Selector */}
      <ThemeSelector 
        currentTheme={currentTheme} 
        onThemeChange={handleThemeChange} 
      />

      {/* Edit Mode Bar */}
      <EditModeBar />

      {/* Content Workspace */}
      <ContentWorkspace
        isOpen={showWorkspace}
        onClose={() => setShowWorkspace(false)}
        data={data}
        onUpdate={updateData}
      />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <PulsingDot size={6} color="#22c55e" />
                <EditableText
                  value={profile.tagline}
                  onChange={(v) => updateProfile('tagline', v)}
                  className="text-sm text-muted-foreground"
                />
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="block text-muted-foreground text-2xl sm:text-3xl font-normal mb-2">
                  Hi, I'm
                </span>
                <span className="gradient-text-animated inline-block">
                  <EditableText
                    value={profile.name}
                    onChange={(v) => updateProfile('name', v)}
                    className="font-bold"
                  />
                </span>
              </h1>

              <motion.div
                className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <EditableText
                  value={profile.title}
                  onChange={(v) => updateProfile('title', v)}
                />
              </motion.div>

              <motion.p
                className="text-lg text-muted-foreground/80 max-w-lg mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <EditableText
                  value={profile.bio.split('\n')[0]}
                  onChange={(v) => updateProfile('bio', v + '\n' + profile.bio.split('\n').slice(1).join('\n'))}
                  multiline
                />
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <MagneticButton>
                  <Button
                    size="lg"
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 shadow-lg shadow-purple-500/25"
                  >
                    View My Work
                    <Rocket className="ml-2 h-4 w-4" />
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="border-purple-500/30 hover:bg-purple-500/10"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Get In Touch
                  </Button>
                </MagneticButton>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex gap-3 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  { icon: Github, href: profile.social.github, color: 'hover:text-purple-400' },
                  { icon: Linkedin, href: profile.social.linkedin, color: 'hover:text-blue-400' },
                  { icon: Twitter, href: profile.social.twitter, color: 'hover:text-cyan-400' },
                  { icon: Instagram, href: profile.social.instagram, color: 'hover:text-pink-400' },
                  { icon: Mail, href: `mailto:${profile.email}`, color: 'hover:text-green-400' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl glass text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110`}
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Stats Cards */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <FloatingElement duration={8} distance={15}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: `${stats.yearsExperience}+`, label: 'Years Experience', icon: Briefcase, color: 'from-purple-500 to-pink-500', key: 'yearsExperience' },
                    { value: stats.projectsCompleted, label: 'Projects', icon: Code2, color: 'from-cyan-500 to-blue-500', key: 'projectsCompleted' },
                    { value: stats.activeUsers, label: 'Active Users', icon: Users, color: 'from-green-500 to-emerald-500', key: 'activeUsers' },
                    { value: stats.clientRating, label: 'Client Rating', icon: Star, color: 'from-yellow-500 to-orange-500', key: 'clientRating' },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <GlowCard>
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                          <stat.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-3xl font-bold gradient-text">
                          <EditableText
                            value={stat.value}
                            onChange={(v) => updateStats(stat.key, v.replace(/\+$/, ''))}
                          />
                        </div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </GlowCard>
                    </motion.div>
                  ))}
                </div>
              </FloatingElement>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-cyan-500/20 blur-3xl"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-purple-500/50 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-3 rounded-full bg-purple-500"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 lg:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <motion.span
                className="inline-block px-4 py-1 rounded-full glass text-sm text-purple-400 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                About Me
              </motion.span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Who <span className="gradient-text">I Am</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal direction="left">
              <GlowCard className="h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold">My Story</h3>
                </div>
                <div className="text-muted-foreground leading-relaxed mb-6">
                  <MarkdownEditor
                    value={profile.bio}
                    onChange={(v) => updateProfile('bio', v)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: MapPin, text: profile.location, key: 'location' },
                    { icon: Mail, text: profile.email, key: 'email' },
                    { icon: Phone, text: profile.phone, key: 'phone' },
                    { icon: Calendar, text: profile.birthday, key: 'birthday' },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg glass"
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                    >
                      <item.icon className="h-4 w-4 text-purple-400" />
                      <EditableText
                        value={item.text}
                        onChange={(v) => updateProfile(item.key, v)}
                        className="text-sm"
                      />
                    </motion.div>
                  ))}
                </div>
              </GlowCard>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-purple-400" />
                  Core Skills
                </h3>
                {profile.skills.map((skillGroup: any, index: number) => (
                  <ScrollReveal key={index} delay={0.1 * index}>
                    <div className="glass rounded-xl p-5">
                      <h4 className="text-sm font-medium text-purple-400 mb-4 uppercase tracking-wide">
                        {skillGroup.category}
                      </h4>
                      <div className="space-y-3">
                        {skillGroup.items.map((skill: any, skillIndex: number) => (
                          <AnimatedSkillBar
                            key={skillIndex}
                            name={skill.name}
                            level={skill.level}
                            delay={0.1 * skillIndex}
                          />
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Testimonials */}
          <div className="mt-16">
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold">
                  What People <span className="gradient-text">Say</span>
                </h3>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.15}>
              {testimonials.map((testimonial: Testimonial) => (
                <StaggerItem key={testimonial.id}>
                  <InteractiveCard>
                    <GlowCard>
                      <Quote className="h-8 w-8 text-purple-500/30 mb-4" />
                      <div className="text-muted-foreground mb-4 italic">
                        <MarkdownEditor
                          value={testimonial.content}
                          onChange={(v) => {
                            const newTestimonials = testimonials.map((t: Testimonial) =>
                              t.id === testimonial.id ? { ...t, content: v } : t
                            );
                            updateData({ ...data, testimonials: newTestimonials });
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                          <span className="text-lg font-bold">{testimonial.name[0]}</span>
                        </div>
                        <div>
                          <EditableText
                            value={testimonial.name}
                            onChange={(v) => {
                              const newTestimonials = testimonials.map((t: Testimonial) =>
                                t.id === testimonial.id ? { ...t, name: v } : t
                              );
                              updateData({ ...data, testimonials: newTestimonials });
                            }}
                            className="font-semibold"
                          />
                          <EditableText
                            value={testimonial.role}
                            onChange={(v) => {
                              const newTestimonials = testimonials.map((t: Testimonial) =>
                                t.id === testimonial.id ? { ...t, role: v } : t
                              );
                              updateData({ ...data, testimonials: newTestimonials });
                            }}
                            className="text-sm text-muted-foreground"
                          />
                        </div>
                      </div>
                    </GlowCard>
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 lg:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <motion.span
                className="inline-block px-4 py-1 rounded-full glass text-sm text-cyan-400 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                Portfolio
              </motion.span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A selection of my recent work across various technologies and domains
              </p>
              
              {/* Open Workspace Button */}
              {isEditMode && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setShowWorkspace(true)}
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors"
                >
                  <FolderOpen className="h-5 w-5" />
                  Open Content Workspace
                </motion.button>
              )}
            </div>
          </ScrollReveal>

          <Tabs defaultValue="featured" className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-2 mb-8 glass">
              <TabsTrigger value="featured" className="data-[state=active]:bg-purple-500/20">
                Featured
              </TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-purple-500/20">
                All Projects
              </TabsTrigger>
            </TabsList>

            <TabsContent value="featured">
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
                {featuredProjects.map((project: Project) => (
                  <StaggerItem key={project.id}>
                    <ProjectCard 
                      project={project} 
                      isEditMode={isEditMode}
                      onUpdate={(updated) => {
                        const newProjects = projects.map((p: Project) =>
                          p.id === updated.id ? updated : p
                        );
                        updateData({ ...data, projects: newProjects });
                      }}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TabsContent>

            <TabsContent value="all">
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
                {projects.map((project: Project) => (
                  <StaggerItem key={project.id}>
                    <ProjectCard 
                      project={project} 
                      isEditMode={isEditMode}
                      onUpdate={(updated) => {
                        const newProjects = projects.map((p: Project) =>
                          p.id === updated.id ? updated : p
                        );
                        updateData({ ...data, projects: newProjects });
                      }}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 lg:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <motion.span
                className="inline-block px-4 py-1 rounded-full glass text-sm text-green-400 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                Career
              </motion.span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Work <span className="gradient-text">Experience</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 md:-translate-x-px" />

            <StaggerContainer className="space-y-12" staggerDelay={0.2}>
              {experience.map((job: Experience, index: number) => (
                <StaggerItem key={job.id}>
                  <div className={`relative flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 border-4 border-[#0b0e18] md:-translate-x-1/2 z-10">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-purple-500"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>

                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <InteractiveCard>
                        <GlowCard>
                          <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                            {job.current && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                Current
                              </Badge>
                            )}
                            <EditableText
                              value={`${job.startDate} - ${job.current ? 'Present' : job.endDate}`}
                              onChange={(v) => {
                                const [start, end] = v.split(' - ');
                                const newExp = experience.map((e: Experience) =>
                                  e.id === job.id ? { ...e, startDate: start, endDate: end === 'Present' ? '' : end, current: end === 'Present' } : e
                                );
                                updateData({ ...data, experience: newExp });
                              }}
                              className="text-sm text-muted-foreground"
                            />
                          </div>
                          <EditableText
                            value={job.position}
                            onChange={(v) => {
                              const newExp = experience.map((e: Experience) =>
                                e.id === job.id ? { ...e, position: v } : e
                              );
                              updateData({ ...data, experience: newExp });
                            }}
                            className="text-xl font-bold"
                            as="h3"
                          />
                          <EditableText
                            value={job.company}
                            onChange={(v) => {
                              const newExp = experience.map((e: Experience) =>
                                e.id === job.id ? { ...e, company: v } : e
                              );
                              updateData({ ...data, experience: newExp });
                            }}
                            className="text-purple-400 mb-3"
                          />
                          <div className={`flex items-center gap-1 mb-3 text-sm text-muted-foreground ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                            <MapPin className="h-3 w-3" />
                            <EditableText
                              value={job.location}
                              onChange={(v) => {
                                const newExp = experience.map((e: Experience) =>
                                  e.id === job.id ? { ...e, location: v } : e
                                );
                                updateData({ ...data, experience: newExp });
                              }}
                            />
                          </div>
                          <div className={`space-y-2 mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                            <MarkdownEditor
                              value={job.description.join('\n')}
                              onChange={(v) => {
                                const newExp = experience.map((e: Experience) =>
                                  e.id === job.id ? { ...e, description: v.split('\n').filter(l => l.trim()) } : e
                                );
                                updateData({ ...data, experience: newExp });
                              }}
                            />
                          </div>
                          <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                            {job.technologies.map((tech: string, techIndex: number) => (
                              <Badge key={techIndex} variant="secondary" className="text-xs bg-purple-500/10 text-purple-300">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </GlowCard>
                      </InteractiveCard>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 lg:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <motion.span
                className="inline-block px-4 py-1 rounded-full glass text-sm text-yellow-400 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                Expertise
              </motion.span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Technical <span className="gradient-text">Skills</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {[
              { label: 'Mobile Development', value: 95, icon: Cpu },
              { label: 'Web Development', value: 90, icon: Globe },
              { label: 'Backend & APIs', value: 88, icon: Database },
              { label: 'AI/ML & DevOps', value: 85, icon: Cloud },
            ].map((skill, index) => (
              <StaggerItem key={index}>
                <GlowCard className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                    <skill.icon className="h-8 w-8 text-purple-400" />
                  </div>
                  <CircularProgress value={skill.value} label={skill.label} size={100} delay={0.2 * index} />
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 lg:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <motion.span
                className="inline-block px-4 py-1 rounded-full glass text-sm text-pink-400 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                Blog
              </motion.span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Latest <span className="gradient-text">Articles</span>
              </h2>
              
              {/* Open Workspace Button */}
              {isEditMode && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setShowWorkspace(true)}
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors"
                >
                  <Edit3 className="h-5 w-5" />
                  Edit Blog Posts
                </motion.button>
              )}
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.15}>
            {blogPosts.map((post: BlogPost) => (
              <StaggerItem key={post.id}>
                <InteractiveCard>
                  <GlowCard className="group cursor-pointer">
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10 flex items-center justify-center mb-4 overflow-hidden">
                      <BookOpen className="h-12 w-12 text-purple-400/50 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.readTime}
                      </span>
                    </div>
                    <EditableText
                      value={post.title}
                      onChange={(v) => {
                        const newPosts = blogPosts.map((p: BlogPost) =>
                          p.id === post.id ? { ...p, title: v } : p
                        );
                        updateData({ ...data, blogPosts: newPosts });
                      }}
                      className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors"
                      as="h3"
                    />
                    <EditableText
                      value={post.excerpt}
                      onChange={(v) => {
                        const newPosts = blogPosts.map((p: BlogPost) =>
                          p.id === post.id ? { ...p, excerpt: v } : p
                        );
                        updateData({ ...data, blogPosts: newPosts });
                      }}
                      className="text-sm text-muted-foreground line-clamp-2"
                      multiline
                    />
                  </GlowCard>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <motion.span
                className="inline-block px-4 py-1 rounded-full glass text-sm text-orange-400 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                Contact
              </motion.span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Let's <span className="gradient-text">Connect</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have a project in mind or just want to chat? I'd love to hear from you
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto" staggerDelay={0.1}>
            {[
              { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}`, color: 'from-red-500 to-pink-500' },
              { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}`, color: 'from-green-500 to-emerald-500' },
              { icon: Linkedin, label: 'LinkedIn', value: 'Connect', href: profile.social.linkedin, color: 'from-blue-500 to-cyan-500' },
              { icon: Github, label: 'GitHub', value: 'Follow', href: profile.social.github, color: 'from-purple-500 to-violet-500' },
            ].map((contact, index) => (
              <StaggerItem key={index}>
                <motion.a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GlowCard className="text-center">
                    <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center`}>
                      <contact.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">{contact.label}</h3>
                    <p className="text-sm text-muted-foreground truncate">{contact.value}</p>
                  </GlowCard>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="font-bold text-xl gradient-text">{profile.name}</p>
              <p className="text-sm text-muted-foreground">{profile.title}</p>
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {[Github, Linkedin, Twitter, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href={Object.values(profile.social)[index] as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass text-muted-foreground hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} All rights reserved.
              </p>
              <button
                onClick={() => setShowAdmin(true)}
                className="text-xs text-muted-foreground hover:text-purple-400 transition-colors"
              >
                Admin
              </button>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-8 p-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/30 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// Project Card Component with Edit Support
interface ProjectCardProps {
  project: Project;
  isEditMode: boolean;
  onUpdate: (project: Project) => void;
}

function ProjectCard({ project, isEditMode, onUpdate }: ProjectCardProps) {
  return (
    <InteractiveCard className="h-full">
      <div className="relative h-full glass-card rounded-xl overflow-hidden group">
        {/* Image */}
        <div className="aspect-video relative overflow-hidden">
          <ImageUpload
            src={project.image || ''}
            onChange={(src) => onUpdate({ ...project, image: src })}
            aspectRatio="video"
            className="w-full"
          />
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0">
                <Star className="h-3 w-3 mr-1" /> Featured
              </Badge>
            </div>
          )}

          {/* Hover Actions */}
          {!isEditMode && project.demoUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
            >
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink className="h-5 w-5" />
              </motion.a>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="secondary" className="text-xs bg-purple-500/10 text-purple-300">
                {tag}
              </Badge>
            ))}
          </div>
          
          {isEditMode ? (
            <>
              <input
                type="text"
                value={project.title}
                onChange={(e) => onUpdate({ ...project, title: e.target.value })}
                className="w-full text-lg font-semibold bg-transparent border-b border-purple-500/30 focus:border-purple-500 outline-none mb-2"
              />
              <textarea
                value={project.description}
                onChange={(e) => onUpdate({ ...project, description: e.target.value })}
                rows={2}
                className="w-full text-sm text-muted-foreground bg-transparent border-b border-purple-500/30 focus:border-purple-500 outline-none resize-none"
              />
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            </>
          )}
        </div>

        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10" />
        </div>
      </div>
    </InteractiveCard>
  );
}

// Main App with Provider
function App() {
  return (
    <EditModeProvider>
      <AppContent />
    </EditModeProvider>
  );
}

export default App;
