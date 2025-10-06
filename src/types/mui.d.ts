import "@mui/material/Typography";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    logoFont: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    logoFont: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    logoFont?: React.CSSProperties;
  }
}
