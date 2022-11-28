import Typography from '@mui/material/Typography';

interface Props {
  title: string;
  isMobile: boolean;
}

const LogoTypography: React.FC<Props> = ({ title, isMobile }) => {
  return (
    <Typography
      variant={isMobile ? "h5" : "h6"}
      noWrap
      sx={{
        mr: 2,
        display: { xs: isMobile ? 'flex' : 'none', md: isMobile ? 'none' : 'flex' },
        flexGrow: 1,
        fontWeight: 700,
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      {title}
    </Typography>
  );
};

export default LogoTypography;