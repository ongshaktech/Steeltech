import realtime_reports from "../../assets/images/realtime_reports.svg"

export default function ReportsDashboard() {
  return (
    <div className="py-4">
        <h2 className="text-2xl font-bold pb-10">Reports</h2>

        <div className="grid grid-cols1 md:grid-cols-4 gap-10">
            <div className="rounded-lg shadow-xl cursor-pointer px-4 py-8 flex justify-center items-center flex-col gap-4 ">
            {/* <div className="rounded-lg shadow-[10px_15px_60px_15px_rgba(0,0,0,0.2)] px-4 py-8 flex justify-center items-center flex-col gap-4 "> */}
                <img src={realtime_reports} alt="" className="w-[100px] h-auto" />
                <p className="text-2xl">Realtime Report </p>
            </div>
            <div className="rounded-lg shadow-xl px-4 py-8 flex justify-center items-center flex-col gap-4 ">
                <img src={realtime_reports} alt="" className="w-[100px] h-auto" />
                <p className="text-2xl">Realtime Report </p>
            </div>
            <div className="rounded-lg shadow-xl px-4 py-8 flex justify-center items-center flex-col gap-4 ">
                <img src={realtime_reports} alt="" className="w-[100px] h-auto" />
                <p className="text-2xl">Realtime Report </p>
            </div>
            <div className="rounded-lg shadow-xl px-4 py-8 flex justify-center items-center flex-col gap-4 ">
                <img src={realtime_reports} alt="" className="w-[100px] h-auto" />
                <p className="text-2xl">Realtime Report </p>
            </div>
            <div className="rounded-lg shadow-xl px-4 py-8 flex justify-center items-center flex-col gap-4 ">
                <img src={realtime_reports} alt="" className="w-[100px] h-auto" />
                <p className="text-2xl">Realtime Report </p>
            </div>
            <div className="rounded-lg shadow-xl px-4 py-8 flex justify-center items-center flex-col gap-4 ">
                <img src={realtime_reports} alt="" className="w-[100px] h-auto" />
                <p className="text-2xl">Realtime Report </p>
            </div>
            <div className="rounded-lg shadow-xl px-4 py-8 flex justify-center items-center flex-col gap-4 ">
                <img src={realtime_reports} alt="" className="w-[100px] h-auto" />
                <p className="text-2xl">Realtime Report </p>
            </div>
        </div>
    </div>
  )
}
