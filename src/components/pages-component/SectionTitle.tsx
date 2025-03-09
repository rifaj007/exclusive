const SectionTitle = ({
  subTitle,
  title,
}: {
  subTitle: string;
  title: string;
}) => {
  return (
    <div className="inline-block">
      <div className="flex items-center space-x-4 mb-5">
        <div className="h-10 w-5 bg-secondary-3 rounded" />
        <h6 className="text-secondary-3 text-base">{subTitle}</h6>
      </div>

      <h2 className="text-3xl lg:text-4xl font-inter tracking-wide">{title}</h2>
    </div>
  );
};

export default SectionTitle;
