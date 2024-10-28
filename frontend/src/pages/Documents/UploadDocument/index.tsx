import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { DocumentLine } from "~/services";
import { Uploader } from "./Uploader";
import { PreviewTable } from "./PreviewTable";

export const UploadDocument = () => {
  const [currentDocument, setCurrentDocument] = useState<DocumentLine[] | undefined>();
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Button onClick={onBack}>Back</Button>
      {!currentDocument && <Uploader onDocument={setCurrentDocument} />}
      {currentDocument && <PreviewTable document={currentDocument} />}
    </div>
  );
};
