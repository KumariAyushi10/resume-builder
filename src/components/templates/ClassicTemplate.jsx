import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { formatDate, getContrastColor } from '@/utils/templateUtils';

const ClassicTemplate = ({ resumeData, colorScheme }) => {
  const styles = {
    primary: colorScheme.primary,
    secondary: colorScheme.secondary,
    accent: colorScheme.accent,
    headerTextColor: getContrastColor(colorScheme.primary),
    textColorOnSecondary: getContrastColor(colorScheme.secondary),
    bodyTextColor: 'var(--resume-preview-text)',
  };

  return (
    <div className="space-y-6 p-6" style={{ minHeight: '297mm', width: '210mm', backgroundColor: 'var(--resume-preview-bg)', color: styles.bodyTextColor }}>
      {/* Header */}
      <div className="text-center py-8 px-6 rounded-lg" style={{ backgroundColor: styles.primary, color: styles.headerTextColor }}>
        <Avatar className="h-24 w-24 mx-auto mb-4 border-4" style={{ borderColor: styles.accent }}>
          <AvatarImage src={resumeData.personalInfo.profileImage} alt="Profile" />
          <AvatarFallback style={{ backgroundColor: styles.secondary, color: styles.textColorOnSecondary }}>
            <User className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold mb-2 classic-template-name">
          {resumeData.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {resumeData.personalInfo.email && (
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>{resumeData.personalInfo.email}</span>
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>{resumeData.personalInfo.phone}</span>
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{resumeData.personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div>
          <h3 className="text-xl font-semibold mb-3 pb-2 border-b-2" style={{ borderColor: styles.primary, color: styles.primary }}>
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
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b-2" style={{ borderColor: styles.primary, color: styles.primary }}>
            Work Experience
          </h3>
          <div className="space-y-4">
            {resumeData.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
                  <div>
                    <h4 className="text-lg font-semibold" style={{ color: styles.bodyTextColor }}>
                      {exp.position || 'Position'}
                    </h4>
                    <p className="font-medium" style={{ color: styles.bodyTextColor, opacity: 0.8 }}>
                      {exp.company || 'Company'}
                    </p>
                  </div>
                  <div className="text-sm mt-1 sm:mt-0" style={{ color: styles.bodyTextColor, opacity: 0.7 }}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </div>
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
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b-2" style={{ borderColor: styles.primary, color: styles.primary }}>
            Education
          </h3>
          <div className="space-y-4">
            {resumeData.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
                  <div>
                    <h4 className="text-lg font-semibold" style={{ color: styles.bodyTextColor }}>
                      {edu.degree || 'Degree'}
                    </h4>
                    <p className="font-medium" style={{ color: styles.bodyTextColor, opacity: 0.8 }}>
                      {edu.institution || 'Institution'}
                    </p>
                  </div>
                  <div className="text-sm mt-1 sm:mt-0" style={{ color: styles.bodyTextColor, opacity: 0.7 }}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
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

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b-2" style={{ borderColor: styles.primary, color: styles.primary }}>
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: styles.secondary, color: styles.textColorOnSecondary }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;