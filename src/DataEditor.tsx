import { Autocomplete, TextField } from "@mui/material";
import * as React from "react";
import * as Types from "./types";
import { moveCursorToEnd, selectInputValue } from "./util";

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
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...cell, value: event.target.value });
    },
    [onChange, cell]
  );

  React.useEffect(() => {
    if (inputRef.current) {
      selectInputValue(inputRef.current);
    }
  }, [inputRef]);

  const value = cell?.value ?? "";

  const autocomplete = (options: string[]) => (
    <div className="Spreadsheet__data-editor">
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
    </div>
  );

  const INSTRUCTION_COL = 1;
  const ARGUMENT_COL = 2;

  if (column === INSTRUCTION_COL) {
    return autocomplete(INSTRUCTIONS);
  }
  if (column === ARGUMENT_COL) {
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
