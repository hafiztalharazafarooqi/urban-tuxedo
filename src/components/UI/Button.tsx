export function Button({
  children,
  className,
  disabled,
  onClick, // Accept onClick prop
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void; // Add onClick type
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick} // Use onClick prop
      className={`bg-blue-500 text-white p-2 rounded-lg w-full ${className}`}
    >
      {children}
    </button>
  );
}
