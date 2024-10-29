import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

export default function MainPage() {
  return (
    <main className="flex-grow w-full flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/publicDocuments">
            <Button>Public documents</Button>
          </Link>
          <Link to="/uploadDocument">
            <Button>Upload Document</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
