import React from "react";

export default function DowntimeDesign() {
  return (
    <div>
      <div className="flex gap-4 h-[500px] mt-8 overflow-x-scroll">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 , 21, 22, 23, 24, 25, 26, 28, 29, 30, 31]?.map(
          (item) => (
            <div className="flex flex-col gap-4 h-full">
              <div className="w-[60px] h-full rounded-xl bg-green-500"></div>
              <div className="">FM {item}</div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
