import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { formatDate, getContrastColor } from '@/utils/templateUtils';

const CreativeTemplate = ({ resumeData, colorScheme }) => {
  const styles = {
    primary: colorScheme.primary,
    secondary: colorScheme.secondary,
    accent: colorScheme.accent,
    headerBg: `conic-gradient(from 0deg, ${colorScheme.primary}, ${colorScheme.secondary}, ${colorScheme.accent}, ${colorScheme.primary})`,
    textColorOnPrimary: getContrastColor(colorScheme.primary),
    textColorOnSecondary: getContrastColor(colorScheme.secondary),
    bodyTextColor: 'var(--resume-preview-text)',
  };

  return (
    <div className="grid grid-cols-4 gap-0" style={{ minHeight: '297mm', width: '210mm', backgroundColor: 'var(--resume-preview-bg)' }}>
      {/* Creative Sidebar */}
      <div className="col-span-1 space-y-6 p-4" style={{ backgroundColor: `${styles.secondary}30` }}>
        <div className="text-center">
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-full animate-pulse-slow"
              style={{ background: styles.headerBg }}
            />
            <Avatar className="relative h-32 w-32 mx-auto mb-4 border-4 border-white shadow-xl">
              <AvatarImage src={resumeData.personalInfo.profileImage} alt="Profile" />
              <AvatarFallback style={{ backgroundColor: styles.primary, color: styles.textColorOnPrimary }}>
                <User className="h-16 w-16" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Contact with creative styling */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-center" style={{ color: styles.primary }}>
            CONTACT
          </h3>
          <div className="space-y-3 text-sm" style={{ color: styles.textColorOnSecondary }}>
            {resumeData.personalInfo.email && (
              <div className="flex flex-col items-center space-y-1 p-2 rounded-lg" style={{ backgroundColor: `${styles.accent}40` }}>
                <Mail className="h-5 w-5" style={{ color: styles.primary }} />
                <span className="text-center break-all" style={{ color: styles.bodyTextColor }}>{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex flex-col items-center space-y-1 p-2 rounded-lg" style={{ backgroundColor: `${styles.accent}40` }}>
                <Phone className="h-5 w-5" style={{ color: styles.primary }} />
                <span style={{ color: styles.bodyTextColor }}>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex flex-col items-center space-y-1 p-2 rounded-lg" style={{ backgroundColor: `${styles.accent}40` }}>
                <MapPin className="h-5 w-5" style={{ color: styles.primary }} />
                <span className="text-center" style={{ color: styles.bodyTextColor }}>{resumeData.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills with creative layout */}
        {resumeData.skills.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-center" style={{ color: styles.primary }}>
              SKILLS
            </h3>
            <div className="space-y-2">
              {resumeData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="text-center py-2 px-3 rounded-full text-sm font-medium transform hover:scale-105 transition-transform"
                  style={{ 
                    background: `linear-gradient(45deg, ${styles.secondary}, ${styles.accent})`,
                    color: styles.textColorOnSecondary,
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="col-span-3 space-y-8 p-6" style={{ color: styles.bodyTextColor }}>
        {/* Name Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 creative-template-name" style={{ color: styles.primary }}>
            {resumeData.personalInfo.fullName || 'Your Name'}
          </h1>
          <div 
            className="h-1 w-24 mx-auto rounded-full"
            style={{ background: `linear-gradient(90deg, ${styles.secondary}, ${styles.accent})` }}
          />
        </div>

        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="relative">
            <div 
              className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
              style={{ background: `linear-gradient(180deg, ${styles.primary}, ${styles.secondary})` }}
            />
            <h3 className="text-xl font-bold mb-3" style={{ color: styles.primary }}>
              ABOUT ME
            </h3>
            <p className="leading-relaxed italic" style={{ color: styles.bodyTextColor }}>
              {resumeData.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div className="relative">
            <div 
              className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
              style={{ background: `linear-gradient(180deg, ${styles.primary}, ${styles.secondary})` }}
            />
            <h3 className="text-xl font-bold mb-4" style={{ color: styles.primary }}>
              EXPERIENCE
            </h3>
            <div className="space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="relative pl-6">
                  <div 
                    className="absolute left-0 top-2 w-3 h-3 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: styles.accent }}
                  />
                  <div className="p-4 rounded-lg shadow-md border-l-4" style={{ borderColor: styles.secondary, backgroundColor: 'var(--resume-preview-bg)' }}>
                    <h4 className="text-lg font-bold" style={{ color: styles.bodyTextColor }}>
                      {exp.position || 'Position'}
                    </h4>
                    <p className="font-semibold" style={{ color: styles.primary }}>
                      {exp.company || 'Company'}
                    </p>
                    <div className="flex items-center space-x-1 text-sm mb-2" style={{ color: styles.bodyTextColor, opacity: 0.7 }}>
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-sm leading-relaxed" style={{ color: styles.bodyTextColor }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="relative">
            <div 
              className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
              style={{ background: `linear-gradient(180deg, ${styles.primary}, ${styles.secondary})` }}
            />
            <h3 className="text-xl font-bold mb-4" style={{ color: styles.primary }}>
              EDUCATION
            </h3>
            <div className="space-y-6">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="relative pl-6">
                  <div 
                    className="absolute left-0 top-2 w-3 h-3 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: styles.accent }}
                  />
                  <div className="p-4 rounded-lg shadow-md border-l-4" style={{ borderColor: styles.secondary, backgroundColor: 'var(--resume-preview-bg)' }}>
                    <h4 className="text-lg font-bold" style={{ color: styles.bodyTextColor }}>
                      {edu.degree || 'Degree'}
                    </h4>
                    <p className="font-semibold" style={{ color: styles.primary }}>
                      {edu.institution || 'Institution'}
                    </p>
                    <div className="flex items-center space-x-1 text-sm mb-2" style={{ color: styles.bodyTextColor, opacity: 0.7 }}>
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                    {edu.description && (
                      <p className="text-sm leading-relaxed" style={{ color: styles.bodyTextColor }}>
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;