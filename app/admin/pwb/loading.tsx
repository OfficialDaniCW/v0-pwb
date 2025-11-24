export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* Outer spinning ring */}
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#1E90FF] rounded-full animate-spin"></div>
          {/* PowerWash Bros logo/icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-[#1E90FF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PWB</span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-[#0B1E3F] text-lg font-semibold">Loading Dashboard...</p>
          <p className="text-gray-500 text-sm mt-1">Please wait</p>
        </div>
      </div>
    </div>
  )
}
