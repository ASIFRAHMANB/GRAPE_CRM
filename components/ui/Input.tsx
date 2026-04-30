type InputProps = {
  placeholder?: string;
};

export default function Input({ placeholder }: InputProps) {
  return (
    <input
      placeholder={placeholder}
      className="bg-[var(--primary-dark)] px-3 py-2 rounded w-full outline-none"
    />
  );
}