export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* Outer spinning ring */}
          <div className="w-16 h-16 border-4 border-border border-t-accent rounded-full animate-spin"></div>
          {/* PowerWash Bros logo/icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">PWB</span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-primary text-lg font-semibold">Loading Admin Portal...</p>
          <p className="text-muted-foreground text-sm mt-1">Please wait</p>
        </div>
      </div>
    </div>
  )
}
