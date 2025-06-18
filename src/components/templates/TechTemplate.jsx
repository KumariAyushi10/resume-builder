import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Linkedin, Github, Globe } from 'lucide-react';
import { formatDate, getContrastColor } from '@/utils/templateUtils';

const TechTemplate = ({ resumeData, colorScheme, isPdf = false }) => {
  const styles = {
    primary: colorScheme.primary,
    secondary: colorScheme.secondary,
    accent: colorScheme.accent,
    textColorOnPrimary: getContrastColor(colorScheme.primary),
    sidebarBg: isPdf ? '#1a202c' : (document.documentElement.classList.contains('dark') ? '#1a202c' : '#1a202c'),
    sidebarTextColor: isPdf ? '#e2e8f0' : (document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#e2e8f0'),
    textColorOnAccent: getContrastColor(colorScheme.accent),
    bodyTextColor: isPdf ? '#111827' : 'var(--resume-preview-text)',
    resumeBg: isPdf ? '#ffffff' : 'var(--resume-preview-bg)',
  };

  const Section = ({ title, icon, children }) => (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 flex items-center" style={{ color: styles.primary }}>
        {React.createElement(icon, { className: "h-5 w-5 mr-2" })}
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row" style={{ minHeight: '297mm', width: '210mm', backgroundColor: styles.resumeBg }}>
      {/* Sidebar */}
      <div className="w-full md:w-1/3 p-6 space-y-6" style={{ backgroundColor: styles.sidebarBg, color: styles.sidebarTextColor }}>
        <div className="text-center">
          <Avatar className="h-32 w-32 mx-auto mb-4 border-4" style={{ borderColor: styles.primary }}>
            <AvatarImage src={resumeData.personalInfo.profileImage} alt="Profile" />
            <AvatarFallback style={{ backgroundColor: styles.accent, color: styles.textColorOnAccent }}>
              <User className="h-16 w-16" />
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mb-1" style={{ color: styles.sidebarTextColor }}>
            {resumeData.personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-sm" style={{ color: styles.primary }}>
            {resumeData.personalInfo.title || 'Aspiring Developer'}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="text-lg font-semibold border-b pb-1" style={{ borderColor: styles.primary, color: styles.primary }}>
            Contact
          </h3>
          {resumeData.personalInfo.email && (
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" style={{ color: styles.accent }} />
              <a href={`mailto:${resumeData.personalInfo.email}`} className="hover:underline break-all" style={{ color: styles.sidebarTextColor }}>{resumeData.personalInfo.email}</a>
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" style={{ color: styles.accent }} />
              <span style={{ color: styles.sidebarTextColor }}>{resumeData.personalInfo.phone}</span>
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" style={{ color: styles.accent }} />
              <span style={{ color: styles.sidebarTextColor }}>{resumeData.personalInfo.location}</span>
            </div>
          )}
          {resumeData.personalInfo.linkedin && (
             <div className="flex items-center space-x-2">
              <Linkedin className="h-4 w-4" style={{ color: styles.accent }} />
              <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline break-all" style={{ color: styles.sidebarTextColor }}>LinkedIn</a>
            </div>
          )}
          {resumeData.personalInfo.github && (
             <div className="flex items-center space-x-2">
              <Github className="h-4 w-4" style={{ color: styles.accent }} />
              <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline break-all" style={{ color: styles.sidebarTextColor }}>GitHub</a>
            </div>
          )}
           {resumeData.personalInfo.portfolio && (
             <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" style={{ color: styles.accent }} />
              <a href={resumeData.personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline break-all" style={{ color: styles.sidebarTextColor }}>Portfolio</a>
            </div>
          )}
        </div>

        {resumeData.skills.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold border-b pb-1" style={{ borderColor: styles.primary, color: styles.primary }}>
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded text-xs"
                  style={{ backgroundColor: styles.accent, color: styles.textColorOnAccent }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full md:w-2/3 p-8 space-y-6" style={{ color: styles.bodyTextColor }}>
        {resumeData.personalInfo.summary && (
          <Section title="Summary" icon={User}>
            <p className="text-sm leading-relaxed" style={{ color: styles.bodyTextColor }}>
              {resumeData.personalInfo.summary}
            </p>
          </Section>
        )}

        {resumeData.experience.length > 0 && (
          <Section title="Experience" icon={Briefcase}>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: styles.secondary }}>
                  <h4 className="text-md font-semibold" style={{ color: styles.bodyTextColor }}>{exp.position || 'Position'}</h4>
                  <p className="text-sm font-medium" style={{ color: styles.primary }}>
                    {exp.company || 'Company'}
                  </p>
                  <div className="flex items-center space-x-1 text-xs mb-1" style={{ color: styles.bodyTextColor, opacity: 0.7 }}>
                    <Calendar className="h-3 w-3" />
                    <span>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <ul className="list-disc list-inside text-xs leading-normal space-y-1" style={{ color: styles.bodyTextColor }}>
                      {exp.description.split('\n').map((item, i) => item.trim() && <li key={i}>{item}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {resumeData.education.length > 0 && (
          <Section title="Education" icon={GraduationCap}>
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="border-l-2 pl-4" style={{ borderColor: styles.secondary }}>
                  <h4 className="text-md font-semibold" style={{ color: styles.bodyTextColor }}>{edu.degree || 'Degree'}</h4>
                  <p className="text-sm font-medium" style={{ color: styles.primary }}>
                    {edu.institution || 'Institution'}
                  </p>
                  <div className="flex items-center space-x-1 text-xs mb-1" style={{ color: styles.bodyTextColor, opacity: 0.7 }}>
                    <Calendar className="h-3 w-3" />
                    <span>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-xs leading-normal" style={{ color: styles.bodyTextColor }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
};

export default TechTemplate;