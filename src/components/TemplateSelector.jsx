import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const TemplateSelector = ({ selectedTemplate, onTemplateChange }) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design with sidebar layout.',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional professional layout, timeless appeal.',
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and artistic design with unique elements.',
      color: 'from-pink-500 to-orange-500'
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      description: 'Simple, elegant, and focused on content clarity.',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 'tech',
      name: 'Tech',
      description: 'Sleek, professional, and geared for tech roles.',
      color: 'from-indigo-600 to-blue-700'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text mb-2">Choose Your Template</h2>
        <p className="text-muted-foreground">Select a template that best represents your style</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl dark:bg-gray-800 ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-purple-500 shadow-lg dark:ring-purple-400' 
                  : 'hover:shadow-md dark:hover:shadow-purple-900/50'
              }`}
              onClick={() => onTemplateChange(template.id)}
            >
              <CardContent className="p-0">
                <div className={`h-48 bg-gradient-to-br ${template.color} rounded-t-lg relative overflow-hidden`}>
                  {/* Placeholder for template visual */}
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                      <div className="w-16 h-20 bg-white bg-opacity-30 rounded mx-auto mb-2 opacity-50"></div>
                      <div className="space-y-1 opacity-50">
                        <div className="w-12 h-1 bg-white bg-opacity-50 rounded mx-auto"></div>
                        <div className="w-16 h-1 bg-white bg-opacity-50 rounded mx-auto"></div>
                        <div className="w-10 h-1 bg-white bg-opacity-50 rounded mx-auto"></div>
                      </div>
                    </div>
                  </div>
                   {selectedTemplate === template.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg"
                    >
                      <Check className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </motion.div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 h-12 overflow-hidden">{template.description}</p>
                  
                  <Button 
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTemplateChange(template.id);
                    }}
                  >
                    {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;