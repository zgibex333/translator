import TextField from "@mui/material/TextField";

export const TextArea: React.FC = () => {
  return (
    <TextField
      id="outlined-multiline-flexible"
      label="Multiline"
      multiline
      rows={10}
      sx={{
        width: "100%",
      }}
    />
  );
};
