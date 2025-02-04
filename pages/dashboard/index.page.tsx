import React from "react";

import StudentDashboardContainer from "@/modules/dashboard/containers/StudentDashboardContainer";
import TeacherDashboardContainer from "@/modules/dashboard/containers/TeacherDashboardContainer";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import AuthGuard from "@/shared/components/wrappers/AuthGuard";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";

const Dashboard = () => {
  const { user } = useSessionContext();

  return (
    <AuthGuard>
      {user?.user_type === EUserRole.TEACHER ? (
        <TeacherDashboardContainer />
      ) : (
        <StudentDashboardContainer />
      )}
    </AuthGuard>
  );
};

export default Dashboard;
