import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import UserAppliedCard from "@/customComponents/jobs/userAppliedCard";

import { jobInterfaceFull } from "@/interfaces/interfaces";
import { filterJobsByCompany } from "@/lib/filterMapping";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function UserJobs() {
  const data = useSelector((state: RootState) => state.userJobs);
  const searchValue = useSelector((state: RootState) => state.search);
  const filteredData = filterJobsByCompany(data, searchValue);
  return (
    <div className="flex flex-col gap-5 p-5 w-full h-full min-h-screen">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="lg:text-4xl font-bold">Jobs You Applied For</h1>
        <div className="flex flex-row items-center justify-center w-fit gap-5">
          <Button>
            <NavLink to={"/"}>Continue Searching</NavLink>
          </Button>
        </div>
      </div>
      <hr />
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 w-full h-full ">
        {filteredData.length > 0 ? (
          filteredData.map((job: jobInterfaceFull, index: number) => (
            <UserAppliedCard
              company={job.company}
              dateStart={job.dateStart}
              id={job.id}
              nextStep={job.nextStep}
              notes={job.notes}
              title={job.title}
              key={index}
              status="Applied"
            />
          ))
        ) : (
          <div className="w-full h-full col-span-full flex items-center justify-center text-center  max-w-lg mx-auto">
            <span className="text-muted-foreground">
              no company you applied for contains this search term{" "}
              <strong className="text-black">{searchValue}</strong>, try
              searching for with another term or try searching for new jobs.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserJobs;
