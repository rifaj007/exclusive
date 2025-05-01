import Skeleton from "react-loading-skeleton";

const ProductCardSkeleton = () => {
  return (
    <div>
      <div className="p-2 border-2 border-secondary-2 rounded-md shadow-custom pb-6">
        <div className="flex justify-between mb-2">
          <div>
            <Skeleton
              height={20}
              width={40}
              containerClassName="mb-0 flex-1"
              className="w-4"
            />
          </div>
          <div className="z-40">
            <Skeleton
              height={35}
              width={35}
              circle
              containerClassName="mb-0 flex-1"
              className="w-4"
              count={2}
            />
          </div>
        </div>

        <div className="-mt-10">
          <Skeleton height={150} className="w-3/4" count={1} />
        </div>
      </div>

      <div className="mt-5">
        <Skeleton className="w-5 h-5" />
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-3 h-3" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
