export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative h-[550px] flex items-center mt-4 mb-12 sm:my-20 xl:my-[140px]">
      <div className="container">
        <div className="md:w-[370px] mx-auto xl:ml-auto xl:mr-0 md:px-0 px-6">
          {children}
        </div>
      </div>

      {/* About image */}
      {
        <div className="absolute top-0 left-0 2xl:left-[12%] hidden xl:block">
          <img
            src="/images/auth/auth-img.jpeg"
            className="w-[805px]"
            alt="about-img"
          />
        </div>
      }
    </section>
  );
}
