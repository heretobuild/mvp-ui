import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Download,
  Edit,
  Printer,
  Share2,
  Trash,
  User,
} from "lucide-react";

interface RecordDetailDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  record?: {
    id: string;
    title: string;
    date: string;
    provider: string;
    category:
      | "medical"
      | "dental"
      | "vision"
      | "immunization"
      | "medication"
      | "other";
    description?: string;
    notes?: string;
    documentUrl?: string;
    thumbnailUrl?: string;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  medical: "bg-blue-100 text-blue-800",
  dental: "bg-green-100 text-green-800",
  vision: "bg-purple-100 text-purple-800",
  immunization: "bg-yellow-100 text-yellow-800",
  medication: "bg-red-100 text-red-800",
  other: "bg-gray-100 text-gray-800",
};

const RecordDetailDialog: React.FC<RecordDetailDialogProps> = ({
  open = true,
  onOpenChange = () => {},
  record = {
    id: "1",
    title: "Annual Physical Examination",
    date: "2023-05-15",
    provider: "Dr. Sarah Johnson",
    category: "medical",
    description:
      "Comprehensive annual physical examination including blood work, vitals, and general health assessment.",
    notes:
      "Blood pressure: 120/80, Heart rate: 72 bpm, Weight: 165 lbs, Height: 5'10\". Overall health is good. Recommended to maintain current exercise routine and diet. Follow up in 12 months.",
    documentUrl: "https://example.com/documents/annual-physical-2023.pdf",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80",
  },
  onEdit = (id) => console.log(`Edit record ${id}`),
  onDelete = (id) => console.log(`Delete record ${id}`),
}) => {
  const [activeTab, setActiveTab] = useState<"details" | "document">("details");

  const formattedDate = new Date(record.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-auto bg-white"
        style={{ width: "800px", height: "700px" }}
      >
        <DialogHeader className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold">
                {record.title}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={categoryColors[record.category]}>
                  {record.category.charAt(0).toUpperCase() +
                    record.category.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {formattedDate}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(record.id)}
              >
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(record.id)}
              >
                <Trash className="h-4 w-4 mr-1" /> Delete
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "details" | "document")
          }
          className="mt-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="document">Document</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Provider
                  </h3>
                  <div className="flex items-center mt-1">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="text-base">{record.provider}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Date
                  </h3>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="text-base">{formattedDate}</p>
                  </div>
                </div>

                {record.description && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Description
                    </h3>
                    <p className="text-base mt-1">{record.description}</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {record.notes && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Notes
                    </h3>
                    <p className="text-base mt-1 whitespace-pre-line">
                      {record.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="document" className="mt-4">
            <div className="flex flex-col items-center space-y-4">
              {record.documentUrl ? (
                <>
                  <div className="w-full h-[400px] border rounded-md overflow-hidden bg-gray-50">
                    {record.thumbnailUrl ? (
                      <img
                        src={record.thumbnailUrl}
                        alt={record.title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        Document Preview Not Available
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 w-full justify-center">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Printer className="h-4 w-4 mr-2" /> Print
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" /> Share
                    </Button>
                  </div>
                </>
              ) : (
                <div className="w-full h-[400px] border rounded-md flex items-center justify-center bg-gray-50 text-muted-foreground">
                  No document attached to this record
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecordDetailDialog;
