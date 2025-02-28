import { ContactForm } from "@/components";
import { EmailIconWithBg, PhoneIconWithBg } from "@/icons";
import Link from "next/link";

const Contact = () => {
  return (
    <section className="pt-8 lg:pt-12 xl:pt-20 pb-20 lg:pb-[100px] xl:pb-[140px]">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs mb-12 xl:mb-20">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-black">Contact</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-7 justify-between md:items-stretch">
          {/* Contact lists */}
          <div className="w-full md:w-[340px]">
            <div className="rounded shadow-custom h-full">
              <div className="py-10 px-9 h-full">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <PhoneIconWithBg />
                    <h4 className="font-medium text-base">Call To Us</h4>
                  </div>
                  <ul className="space-y-4">
                    <li>We are available 24/7, 7 days a week.</li>
                    <li>Phone: +8801601016160</li>
                  </ul>
                </div>

                <div className="border border-border-2" />

                <div className="mt-8">
                  <div className="flex items-center gap-4 mb-6">
                    <EmailIconWithBg />
                    <h4 className="font-medium text-base">Write To Us</h4>
                  </div>
                  <p className="mb-4">
                    Fill out our form and we will contact you within 24 hours.
                  </p>
                  <ul className="space-y-4">
                    <li>Emails: customer@exclusive.com</li>
                    <li>Emails: support@exclusive.com</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="flex-1">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
