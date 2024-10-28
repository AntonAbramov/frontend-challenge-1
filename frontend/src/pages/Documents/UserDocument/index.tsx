import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import userStore from "~/store/userStore.ts";
import { Loader } from "~/components/Loader.tsx";
import { DocumentInterface, getDocument } from "~/services";

export const UserDocument = observer(() => {
  const params = useParams();
  const navigate = useNavigate();
  const [currentDocument, setCurrentDocument] = useState<DocumentInterface | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const documentId = params.documentId;

    getDocument(documentId)
      .then((document) => {
        setCurrentDocument(document);
        if (document.owner.id !== userStore.user?.id) {
          navigate("/", { replace: true });
        }
      })
      .catch(() => {
        navigate("/", { replace: true });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  return <>{loading && <Loader />}</>;
});
