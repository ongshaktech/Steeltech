import React, { useEffect, useRef, useState } from "react";

export default function DowntimeCustomGraph({ graphData, thresholdTime }) {
  const [segment, setSegment] = useState([]);
  const tooltipRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!graphData) return; // Exit early if no data

    console.log(graphData);

    const machines = graphData.map((IndividualMachine) => {
      const temp = {
        machine_no: IndividualMachine.machine_no,
        data: [],
      };

      let segmentElement = {
        started: IndividualMachine.data[0].time,
        time: IndividualMachine.data[0].time,
        Value: IndividualMachine.data[0].Value,
        segmentWidth: 1,
        thresholdTime: thresholdTime,
      };

      IndividualMachine.data.forEach((data, idx) => {
        if (segmentElement.Value !== data.Value) {
          temp.data.push(segmentElement);
          segmentElement = {
            started: data.time,
            time: data.time,
            Value: data.Value,
            segmentWidth: 1,
            thresholdTime: thresholdTime,
          };
        } else {
          segmentElement.segmentWidth++;
          segmentElement.thresholdTime += thresholdTime;
        }

        // Push the last element
        if (idx === IndividualMachine.data.length - 1) {
          temp.data.push(segmentElement);
        }
      });

      return temp;
    });

    setSegment(machines);
  }, [graphData, thresholdTime]);

  // Function to handle mouse movement and update tooltip position
  const handleMouseMove = (e, data) => {
    tooltipRef.current.style.opacity = 1; // Show the tooltip
    tooltipRef.current.style.visibility = "visible"; // Show the tooltip
    setTooltip({
      visible: true,
      content: `${data.Value ? "Active for" : "Idle for"} ${formatTime(
        data.thresholdTime
      )} hours`,
      x: e.pageX,
      y: e.pageY,
    });
  };

  const handleMouseLeave = () => {
    tooltipRef.current.style.opacity = 0; // Hide the tooltip on mouse leave
    tooltipRef.current.style.visibility = "hidden"; // Hide the tooltip on mouse
    setTooltip({ visible: false, content: "", x: 0, y: 0 }); // Hide the tooltip on mouse leave
  };

  console.log("segment", segment);

  return (
    <>
      {/* Tooltip element */}
      {
        <div
          ref={tooltipRef}
          style={{
            zIndex: 10, // Ensure the tooltip is on top of other elements
            position: "absolute",
            top: tooltip.y - 20, // Offset from the pointer
            left: tooltip.x + 10, // Offset from the pointer
            backgroundColor: "#333",
            color: "#fff",
            padding: "5px 8px",
            borderRadius: "5px",
            fontSize: "0.8rem",
            whiteSpace: "nowrap",
            pointerEvents: "none", // Ensure the tooltip doesn't block other events
            transition: "opacity .5s ease", // Transition for smooth opacity change
            opacity: 0, // Set opacity based on tooltip visibility
            visibility: "hidden", // Set visibility based on tooltip visibility
          }}
          //   className="w-[200px] bg-red-500"
        >
          {tooltip.content}
        </div>
      }
      {/* <div className="flex gap-4 h-[500px] mt-8 overflow-x-scroll">
        {segment?.map(
          (item) => (
            <div className="flex flex-col gap-4 h-full">
              <div className="w-[60px] h-full rounded-xl bg-green-500"></div>
              <div className="">FM {item?.machine_no}</div>
            </div>
          )
        )}
      </div>
       */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative", // Needed for absolute positioning of the tooltip
        }}
        className=" rounded-xl"
      >
        {segment?.slice(0, 16).map((machine) => (
          <div key={machine.machine_no} className="mt-8">
            <span
              style={{
                background: "rgb(196 196 195)",
                borderRadius: "5px",
                padding: "5px 6px",
                marginRight: "10px",
                fontSize: "1.2rem",
                position: "relative",
                top: "4px",
              }}
            >
              {machine.machine_no}
            </span>

            {/* Bar container */}
            <div
              style={{
                width: "auto",
                height: "20px",
                display: "inline-flex",
                // borderRadius: "5px",
              }}
            >
              {machine.data.map((data, index) => (
                <div
                  key={index}
                  style={{
                    width: `${data.segmentWidth * 10}px`,
                    height: "24px",
                    backgroundColor: data.Value === 0 ? "#FF4560" : "#00E396",
                    cursor: "pointer",
                  }}
                  className={`${
                    index == 0
                      ? "rounded-l-xl"
                      : machine?.data?.length - 1 == index
                      ? "rounded-r-xl"
                      : ""
                  }`}
                  onMouseMove={(e) => handleMouseMove(e, data)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span
                    style={{
                      fontSize: ".8rem",
                      position: "relative",
                      top: data.Value === 0 ? "23px" : "-20px",
                      left: "-5px",
                      width: "70px",
                      transformOrigin: "center",
                    //   transform: "rotate(-30deg)",
                      display: "block",
                      paddingTop: "3px",
                    }}
                    className="text-black"
                  >
                    {data?.started}
                  </span>
                </div>
              ))}
            </div>

            <hr
              style={{
                border: "0.5px solid #d3d3d3",
                marginTop: "3rem",
                marginBottom: ".5rem",
              }}
            />
            <br />
          </div>
        ))}
      </div>
    </>
  );
}
