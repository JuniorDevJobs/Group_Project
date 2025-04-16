import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  Card,
  CardContent,
  Avatar,
  Link,
  IconButton,
} from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const team = [
  {
    name: "Eunice",
    role: "Backend Developer",
    linkedIn: "https://www.linkedin.com/in/eunice-k/",
    github: "https://github.com/eunicekoid",
  },
  {
    name: "Sean",
    role: "Backend Developer",
    linkedIn: "https://www.linkedin.com/in/sean-osullivan8",
    github: "https://github.com/sully8698",
  },
  {
    name: "Danyelle",
    role: "Frontend Developer",
    linkedIn: "https://www.linkedin.com/in/danyellehenriquez",
    github: "https://www.github.com/danyelleh",
  },
  {
    name: "Megan",
    role: "Frontend Developer",
    linkedIn: "https://www.linkedin.com/in/megan-marie-janish/",
    github: "https://github.com/mnepshinsky",
  },
];

export default function AboutUs() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener('change', handleChange);

    return () => darkModeQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <Box sx={{ padding: 4, backgroundColor: isDarkMode ? '#1e1e1e' : '#f9f9f9', minHeight: "100vh" }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
        About Us
      </Typography>

      <Typography variant="h5" gutterBottom>
        Mission Statement
      </Typography>
      <Typography >
        At JuniorDevJobs, our mission is to help aspiring developers land their
        first role by connecting them with beginner-friendly job listings,
        valuable resources, and a supportive community.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Who We Are
      </Typography>
      <Typography>
        We’re a small team of career switchers, bootcamp grads, and devs who
        know how tough the first job search can be. After struggling to find
        junior roles with little to no experience, our founder realized there
        needed to be a central hub just for new developers—so we built the site
        we wish we had.
      </Typography>

      <Typography variant="h5" gutterBottom>
        What This Site Offers
      </Typography>
      <List>
        <ListItem>
          🧭 A one-stop platform to search for junior-friendly job listings by state.
        </ListItem>
        <ListItem>
          📚 Curated resources for learning, building resumes, and preparing for interviews.
        </ListItem>
        <ListItem>
          🤝 A welcoming space where you’re not alone on your journey into tech.
        </ListItem>
      </List>

      <Typography variant="h4" sx={{ marginTop: 5, fontWeight: 700 }}>
        Meet the Team
      </Typography>

      {/* Flexbox Layout */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
          marginTop: 2,
        }}
      >
        {team.map((member) => (
          <Box
            key={member.name}
            sx={{
              width: { xs: '100%', sm: '48%', md: '23%' }, // Responsive widths
              padding: 2,
              textAlign: 'center',
              boxShadow: 3,
              backgroundColor: '#fff',
              borderRadius: 3,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Card>
              <Avatar sx={{ width: 64, height: 64, margin: 'auto', bgcolor: '#6a4c9c' }}>
                {member.name.charAt(0)}
              </Avatar>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.role}
                </Typography>
                <Box sx={{ marginTop: 1 }}>
                  <IconButton
                    component={Link}
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton
                    component={Link}
                    href={member.github}
                    target="_blank"
                    rel="noopener"
                    aria-label="GitHub"
                  >
                    <GitHubIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Typography
        variant="h6"
        sx={{ marginTop: 6, fontStyle: 'italic', textAlign: 'center' }}
      >
        Whether you’re self-taught, a recent bootcamp grad, or transitioning from another career — we’re here to help you take the first step.
      </Typography>
    </Box>
  );
}