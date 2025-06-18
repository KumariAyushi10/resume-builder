import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Download, Eye, EyeOff, Save, FileText } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/components/ui/use-toast';
import { generatePDF } from '@/utils/pdfGenerator';

const Header = ({ isPreviewMode, setIsPreviewMode, resumeData, onSave, selectedTemplate, colorScheme }) => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleExportPDF = async () => {
    try {
      await generatePDF('pdf-export-resume-preview', `${resumeData.personalInfo.fullName || 'resume'}.pdf`);
      toast({
        title: "PDF exported successfully!",
        description: "Your resume has been downloaded as a PDF file."
      });
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSave = () => {
    onSave();
    toast({
      title: "Resume saved!",
      description: "Your resume has been saved successfully."
    });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold gradient-text">ResumeBuilder Pro</h1>
            </motion.div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className="hidden sm:flex"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              {isPreviewMode ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Edit Mode</span>
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Preview</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:from-purple-700 hover:to-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;