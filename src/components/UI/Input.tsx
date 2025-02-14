export function Input({
  type,
  placeholder,
  className,
}: {
  type: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border p-2 rounded-lg w-full ${className}`}
    />
  );
}
