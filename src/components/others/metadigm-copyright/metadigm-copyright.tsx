import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export function MetadigmCopyright(): JSX.Element {
  return (
    <Typography variant="caption" color="text.secondary" align="center" display="block">
      {"Copyright © "}
      <Link color="inherit" href="https://www.metadigm.io/">
        Metadigm
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
