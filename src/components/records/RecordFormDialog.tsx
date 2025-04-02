import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Upload, Database, Link } from "lucide-react";
import PatientPortalConnector from "./PatientPortalConnector";
import FileUpload from "./FileUpload";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  date: z.string().min(1, { message: "Date is required" }),
  provider: z.string().min(1, { message: "Provider is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().optional(),
  notes: z.string().optional(),
  documentUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface RecordFormDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  record?: any;
  onSubmit?: (data: FormValues) => void;
  familyMemberId?: string;
  activeTab?: "manual" | "upload" | "portal";
}

const RecordFormDialog: React.FC<RecordFormDialogProps> = ({
  open = false,
  onOpenChange = () => {},
  record = null,
  onSubmit = () => {},
  familyMemberId = "1", // Default to self
  activeTab = "manual",
}) => {
  const [currentTab, setCurrentTab] = useState<"manual" | "upload" | "portal">(
    activeTab,
  );
  const [showPortalConnector, setShowPortalConnector] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: record?.title || "",
      date: record?.date || new Date().toISOString().split("T")[0],
      provider: record?.provider || "",
      category: record?.category || "medical",
      description: record?.description || "",
      notes: record?.notes || "",
      documentUrl: record?.documentUrl || "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUploaded(true);
      setFileName(e.target.files[0].name);
    }
  };

  const handlePortalImport = (records: any[]) => {
    console.log("Imported records:", records);
    // In a real app, you would process these records
    // For now, we'll just close the dialog
    setShowPortalConnector(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {record ? "Edit Health Record" : "Add New Health Record"}
            </DialogTitle>
          </DialogHeader>

          <Tabs
            value={currentTab}
            onValueChange={(value) => setCurrentTab(value as any)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <Database className="h-4 w-4" /> Manual Entry
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" /> Upload Document
              </TabsTrigger>
              <TabsTrigger value="portal" className="flex items-center gap-2">
                <Link className="h-4 w-4" /> Patient Portal
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="pt-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Record Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Annual Physical Examination"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="medical">Medical</SelectItem>
                              <SelectItem value="dental">Dental</SelectItem>
                              <SelectItem value="vision">Vision</SelectItem>
                              <SelectItem value="immunization">
                                Immunization
                              </SelectItem>
                              <SelectItem value="medication">
                                Medication
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="provider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Healthcare Provider</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Dr. Smith, City Hospital"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description of the record"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Additional notes, test results, etc."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="documentUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Document URL (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Link to external document"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter a URL if the document is stored externally
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onOpenChange(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {record ? "Save Changes" : "Add Record"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="upload" className="pt-4">
              <div className="space-y-4">
                <FileUpload
                  onUploadComplete={() => {
                    setFileUploaded(true);
                  }}
                  onExtractedData={(data) => {
                    // Populate form fields with extracted data
                    form.setValue("title", data.title || "");
                    form.setValue(
                      "date",
                      data.date || new Date().toISOString().split("T")[0],
                    );
                    form.setValue("provider", data.provider || "");
                    form.setValue(
                      "category",
                      data.recordType?.toLowerCase() || "medical",
                    );
                    form.setValue("description", data.description || "");
                    form.setValue("notes", data.notes || "");
                    form.setValue("documentUrl", data.documentUrl || "");

                    // Set file name for display
                    setFileName(data.title || "Uploaded document");
                  }}
                />

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="upload-title">Record Title</Label>
                      <Input
                        id="upload-title"
                        placeholder="e.g., Blood Test Results"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="upload-date">Date</Label>
                      <Input
                        id="upload-date"
                        type="date"
                        className="mt-1"
                        defaultValue={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="upload-provider">
                        Healthcare Provider
                      </Label>
                      <Input
                        id="upload-provider"
                        placeholder="e.g., Dr. Smith"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="upload-category">Category</Label>
                      <Select defaultValue="medical">
                        <SelectTrigger id="upload-category" className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medical">Medical</SelectItem>
                          <SelectItem value="dental">Dental</SelectItem>
                          <SelectItem value="vision">Vision</SelectItem>
                          <SelectItem value="immunization">
                            Immunization
                          </SelectItem>
                          <SelectItem value="medication">Medication</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="upload-notes">Notes (Optional)</Label>
                    <Textarea
                      id="upload-notes"
                      placeholder="Add any additional notes about this document"
                      className="mt-1"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="button" disabled={!fileUploaded}>
                    Upload & Save
                  </Button>
                </DialogFooter>
              </div>
            </TabsContent>

            <TabsContent value="portal" className="pt-4">
              <div className="space-y-6">
                <div className="bg-muted p-6 rounded-lg text-center">
                  <h3 className="font-medium text-lg mb-2">
                    Connect to Patient Portal
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Import your medical records directly from your healthcare
                    provider's patient portal.
                  </p>
                  <Button onClick={() => setShowPortalConnector(true)}>
                    <Link className="mr-2 h-4 w-4" /> Connect to Patient Portal
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Supported Patient Portals</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2 p-2 border rounded-md">
                      <div className="w-6 h-6 bg-blue-100 rounded-full" />
                      <span className="text-sm">Epic MyChart</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded-md">
                      <div className="w-6 h-6 bg-green-100 rounded-full" />
                      <span className="text-sm">Cerner Patient Portal</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded-md">
                      <div className="w-6 h-6 bg-purple-100 rounded-full" />
                      <span className="text-sm">Allscripts FollowMyHealth</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded-md">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full" />
                      <span className="text-sm">NextGen Patient Portal</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-md text-sm">
                  <p className="text-blue-800">
                    Your login credentials are securely transmitted directly to
                    your healthcare provider. We do not store your patient
                    portal password.
                  </p>
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                </DialogFooter>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {showPortalConnector && (
        <PatientPortalConnector
          open={showPortalConnector}
          onOpenChange={setShowPortalConnector}
          onImportSuccess={handlePortalImport}
        />
      )}
    </>
  );
};

export default RecordFormDialog;
