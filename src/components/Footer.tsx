import { Linkedin, Twitter, Instagram } from 'lucide-react';

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" }
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" }
    ]
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Community", href: "#" },
      { name: "Documentation", href: "#" }
    ]
  }
];

const socialLinks = [
  { icon: Linkedin, href: "https://in.linkedin.com/company/wne3", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "https://www.instagram.com/wne_3/", label: "Instagram" }
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-16 px-4 bg-background/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-poppins font-bold gradient-text">TOBE</h3>
              <p className="text-muted-foreground mt-2">
                The One Bazaar for Everything
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                WNE3 Technologies Private Limited
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                info@wne3.com
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-card/50 border border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 hover:scale-110 transition-all duration-300 group"
                >
                  <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="md:col-span-1">
              <h4 className="font-poppins font-semibold text-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 inline-block hover:translate-x-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} WNE3 Technologies Private Limited. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-4 sm:mt-0">
            Built with 💚 for sustainable commerce
          </p>
        </div>
      </div>
    </footer>
  );
};