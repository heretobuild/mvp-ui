import OpenAI from "openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY || "";

if (!apiKey) {
  console.error(
    "OpenAI API key is missing. Please add VITE_OPENAI_API_KEY to your environment variables.",
  );
}

export const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true, // Note: In production, API calls should be made from a server
});

// Add a debug log to check if OpenAI is initialized correctly
console.log(
  "OpenAI client initialized with API key:",
  apiKey ? "[API KEY PRESENT]" : "[MISSING]",
);

export async function extractDataFromText(
  text: string,
): Promise<Record<string, any>> {
  try {
    // Check if OpenAI API key is available
    if (!apiKey) {
      console.error("OpenAI API key is missing. Cannot extract data.");
      throw new Error("OpenAI API key is missing");
    }

    console.log("Starting OpenAI extraction process...");

    // First, get a summary of the medical report
    console.log("Requesting summary from OpenAI...");
    const summaryResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Fallback to 3.5 if 4 is not available
      messages: [
        {
          role: "system",
          content:
            "You are a medical assistant that summarizes medical reports concisely and accurately.",
        },
        {
          role: "user",
          content: `Summarize this medical report and tell me the summary: ${text}`,
        },
      ],
    });

    const summary = summaryResponse.choices[0].message.content || "";

    console.log("Summary received from OpenAI");

    // Then extract structured data
    console.log("Requesting structured data extraction from OpenAI...");
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Fallback to 3.5 if 4 is not available
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that extracts structured health data from text. Extract relevant health information and return it as a JSON object with the following fields where applicable:\n\n- recordType: The type of medical record (e.g., 'medical', 'dental', 'vision', 'immunization', 'medication')\n- title: A concise title for the record\n- date: The date of the record in YYYY-MM-DD format\n- provider: The healthcare provider's name\n- description: A brief description of the record\n- notes: Any additional notes or details\n- findings: Any medical findings (for dental records)\n- prescriptionDetails: Details about prescriptions (for vision records)\n- contactLensDetails: Details about contact lenses (for vision records)\n- vaccine: Vaccine name (for immunization records)\n- vaccineType: Type of vaccine (for immunization records)\n- doseNumber: Dose number (for immunization records)\n- status: Status of the record\n- name: Medication name (for medication records)\n- dosage: Medication dosage (for medication records)\n- frequency: Medication frequency (for medication records)\n- startDate: Medication start date (for medication records)\n- endDate: Medication end date (for medication records)\n- medicationType: Type of medication",
        },
        {
          role: "user",
          content: `Extract health record information from this text: ${text}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    console.log("Structured data received from OpenAI");
    let responseContent = response.choices[0].message.content || "{}";
    console.log("Raw response content:", responseContent);

    let result;
    try {
      result = JSON.parse(responseContent);
    } catch (parseError) {
      console.error("Error parsing OpenAI response as JSON:", parseError);
      // Create a basic object if parsing fails
      result = {
        recordType: "medical",
        title: "Medical Report",
        date: new Date().toISOString().split("T")[0],
      };
    }

    // Add the summary to the result
    result.description = summary;

    // Format date if it exists but isn't in YYYY-MM-DD format
    if (result.date && !/^\d{4}-\d{2}-\d{2}$/.test(result.date)) {
      try {
        const dateObj = new Date(result.date);
        if (!isNaN(dateObj.getTime())) {
          result.date = dateObj.toISOString().split("T")[0];
        }
      } catch (e) {
        console.warn("Could not parse date:", result.date);
      }
    }

    // If we don't have a record type, default to medical
    if (!result.recordType) {
      result.recordType = "medical";
    }

    // If we don't have a title, create one
    if (!result.title) {
      result.title = "Medical Report";
    }

    // Ensure we have a date
    if (!result.date) {
      result.date = new Date().toISOString().split("T")[0];
    }

    return result;
  } catch (error) {
    console.error("Error extracting data from text:", error);
    return {
      error: "Failed to extract data from document",
      recordType: "medical",
      title: "Medical Report",
      date: new Date().toISOString().split("T")[0],
      description:
        "Could not process this document. Please try again or enter details manually.",
    };
  }
}
