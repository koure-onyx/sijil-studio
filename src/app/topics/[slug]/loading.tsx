export default function TopicDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 flex items-center space-x-2">
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Topic header skeleton */}
      <div className="mb-8">
        <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mb-4"></div>
        
        <div className="flex gap-3">
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-6 w-28 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Actions skeleton */}
      <div className="mb-8 flex gap-2">
        <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Child topics skeleton */}
      <div className="mb-8">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-4 h-32 animate-pulse"
            >
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents skeleton */}
      <div>
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse"
            >
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
