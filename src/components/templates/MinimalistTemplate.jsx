import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { formatDate } from '@/utils/templateUtils';

const MinimalistTemplate = ({ resumeData, colorScheme }) => {
  const styles = {
    primary: colorScheme.primary,
    bodyTextColor: 'var(--resume-preview-text)',
  };

  return (
    <div className="p-8 font-sans" style={{ minHeight: '297mm', width: '210mm', backgroundColor: 'var(--resume-preview-bg)', color: styles.bodyTextColor }}>
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-1" style={{ color: styles.primary }}>
          {resumeData.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center items-center space-x-4 text-sm" style={{ color: styles.bodyTextColor }}>
          {resumeData.personalInfo.email && (
            <a href={`mailto:${resumeData.personalInfo.email}`} className="hover:underline flex items-center" style={{ color: styles.bodyTextColor }}>
              <Mail className="h-4 w-4 mr-1" style={{ color: styles.primary }}/> {resumeData.personalInfo.email}
            </a>
          )}
          {resumeData.personalInfo.phone && (
            <span className="flex items-center" style={{ color: styles.bodyTextColor }}>
              <Phone className="h-4 w-4 mr-1" style={{ color: styles.primary }}/> {resumeData.personalInfo.phone}
            </span>
          )}
          {resumeData.personalInfo.location && (
            <span className="flex items-center" style={{ color: styles.bodyTextColor }}>
              <MapPin className="h-4 w-4 mr-1" style={{ color: styles.primary }}/> {resumeData.personalInfo.location}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold uppercase tracking-wider mb-2 border-b-2 pb-1" style={{ borderColor: styles.primary, color: styles.bodyTextColor }}>
            Summary
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: styles.bodyTextColor }}>
            {resumeData.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold uppercase tracking-wider mb-3 border-b-2 pb-1" style={{ borderColor: styles.primary, color: styles.bodyTextColor }}>
            Experience
          </h2>
          <div className="space-y-4">
            {resumeData.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-medium" style={{ color: styles.bodyTextColor }}>{exp.position || 'Position'}</h3>
                  <span className="text-xs" style={{ color: styles.bodyTextColor, opacity: 0.7 }}>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                <p className="text-sm italic" style={{ color: styles.bodyTextColor, opacity: 0.8 }}>{exp.company || 'Company'}</p>
                {exp.description && (
                  <p className="text-xs mt-1 leading-normal" style={{ color: styles.bodyTextColor }}>
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
        <div className="mb-8">
          <h2 className="text-lg font-semibold uppercase tracking-wider mb-3 border-b-2 pb-1" style={{ borderColor: styles.primary, color: styles.bodyTextColor }}>
            Education
          </h2>
          <div className="space-y-4">
            {resumeData.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-medium" style={{ color: styles.bodyTextColor }}>{edu.degree || 'Degree'}</h3>
                  <span className="text-xs" style={{ color: styles.bodyTextColor, opacity: 0.7 }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                </div>
                <p className="text-sm italic" style={{ color: styles.bodyTextColor, opacity: 0.8 }}>{edu.institution || 'Institution'}</p>
                {edu.description && (
                  <p className="text-xs mt-1 leading-normal" style={{ color: styles.bodyTextColor }}>
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
          <h2 className="text-lg font-semibold uppercase tracking-wider mb-3 border-b-2 pb-1" style={{ borderColor: styles.primary, color: styles.bodyTextColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded text-xs border"
                style={{ borderColor: styles.primary, color: styles.bodyTextColor }}
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

export default MinimalistTemplate;