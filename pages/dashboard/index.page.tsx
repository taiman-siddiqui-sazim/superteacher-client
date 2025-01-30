import React from 'react';

import DashboardContainer from '@/modules/dashboard/containers/DashboardContainer';
import AuthGuard from '@/shared/components/wrappers/AuthGuard';

const Dashboard = () => (
    <AuthGuard>
      <DashboardContainer />
    </AuthGuard>
  );

export default Dashboard;
