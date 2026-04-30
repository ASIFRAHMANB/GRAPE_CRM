type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] px-4 py-2 rounded text-white transition"
    >
      {children}
    </button>
  );
}