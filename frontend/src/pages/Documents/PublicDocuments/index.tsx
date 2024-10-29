import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@mantine/core";
import clsx from "clsx";
import { Loader } from "~/components/Loader.tsx";
import { DocumentInterface, getPublicDocuments } from "~/services";

export const PublicDocuments = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [documents, setDocuments] = useState<DocumentInterface[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicDocuments()
      .then(setDocuments)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // @ts-ignore
  const formatDocumentId = (documentId: string) => documentId.replaceAll("-", "");

  useEffect(() => {
    const focusOn = searchParams.get("focusOn");
    if (documents && documents.find((document) => document.id === focusOn)) {
      window.document
        .getElementsByClassName(`${formatDocumentId(focusOn)}`)?.[0]
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams, documents]);

  const getDownloadUrl = (doc: DocumentInterface) => {
    return `http://localhost:8080/uploads/documents/${doc.id}.json`;
  };

  const onBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Button variant="outline" size="sm" className="mb-6" onClick={onBack}>
          Back
        </Button>
        {/*<Button onClick={onBack}>Back</Button>*/}
        <h1 className="text-center text-2xl">Documents</h1>
        {loading && <Loader />}
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {!documents?.length && <p className="text-center">No data to show</p>}
          <ul className="space-y-4">
            {documents?.map((document) => (
              <li
                key={document.id}
                className={clsx(
                  "flex justify-between items-center bg-card text-card-foreground p-4 rounded-lg shadow",
                  formatDocumentId(document.id),
                )}
              >
                <span className="text-sm">{document.id}</span>
                <a href={getDownloadUrl(document)} target="_blank" download={`${document.id}.json`}>
                  <Button>Download</Button>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
