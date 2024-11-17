import { Link } from "react-router-dom";
import realtime_reports from "../../assets/images/realtime_reports.svg";
import daily_report from "../../assets/images/daily_report.svg";

export default function ReportsDashboard() {
  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold pb-10">Reports</h2>

      <div className="grid grid-cols1 md:grid-cols-4 gap-10">
        <Link to="/reports/realtime-reports">
          <div className="rounded-lg shadow-xl cursor-pointer px-4 py-8 flex justify-center items-center flex-col gap-4 ">
            {/* <div className="rounded-lg shadow-[10px_15px_60px_15px_rgba(0,0,0,0.2)] px-4 py-8 flex justify-center items-center flex-col gap-4 "> */}
            <img src={realtime_reports} alt="" className="w-[100px] h-auto" />
            <p className="text-2xl">Realtime Report </p>
          </div>
        </Link>
        <Link to="/reports/daily-reports">
          <div className="rounded-lg shadow-xl px-4 py-8 flex justify-center items-center flex-col gap-4 ">
            <img src={daily_report} alt="" className="w-[60px] h-auto" />
            <p className="text-2xl">Daily Report </p>
          </div>
        </Link>
        <Link to="/reports/weekly-reports">
          <div className="rounded-lg shadow-xl px-4 py-8 flex justify-center items-center flex-col gap-4 ">
            <img src={realtime_reports} alt="" className="w-[100px] h-auto" />
            <p className="text-2xl">Weekly Report </p>
          </div>
        </Link>
        <Link to="/reports/monthly-reports">
        <div className="rounded-lg shadow-xl px-4 py-8 flex justify-center items-center flex-col gap-4 ">
          <img src={realtime_reports} alt="" className="w-[100px] h-auto" />
          <p className="text-2xl">Monthly Report </p>
        </div>
        </Link>
        <Link to="/reports/quarterly-reports">
        <div className="rounded-lg shadow-xl px-4 py-8 flex justify-center items-center flex-col gap-4 ">
          <img src={realtime_reports} alt="" className="w-[100px] h-auto" />
          <p className="text-2xl">Quarterly Report </p>
        </div>
        </Link>
        <Link to="/reports/yearly-reports">
        <div className="rounded-lg shadow-xl px-4 py-8 flex justify-center items-center flex-col gap-4 ">
          <img src={realtime_reports} alt="" className="w-[100px] h-auto" />
          <p className="text-2xl">Yearly Report </p>
        </div>
        </Link>
        <div className="rounded-lg shadow-xl px-4 py-8 flex justify-center items-center flex-col gap-4 ">
          <img src={realtime_reports} alt="" className="w-[100px] h-auto" />
          <p className="text-2xl">Machine Efficiency </p>
        </div>
      </div>
    </div>
  );
}
