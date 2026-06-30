export default function TopicSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(8)].map((_, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm animate-pulse"
        >
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
