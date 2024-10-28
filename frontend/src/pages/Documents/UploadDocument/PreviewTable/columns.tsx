import { ZodIssue } from "zod";
import { DocumentLine } from "~/services";
import { yyyymmddFormat } from "~/utils/dateUtils.ts";
import { EMPTY_PLACEHOLDER } from "~/constants/general.ts";

interface CellRendererProps {
  getValue: () => any;
  column: { colId: string };
  node: {
    rowIndex: number;
  };
}

type ValueGetterType = {
  data: DocumentLine;
};

export const getColumns = (errors: Array<ZodIssue[]>) => {
  const getErrorMessage = (rowIndex: number, colId: string) => {
    const errorObj = errors[rowIndex].find((error) => error.path[error.path.length - 1] === colId);

    return errorObj?.message;
  };

  const cellRenderer = ({ getValue, node, column }: CellRendererProps) => {
    const value = getValue();

    const errorMessage = getErrorMessage(node.rowIndex, column.colId);

    return (
      <div className="flex flex-col min-w-[64px]">
        <span title={value} className="line-clamp-1">
          {value ?? EMPTY_PLACEHOLDER}
        </span>
        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
      </div>
    );
  };

  const basicColumn = {
    flex: 1,
    minWidth: 120,
    cellRenderer,
  };

  return [
    { field: "Claim ID" },
    { field: "Subscriber ID" },
    { field: "Member Sequence" },
    { field: "Claim Status" },
    { field: "Billed" },
    { field: "Allowed" },
    { field: "Paid" },
    {
      field: "Payment Status Date",
      valueGetter: (row: ValueGetterType) => yyyymmddFormat(row.data["Payment Status Date"]),
    },
    { field: "Service Date", valueGetter: (row: ValueGetterType) => yyyymmddFormat(row.data["Service Date"]) },
    { field: "Received Date", valueGetter: (row: ValueGetterType) => yyyymmddFormat(row.data["Received Date"]) },
    { field: "Entry Date", valueGetter: (row: ValueGetterType) => yyyymmddFormat(row.data["Entry Date"]) },
    { field: "Processed Date", valueGetter: (row: ValueGetterType) => yyyymmddFormat(row.data["Processed Date"]) },
    { field: "Paid Date", valueGetter: (row: ValueGetterType) => yyyymmddFormat(row.data["Paid Date"]) },
    { field: "Payment Status" },
    { field: "Group Name" },
    { field: "Group ID" },
    { field: "Division Name" },
    { field: "Division ID" },
    { field: "Plan" },
    { field: "Plan ID" },
    { field: "Place of Service" },
    { field: "Claim Type" },
    { field: "Procedure Code" },
    { field: "Member Gender" },
    { field: "Provider ID" },
    { field: "Provider Name" },
  ].map((column) => ({ ...basicColumn, ...column }));
};
