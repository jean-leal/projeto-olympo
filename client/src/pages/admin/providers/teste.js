import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from '@mui/material/OutlinedInput';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00.000.000/0000-00"
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});




export default function FormattedInputs() {
  const [values, setValues] = useState({
    textmask: ""
  });
  let vari = (values.textmask).replace(/[^0-9]/g, "")
  console.log(vari)
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Box
      sx={{
        "& > :not(style)": {
          m: 1
        }
      }}
    >
      <FormControl>
      <InputLabel size="small" htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput
        size="small"
        id="component-outlined"
          value={values.textmask}
          onChange={handleChange}
          name="textmask"
          label="Name"
          inputComponent={TextMaskCustom}
        />
      </FormControl>
    </Box>
  );
}
