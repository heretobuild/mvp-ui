import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { extractDataFromText } from "@/lib/openai";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Loader2,
  Upload,
  FileText,
  Image as ImageIcon,
  Check,
  X,
} from "lucide-react";

interface FileUploadProps {
  onUploadComplete?: () => void;
  onExtractedData?: (data: Record<string, any>) => void;
}

export default function FileUpload({
  onUploadComplete,
  onExtractedData,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<Record<
    string,
    any
  > | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
    }
  };

  const uploadFile = async (skipExtraction = false) => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);
      setStatus("Uploading file...");

      // 1. Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // For demo purposes, we'll allow uploads even without a user
      // In a production app, you would require authentication
      if (!user && import.meta.env.PROD) {
        throw new Error("You must be logged in to upload files");
      }

      // If no user is logged in, create or get a demo user
      let userId = user ? user.id : "00000000-0000-0000-0000-000000000000";

      // If using demo user, ensure it exists in the database
      if (!user) {
        // Call the ensure_demo_user function to get or create a demo user
        const { data: demoUserId, error: demoUserError } =
          await supabase.rpc("ensure_demo_user");

        if (demoUserError) {
          console.error("Error ensuring demo user exists:", demoUserError);
          throw new Error(
            `Failed to create demo user: ${demoUserError.message}`,
          );
        }

        userId = demoUserId;
      }

      // 2. Upload file to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      // Ensure the bucket exists before uploading
      try {
        // First, check if the bucket exists
        const { error: bucketError } =
          await supabase.storage.getBucket("health_documents");

        // If bucket doesn't exist, create it
        if (bucketError) {
          console.log("Bucket not found, attempting to create it...");

          // Create the bucket
          const { error: createBucketError } =
            await supabase.storage.createBucket("health_documents", {
              public: true,
              fileSizeLimit: 10485760, // 10MB
            });

          if (createBucketError) {
            console.error("Failed to create bucket:", createBucketError);
            throw new Error(
              `Failed to create storage bucket: ${createBucketError.message}`,
            );
          }

          console.log("Successfully created health_documents bucket");
        }
      } catch (bucketCheckError) {
        console.warn("Error with bucket operations:", bucketCheckError);
        // We'll still try to upload - the bucket might exist despite the error
      }

      // Add retry logic for upload
      let uploadError = null;
      let retries = 0;
      const maxRetries = 2;

      while (retries <= maxRetries) {
        const { error } = await supabase.storage
          .from("health_documents")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: true, // Changed to true to overwrite if file exists
          });

        uploadError = error;

        if (!uploadError) break;

        console.log(
          `Upload attempt ${retries + 1} failed:`,
          uploadError.message,
        );
        retries++;

        if (retries <= maxRetries) {
          // Wait a bit before retrying
          await new Promise((resolve) => setTimeout(resolve, 1000));
          console.log(`Retrying upload (attempt ${retries + 1})...`);
        }
      }

      if (uploadError) throw uploadError;

      setProgress(30);
      setStatus("Processing document...");

      // 3. Get public URL for the uploaded file
      const {
        data: { publicUrl },
      } = supabase.storage.from("health_documents").getPublicUrl(filePath);

      // 4. Extract text from the document
      let documentText = "";

      if (file.type.includes("image")) {
        // For images, we'd typically use OCR here
        // This is a simplified example - in a real app, you'd use a proper OCR service
        setStatus("Extracting text from image...");
        documentText =
          "This is a placeholder for OCR text extraction from images";
      } else if (file.type.includes("pdf")) {
        // For PDFs, we'd typically use a PDF parser here
        // This is a simplified example - in a real app, you'd use a proper PDF parser
        setStatus("Extracting text from PDF...");
        documentText = "This is a placeholder for text extraction from PDFs";
      } else {
        // For text files, read directly
        setStatus("Reading text from document...");
        documentText = await file.text();
      }

      setProgress(60);
      setStatus("Analyzing document with AI...");

      // If we're skipping extraction (because we've already done it), use the stored data
      if (skipExtraction && extractedData) {
        setProgress(70);
      } else {
        try {
          // 5. Use OpenAI to extract structured data
          console.log("Calling OpenAI to extract data from text...");
          const data = await extractDataFromText(documentText);
          console.log("OpenAI extraction result:", data);

          // Store the extracted data in state
          setExtractedData(data);

          // Pass extracted data to parent component if callback exists
          if (onExtractedData) {
            onExtractedData(data);
          }

          setProgress(70);

          // If we're not skipping, show the summary and return early
          if (!skipExtraction) {
            setStatus("Review the extracted information");
            setShowSummary(true);
            setUploading(false);
            return;
          }
        } catch (aiError) {
          console.error("Error during OpenAI extraction:", aiError);
          // Create fallback data if OpenAI fails
          const fallbackData = {
            recordType: "medical",
            title: file.name || "Uploaded Document",
            date: new Date().toISOString().split("T")[0],
            provider: "Unknown Provider",
            description:
              "Document was uploaded but AI analysis failed. Please enter details manually.",
          };

          setExtractedData(fallbackData);
          if (onExtractedData) {
            onExtractedData(fallbackData);
          }

          setProgress(70);

          if (!skipExtraction) {
            setStatus("AI analysis failed. Please review the information.");
            setShowSummary(true);
            setUploading(false);
            return;
          }
        }
      }

      // 6. Store the extracted data in the appropriate table based on record type
      if (!extractedData) return;

      setProgress(80);
      setStatus("Saving to database...");

      const recordType = extractedData.recordType?.toLowerCase() || "health";

      let insertError = null;

      console.log("Using user ID for database insertion:", userId);

      switch (recordType) {
        case "dental":
          const { error: dentalError } = await supabase
            .from("dental_records")
            .insert({
              user_id: userId,
              title: extractedData.title || "Dental Record",
              date: extractedData.date || new Date().toISOString(),
              provider: extractedData.provider || "Unknown Provider",
              record_type: "dental",
              findings: extractedData.findings || null,
              thumbnail_url: publicUrl,
            });
          insertError = dentalError;
          break;

        case "vision":
          const { error: visionError } = await supabase
            .from("vision_records")
            .insert({
              user_id: userId,
              title: extractedData.title || "Vision Record",
              date: extractedData.date || new Date().toISOString(),
              provider: extractedData.provider || "Unknown Provider",
              record_type: "vision",
              prescription_details: extractedData.prescriptionDetails || null,
              contact_lens_details: extractedData.contactLensDetails || null,
              thumbnail_url: publicUrl,
            });
          insertError = visionError;
          break;

        case "immunization":
          const { error: immunizationError } = await supabase
            .from("immunization_records")
            .insert({
              user_id: userId,
              title: extractedData.title || "Immunization Record",
              date: extractedData.date || new Date().toISOString(),
              provider: extractedData.provider || "Unknown Provider",
              vaccine: extractedData.vaccine || "Unknown Vaccine",
              vaccine_type: extractedData.vaccineType || "Unknown Type",
              dose_number: extractedData.doseNumber || "1",
              status: extractedData.status || "Completed",
              thumbnail_url: publicUrl,
            });
          insertError = immunizationError;
          break;

        case "medication":
          const { error: medicationError } = await supabase
            .from("medications")
            .insert({
              user_id: userId,
              name: extractedData.name || "Unknown Medication",
              dosage: extractedData.dosage || "Unknown Dosage",
              frequency: extractedData.frequency || "Daily",
              start_date: extractedData.startDate || new Date().toISOString(),
              end_date: extractedData.endDate || null,
              prescribed_by: extractedData.provider || "Unknown Provider",
              medication_type: extractedData.medicationType || "Prescription",
              status: extractedData.status || "Active",
              thumbnail_url: publicUrl,
            });
          insertError = medicationError;
          break;

        default: // Health records
          const { error: healthError } = await supabase
            .from("health_records")
            .insert({
              user_id: userId,
              title: extractedData.title || "Health Record",
              date: extractedData.date || new Date().toISOString(),
              provider: extractedData.provider || "Unknown Provider",
              record_type: extractedData.recordType || "general",
              description: extractedData.description || null,
              document_url: publicUrl,
              thumbnail_url: publicUrl,
            });
          insertError = healthError;
      }

      if (insertError) throw insertError;

      setProgress(100);
      setStatus("Upload complete!");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Notify parent component that upload is complete
      if (onUploadComplete) {
        onUploadComplete();
      }

      // Reset status after a delay
      setTimeout(() => {
        setStatus(null);
        setProgress(0);
      }, 3000);
    } catch (err: any) {
      console.error("Error uploading file:", err);
      setError(err.message || "Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleConfirmSave = async () => {
    setShowSummary(false);
    await uploadFile(true);
  };

  const handleCancelSave = () => {
    setShowSummary(false);
    setExtractedData(null);
    setProgress(0);
    setStatus(null);
    setUploading(false);
  };

  const renderSummaryCard = () => {
    if (!extractedData) return null;

    return (
      <Card className="w-full border-2 border-primary/20">
        <CardHeader>
          <CardTitle>Document Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {extractedData.recordType && (
            <div>
              <p className="text-sm font-medium">Record Type:</p>
              <p className="text-sm">{extractedData.recordType}</p>
            </div>
          )}
          {extractedData.title && (
            <div>
              <p className="text-sm font-medium">Title:</p>
              <p className="text-sm">{extractedData.title}</p>
            </div>
          )}
          {extractedData.date && (
            <div>
              <p className="text-sm font-medium">Date:</p>
              <p className="text-sm">{extractedData.date}</p>
            </div>
          )}
          {extractedData.provider && (
            <div>
              <p className="text-sm font-medium">Provider:</p>
              <p className="text-sm">{extractedData.provider}</p>
            </div>
          )}
          {extractedData.description && (
            <div>
              <p className="text-sm font-medium">Description:</p>
              <p className="text-sm">{extractedData.description}</p>
            </div>
          )}
          {extractedData.notes && (
            <div>
              <p className="text-sm font-medium">Notes:</p>
              <p className="text-sm">{extractedData.notes}</p>
            </div>
          )}
          {/* Render specific fields based on record type */}
          {extractedData.recordType?.toLowerCase() === "dental" &&
            extractedData.findings && (
              <div>
                <p className="text-sm font-medium">Findings:</p>
                <p className="text-sm">{extractedData.findings}</p>
              </div>
            )}
          {extractedData.recordType?.toLowerCase() === "vision" && (
            <>
              {extractedData.prescriptionDetails && (
                <div>
                  <p className="text-sm font-medium">Prescription Details:</p>
                  <p className="text-sm">{extractedData.prescriptionDetails}</p>
                </div>
              )}
              {extractedData.contactLensDetails && (
                <div>
                  <p className="text-sm font-medium">Contact Lens Details:</p>
                  <p className="text-sm">{extractedData.contactLensDetails}</p>
                </div>
              )}
            </>
          )}
          {extractedData.recordType?.toLowerCase() === "immunization" && (
            <>
              {extractedData.vaccine && (
                <div>
                  <p className="text-sm font-medium">Vaccine:</p>
                  <p className="text-sm">{extractedData.vaccine}</p>
                </div>
              )}
              {extractedData.vaccineType && (
                <div>
                  <p className="text-sm font-medium">Vaccine Type:</p>
                  <p className="text-sm">{extractedData.vaccineType}</p>
                </div>
              )}
              {extractedData.doseNumber && (
                <div>
                  <p className="text-sm font-medium">Dose Number:</p>
                  <p className="text-sm">{extractedData.doseNumber}</p>
                </div>
              )}
            </>
          )}
          {extractedData.recordType?.toLowerCase() === "medication" && (
            <>
              {extractedData.name && (
                <div>
                  <p className="text-sm font-medium">Medication Name:</p>
                  <p className="text-sm">{extractedData.name}</p>
                </div>
              )}
              {extractedData.dosage && (
                <div>
                  <p className="text-sm font-medium">Dosage:</p>
                  <p className="text-sm">{extractedData.dosage}</p>
                </div>
              )}
              {extractedData.frequency && (
                <div>
                  <p className="text-sm font-medium">Frequency:</p>
                  <p className="text-sm">{extractedData.frequency}</p>
                </div>
              )}
              {extractedData.medicationType && (
                <div>
                  <p className="text-sm font-medium">Medication Type:</p>
                  <p className="text-sm">{extractedData.medicationType}</p>
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleCancelSave}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleConfirmSave}>
            <Check className="mr-2 h-4 w-4" />
            Save Record
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {showSummary ? (
        renderSummaryCard()
      ) : (
        <>
          <div
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.txt"
            />

            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="p-3 rounded-full bg-primary/10">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-gray-500">
                  PDF, JPG, PNG or TXT (max 10MB)
                </p>
              </div>
            </div>
          </div>

          {file && (
            <div className="flex items-center p-3 border rounded-lg bg-gray-50">
              {file.type.includes("pdf") ? (
                <FileText className="h-5 w-5 mr-2 text-primary" />
              ) : file.type.includes("image") ? (
                <ImageIcon className="h-5 w-5 mr-2 text-primary" />
              ) : (
                <FileText className="h-5 w-5 mr-2 text-primary" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          {status && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm">{status}</p>
                <p className="text-sm font-medium">{progress}%</p>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <Button
            onClick={() => uploadFile()}
            disabled={!file || uploading}
            className="w-full"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Upload Document"
            )}
          </Button>
        </>
      )}
    </div>
  );
}
