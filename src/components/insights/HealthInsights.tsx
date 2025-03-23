import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  Heart,
  Stethoscope,
  Brain,
  Droplet,
  Apple,
} from "lucide-react";

interface HealthInsightProps {
  title: string;
  description: string;
  actionText: string;
  category: string;
  impact: "high" | "medium" | "low";
  icon: React.ReactNode;
}

const HealthInsights = () => {
  const healthScore = 3.2; // Score from 1-5
  const normalizedScore = (healthScore / 5) * 100; // Convert to percentage for progress bar

  // Function to determine color based on score
  const getHealthScoreColor = () => {
    if (healthScore < 2) return "bg-red-500";
    if (healthScore < 3) return "bg-orange-500";
    if (healthScore < 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Function to determine text description based on score
  const getHealthScoreText = () => {
    if (healthScore < 2) return "Poor";
    if (healthScore < 3) return "Fair";
    if (healthScore < 4) return "Good";
    if (healthScore < 4.5) return "Very Good";
    return "Excellent";
  };

  const insights: HealthInsightProps[] = [
    {
      title: "Increase daily water intake",
      description:
        "You're consistently below the recommended 8 glasses of water daily. Proper hydration improves energy levels and cognitive function.",
      actionText: "Set water intake reminders",
      category: "Nutrition",
      impact: "medium",
      icon: <Droplet className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Schedule annual physical",
      description:
        "It's been over 14 months since your last comprehensive physical examination.",
      actionText: "Schedule appointment",
      category: "Preventive Care",
      impact: "high",
      icon: <Heart className="h-5 w-5 text-red-500" />,
    },
    {
      title: "Improve sleep consistency",
      description:
        "Your sleep patterns show irregular bedtimes. Consistent sleep schedules improve overall health and cognitive function.",
      actionText: "View sleep recommendations",
      category: "Lifestyle",
      impact: "medium",
      icon: <Brain className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Increase cardiovascular activity",
      description:
        "Your records indicate limited cardiovascular exercise. Aim for at least 150 minutes of moderate activity weekly.",
      actionText: "View exercise suggestions",
      category: "Fitness",
      impact: "high",
      icon: <Activity className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Consider lung function test",
      description:
        "Based on your family history of respiratory conditions, a baseline lung function test is recommended.",
      actionText: "Learn more",
      category: "Preventive Care",
      impact: "medium",
      icon: <Stethoscope className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Increase fruit and vegetable intake",
      description:
        "Your nutritional profile suggests below-recommended intake of fruits and vegetables.",
      actionText: "View nutrition tips",
      category: "Nutrition",
      impact: "medium",
      icon: <Apple className="h-5 w-5 text-green-500" />,
    },
  ];

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge variant="destructive">High Impact</Badge>;
      case "medium":
        return <Badge variant="default">Medium Impact</Badge>;
      case "low":
        return <Badge variant="secondary">Low Impact</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Health Insights</h1>
          <p className="text-muted-foreground">
            Personalized recommendations based on your health records and
            profile
          </p>
        </div>

        {/* Health Score Card */}
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle>Your Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-4xl font-bold">
                    {healthScore.toFixed(1)}
                  </span>
                  <span className="text-lg text-muted-foreground ml-2">
                    / 5.0
                  </span>
                </div>
                <span className="text-lg font-medium">
                  {getHealthScoreText()}
                </span>
              </div>

              <div className="w-full h-4 rounded-full overflow-hidden bg-gray-200">
                <div
                  className={`h-full ${getHealthScoreColor()} transition-all duration-500 ease-in-out`}
                  style={{ width: `${normalizedScore}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Very Good</span>
                <span>Excellent</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All Insights</TabsTrigger>
            <TabsTrigger value="high-impact">High Impact</TabsTrigger>
            <TabsTrigger value="preventive">Preventive Care</TabsTrigger>
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {insights.map((insight, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {insight.icon}
                        <CardTitle className="text-lg">
                          {insight.title}
                        </CardTitle>
                      </div>
                      {getImpactBadge(insight.impact)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {insight.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{insight.category}</Badge>
                      <Button variant="outline" size="sm">
                        {insight.actionText}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="high-impact" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {insights
                .filter((insight) => insight.impact === "high")
                .map((insight, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {insight.icon}
                          <CardTitle className="text-lg">
                            {insight.title}
                          </CardTitle>
                        </div>
                        {getImpactBadge(insight.impact)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {insight.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{insight.category}</Badge>
                        <Button variant="outline" size="sm">
                          {insight.actionText}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="preventive" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {insights
                .filter((insight) => insight.category === "Preventive Care")
                .map((insight, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {insight.icon}
                          <CardTitle className="text-lg">
                            {insight.title}
                          </CardTitle>
                        </div>
                        {getImpactBadge(insight.impact)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {insight.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{insight.category}</Badge>
                        <Button variant="outline" size="sm">
                          {insight.actionText}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="lifestyle" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {insights
                .filter(
                  (insight) =>
                    insight.category === "Lifestyle" ||
                    insight.category === "Fitness" ||
                    insight.category === "Nutrition",
                )
                .map((insight, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {insight.icon}
                          <CardTitle className="text-lg">
                            {insight.title}
                          </CardTitle>
                        </div>
                        {getImpactBadge(insight.impact)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {insight.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{insight.category}</Badge>
                        <Button variant="outline" size="sm">
                          {insight.actionText}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HealthInsights;
