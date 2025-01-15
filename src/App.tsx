import "./App.css"

function App() {
  return (
    <div className="w-full h-full min-h-screen bg-[#161624]">
      <div className="text-white text-3xl p-10">Score: 1234</div>
      <div className="absolute left-1/3 bottom-2/3 h-60 w-60 bg-gradient-radial from-[#4043A3] to-[#000000]/0 rounded-full blur-[15px]"></div>
      <div className="absolute left-3/4 bottom-3/4 h-60 w-60 bg-gradient-radial from-[#A2336C] to-[#000000]/0 rounded-full blur-[15px]"></div>
      <div className="absolute right-3/4 top-2/3 h-60 w-60 bg-gradient-radial from-[#117973] to-[#000000]/0 rounded-full blur-[15px]"></div>
      <div className="absolute left-1/2 bottom-1/4 h-60 w-60 bg-gradient-radial from-[#5A3DAD] to-[#000000]/0 rounded-full blur-[15px]"></div>
      <div className="absolute right-1/4 top-2/3 h-60 w-60 bg-gradient-radial from-[#274F9F] to-[#000000]/0 rounded-full blur-[15px]"></div>
    </div>
  );
}

export default App;
