export default function DateTimeBox() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-xl bg-white p-4 shadow">
      {/* <h3 className="mb-2 text-sm font-semibold text-gray-700">Date</h3> */}
      <div className="text-sm text-gray-800">{formattedDate}</div>
    </div>
  );
}