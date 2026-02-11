export default function Footer() {
  return (
    <footer className="bg-[#360212] text-[#fcf9f6] font-sans m-0">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <a
            href="/"
            className="text-2xl font-serif font-bold text-white tracking-tight"
          >
            Double-Joy
          </a>
          <p className="mt-4 text-sm text-[#d791be]/80 leading-relaxed">
            Quality products. Reliable delivery. Trusted service.
          </p>
        </div>

        {/* Column 1 */}
        <div>
          <h4 className="text-xs font-bold text-[#fe5457] uppercase tracking-[0.15em] mb-6">
            Support
          </h4>
          <ul className="space-y-3 text-sm font-medium">
            <li>
              <a
                href="#"
                className="text-[#fcf9f6]/80 hover:text-[#fe5457] transition-colors duration-200"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#fcf9f6]/80 hover:text-[#fe5457] transition-colors duration-200"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#fcf9f6]/80 hover:text-[#fe5457] transition-colors duration-200"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#fcf9f6]/80 hover:text-[#fe5457] transition-colors duration-200"
              >
                Returns
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-xs font-bold text-[#fe5457] uppercase tracking-[0.15em] mb-6">
            Company
          </h4>
          <ul className="space-y-3 text-sm font-medium">
            <li>
              <a
                href="#"
                className="text-[#fcf9f6]/80 hover:text-[#fe5457] transition-colors duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#fcf9f6]/80 hover:text-[#fe5457] transition-colors duration-200"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#fcf9f6]/80 hover:text-[#fe5457] transition-colors duration-200"
              >
                Press
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#fcf9f6]/80 hover:text-[#fe5457] transition-colors duration-200"
              >
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-xs font-bold text-[#fe5457] uppercase tracking-[0.15em] mb-6">
            Legal
          </h4>
          <ul className="space-y-3 text-sm font-medium">
            <li>
              <a
                href="#"
                className="text-[#fcf9f6]/80 hover:text-[#fe5457] transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#fcf9f6]/80 hover:text-[#fe5457] transition-colors duration-200"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#fcf9f6]/80 hover:text-[#fe5457] transition-colors duration-200"
              >
                Refund Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#fcf9f6]/80 hover:text-[#fe5457] transition-colors duration-200"
              >
                Cookies
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="text-xs font-bold text-[#fe5457] uppercase tracking-[0.15em] mb-6">
            Account
          </h4>
          <ul className="space-y-3 text-sm font-medium">
            <li>
              <a
                href="#"
                className="text-[#fcf9f6]/80 hover:text-[#fe5457] transition-colors duration-200"
              >
                My Orders
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#fcf9f6]/80 hover:text-[#fe5457] transition-colors duration-200"
              >
                Wishlist
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#fcf9f6]/80 hover:text-[#fe5457] transition-colors duration-200"
              >
                Track Order
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#fcf9f6]/80 hover:text-[#fe5457] transition-colors duration-200"
              >
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <hr className="border-[#d791be]/20" />
      </div>

      <div className="py-8 text-center text-xs tracking-widest text-[#d791be]/60 uppercase">
        © {new Date().getFullYear()}{" "}
        <span className="font-serif italic font-bold text-[#fcf9f6]">
          Double-Joy
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
}
