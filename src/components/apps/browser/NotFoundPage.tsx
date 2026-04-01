export const NotFoundPage = ({ path }: { path: string }) => (
  <div className="p-8 font-['Inter']">
    <h1 className="text-3xl font-bold text-[#FF4466]">404</h1>
    <p className="text-[#8899AA] mt-2">
      <span className="font-['JetBrains_Mono',monospace] text-[#00D4FF]">deanos:/{path}</span> was not found.
    </p>
  </div>
)
