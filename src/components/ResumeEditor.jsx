import React from 'react';
import { motion } from 'framer-motion';
import PersonalInfoEditor from '@/components/editor/PersonalInfoEditor';
import ExperienceEditor from '@/components/editor/ExperienceEditor';
import EducationEditor from '@/components/editor/EducationEditor';
import SkillsEditor from '@/components/editor/SkillsEditor';

const ResumeEditor = ({ resumeData, setResumeData }) => {
  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="space-y-6">
      <motion.div {...sectionVariants}>
        <PersonalInfoEditor
          personalInfo={resumeData.personalInfo}
          setResumeData={setResumeData}
        />
      </motion.div>

      <motion.div {...sectionVariants} transition={{ ...sectionVariants.transition, delay: 0.1 }}>
        <ExperienceEditor
          experience={resumeData.experience}
          setResumeData={setResumeData}
        />
      </motion.div>

      <motion.div {...sectionVariants} transition={{ ...sectionVariants.transition, delay: 0.2 }}>
        <EducationEditor
          education={resumeData.education}
          setResumeData={setResumeData}
        />
      </motion.div>

      <motion.div {...sectionVariants} transition={{ ...sectionVariants.transition, delay: 0.3 }}>
        <SkillsEditor
          skills={resumeData.skills}
          setResumeData={setResumeData}
        />
      </motion.div>
    </div>
  );
};

export default ResumeEditor;