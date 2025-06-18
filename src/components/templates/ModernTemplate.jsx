import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { formatDate, getContrastColor } from '@/utils/templateUtils';

const ModernTemplate = ({ resumeData, colorScheme }) => {
  const styles = {
    primary: colorScheme.primary,
    secondary: colorScheme.secondary,
    accent: colorScheme.accent,
    textColorOnPrimary: getContrastColor(colorScheme.primary),
    textColorOnSecondary: getContrastColor(colorScheme.secondary),
    textColorOnAccent: getContrastColor(colorScheme.accent),
    bodyTextColor: 'var(--resume-preview-text)',
  };

  return (
    <div className="grid grid-cols-3 gap-0" style={{ minHeight: '297mm', width: '210mm', backgroundColor: 'var(--resume-preview-bg)' }}>
      {/* Sidebar */}
      <div className="col-span-1 space-y-6 p-6" style={{ backgroundColor: styles.secondary, color: styles.textColorOnSecondary }}>
        {/* Profile */}
        <div className="text-center">
          <Avatar className="h-32 w-32 mx-auto mb-4 border-4 shadow-lg" style={{ borderColor: styles.accent }}>
            <AvatarImage src={resumeData.personalInfo.profileImage} alt="Profile" />
            <AvatarFallback style={{ backgroundColor: styles.primary, color: styles.textColorOnPrimary }}>
              <User className="h-16 w-16" />
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mb-2 modern-template-name" style={{ color: styles.textColorOnSecondary }}>
            {resumeData.personalInfo.fullName || 'Your Name'}
          </h1>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold" style={{ color: styles.primary }}>
            Contact
          </h3>
          <div className="space-y-2 text-sm" style={{ color: styles.textColorOnSecondary }}>
            {resumeData.personalInfo.email && (
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" style={{ color: styles.accent }} />
                <span>{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" style={{ color: styles.accent }} />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" style={{ color: styles.accent }} />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold" style={{ color: styles.primary }}>
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{ backgroundColor: styles.accent, color: styles.textColorOnAccent }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="col-span-2 space-y-6 p-6" style={{ color: styles.bodyTextColor }}>
        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div>
            <h3 className="text-xl font-semibold mb-3" style={{ color: styles.primary }}>
              Professional Summary
            </h3>
            <p className="leading-relaxed" style={{ color: styles.bodyTextColor }}>
              {resumeData.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: styles.primary }}>
              Work Experience
            </h3>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="border-l-4 pl-4" style={{ borderColor: styles.accent }}>
                  <h4 className="text-lg font-semibold" style={{ color: styles.bodyTextColor }}>
                    {exp.position || 'Position'}
                  </h4>
                  <p className="font-medium" style={{ color: styles.bodyTextColor, opacity: 0.8 }}>
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
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: styles.primary }}>
              Education
            </h3>
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="border-l-4 pl-4" style={{ borderColor: styles.accent }}>
                  <h4 className="text-lg font-semibold" style={{ color: styles.bodyTextColor }}>
                    {edu.degree || 'Degree'}
                  </h4>
                  <p className="font-medium" style={{ color: styles.bodyTextColor, opacity: 0.8 }}>
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;