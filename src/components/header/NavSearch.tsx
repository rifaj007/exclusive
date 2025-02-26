import { SearchIcon } from "@/icons";

const NavSearch = () => {
  // handle search form submission
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("form submitting");
  };

  return (
    <form onSubmit={onSubmit} className="relative w-[245px]">
      <input
        placeholder="What are you looking for?"
        className="bg-secondary-2 pl-[20px] pr-10 py-2 rounded focus:outline-none text-[12px] placeholder:text-text-3 text-black w-full hover:bg-black/10 transition duration-200 focus:bg-black/10"
      />
      <div className="absolute right-0 top-0 bottom-0">
        <button
          className="h-full w-full bg-transparent outline-0 px-2 rounded-md"
          type="submit"
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default NavSearch;
