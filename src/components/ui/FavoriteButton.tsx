import type { WeatherData } from "@/api/types";
import { useFavorite } from "@/hooks/useFavorite";
import { Button } from "./button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FavoriteButtonProps {
  data: WeatherData;
}

const FavoriteButton = ({ data }: FavoriteButtonProps) => {
  const { addFavorite, isFavorite, removeFavorite } = useFavorite();
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

  const handleToogleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from the Favorites`);
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} from the Favorites`);
    }
  };
  return (
    <Button
      variant={isCurrentlyFavorite ? "default" : "outline"}
      className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
      onClick={handleToogleFavorite}
    >
      <Star
        className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""} `}
      />
    </Button>
  );
};

export default FavoriteButton;
