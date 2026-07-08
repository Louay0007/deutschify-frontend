export function LogoSection() {
  return (
    <section className="relative w-full bg-walnut-shadow py-12 sm:py-16 md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 md:px-12 lg:px-16">
        <p className="mb-5 text-[12px] font-semibold tracking-[0.08em] text-driftwood uppercase sm:mb-6 sm:text-[13px]">
          Trusted by
        </p>

        <div className="ios-fill rounded-[20px] px-4 py-4 sm:px-8 sm:py-6 md:px-10 md:py-7">
          <img
            src="/images/telc.png"
            alt="telc Language Tests"
            className="h-20 w-auto max-w-[220px] object-contain sm:h-28 sm:max-w-[280px] md:h-36 md:max-w-[360px]"
          />
        </div>
      </div>
    </section>
  )
}
