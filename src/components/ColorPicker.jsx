import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, RotateCcw } from 'lucide-react';

const ColorPicker = ({ colorScheme, onColorSchemeChange }) => {
  const predefinedSchemes = [
    {
      name: 'Purple Gradient',
      primary: '#8B5CF6',
      secondary: '#A78BFA',
      accent: '#C4B5FD'
    },
    {
      name: 'Ocean Blue',
      primary: '#0EA5E9',
      secondary: '#38BDF8',
      accent: '#7DD3FC'
    },
    {
      name: 'Forest Green',
      primary: '#059669',
      secondary: '#10B981',
      accent: '#34D399'
    },
    {
      name: 'Sunset Orange',
      primary: '#EA580C',
      secondary: '#FB923C',
      accent: '#FDBA74'
    },
    {
      name: 'Rose Pink',
      primary: '#E11D48',
      secondary: '#F43F5E',
      accent: '#FB7185'
    },
    {
      name: 'Royal Purple',
      primary: '#7C3AED',
      secondary: '#8B5CF6',
      accent: '#A78BFA'
    },
    {
      name: 'Emerald',
      primary: '#047857',
      secondary: '#059669',
      accent: '#10B981'
    },
    {
      name: 'Amber',
      primary: '#D97706',
      secondary: '#F59E0B',
      accent: '#FBBF24'
    },
    {
      name: 'Indigo',
      primary: '#4338CA',
      secondary: '#6366F1',
      accent: '#818CF8'
    },
    {
      name: 'Teal',
      primary: '#0F766E',
      secondary: '#14B8A6',
      accent: '#5EEAD4'
    },
    {
      name: 'Crimson',
      primary: '#BE123C',
      secondary: '#E11D48',
      accent: '#F43F5E'
    },
    {
      name: 'Slate',
      primary: '#475569',
      secondary: '#64748B',
      accent: '#94A3B8'
    }
  ];

  const resetToDefault = () => {
    onColorSchemeChange(predefinedSchemes[0]);
  };

  return (
    <Card className="glass-effect">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Palette className="h-5 w-5" />
          <span>Color Scheme</span>
        </CardTitle>
        <Button variant="outline" size="sm" onClick={resetToDefault}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Choose a color scheme that matches your personality and industry
          </div>
          
          <div className="color-picker-grid">
            {predefinedSchemes.map((scheme, index) => (
              <motion.div
                key={scheme.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`cursor-pointer p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                  colorScheme.name === scheme.name 
                    ? 'border-purple-500 shadow-lg' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
                onClick={() => onColorSchemeChange(scheme)}
              >
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    <div 
                      className="w-4 h-4 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: scheme.primary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: scheme.secondary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: scheme.accent }}
                    />
                  </div>
                  <div className="text-xs font-medium text-center">
                    {scheme.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Current Color Preview */}
          <div className="mt-6 p-4 rounded-lg border bg-gray-50 dark:bg-gray-800">
            <div className="text-sm font-medium mb-3">Current Scheme: {colorScheme.name}</div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">Primary</div>
                <div 
                  className="w-full h-8 rounded border"
                  style={{ backgroundColor: colorScheme.primary }}
                />
                <div className="text-xs mt-1 font-mono">{colorScheme.primary}</div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">Secondary</div>
                <div 
                  className="w-full h-8 rounded border"
                  style={{ backgroundColor: colorScheme.secondary }}
                />
                <div className="text-xs mt-1 font-mono">{colorScheme.secondary}</div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">Accent</div>
                <div 
                  className="w-full h-8 rounded border"
                  style={{ backgroundColor: colorScheme.accent }}
                />
                <div className="text-xs mt-1 font-mono">{colorScheme.accent}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPicker;