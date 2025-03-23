import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, Trash, MoreVertical, Calendar, User } from "lucide-react";

interface RecordCardProps {
  id?: string;
  title?: string;
  date?: string;
  provider?: string;
  thumbnailUrl?: string;
  recordType?:
    | "medical"
    | "dental"
    | "vision"
    | "immunization"
    | "medication"
    | "other";
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const RecordCard = ({
  id = "1",
  title = "Annual Physical Examination",
  date = "2023-05-15",
  provider = "Dr. Sarah Johnson",
  thumbnailUrl = "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80",
  recordType = "medical",
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
}: RecordCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const getRecordTypeColor = () => {
    switch (recordType) {
      case "medical":
        return "bg-blue-100 text-blue-800";
      case "dental":
        return "bg-green-100 text-green-800";
      case "vision":
        return "bg-purple-100 text-purple-800";
      case "immunization":
        return "bg-yellow-100 text-yellow-800";
      case "medication":
        return "bg-red-100 text-red-800";
      case "other":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-[350px] h-[280px] overflow-hidden bg-white flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold truncate">
              {title}
            </CardTitle>
            <span
              className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${getRecordTypeColor()}`}
            >
              {recordType.charAt(0).toUpperCase() + recordType.slice(1)}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(id)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Record
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(id)}
                className="text-red-600"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete Record
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <div className="relative h-32 overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 pt-2">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <User className="h-4 w-4 mr-1" />
            <span className="truncate">{provider}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-4 px-4 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onView(id)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecordCard;
