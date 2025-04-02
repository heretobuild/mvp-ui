import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tables } from "@/types/supabase";
import FileUpload from "@/components/records/FileUpload";
import { Loader2 } from "lucide-react";

type User = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [records, setRecords] = useState<{
    health: Tables["health_records"][];
    dental: Tables["dental_records"][];
    vision: Tables["vision_records"][];
    immunization: Tables["immunization_records"][];
    medications: Tables["medications"][];
  }>({ health: [], dental: [], vision: [], immunization: [], medications: [] });

  const navigate = useNavigate();

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      try {
        // Get current user
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (!authUser) {
          navigate("/login");
          return;
        }

        // Get user profile from users table
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id)
          .single();

        if (userError) throw userError;

        setUser(userData as User);

        // Fetch user's records
        await fetchUserRecords(authUser.id);
      } catch (err: any) {
        console.error("Error loading profile:", err);
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [navigate]);

  async function fetchUserRecords(userId: string) {
    try {
      // Fetch health records
      const { data: healthData } = await supabase
        .from("health_records")
        .select("*")
        .eq("user_id", userId);

      // Fetch dental records
      const { data: dentalData } = await supabase
        .from("dental_records")
        .select("*")
        .eq("user_id", userId);

      // Fetch vision records
      const { data: visionData } = await supabase
        .from("vision_records")
        .select("*")
        .eq("user_id", userId);

      // Fetch immunization records
      const { data: immunizationData } = await supabase
        .from("immunization_records")
        .select("*")
        .eq("user_id", userId);

      // Fetch medications
      const { data: medicationsData } = await supabase
        .from("medications")
        .select("*")
        .eq("user_id", userId);

      setRecords({
        health: healthData || [],
        dental: dentalData || [],
        vision: visionData || [],
        immunization: immunizationData || [],
        medications: medicationsData || [],
      });
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleFileUploadComplete = () => {
    // Refresh records after a successful upload
    if (user) {
      fetchUserRecords(user.id);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile sidebar */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage
                    src={user?.avatar_url || undefined}
                    alt={user?.full_name || "User"}
                  />
                  <AvatarFallback>
                    {user?.full_name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user?.full_name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/")}
                >
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-red-500"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Upload Health Document</CardTitle>
              <CardDescription>
                Upload a medical document to extract and store information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload onUploadComplete={handleFileUploadComplete} />
            </CardContent>
          </Card>
        </div>

        {/* Records content */}
        <div className="w-full md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Your Health Records</CardTitle>
              <CardDescription>
                View all your extracted health information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="health">
                <TabsList className="grid grid-cols-5 mb-4">
                  <TabsTrigger value="health">Medical</TabsTrigger>
                  <TabsTrigger value="dental">Dental</TabsTrigger>
                  <TabsTrigger value="vision">Vision</TabsTrigger>
                  <TabsTrigger value="immunization">Immunization</TabsTrigger>
                  <TabsTrigger value="medications">Medications</TabsTrigger>
                </TabsList>

                <TabsContent value="health">
                  {records.health.length > 0 ? (
                    <div className="space-y-4">
                      {records.health.map((record) => (
                        <div key={record.id} className="p-4 border rounded-lg">
                          <h3 className="font-medium text-lg">
                            {record.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Date: {new Date(record.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Provider: {record.provider}
                          </p>
                          {record.description && (
                            <p className="mt-2">{record.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">
                      No medical records found
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="dental">
                  {records.dental.length > 0 ? (
                    <div className="space-y-4">
                      {records.dental.map((record) => (
                        <div key={record.id} className="p-4 border rounded-lg">
                          <h3 className="font-medium text-lg">
                            {record.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Date: {new Date(record.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Provider: {record.provider}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">
                      No dental records found
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="vision">
                  {records.vision.length > 0 ? (
                    <div className="space-y-4">
                      {records.vision.map((record) => (
                        <div key={record.id} className="p-4 border rounded-lg">
                          <h3 className="font-medium text-lg">
                            {record.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Date: {new Date(record.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Provider: {record.provider}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">
                      No vision records found
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="immunization">
                  {records.immunization.length > 0 ? (
                    <div className="space-y-4">
                      {records.immunization.map((record) => (
                        <div key={record.id} className="p-4 border rounded-lg">
                          <h3 className="font-medium text-lg">
                            {record.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Date: {new Date(record.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Vaccine: {record.vaccine}
                          </p>
                          <p className="text-sm text-gray-500">
                            Dose: {record.dose_number}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">
                      No immunization records found
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="medications">
                  {records.medications.length > 0 ? (
                    <div className="space-y-4">
                      {records.medications.map((record) => (
                        <div key={record.id} className="p-4 border rounded-lg">
                          <h3 className="font-medium text-lg">{record.name}</h3>
                          <p className="text-sm text-gray-500">
                            Dosage: {record.dosage}
                          </p>
                          <p className="text-sm text-gray-500">
                            Frequency: {record.frequency}
                          </p>
                          <p className="text-sm text-gray-500">
                            Start Date:{" "}
                            {new Date(record.start_date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">
                      No medications found
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
