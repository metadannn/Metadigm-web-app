import { SxProps, Theme } from "@mui/material/styles";

export interface ChildrenProps {
  children?: JSX.Element | JSX.Element[];
}

export interface MuiSxProps {
  sx?: SxProps<Theme> | undefined;
}
