
import React from 'react';
import { useState } from 'react';

import Navbar from '@/shared/components/Navbar';

const DashboardContainer = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div>
          {isDialogOpen}
          <Navbar setIsDialogOpen={setIsDialogOpen} />
        </div>
  );
};

export default DashboardContainer;
