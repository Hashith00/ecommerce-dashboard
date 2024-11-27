const Shimmer = ({ className }) => (
  <div
    className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
  />
);

// Card shimmer with title and value
export const MetricCardShimmer = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
    <div className="flex justify-between">
      <div className="space-y-2">
        <Shimmer className="h-4 w-24" />
        <Shimmer className="h-8 w-32" />
      </div>
      <Shimmer className="h-12 w-12 rounded-lg" />
    </div>
    <div className="flex items-center mt-4">
      <Shimmer className="h-4 w-16 mr-2" />
      <Shimmer className="h-4 w-24" />
    </div>
  </div>
);

// Table row shimmer
export const TableRowShimmer = ({ cols }) => (
  <tr>
    {Array(cols)
      .fill(0)
      .map((_, i) => (
        <td key={i} className="px-4 py-2">
          <Shimmer className="h-4 w-full" />
        </td>
      ))}
  </tr>
);

// Chart shimmer
export const ChartShimmer = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
    <Shimmer className="h-6 w-32 mb-4" />
    <div className="h-[300px] bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
  </div>
);

export default Shimmer;
