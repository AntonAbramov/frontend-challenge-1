import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { z } from "zod";
import { DocumentLine, uploadDocument } from "~/services";
import { Loader } from "~/components/Loader.tsx";
import { getColumns } from "./columns.tsx";

interface PreviewTable {
  document: DocumentLine[];
}

const validationSchema = z.object({
  "Claim ID": z.string(),
  "Subscriber ID": z.string(),
  "Member Sequence": z.number(),
  "Claim Status": z.string(),
  Billed: z.number(),
  Allowed: z.number(),
  Paid: z.number(),
  "Payment Status Date": z.date(),
  "Service Date": z.date(),
  "Received Date": z.date(),
  "Entry Date": z.date(),
  "Processed Date": z.date(),
  "Paid Date": z.date(),
  "Payment Status": z.string(),
  "Group Name": z.string(),
  "Group ID": z.string(),
  "Division Name": z.string(),
  "Division ID": z.string(),
  Plan: z.string(),
  "Plan ID": z.string(),
  "Place of Service": z.string(),
  "Claim Type": z.string(),
  "Procedure Code": z.string(),
  "Member Gender": z.string(),
  "Provider ID": z.string(),
  "Provider Name": z.string(),
});

export const PreviewTable = ({ document }: PreviewTable) => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const validateDocument = () => {
    return document.map((documentLine) => {
      const result = validationSchema.safeParse(documentLine);

      return { data: result.data ?? documentLine, errors: result?.error?.errors ?? [] };
    });
  };

  const { rows, columns } = useMemo(() => {
    const result = validateDocument();

    const rows = result.map((item) => item.data);
    const errors = result.map((item) => item.errors);

    return { rows, columns: getColumns(errors) };
  }, [document]);

  const approve = () => {
    const blob = new Blob([JSON.stringify(document)], { type: "application/json" });
    const file = new File([blob], "document.json", {
      type: "application/json",
    });

    setUploading(true);
    uploadDocument(file)
      .then((document) => {
        navigate(`/publicDocuments?focusOn=${document.id}`);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <div className="h-screen absolute">
      {uploading && <Loader />}
      <div className="my-2">
        <Button onClick={approve}>Approve</Button>
      </div>
      <AgGridReact rowData={rows} columnDefs={columns} />
    </div>
  );
};