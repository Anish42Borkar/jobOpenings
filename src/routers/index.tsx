import { Routes, Route } from "react-router-dom";
import JobDetails from "../pages/jobDetails";
import JobOpenings from "../pages/jobOpenings";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<JobOpenings />} />
      <Route path="/details/:id" element={<JobDetails />} />
    </Routes>
  );
};

export default Routers;
