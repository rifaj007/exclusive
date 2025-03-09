import SectionTitle from "../pages-component/SectionTitle";
import CategorySlider from "./CategorySlider";

const Categories = () => {
  return (
    <section className="mb-[70px] pb-[70px] border-b border-border-1">
      <SectionTitle subTitle="Categories" title="Browse By Category" />

      <CategorySlider />
    </section>
  );
};

export default Categories;
