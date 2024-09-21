import { Grid, Paper, Typography, useTheme } from '@mui/material';

const ColorPalette = () => {
  const theme = useTheme();

  const colors = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    error: theme.palette.error,
    warning: theme.palette.warning,
    info: theme.palette.info,
    success: theme.palette.success,
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {Object.entries(colors).map(([key, color]) => (
        <Grid item xs={12} sm={6} md={4} key={key}>
          <Paper
            elevation={3}
            style={{
              backgroundColor: color.main,
              color: theme.palette.getContrastText(color.main),
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
            <Typography variant="body1">Main: {color.main}</Typography>
            <Typography variant="body1">Light: {color.light}</Typography>
            <Typography variant="body1">Dark: {color.dark}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ColorPalette;
