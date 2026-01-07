import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A3D66] text-white py-6 mt-6 mb-8 rounded-xl">
      <div className=" mx-auto px-6 grid grid-cols-3 gap-12">
        {/* Filters Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Filters</h3>
          <div className="flex gap-2 text-sm text-gray-300 mb-6">
            <span>All</span>
            <span>Electronic</span>
          </div>
          <p className="text-sm text-gray-400">© 2024 American</p>
        </div>

        {/* About Us Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">About Us</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex gap-3">
            <a
              href="#"
              className="bg-[#0B5394] hover:bg-[#094A7D] p-3 rounded-full transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="bg-[#0B5394] hover:bg-[#094A7D] p-3 rounded-full transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="bg-[#0B5394] hover:bg-[#094A7D] p-3 rounded-full transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
