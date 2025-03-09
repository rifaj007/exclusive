const SectionTitle = ({
  subTitle,
  title,
}: {
  subTitle: string;
  title: string;
}) => {
  return (
    <div className="inline-block">
      <div className="flex items-center space-x-3 sm:space-x-4 mb-4 md:mb-5">
        <div className="h-10 w-3 sm:w-5 bg-secondary-3 rounded" />
        <h6 className="text-secondary-3 text-[14px] sm:text-base">{subTitle}</h6>
      </div>

      <h2 className="text-[28px] md:text-3xl lg:text-4xl font-inter tracking-wide">{title}</h2>
    </div>
  );
};

export default SectionTitle;
