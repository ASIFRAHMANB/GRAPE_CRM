type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="bg-[var(--primary-dark)] p-4 rounded-lg">
      {children}
    </div>
  );
}