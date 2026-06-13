export function Footer() {
  return (
    <footer className="border-t border-navy-800/50 bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo_velora.png" alt="VeloraTech" className="h-8 w-8" />
              <span className="text-lg font-bold text-white font-display">
                Velora<span className="text-primary-400">Tech</span>
              </span>
            </div>
            <p className="text-sm text-navy-400 max-w-md">
              We craft digital solutions that drive business growth. From web
              applications to cloud infrastructure, we deliver excellence.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 font-display">Services</h4>
            <ul className="space-y-2">
              {['Web Development', 'Cloud Services', 'UI/UX Design', 'Mobile Apps'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-navy-400 hover:text-primary-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 font-display">Company</h4>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-navy-400 hover:text-primary-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-500">
            &copy; {new Date().getFullYear()} Velora Tech Agency. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-navy-500 hover:text-primary-400 transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
