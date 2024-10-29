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
      <Button onClick={onBack}>Back</Button>
      <h1 className="text-center text-2xl">Documents</h1>
      {loading && <Loader />}
      <div className="flex flex-col gap-1 mt-5 items-center">
        {!documents?.length && <p className="text-center">No data to show</p>}
        {documents?.map((document) => (
          <div key={document.id} className={clsx("flex gap-2 items-center", formatDocumentId(document.id))}>
            <p>{document.id}</p>
            <a href={getDownloadUrl(document)} target="_blank" download={`${document.id}.json`}>
              <Button>Download</Button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
