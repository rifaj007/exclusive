import { StarEmptyIcon, StarFullIcon, StarHalfIcon } from "@/icons";

const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  return (
    <div className="inline-flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        if (index < Math.floor(rating)) {
          return <StarFullIcon key={index} />;
        } else if (index < rating) {
          return <StarHalfIcon key={index} />;
        } else {
          return <StarEmptyIcon key={index} />;
        }
      })}
    </div>
  );
};

export default StarRating;
