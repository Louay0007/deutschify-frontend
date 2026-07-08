export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div dir="ltr" lang="en" className="min-h-[100svh]">
      {children}
    </div>
  )
}
