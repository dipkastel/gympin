import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

export const SvgColor = ({
  src,
  width = 24,
  height,
  className,
  sx,
  ...other
}) => (
  <Box
    component="span"
    className={className}
    sx={{
      width,
      flexShrink: 0,
      height: height ?? width,
      display: "inline-flex",
      bgcolor: "currentColor",
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
);
