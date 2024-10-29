import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-muted text-muted-foreground mt-auto">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 Mano Health. All rights reserved.</p>
          <nav className="space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:underline">
              About
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
