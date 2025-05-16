import React from 'react';
import {
  Container, Typography, Box, Divider, List, ListItem, ListItemText
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import BuildIcon from '@mui/icons-material/Build';
import FunctionsIcon from '@mui/icons-material/Functions';
import PsychologyIcon from '@mui/icons-material/Psychology';
import './About.css'

function About() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      
      <Box>
        <Typography variant="h4" gutterBottom className="gradient-heading" display="flex" alignItems="center">
         <InfoIcon className="icon-bg icon-about" sx={{ mr: 1 }} />
          About This App
        </Typography>

        <Typography variant="body1" paragraph>
          This Loan Calculator App is a modern, single-page web application built using React and Material UI.
          It allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule,
          and see real-time currency conversions using live exchange rates.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h5" gutterBottom className="gradient-heading" display="flex" alignItems="center">
         <StarIcon className="icon-bg icon-features" sx={{ mr: 1 }} />
         Features
        </Typography>
        <List>
          <ListItem><ListItemText primary="Loan EMI calculation using standard financial formulas" /></ListItem>
          <ListItem><ListItemText primary="Dynamic amortization schedule with monthly breakdown" /></ListItem>
          <ListItem><ListItemText primary="Real-time currency conversion using live exchange rates" /></ListItem>
          <ListItem><ListItemText primary="Paginated exchange rate table for 160+ currencies" /></ListItem>
          <ListItem><ListItemText primary="Dark/Light mode toggle for a customizable experience" /></ListItem>
          <ListItem><ListItemText primary="Fully responsive UI" /></ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h5" gutterBottom className="gradient-heading" display="flex" alignItems="center">
          <BuildIcon className="icon-bg icon-tech" sx={{ mr: 1 }} />
          Technologies Used
        </Typography>

        <List>
          <ListItem><ListItemText primary="React (Hooks, Routing)" /></ListItem>
          <ListItem><ListItemText primary="Material UI for styling and components" /></ListItem>
          <ListItem><ListItemText primary="Fetch API for API calls" /></ListItem>
          <ListItem><ListItemText primary="Exchange Rate API for real-time currency conversion" /></ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h5" gutterBottom className="gradient-heading" display="flex" alignItems="center">
          <FunctionsIcon className="icon-bg icon-formula" sx={{ mr: 1 }} />
         EMI Formula Used
        </Typography>

        <Typography variant="body1" paragraph>
          The EMI (Equated Monthly Installment) is calculated using the formula:
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>EMI = [P × R × (1 + R)<sup>N</sup>] / [(1 + R)<sup>N</sup> - 1]</strong>
        </Typography>
        <Typography variant="body2" paragraph>
          Where:
          <br />P = Principal loan amount
          <br />R = Monthly interest rate (annual rate / 12 / 100)
          <br />N = Loan duration in months
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h5" gutterBottom className="gradient-heading" display="flex" alignItems="center">
          <PsychologyIcon className="icon-bg icon-purpose" sx={{ mr: 1 }} />
          Purpose of This App
        </Typography>
        <List>
          <ListItem><ListItemText primary="Practice React fundamentals (state, props, hooks)" /></ListItem>
          <ListItem><ListItemText primary="Improve component structure and code reusability" /></ListItem>
          <ListItem><ListItemText primary="Integrate third-party APIs and render live data" /></ListItem>
          <ListItem><ListItemText primary="Work with tables and implement pagination" /></ListItem>
          <ListItem><ListItemText primary="Customize themes with dark/light toggle" /></ListItem>
          <ListItem><ListItemText primary="Ensure responsive design with collapsible mobile navigation" /></ListItem>
        </List>
      </Box>
    </Container>
  );
}

export default About;
