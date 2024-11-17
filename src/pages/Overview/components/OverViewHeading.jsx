import rafi_professional from "../../../assets/images/rafi_professional.png"

export default function OverViewHeading() {
  return (
    <div className="flex gap-4 justify-between items-center">
        <h2 className="text-xl">Welcome Back, <span className="text-primary">Shahjalal Rafi!</span></h2>
        <div className=" flex gap-4 items-center">
            <img src={rafi_professional} alt="" className="w-10 h-10 rounded-full" />
            <p>Shahjalal Rafi</p>
        </div>
    </div>
  )
}
