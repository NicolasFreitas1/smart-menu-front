interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  showAll?: boolean; // nova prop opcional
}

export function CategoryFilter({
  categories,
  selected,
  onSelect,
  showAll = false,
}: CategoryFilterProps) {
  const containerClass = showAll
    ? "flex flex-wrap gap-2 py-2 px-1 justify-center"
    : "flex gap-2 py-2 px-1 min-w-full w-max";

  return (
    <div className={showAll ? "" : "w-full overflow-x-auto"}>
      <div className={containerClass}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`px-4 py-2 rounded border text-sm font-medium whitespace-nowrap transition ${
              selected === category
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
