import { Search } from "lucide-react";

export default function EmptyState({ text }: { text: string }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <p className="text-gray-600 text-lg">{text}</p>
      <p className="text-gray-500 text-sm mt-2">Search and add stocks to get started</p>
    </div>
  );
}