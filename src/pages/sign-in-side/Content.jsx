import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

import { SitemarkIcon } from './CustomIcons';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Customizable Workflows',
    description:
      'Jira allows you to customize workflows, ensuring every team follows the process that best suits their needs.',
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Scalable for Teams',
    description:
      'From small teams to large enterprises, Jira scales with you, managing even the most complex projects with ease.',
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Intuitive User Interface',
    description:
      'Jira’s user-friendly interface allows users to manage tasks, track progress, and collaborate seamlessly across teams.',
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Advanced Reporting and Analytics',
    description:
      'Jira provides powerful reporting tools to analyze team performance and project metrics, helping you stay on track.',
  },
];

export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <img src="../../assets/jira-icon.png" alt="" />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
