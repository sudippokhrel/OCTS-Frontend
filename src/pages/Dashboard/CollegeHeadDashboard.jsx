import React from 'react';
import CollegeHeadNavbar from '../../components/sidebar/CollegeHeadNavbar';
import Appbar from '../../components/navbar/Appbar';

function CollegeHeadDashboard() {
  return (
    <div>
      <CollegeHeadNavbar />
      <Appbar />
      {/* Rest of your CollegeHead dashboard content */}
    </div>
  );
}

export default CollegeHeadDashboard;