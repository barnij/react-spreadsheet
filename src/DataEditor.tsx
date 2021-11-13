import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
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

const INSTRUCTIONS = ["add", "sub", "mult"];

/** The default Spreadsheet DataEditor component */
export const DataEditorAutocomplete: React.FC<Types.DataEditorProps> = ({
  column,
  onChange,
  cell,
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

  if (column === 0) {
    return (
      <div className="Spreadsheet__data-editor">
        <input list="commands" autoFocus type="text" onChange={handleChange} />
        <datalist id="commands">
          <option value="add" />
          <option value="sub" />
        </datalist>
      </div>
    );
  }

  if (column === 1) {
    return (
      <div className="Spreadsheet__data-editor">
        <Autocomplete
          options={INSTRUCTIONS}
          getOptionLabel={(option) => option}
          autoHighlight
          onChange={(event, value) =>
            onChange({ ...cell, value: value ? value : "" })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus
              variant="standard"
              margin="none"
              fullWidth
            />
          )}
        />
      </div>
    );
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
