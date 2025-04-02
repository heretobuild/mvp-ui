import FileUpload from "../records/FileUpload";

export default function FileUploadStoryboard() {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload Health Document</h2>
      <FileUpload onUploadComplete={() => console.log("Upload complete")} />
    </div>
  );
}
