import { serviceFeatures } from "@/constants";

const Services = () => {
  return (
    <section className="flex justify-around flex-wrap gap-8">
      {serviceFeatures.map(({ _id, icon: Icon, title, description }) => (
        <div key={_id} className="text-center">
          <div className="flex justify-center mb-5">
            <span className="p-[11px] bg-[#C1C1C1] group-hover:bg-[#E67C7C] rounded-full flex">
              <span className="p-[9px] bg-black group-hover:bg-white rounded-full">
                <Icon />
              </span>
            </span>
          </div>

          <h5 className="text-base xl:text-xl font-semibold">{title}</h5>
          <p className="text-[14px] ">{description}</p>
        </div>
      ))}
    </section>
  );
};

export default Services;
