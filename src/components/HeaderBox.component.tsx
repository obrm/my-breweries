import Box from "@mui/material/Box";


interface Props {
  isMobile: boolean;
  children: React.ReactNode;
}

const HeaderBox: React.FC<Props> = ({ isMobile, children }) => {
  return (
    <Box sx={{ flexGrow: 1, marginLeft: !isMobile ? 10 : null, display: { xs: isMobile ? 'flex' : 'none', md: isMobile ? 'none' : 'flex' } }}>
      {children}
    </ Box>
  );
};

export default HeaderBox;