import { CalendarIcon, ClockIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const EpisodeCard = ({
  title,
  image,
  releaseDate,
  description,
}: {
  title: string;
  image: string;
  releaseDate: string;
  description: string;
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative  overflow-hidden">
        <img
          src={image}
          alt={title}
          className="transition-transform duration-300 hover:scale-110 w-full"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <Badge variant="secondary" className="text-xs font-semibold">
            {title}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-bold line-clamp-1">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>{releaseDate}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-1" />
            <span></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default EpisodeCard;
