'use client';
import { useRouter, useSearchParams } from 'next/navigation';

const SortDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    params.set('page', '1'); // reset to first page
    router.push(`?${params.toString()}`);
  };

  return (
    <select onChange={handleChange} defaultValue={searchParams.get('sort') || 'default'} className='border border-border-1 rounded py-1 focus:ring-border-2 px-1'>
      <option value="default">Default</option>
      <option value="lowToHigh">Price: Low to High</option>
      <option value="highToLow">Price: High to Low</option>
    </select>
  );
};

export default SortDropdown;
