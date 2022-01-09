import {
  Autocomplete,
  createTheme,
  TextField,
  ThemeProvider,
} from "@mui/material";
import * as React from "react";
import * as Types from "./types";
import { moveCursorToEnd, selectInputValue } from "./util";
import { COLUMN } from "./enums";

/** The default Spreadsheet DataEditor component */
const DataEditor: React.FC<Types.DataEditorProps> = ({ onChange, cell }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...cell, value: event.target.value });
    },
    [onChange, cell]
  );

  React.useEffect(() => {
    if (inputRef.current) {
      moveCursorToEnd(inputRef.current);
    }
  }, [inputRef]);

  const value = cell?.value ?? "";

  return (
    <div className="Spreadsheet__data-editor">
      <input
        ref={inputRef}
        type="text"
        onChange={handleChange}
        value={value}
        autoFocus
      />
    </div>
  );
};

const INSTRUCTIONS = [
  "load",
  "store",
  "add",
  "sub",
  "mult",
  "div",
  "read",
  "write",
  "jump",
  "jgtz",
  "jzero",
  "halt",
].sort();

/** The Spreadsheet DataEditor component with Autocomplete */
export const DataEditorAutocomplete: React.FC<Types.DataEditorProps> = ({
  column,
  onChange,
  cell,
  autocompleteList,
  readOnly,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const v = event.target.value.match(/\x7F/g) ? "" : event.target.value;
      onChange({ ...cell, value: v });
    },
    [onChange, cell]
  );

  React.useEffect(() => {
    if (inputRef.current) {
      selectInputValue(inputRef.current);
    }
  }, [inputRef]);

  const value = cell?.value ?? "";

  const theme = React.useMemo(
    () => createTheme({ palette: { mode: "dark" } }),
    []
  );

  const autocomplete = (options: string[]) => (
    <div className="Spreadsheet__data-editor">
      <ThemeProvider theme={theme}>
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option}
          autoHighlight
          includeInputInList
          autoSelect
          autoComplete
          onChange={(event, value) => onChange({ ...cell, value: value })}
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus
              onChange={handleChange}
              variant="standard"
              margin="none"
              fullWidth
            />
          )}
        />
      </ThemeProvider>
    </div>
  );

  if (readOnly)
    return (
      <div className="Spreadsheet__cell-editor">
        <span>{value}</span>
      </div>
    );

  if (column === COLUMN.INSTRUCTION) {
    return autocomplete(INSTRUCTIONS);
  }
  if (column === COLUMN.ARGUMENT && autocompleteList) {
    return autocomplete(autocompleteList ?? []);
  }

  return (
    <div className="Spreadsheet__data-editor">
      <input
        ref={inputRef}
        type="text"
        onChange={handleChange}
        value={value}
        autoFocus
      />
    </div>
  );
};

export default DataEditor;
