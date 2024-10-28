import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { Loader } from "~/components/Loader.tsx";
import { DocumentInterface, getPublicDocuments } from "~/services";

export const PublicDocuments = () => {
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

  useEffect(() => {
    const focusOn = searchParams.get("focusOn");
    if (documents && documents.find((document) => document.id === focusOn)) {
      window.document.querySelector(`.${focusOn}`).scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams, documents]);

  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col gap-1 mx-auto mt-5">
        {!documents?.length && <p className="text-center">No data to show</p>}
        {documents?.map((document) => (
          <div key={document.id} className={clsx("flex gap-2 items-center", document.id)}>
            <p>{document.id}</p>
            <a href={document.documentFileUrl} download={`${document.id}.json`}>
              Download
            </a>
          </div>
        ))}
      </div>
    </>
  );
};
