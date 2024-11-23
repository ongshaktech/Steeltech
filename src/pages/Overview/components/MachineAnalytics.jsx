
import ListOfIdleMachine from "./ListOfIdleMachine";
import { MachineEfficiency } from "./MachineEfficiency";

export default function MachineAnalytics() {
  return (
    <div className="grid grid-cols-2 gap-8 mt-10">
      <ListOfIdleMachine />
      {/* <MachineEfficiency /> */}
    </div>
  );
}
