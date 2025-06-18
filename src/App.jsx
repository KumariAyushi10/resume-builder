import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/toaster';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Header from '@/components/Header';
import ResumeEditor from '@/components/ResumeEditor';
import ResumePreview from '@/components/ResumePreview';
import TemplateSelector from '@/components/TemplateSelector';
import ColorPicker from '@/components/ColorPicker';
import { Edit3, Palette, Layout, Eye } from 'lucide-react';

const App = () => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const initialResumeData = {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      profileImage: '',
      title: '', 
      linkedin: '', 
      github: '', 
      portfolio: '' 
    },
    experience: [],
    education: [],
    skills: [],
  };
  const [resumeData, setResumeData] = useLocalStorage('resumeData', initialResumeData);

  const [selectedTemplate, setSelectedTemplate] = useLocalStorage('selectedTemplate', 'modern');
  
  const [colorScheme, setColorScheme] = useLocalStorage('colorScheme', {
    name: 'Purple Gradient',
    primary: '#8B5CF6',
    secondary: '#A78BFA',
    accent: '#C4B5FD'
  });

  const handleSave = () => {
    console.log('Resume data saved to localStorage:', resumeData);
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  const pdfExportRef = useRef(null);
  const [pdfExportKey, setPdfExportKey] = useState(0); 

  useEffect(() => {
    setPdfExportKey(prevKey => prevKey + 1);
  }, [resumeData, selectedTemplate, colorScheme]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 text-foreground">
      <Header 
        isPreviewMode={isPreviewMode}
        setIsPreviewMode={setIsPreviewMode}
        resumeData={resumeData}
        onSave={handleSave}
        className="no-print"
        selectedTemplate={selectedTemplate}
        colorScheme={colorScheme}
      />

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {isPreviewMode ? (
            <motion.div
              key="preview-mode"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-4xl">
                <div className="text-center mb-8 no-print">
                  <h1 className="text-3xl font-bold gradient-text mb-2">Resume Preview</h1>
                  <p className="text-muted-foreground">This is how your resume will look when exported</p>
                </div>
                <ResumePreview 
                  resumeData={resumeData}
                  template={selectedTemplate}
                  colorScheme={colorScheme}
                  isPreviewForPdf={false} 
                  id="live-resume-preview"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="editor-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="no-print"
            >
              <div className="text-center mb-8">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-bold gradient-text mb-4"
                >
                  Build Your Perfect Resume
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-muted-foreground max-w-2xl mx-auto"
                >
                  Create a professional resume that stands out with our modern templates and customization options
                </motion.p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted dark:bg-gray-800">
                      <TabsTrigger value="content" className="flex items-center space-x-2 data-[state=active]:bg-background dark:data-[state=active]:bg-gray-700 data-[state=active]:text-foreground dark:data-[state=active]:text-white">
                        <Edit3 className="h-4 w-4" />
                        <span>Content</span>
                      </TabsTrigger>
                      <TabsTrigger value="template" className="flex items-center space-x-2 data-[state=active]:bg-background dark:data-[state=active]:bg-gray-700 data-[state=active]:text-foreground dark:data-[state=active]:text-white">
                        <Layout className="h-4 w-4" />
                        <span>Template</span>
                      </TabsTrigger>
                      <TabsTrigger value="colors" className="flex items-center space-x-2 data-[state=active]:bg-background dark:data-[state=active]:bg-gray-700 data-[state=active]:text-foreground dark:data-[state=active]:text-white">
                        <Palette className="h-4 w-4" />
                        <span>Colors</span>
                      </TabsTrigger>
                    </TabsList>

                    <AnimatePresence mode="wait">
                      <TabsContent value="content">
                        <motion.div
                          variants={tabVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ duration: 0.3 }}
                        >
                          <ResumeEditor 
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                          />
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="template">
                        <motion.div
                          variants={tabVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ duration: 0.3 }}
                        >
                          <TemplateSelector 
                            selectedTemplate={selectedTemplate}
                            onTemplateChange={setSelectedTemplate}
                          />
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="colors">
                        <motion.div
                          variants={tabVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ duration: 0.3 }}
                        >
                          <ColorPicker 
                            colorScheme={colorScheme}
                            onColorSchemeChange={setColorScheme}
                          />
                        </motion.div>
                      </TabsContent>
                    </AnimatePresence>
                  </Tabs>
                </div>

                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="sticky top-24"
                  >
                    <div className="glass-effect rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        <h3 className="font-semibold text-foreground">Live Preview</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        See your changes in real-time
                      </p>
                    </div>
                    
                    <div className="transform scale-50 origin-top-left w-[200%] h-[200%] overflow-hidden rounded-lg shadow-2xl">
                      <ResumePreview 
                        resumeData={resumeData}
                        template={selectedTemplate}
                        colorScheme={colorScheme}
                        isPreviewForPdf={false}
                        id="live-resume-preview-scaled"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <div className="fixed top-1/4 left-4 animate-float -z-10 no-print">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 dark:opacity-20 blur-xl"></div>
      </div>
      <div className="fixed bottom-1/4 right-8 animate-float -z-10 no-print" style={{ animationDelay: '2s' }}>
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-10 dark:opacity-20 blur-xl"></div>
      </div>
      <div className="fixed top-1/2 right-1/4 animate-float -z-10 no-print" style={{ animationDelay: '4s' }}>
        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-full opacity-10 dark:opacity-20 blur-xl"></div>
      </div>

      <div ref={pdfExportRef} id="pdf-export-target" className="fixed -left-[9999px] -top-[9999px] opacity-100 pointer-events-none bg-white w-[210mm] h-auto min-h-[297mm]">
         <ResumePreview 
            key={pdfExportKey}
            resumeData={resumeData}
            template={selectedTemplate}
            colorScheme={colorScheme}
            isPreviewForPdf={true}
            id="pdf-export-resume-preview"
          />
      </div>

      <Toaster />
    </div>
  );
};

export default App;