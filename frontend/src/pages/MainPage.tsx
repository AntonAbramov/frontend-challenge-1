import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center">
      <Link to="/publicDocuments">Public documents</Link>
      <Link to="/uploadDocument">Upload Document</Link>
    </div>
  );
}
