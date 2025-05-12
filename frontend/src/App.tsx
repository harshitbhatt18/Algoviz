import React from 'react';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Box, AppBar, Toolbar, Button, useMediaQuery } from '@mui/material';
import SimpleProcessForm from './components/SimpleProcessForm.tsx';
import AlgorithmsPage from './pages/AlgorithmsPage.tsx';
import Compare from './pages/Compare.tsx';
import theme from './theme.js';

// Modern HomePage component
const HomePage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{
          textAlign: 'center',
          pt: { xs: 4, sm: 6 },
          pb: { xs: 6, sm: 8 },
          backgroundImage: 'linear-gradient(135deg, #E1E7FF 0%, #C1CCFF 100%)',
          borderRadius: '16px',
          position: 'relative',
          overflow: 'hidden',
          mb: { xs: 4, sm: 6 },
          boxShadow: '0 10px 40px rgba(47, 75, 191, 0.15)'
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            width: '200px', 
            height: '200px', 
            borderRadius: '50%', 
            background: 'radial-gradient(circle, rgba(154, 173, 249, 0.6) 0%, rgba(154, 173, 249, 0) 70%)',
            top: '20px',
            right: '10%',
            zIndex: 0,
            display: { xs: 'none', sm: 'block' } // Hide on mobile
          }} 
        />
        <Box 
          sx={{ 
            position: 'absolute', 
            width: '300px', 
            height: '300px', 
            borderRadius: '50%', 
            background: 'radial-gradient(circle, rgba(90, 124, 255, 0.4) 0%, rgba(90, 124, 255, 0) 70%)',
            bottom: '-100px',
            left: '5%',
            zIndex: 0,
            display: { xs: 'none', sm: 'block' } // Hide on mobile
          }} 
        />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 800, 
              color: '#1D3080',
              mb: 3,
              letterSpacing: '0.5px',
              fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' }, // Responsive font size
            }}
          >
            CPU Scheduling Visualizer
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              color: '#435180',
              fontWeight: 400,
              maxWidth: '700px',
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }, // Responsive font size
              px: { xs: 2, sm: 0 } // Add padding on mobile
            }}
          >
            Understand how different CPU scheduling algorithms work with interactive visualizations
          </Typography>
          
          <Button 
            variant="contained" 
            size="large" 
            color="primary"
            component={RouterLink}
            to="/algorithms"
            sx={{ 
              py: { xs: 1, sm: 1.5 }, 
              px: { xs: 3, sm: 4 }, 
              fontSize: { xs: '0.9rem', sm: '1.1rem' },
              boxShadow: '0 8px 20px rgba(47, 75, 191, 0.35)'
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          sx={{ 
            fontWeight: 700, 
            mb: { xs: 3, sm: 5 },
            color: '#1F2A4B',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } // Responsive font size
          }}
        >
          Key Features
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: { xs: 2, sm: 4 }, 
          justifyContent: 'center',
          mb: { xs: 5, sm: 8 }
        }}>
          <FeatureCard 
            title="Interactive Visualization" 
            description="Watch how processes move through the CPU in real-time with animated visualizations."
            color="#5A7CFF"
          />
          <FeatureCard 
            title="Ready Queue View" 
            description="See the real-time state of the ready queue as processes are scheduled."
            color="#42DDFF"
          />
          <FeatureCard 
            title="Multiple Algorithms" 
            description="Compare different scheduling algorithms like FCFS, SJF, Priority, and Round Robin."
            color="#9FAEF0"
          />
        </Box>
      </Container>
    </Box>
  );
};

// Feature Card Component
const FeatureCard = ({ title, description, color }) => {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: '12px',
        bgcolor: 'white',
        flexBasis: { xs: '100%', sm: '45%', md: '30%' },
        boxShadow: '0 6px 20px rgba(47, 75, 191, 0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        border: '1px solid',
        borderColor: 'rgba(159, 174, 240, 0.3)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 30px rgba(47, 75, 191, 0.15)',
        },
        minWidth: { xs: '280px', sm: 'auto' } // Prevent cards from getting too narrow
      }}
    >
      <Box 
        sx={{ 
          width: { xs: '40px', sm: '48px' },
          height: { xs: '40px', sm: '48px' },
          borderRadius: '10px',
          bgcolor: color,
          mb: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: { xs: '1.2rem', sm: '1.4rem' },
          boxShadow: `0 6px 15px ${color}40`
        }}
      >
        {title.charAt(0)}
      </Box>
      <Typography variant="h6" gutterBottom sx={{ 
        fontWeight: 600, 
        color: '#1F2A4B', 
        mb: 1.5,
        fontSize: { xs: '1rem', sm: '1.25rem' } // Smaller on mobile
      }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ 
        color: '#435180',
        fontSize: { xs: '0.875rem', sm: '1rem' } // Smaller on mobile
      }}>
        {description}
      </Typography>
    </Box>
  );
};

// Algorithm Page Component
const AlgorithmPage = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Process Scheduling Visualization
      </Typography>
      <Typography variant="body1" paragraph>
        Configure processes and see how the selected algorithm performs.
      </Typography>
      
      <SimpleProcessForm />
      
      <Button 
        variant="outlined" 
        component={RouterLink} 
        to="/algorithms"
        sx={{ mt: 2 }}
      >
        Back to Algorithms
      </Button>
    </Box>
  );
};

// Simple NavBar component
const NavBar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isMobile = useMediaQuery('@media (max-width:600px)');

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        background: 'linear-gradient(90deg, #1D3080 0%, #5A7CFF 100%)',
        boxShadow: '0 4px 20px rgba(47, 75, 191, 0.25)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ py: { xs: 0.5, sm: 1 }, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Typography 
            variant="h5" 
            component={RouterLink} 
            to="/"
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none',
              color: 'white',
              fontWeight: 700,
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Smaller on mobile
              my: { xs: 1, sm: 0 }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
                borderRadius: '8px',
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                fontSize: { xs: '16px', sm: '18px' }
              }}
            >
              ⚙️
            </Box>
            CPU SCHEDULER
          </Typography>

          {isMobile ? (
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button 
                color="inherit"
                sx={{ mb: 1 }}
                onClick={handleMenuToggle}
              >
                {menuOpen ? 'Close Menu' : 'Menu'}
              </Button>
              
              {menuOpen && (
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', mb: 1 }}>
                  <Button 
                    color="inherit"
                    component={RouterLink}
                    to="/"
                    sx={{ 
                      borderRadius: '8px',
                      mb: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)'
                      }
                    }}
                  >
                    Home
                  </Button>
                  <Button 
                    color="inherit"
                    component={RouterLink}
                    to="/algorithms"
                    sx={{ 
                      borderRadius: '8px',
                      mb: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)'
                      }
                    }}
                  >
                    Algorithms
                  </Button>
                  <Button 
                    color="inherit"
                    component={RouterLink}
                    to="/compare"
                    sx={{ 
                      borderRadius: '8px',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)'
                      }
                    }}
                  >
                    Compare
                  </Button>
                </Box>
              )}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                color="inherit"
                component={RouterLink}
                to="/"
                sx={{ 
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)'
                  }
                }}
              >
                Home
              </Button>
              <Button 
                color="inherit"
                component={RouterLink}
                to="/algorithms"
                sx={{ 
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)'
                  }
                }}
              >
                Algorithms
              </Button>
              <Button 
                color="inherit"
                component={RouterLink}
                to="/compare"
                sx={{ 
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)'
                  }
                }}
              >
                Compare
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// Simple Footer component
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 2, sm: 3 },
        px: 2,
        mt: 'auto',
        background: 'linear-gradient(90deg, #1D3080 0%, #5A7CFF 100%)',
        color: 'white',
        width: '100%',
        boxShadow: '0 -4px 20px rgba(47, 75, 191, 0.25)'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ opacity: 0.9, textAlign: 'center', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          © {new Date().getFullYear()} - Created for educational purposes
        </Typography>
      </Container>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default
      }}>
        <NavBar />
        <Container 
          maxWidth="lg" 
          sx={{ 
            mt: { xs: 2, sm: 4 }, 
            mb: { xs: 2, sm: 4 }, 
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            px: { xs: 2, sm: 3 } // Reduce horizontal padding on mobile
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/algorithms" element={<AlgorithmsPage />} />
            <Route path="/algorithm/:algorithmId" element={<AlgorithmPage />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App; 