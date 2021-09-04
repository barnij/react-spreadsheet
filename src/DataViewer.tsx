import * as React from "react";
import * as Types from "./types";
import { getComputedValue } from "./util";

const toView = (value: React.ReactNode | boolean): React.ReactNode => {
  return <span className="Spreadsheet__data-viewer">{value}</span>;
};

/** The default Spreadsheet DataViewer component */
const DataViewer = <Cell extends Types.CellBase>({
  cell,
}: Types.DataViewerProps<Cell>): React.ReactNode => {
  return toView(getComputedValue({ cell }));
};

export default DataViewer;
