import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

export default function MainPage() {
  return (
    <div className="flex flex-col gap-2 h-full items-center justify-center text-center">
      <Link to="/publicDocuments">
        <Button>Public documents</Button>
      </Link>
      <Link to="/uploadDocument">
        <Button>Upload Document</Button>
      </Link>
    </div>
  );
}
