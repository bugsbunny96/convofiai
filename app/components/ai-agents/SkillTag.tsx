import { FC } from 'react';

interface SkillTagProps {
  skill: string;
}

const SkillTag: FC<SkillTagProps> = ({ skill }) => (
  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium border border-primary/20">
    {skill}
  </span>
);

export default SkillTag; 