type Props = {
    value: string;
    onChange: (v: string) => void;
    onSearch: () => void;
    placeholder?: string;
    showButton?: boolean;
};

export function SearchBox({
    value,
    onChange,
    onSearch,
    placeholder,
    showButton = true,
}: Props) {
    return (
        <div className="flex items-center gap-2">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder ?? "Search..."}
                onKeyDown={(e) => {
                    if (e.key === "Enter") onSearch();
                }}
                className="
          h-10 w-[220px]
          px-3
          rounded-lg
          bg-background/60
          border border-border/50
          text-sm
          outline-none
          focus:ring-2 focus:ring-primary/30
          transition
        "
            />

            {showButton && (
                <button
                    onClick={onSearch}
                    className="
              h-10 px-4
              rounded-lg
              bg-primary
              text-primary-foreground
              text-sm
              font-medium
              hover:opacity-90
              active:scale-[0.98]
              transition
            "
                >
                    Search
                </button>
            )}
        </div>
    );
}