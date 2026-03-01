import React, { useState, useEffect } from "react";
import { studentAPI } from "../../services/api";
import StatCard from "../../components/cards/StatCard";
import ParticipationChart from "../../components/charts/ParticipationChart";
import CreditsTracker from "../../components/dashboard/CreditsTracker";
import AchievementsList from "../../components/dashboard/AchievementsList";
import AdminUpdates from "../../components/dashboard/AdminUpdates";
import AICareerCoach from "../../components/dashboard/AICareerCoach";

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await studentAPI.getProfile();
        setProfile(data.student);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="CGPA" value="8.38" />
        <StatCard title="Internal Avg" value="78%" />
        <StatCard title="Attendance" value="92%" />
      </div>

      <AdminUpdates />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ParticipationChart />
          <AchievementsList />
        </div>

        <div className="space-y-6">
          <CreditsTracker />
          <AICareerCoach />
        </div>
      </div>
    </div>
  );
}
