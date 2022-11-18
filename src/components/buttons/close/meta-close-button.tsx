import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { MuiSxProps } from "../../../util/props";

interface Props extends MuiSxProps {
  handleClose: () => void;
}

export function MetaCloseButton({ handleClose, sx }: Props): JSX.Element {
  return (
    <IconButton onClick={handleClose} sx={sx}>
      <CloseIcon />
    </IconButton>
  );
}
