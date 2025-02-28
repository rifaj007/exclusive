import Link from "next/link";
import {
  CopyrightIcon,
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterXIcon,
} from "@/icons";
import FooterForm from "./FooterForm";

const Footer = () => {
  return (
    <footer className="bg-black text-text-1">
      <div className="container">
        <div className="flex justify-between flex-wrap gap-8 md:justify-stretch pt-20 pb-[60px]">
          {/* Subscribe */}
          <div>
            <Link href="/" className="logo mb-6 inline-block">
              Exclusive
            </Link>

            <h4 className="footer-heading">Subscribe</h4>
            <p className="mb-4">Get 10% off your first order</p>

            {/* Footer Form */}
            <FooterForm />
          </div>

          {/* Support */}
          <div>
            <h4 className="footer-heading">Support</h4>

            <ul className="flex flex-col gap-4">
              <li>
                111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.
              </li>
              <li>exclusive@gmail.com</li>
              <li>+8801601016160</li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="footer-heading">Account</h4>

            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/my-account">My Account</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>/
                <Link href="/register">Register</Link>
              </li>
              <li>
                <Link href="/cart">Cart</Link>
              </li>
              <li>
                <Link href="/wishlist">Wishlist</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h4 className="footer-heading">Quick Link</h4>

            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-condition">Terms of Use</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h4 className="footer-heading">Download App</h4>

            <p className="text-[12px] text-[#AFAFAF] leading-[18px] font-medium mb-2">
              Save $3 with App New User Only
            </p>

            <div className="flex-between mb-6">
              {/* QR code */}
              <img src="/images/qr-code.jpg" alt="qr" className="size-[75px]" />

              {/* Play store and App store */}
              <div className="flex flex-col">
                <div className="w-[110px] h-[40px]">
                  <img src="/images/google-play-badge.svg" alt="play-store" />
                </div>

                <div className="w-[110px] h-[40px]">
                  <img src="/images/app-store-badge.svg" alt="app-store" />
                </div>
              </div>
            </div>

            {/* Footer Social Links */}
            <ul className="flex items-center gap-4">
              {/* facebook */}
              <li>
                <Link
                  href="https://www.facebook.com/share/14QR6uGHCk/"
                  target="_blank"
                >
                  <FacebookIcon />
                </Link>
              </li>

              {/* Twitter */}
              <li>
                <Link href="https://x.com/MdRifajulIslam" target="_blank">
                  <TwitterXIcon />
                </Link>
              </li>

              {/* Linkedin */}
              <li>
                <Link
                  href="https://www.linkedin.com/in/md-rifajul-islam-3a7279328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                >
                  <LinkedinIcon />
                </Link>
              </li>

              {/* Github */}
              <li>
                <Link href="https://github.com/rifaj007" target="_blank">
                  <GithubIcon />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border border-[#141414] flex-center pt-4 pb-6 gap-2 text-[#3D3D3D]">
        <CopyrightIcon />{" "}
        <p className="sm:text-base text-[14px]">
          Copyright Exclusive {new Date().getFullYear()}. All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
