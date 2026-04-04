type SmallInfoBoxProps = {
  title: string;
  content: string;
};

export default function SmallInfoBox({
  title,
  content,
}: SmallInfoBoxProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <h3 className="mb-2 text-sm font-semibold text-gray-700">{title}</h3>
      <p className="text-sm text-gray-600">{content}</p>
    </div>
  );
}