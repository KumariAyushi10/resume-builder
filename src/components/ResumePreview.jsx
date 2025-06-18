import React from 'react';
import { motion } from 'framer-motion';
import ModernTemplate from '@/components/templates/ModernTemplate';
import ClassicTemplate from '@/components/templates/ClassicTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';
import MinimalistTemplate from '@/components/templates/MinimalistTemplate';
import TechTemplate from '@/components/templates/TechTemplate';

const ResumePreview = ({ resumeData, template, colorScheme, isPreviewForPdf = false, id }) => {
  const renderTemplate = () => {
    const props = { resumeData, colorScheme, isPdf: isPreviewForPdf };
    switch (template) {
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'classic':
        return <ClassicTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      case 'minimalist':
        return <MinimalistTemplate {...props} />;
      case 'tech':
        return <TechTemplate {...props} />;
      default:
        return <ModernTemplate {...props} />;
    }
  };

  const previewId = id || (isPreviewForPdf ? "pdf-export-resume-preview" : "resume-preview");

  return (
    <motion.div
      initial={{ opacity: 0, scale: isPreviewForPdf ? 1 : 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`resume-preview p-0 rounded-lg shadow-xl min-h-[297mm] w-[210mm] max-w-[210mm] mx-auto overflow-hidden ${isPreviewForPdf ? 'pdf-export-styles' : 'interactive-preview'}`}
      id={previewId}
      style={isPreviewForPdf ? { backgroundColor: '#ffffff', color: '#000000' } : {}}
    >
      {renderTemplate()}
    </motion.div>
  );
};

export default ResumePreview;